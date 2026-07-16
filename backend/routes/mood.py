from flask import Blueprint, request, jsonify

from db import db
from models.mood import Mood


mood_bp = Blueprint("mood", __name__)


# Add mood
@mood_bp.route("/mood", methods=["POST"])
def add_mood():

    data = request.get_json()

    user_id = data.get("user_id")
    mood = data.get("mood")
    note = data.get("note")


    if not user_id or not mood:
        return jsonify({
            "error": "Missing fields"
        }),400


    new_mood = Mood(
        user_id=user_id,
        mood=mood,
        note=note
    )


    db.session.add(new_mood)
    db.session.commit()


    return jsonify({
        "message":"Mood saved successfully"
    }),201



# Get mood history
@mood_bp.route("/mood/<int:user_id>", methods=["GET"])
def get_moods(user_id):

    moods = Mood.query.filter_by(
        user_id=user_id
    ).all()


    result=[]

    for m in moods:

        result.append({

            "mood":m.mood,
            "note":m.note,
            "created_at":str(m.created_at)

        })


    return jsonify(result)