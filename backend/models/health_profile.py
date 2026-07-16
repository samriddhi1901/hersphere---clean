from db import db
from datetime import datetime


class HealthProfile(db.Model):

    __tablename__ = "health_profiles"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    # Link profile with user table
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
        unique=True
    )


    # User wellness goal
    wellness_goal = db.Column(
        db.String(255),
        nullable=False
    )


    # Average menstrual cycle length
    cycle_length = db.Column(
        db.Integer,
        default=28
    )


    # Nutrition tracking preference
    track_nutrition = db.Column(
        db.Boolean,
        default=False
    )


    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


    def __repr__(self):

        return f"<HealthProfile {self.user_id}>"