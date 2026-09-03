from flask import Blueprint, request, jsonify
from db import db
from models.menopause import MenopauseLog


menopause_bp = Blueprint("menopause", __name__)


# Log a daily check-in
@menopause_bp.route("/menopause", methods=["POST"])
def add_menopause_log():

    data = request.get_json()

    user_id = data.get("user_id")

    if not user_id:
        return jsonify({"error": "Missing user_id"}), 400

    log = MenopauseLog(
        user_id=user_id,
        hot_flashes=data.get("hot_flashes", 0),
        mood=data.get("mood"),
        sleep_quality=data.get("sleep_quality"),
        notes=data.get("notes", ""),
    )

    db.session.add(log)
    db.session.commit()

    return jsonify({"message": "Logged successfully"}), 201


# Get check-in history
@menopause_bp.route("/menopause/<int:user_id>", methods=["GET"])
def get_menopause_logs(user_id):

    logs = MenopauseLog.query.filter_by(
        user_id=user_id
    ).order_by(MenopauseLog.created_at.desc()).all()

    return jsonify({
        "logs": [
            {
                "id": log.id,
                "hot_flashes": log.hot_flashes,
                "mood": log.mood,
                "sleep_quality": log.sleep_quality,
                "notes": log.notes,
                "created_at": log.created_at.isoformat(),
            }
            for log in logs
        ]
    })


# AI-personalized insight based on real logged check-ins
@menopause_bp.route("/menopause/insight/<int:user_id>", methods=["GET"])
def get_insight(user_id):

    from services.gemini_service import get_menopause_insight

    logs = MenopauseLog.query.filter_by(
        user_id=user_id
    ).order_by(MenopauseLog.created_at.desc()).limit(5).all()

    recent_logs = [
        {
            "hot_flashes": log.hot_flashes,
            "mood": log.mood,
            "sleep_quality": log.sleep_quality,
        }
        for log in logs
    ]

    insight = get_menopause_insight(recent_logs)

    return jsonify({"insight": insight})