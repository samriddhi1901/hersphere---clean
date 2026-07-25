from db import db
from datetime import datetime


class WaterLog(db.Model):

    __tablename__ = "water_logs"


    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    log_date = db.Column(
        db.Date,
        nullable=False,
        default=lambda: datetime.utcnow().date()
    )

    glasses = db.Column(
        db.Integer,
        default=0
    )


    def __repr__(self):
        return f"<WaterLog {self.user_id} {self.log_date} {self.glasses}>"