from db import db
from datetime import datetime

class Cycle(db.Model):
    __tablename__ = "cycles"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    start_date = db.Column(db.Date, nullable=False)
    cycle_length = db.Column(db.Integer, default=28)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)