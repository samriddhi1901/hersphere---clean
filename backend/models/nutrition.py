from db import db
from datetime import datetime


class NutritionLog(db.Model):

    __tablename__ = "nutrition_logs"


    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    meal_type = db.Column(
        db.String(20),
        nullable=False
    )

    food_description = db.Column(
        db.String(500),
        nullable=False
    )

    estimated_calories = db.Column(
        db.Integer
    )

    protein_g = db.Column(
        db.Integer
    )

    carbs_g = db.Column(
        db.Integer
    )

    fat_g = db.Column(
        db.Integer
    )

    suggestion = db.Column(
        db.String(500)
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


    def __repr__(self):
        return f"<NutritionLog {self.user_id} {self.food_description}>"