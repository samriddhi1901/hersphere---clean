from db import db
from datetime import datetime


class MenopauseLog(db.Model):

    __tablename__ = "menopause_logs"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    hot_flashes = db.Column(db.Integer, default=0)

    mood = db.Column(db.String(50))

    sleep_quality = db.Column(db.String(50))

    notes = db.Column(db.String(500))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)