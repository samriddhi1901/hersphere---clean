from flask import Blueprint, request, jsonify

from db import db
from models.cycle import Cycle
from models.mood import Mood
from models.water import WaterLog
from models.nutrition import NutritionLog

from datetime import datetime, timedelta


dashboard_bp = Blueprint("dashboard", __name__)


# Get today's water intake
@dashboard_bp.route("/water/<int:user_id>", methods=["GET"])
def get_water(user_id):

    today = datetime.utcnow().date()

    log = WaterLog.query.filter_by(
        user_id=user_id,
        log_date=today
    ).first()

    return jsonify({
        "glasses": log.glasses if log else 0
    })


# Set today's water intake (creates or updates today's row)
@dashboard_bp.route("/water", methods=["POST"])
def set_water():

    data = request.get_json()

    user_id = data.get("user_id")
    glasses = data.get("glasses", 0)

    if not user_id:
        return jsonify({"error": "Missing user_id"}), 400

    today = datetime.utcnow().date()

    log = WaterLog.query.filter_by(
        user_id=user_id,
        log_date=today
    ).first()

    if log:
        log.glasses = glasses
    else:
        log = WaterLog(user_id=user_id, log_date=today, glasses=glasses)
        db.session.add(log)

    db.session.commit()

    return jsonify({"glasses": log.glasses}), 200


# Aggregated summary for the dashboard stat cards
@dashboard_bp.route("/dashboard/summary/<int:user_id>", methods=["GET"])
def get_summary(user_id):

    today = datetime.utcnow().date()

    # --- Cycle: most recently logged cycle entry ---
    latest_cycle = Cycle.query.filter_by(
        user_id=user_id
    ).order_by(Cycle.start_date.desc()).first()

    cycle_day = None
    cycle_length = None
    if latest_cycle:
        cycle_length = latest_cycle.cycle_length
        days_since_start = (today - latest_cycle.start_date).days + 1
        # Wrap around if past the cycle length (best-effort estimate)
        cycle_day = ((days_since_start - 1) % cycle_length) + 1 if cycle_length else days_since_start

    # --- Mood: most recent mood entry ---
    latest_mood = Mood.query.filter_by(
        user_id=user_id
    ).order_by(Mood.created_at.desc()).first()

    # --- Water: today's glasses ---
    water_log = WaterLog.query.filter_by(
        user_id=user_id,
        log_date=today
    ).first()
    water_glasses = water_log.glasses if water_log else 0
    water_goal = 8

    # --- Meals logged today ---
    meals_today = NutritionLog.query.filter(
        NutritionLog.user_id == user_id,
        db.func.date(NutritionLog.created_at) == today
    ).count()

    # --- Honest wellness score: % of today's healthy habits completed ---
    # (mood logged today, water goal progress, a meal logged today)
    mood_logged_today = bool(
        latest_mood and latest_mood.created_at.date() == today
    )
    water_progress = min(water_glasses / water_goal, 1.0) if water_goal else 0
    meal_logged_today = meals_today > 0

    wellness_score = round(
        ((1 if mood_logged_today else 0) + water_progress + (1 if meal_logged_today else 0))
        / 3 * 100
    )

    return jsonify({
        "cycle_day": cycle_day,
        "cycle_length": cycle_length,
        "mood": latest_mood.mood if latest_mood else None,
        "water_glasses": water_glasses,
        "water_goal": water_goal,
        "meals_logged_today": meals_today,
        "wellness_score": wellness_score,
    })


# Real recent-activity feed, combining mood, nutrition, and water logs
@dashboard_bp.route("/dashboard/recent-activity/<int:user_id>", methods=["GET"])
def get_recent_activity(user_id):

    activities = []

    recent_moods = Mood.query.filter_by(user_id=user_id).order_by(
        Mood.created_at.desc()
    ).limit(3).all()

    for m in recent_moods:
        activities.append({
            "type": "mood",
            "title": f"Mood updated to {m.mood}",
            "created_at": m.created_at.isoformat(),
        })

    recent_meals = NutritionLog.query.filter_by(user_id=user_id).order_by(
        NutritionLog.created_at.desc()
    ).limit(3).all()

    for meal in recent_meals:
        activities.append({
            "type": "nutrition",
            "title": f"Logged {meal.meal_type}: {meal.food_description}",
            "created_at": meal.created_at.isoformat(),
        })

    recent_water = WaterLog.query.filter_by(user_id=user_id).order_by(
        WaterLog.log_date.desc()
    ).limit(3).all()

    for w in recent_water:
        activities.append({
            "type": "water",
            "title": f"Logged {w.glasses} glasses of water",
            "created_at": datetime.combine(w.log_date, datetime.min.time()).isoformat(),
        })

    # Sort everything together, most recent first
    activities.sort(key=lambda a: a["created_at"], reverse=True)

    return jsonify({"activities": activities[:6]})