from flask import Blueprint, request, jsonify
#from services.gemini_service import get_ai_response

chat_bp = Blueprint("chat", __name__)


@chat_bp.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    message = data.get("message")

    if not message:
        return jsonify({"error": "Message is required"}), 400

    reply = get_ai_response(message)

    return jsonify({
        "reply": reply
    })