from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def get_ai_response(message):
    try:
        response = client.models.generate_content(
            model="models/gemini-2.0-flash",
            contents=message
        )
        return response.text

    except Exception as e:
        print("GEMINI ERROR:", e)
        return "AI error occurred"