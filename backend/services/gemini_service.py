from google import genai
from config import Config


client = genai.Client(
    api_key=Config.GEMINI_API_KEY
)

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


    try:

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text


    except Exception as e:

        print("GEMINI ERROR:", e)

        return "Sorry, I am unable to respond right now."