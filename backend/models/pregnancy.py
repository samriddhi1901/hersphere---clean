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

    created_at = db.Column(db.DateTime, default=datetime.utcnow)


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