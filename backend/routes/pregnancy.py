from flask import Blueprint, request, jsonify
from db import db
from models.pregnancy import PregnancyProfile, PregnancySymptomLog, WeightLog
from datetime import datetime, date


pregnancy_bp = Blueprint("pregnancy", __name__)


def compute_week_info(due_date):
    # Standard pregnancy is 40 weeks (280 days) from conception estimate
    today = date.today()
    days_left = (due_date - today).days
    days_pregnant = 280 - days_left

    current_week = max(1, min(40, (days_pregnant // 7) + 1))

    if current_week <= 13:
        trimester = 1
    elif current_week <= 27:
        trimester = 2
    else:
        trimester = 3

    return {
        "current_week": current_week,
        "trimester": trimester,
        "days_left": max(days_left, 0),
    }


def compute_weight_gain_target(pre_pregnancy_weight_kg, height_cm):
    """IOM (Institute of Medicine) weight gain targets by pre-pregnancy BMI."""
    if not pre_pregnancy_weight_kg or not height_cm:
        return None

    height_m = height_cm / 100
    bmi = pre_pregnancy_weight_kg / (height_m ** 2)

    if bmi < 18.5:
        category, low, high = "Underweight", 12.5, 18
    elif bmi < 25:
        category, low, high = "Normal", 11.5, 16
    elif bmi < 30:
        category, low, high = "Overweight", 7, 11.5
    else:
        category, low, high = "Obese", 5, 9

    return {
        "bmi": round(bmi, 1),
        "category": category,
        "target_low_kg": low,
        "target_high_kg": high,
    }


# Create or update the due date + pre-pregnancy weight/height
@pregnancy_bp.route("/pregnancy", methods=["POST"])
def set_pregnancy():

    data = request.get_json()

    user_id = data.get("user_id")
    due_date_str = data.get("due_date")
    pre_pregnancy_weight_kg = data.get("pre_pregnancy_weight_kg")
    height_cm = data.get("height_cm")

    if not user_id or not due_date_str:
        return jsonify({"error": "Missing fields"}), 400

    due_date = datetime.strptime(due_date_str, "%Y-%m-%d").date()

    profile = PregnancyProfile.query.filter_by(user_id=user_id).first()

    if profile:
        profile.due_date = due_date
        if pre_pregnancy_weight_kg is not None:
            profile.pre_pregnancy_weight_kg = pre_pregnancy_weight_kg
        if height_cm is not None:
            profile.height_cm = height_cm
    else:
        profile = PregnancyProfile(
            user_id=user_id,
            due_date=due_date,
            pre_pregnancy_weight_kg=pre_pregnancy_weight_kg,
            height_cm=height_cm,
        )
        db.session.add(profile)

    db.session.commit()

    return jsonify({
        "message": "Pregnancy info saved",
        **compute_week_info(due_date)
    }), 201


# Get current pregnancy info (week, trimester, days left)
@pregnancy_bp.route("/pregnancy/<int:user_id>", methods=["GET"])
def get_pregnancy(user_id):

    profile = PregnancyProfile.query.filter_by(user_id=user_id).first()

    if not profile:
        return jsonify({"exists": False}), 200

    info = compute_week_info(profile.due_date)
    weight_target = compute_weight_gain_target(
        profile.pre_pregnancy_weight_kg, profile.height_cm
    )

    return jsonify({
        "exists": True,
        "due_date": profile.due_date.isoformat(),
        "pre_pregnancy_weight_kg": profile.pre_pregnancy_weight_kg,
        "height_cm": profile.height_cm,
        "weight_target": weight_target,
        **info
    }), 200


# Log a pregnancy symptom
@pregnancy_bp.route("/pregnancy/symptom", methods=["POST"])
def log_symptom():

    data = request.get_json()

    user_id = data.get("user_id")
    symptom = data.get("symptom")
    notes = data.get("notes", "")

    if not user_id or not symptom:
        return jsonify({"error": "Missing fields"}), 400

    log = PregnancySymptomLog(user_id=user_id, symptom=symptom, notes=notes)
    db.session.add(log)
    db.session.commit()

    return jsonify({"message": "Symptom logged"}), 201


# Get symptom history
@pregnancy_bp.route("/pregnancy/symptoms/<int:user_id>", methods=["GET"])
def get_symptoms(user_id):

    logs = PregnancySymptomLog.query.filter_by(
        user_id=user_id
    ).order_by(PregnancySymptomLog.created_at.desc()).all()

    return jsonify({
        "symptoms": [
            {
                "id": log.id,
                "symptom": log.symptom,
                "notes": log.notes,
                "created_at": log.created_at.isoformat(),
            }
            for log in logs
        ]
    })


# Log a weight entry
@pregnancy_bp.route("/pregnancy/weight", methods=["POST"])
def log_weight():

    data = request.get_json()

    user_id = data.get("user_id")
    weight_kg = data.get("weight_kg")

    if not user_id or weight_kg is None:
        return jsonify({"error": "Missing fields"}), 400

    log = WeightLog(user_id=user_id, weight_kg=weight_kg)
    db.session.add(log)
    db.session.commit()

    return jsonify({"message": "Weight logged", "id": log.id}), 201


# Get weight history + progress toward IOM target
@pregnancy_bp.route("/pregnancy/weight/<int:user_id>", methods=["GET"])
def get_weight_history(user_id):

    profile = PregnancyProfile.query.filter_by(user_id=user_id).first()

    logs = WeightLog.query.filter_by(
        user_id=user_id
    ).order_by(WeightLog.logged_date.asc()).all()

    weight_target = None
    gained_so_far = None

    if profile:
        weight_target = compute_weight_gain_target(
            profile.pre_pregnancy_weight_kg, profile.height_cm
        )
        if logs and profile.pre_pregnancy_weight_kg:
            gained_so_far = round(logs[-1].weight_kg - profile.pre_pregnancy_weight_kg, 1)

    return jsonify({
        "weight_target": weight_target,
        "gained_so_far_kg": gained_so_far,
        "logs": [
            {
                "id": log.id,
                "weight_kg": log.weight_kg,
                "logged_date": log.logged_date.isoformat(),
            }
            for log in logs
        ]
    })


# AI-personalized insight based on real logged data
@pregnancy_bp.route("/pregnancy/insight/<int:user_id>", methods=["GET"])
def get_insight(user_id):

    from services.gemini_service import get_pregnancy_insight

    profile = PregnancyProfile.query.filter_by(user_id=user_id).first()

    if not profile:
        return jsonify({"insight": "Set your due date to get personalized insights."}), 200

    info = compute_week_info(profile.due_date)

    recent_symptoms = PregnancySymptomLog.query.filter_by(
        user_id=user_id
    ).order_by(PregnancySymptomLog.created_at.desc()).limit(5).all()

    insight = get_pregnancy_insight(
        info["current_week"],
        info["trimester"],
        [s.symptom for s in recent_symptoms]
    )

    return jsonify({"insight": insight})