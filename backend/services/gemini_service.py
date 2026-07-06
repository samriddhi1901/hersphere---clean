import google.generativeai as genai
from config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def get_ai_response(message):
    prompt = f"""
You are HerSphere AI.

You are a friendly women's health assistant.

Rules:
- Give educational information only.
- Never diagnose diseases.
- Recommend consulting a doctor for serious symptoms.
- Keep answers simple.
- Answer politely.

User:
{message}
"""

    response = model.generate_content(prompt)

    return response.text