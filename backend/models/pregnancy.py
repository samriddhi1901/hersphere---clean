from db import db
from datetime import datetime


class PregnancyProfile(db.Model):

    __tablename__ = "pregnancy_profiles"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
        unique=True
    )

    due_date = db.Column(db.Date, nullable=False)

    # Used to compute IOM weight gain targets
    pre_pregnancy_weight_kg = db.Column(db.Float)
    height_cm = db.Column(db.Float)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class WeightLog(db.Model):

    __tablename__ = "pregnancy_weight_logs"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    weight_kg = db.Column(db.Float, nullable=False)

    logged_date = db.Column(db.Date, default=lambda: datetime.utcnow().date())


class PregnancySymptomLog(db.Model):

    __tablename__ = "pregnancy_symptom_logs"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    symptom = db.Column(db.String(255), nullable=False)

    notes = db.Column(db.String(500))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)