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


def get_nutrition_estimate(food_description, meal_type="Meal", life_stage="period"):

    prompt = f"""
You are a nutrition estimation assistant for a women's health app.

A user logged their {meal_type} as: "{food_description}"
Their current life stage focus is: {life_stage}

Estimate the nutrition for this meal as best you can from common
portion sizes. Then give one short, practical suggestion relevant
to their life stage (e.g. iron-rich tips for period, folate for
pregnancy, calcium for menopause).

Respond with ONLY valid JSON, no markdown, no extra text, in this
exact shape:

{{
  "calories": <integer>,
  "protein_g": <integer>,
  "carbs_g": <integer>,
  "fat_g": <integer>,
  "suggestion": "<one short sentence>"
}}
"""

    try:

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        text = response.text.strip()

        # Strip markdown code fences if the model adds them anyway
        if text.startswith("```"):
            text = text.strip("`")
            text = text.replace("json", "", 1).strip()

        import json
        data = json.loads(text)

        return {
            "calories": int(data.get("calories", 0)),
            "protein_g": int(data.get("protein_g", 0)),
            "carbs_g": int(data.get("carbs_g", 0)),
            "fat_g": int(data.get("fat_g", 0)),
            "suggestion": data.get("suggestion", ""),
        }

    except Exception as e:

        print("GEMINI NUTRITION ERROR:", e)

        return {
            "calories": 0,
            "protein_g": 0,
            "carbs_g": 0,
            "fat_g": 0,
            "suggestion": "Unable to estimate nutrition right now, but great job logging your meal!",
        }