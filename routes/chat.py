from flask import Blueprint, request, jsonify
from services.gemini_service import get_ai_response

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/chat", methods=["POST"])
def chat():
    try:
        print("🔥 CHAT ENDPOINT HIT")
        data = request.get_json()
        message = data.get("message")

        print("USER MESSAGE:", message)  # DEBUG LINE

        reply = get_ai_response(message)

        print("GEMINI REPLY:", reply)  # DEBUG LINE

        return jsonify({"reply": reply})

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)}), 500