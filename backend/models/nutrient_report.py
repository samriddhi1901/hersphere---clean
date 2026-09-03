from db import db
from datetime import datetime


class NutrientReport(db.Model):

    __tablename__ = "nutrient_reports"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    life_stage = db.Column(db.String(20), nullable=False)

    # Standard blood markers
    hemoglobin = db.Column(db.Float)      # g/dL
    vitamin_d = db.Column(db.Float)       # ng/mL
    vitamin_b12 = db.Column(db.Float)     # pg/mL
    folate = db.Column(db.Float)          # ng/mL
    iron = db.Column(db.Float)            # ug/dL (ferritin or serum iron)
    calcium = db.Column(db.Float)         # mg/dL
    tsh = db.Column(db.Float)             # mIU/L (thyroid)

    # Self-reported daily intake (the remaining nutrients from the
    # 12-critical-nutrients pregnancy framework that aren't standard
    # blood panel items)
    protein_intake = db.Column(db.Float)  # g/day
    dha_omega3 = db.Column(db.Float)      # mg/day
    iodine = db.Column(db.Float)          # mcg/day
    zinc = db.Column(db.Float)            # mg/day
    magnesium = db.Column(db.Float)       # mg/day
    fibre = db.Column(db.Float)           # g/day
    choline = db.Column(db.Float)         # mg/day

    # AI-generated results, stored so history doesn't need to re-call the API
    deficiency_summary = db.Column(db.Text)
    meal_plan = db.Column(db.Text)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)