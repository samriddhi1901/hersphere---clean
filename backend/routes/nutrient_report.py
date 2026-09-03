from flask import Blueprint, request, jsonify
from db import db
from models.nutrient_report import NutrientReport
from models.pregnancy import PregnancyProfile
from services.gemini_service import get_nutrient_analysis
from datetime import date
import json


nutrient_report_bp = Blueprint("nutrient_report", __name__)


def get_stage_context(user_id, life_stage):
    if life_stage == "pregnancy":
        profile = PregnancyProfile.query.filter_by(user_id=user_id).first()
        if profile:
            days_left = (profile.due_date - date.today()).days
            days_pregnant = max(280 - days_left, 0)
            week = min(40, (days_pregnant // 7) + 1)
            trimester = 1 if week <= 13 else 2 if week <= 27 else 3
            return f"(Trimester {trimester}, Week {week})"
    return ""


FIELD_KEYS = [
    "hemoglobin", "vitamin_d", "vitamin_b12", "folate", "iron", "calcium", "tsh",
    "protein_intake", "dha_omega3", "iodine", "zinc", "magnesium", "fibre", "choline",
]


@nutrient_report_bp.route("/nutrient-report", methods=["POST"])
def submit_report():

    data = request.get_json()

    user_id = data.get("user_id")
    life_stage = data.get("life_stage", "period")

    if not user_id:
        return jsonify({"error": "Missing user_id"}), 400

    values = {key: data.get(key) for key in FIELD_KEYS}

    stage_context = get_stage_context(user_id, life_stage)

    result = get_nutrient_analysis(life_stage, stage_context, values)

    report = NutrientReport(
        user_id=user_id,
        life_stage=life_stage,
        deficiency_summary=result["deficiency_summary"],
        meal_plan=json.dumps(result["meal_plan"]),
        **values
    )

    db.session.add(report)
    db.session.commit()

    return jsonify({
        "id": report.id,
        "deficiency_summary": report.deficiency_summary,
        "meal_plan": result["meal_plan"],
        "created_at": report.created_at.isoformat(),
    }), 201


@nutrient_report_bp.route("/nutrient-report/<int:user_id>", methods=["GET"])
def get_reports(user_id):

    reports = NutrientReport.query.filter_by(
        user_id=user_id
    ).order_by(NutrientReport.created_at.desc()).all()

    return jsonify({
        "reports": [
            {
                "id": r.id,
                "life_stage": r.life_stage,
                "values": {key: getattr(r, key) for key in FIELD_KEYS},
                "deficiency_summary": r.deficiency_summary,
                "meal_plan": json.loads(r.meal_plan) if r.meal_plan else {},
                "created_at": r.created_at.isoformat(),
            }
            for r in reports
        ]
    })