from flask import Blueprint, request, jsonify
from db import db
from models.user import User

user_bp = Blueprint("user", __name__)


@user_bp.route("/user/sync", methods=["POST"])
def sync_user():

    data = request.get_json()

    clerk_user_id = data.get("clerk_user_id")
    email = data.get("email")
    name = data.get("name")

    user = User.query.filter_by(
        clerk_user_id=clerk_user_id
    ).first()

    if not user:
        user = User(
            clerk_user_id=clerk_user_id,
            email=email,
            name=name
        )

        db.session.add(user)
        db.session.commit()

    return jsonify({
        "message": "User synced",
        "user_id": user.id
    })