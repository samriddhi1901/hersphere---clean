from flask import Blueprint, request, jsonify
from db import db
from models.pregnancy import PregnancyProfile, PregnancySymptomLog
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


# Create or update the due date
@pregnancy_bp.route("/pregnancy", methods=["POST"])
def set_pregnancy():

    data = request.get_json()

    user_id = data.get("user_id")
    due_date_str = data.get("due_date")

    if not user_id or not due_date_str:
        return jsonify({"error": "Missing fields"}), 400

    due_date = datetime.strptime(due_date_str, "%Y-%m-%d").date()

    profile = PregnancyProfile.query.filter_by(user_id=user_id).first()

    if profile:
        profile.due_date = due_date
    else:
        profile = PregnancyProfile(user_id=user_id, due_date=due_date)
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

    return jsonify({
        "exists": True,
        "due_date": profile.due_date.isoformat(),
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