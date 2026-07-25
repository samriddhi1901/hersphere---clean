from flask import Blueprint, request, jsonify

from db import db
from models.nutrition import NutritionLog
from models.health_profile import HealthProfile
from services.gemini_service import get_nutrition_estimate


nutrition_bp = Blueprint(
    "nutrition",
    __name__
)


# Add a meal - AI estimates calories/macros automatically
@nutrition_bp.route("/nutrition", methods=["POST"])
def add_nutrition():

    data = request.get_json()

    user_id = data.get("user_id")
    meal_type = data.get("meal_type", "Meal")
    food_description = data.get("food_description")

    if not user_id or not food_description:

        return jsonify({
            "error": "Missing fields"
        }), 400

    # Get life stage for a more relevant suggestion, default to "period"
    profile = HealthProfile.query.filter_by(user_id=user_id).first()
    life_stage = profile.life_stage if profile else "period"

    estimate = get_nutrition_estimate(
        food_description,
        meal_type=meal_type,
        life_stage=life_stage
    )

    log = NutritionLog(
        user_id=user_id,
        meal_type=meal_type,
        food_description=food_description,
        estimated_calories=estimate["calories"],
        protein_g=estimate["protein_g"],
        carbs_g=estimate["carbs_g"],
        fat_g=estimate["fat_g"],
        suggestion=estimate["suggestion"],
    )

    db.session.add(log)
    db.session.commit()

    return jsonify({

        "message": "Nutrition saved successfully",

        "log": {
            "id": log.id,
            "meal_type": log.meal_type,
            "food_description": log.food_description,
            "calories": log.estimated_calories,
            "protein_g": log.protein_g,
            "carbs_g": log.carbs_g,
            "fat_g": log.fat_g,
            "suggestion": log.suggestion,
        }

    }), 201


# Get today's nutrition history for a user
@nutrition_bp.route("/nutrition/<int:user_id>", methods=["GET"])
def get_nutrition(user_id):

    logs = NutritionLog.query.filter_by(
        user_id=user_id
    ).order_by(NutritionLog.created_at.desc()).all()

    return jsonify({

        "user_id": user_id,

        "nutrition": [
            {
                "id": log.id,
                "meal_type": log.meal_type,
                "food_description": log.food_description,
                "calories": log.estimated_calories,
                "protein_g": log.protein_g,
                "carbs_g": log.carbs_g,
                "fat_g": log.fat_g,
                "suggestion": log.suggestion,
            }
            for log in logs
        ]

    })