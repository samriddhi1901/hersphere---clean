from db import db


class User(db.Model):

    __tablename__ = "users"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    clerk_user_id = db.Column(
        db.String(255),
        unique=True,
        nullable=False
    )


    email = db.Column(
        db.String(255),
        unique=True
    )


    name = db.Column(
        db.String(255)
    )


    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )