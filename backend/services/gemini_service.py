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


def get_pregnancy_insight(current_week, trimester, recent_symptoms):

    symptoms_text = ", ".join(recent_symptoms) if recent_symptoms else "no symptoms logged recently"

    prompt = f"""
You are a supportive pregnancy assistant in a women's health app.

The user is at week {current_week} of pregnancy (trimester {trimester}).
Their recently logged symptoms: {symptoms_text}

Write ONE short, warm, practical insight (2-3 sentences max) that
references their actual logged symptoms if any, and gives one
concrete, safe suggestion relevant to their current week. Do not
diagnose anything. Keep it encouraging and simple.
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        return response.text.strip()

    except Exception as e:
        print("GEMINI PREGNANCY INSIGHT ERROR:", e)
        return "Keep up the great work tracking your pregnancy! Check in with your doctor about anything you're experiencing."


def get_menopause_insight(recent_logs):

    if not recent_logs:
        summary_text = "no check-ins logged yet"
    else:
        summary_text = "; ".join(
            f"{log['hot_flashes']} hot flashes, mood {log['mood']}, sleep {log['sleep_quality']}"
            for log in recent_logs
        )

    prompt = f"""
You are a supportive menopause wellness assistant in a women's health app.

The user's recent daily check-ins: {summary_text}

Write ONE short, warm, practical insight (2-3 sentences max) based on
any patterns you notice (e.g. frequent hot flashes, poor sleep, low
mood), with one concrete, safe suggestion. Do not diagnose anything.
Keep it encouraging and simple.
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        return response.text.strip()

    except Exception as e:
        print("GEMINI MENOPAUSE INSIGHT ERROR:", e)
        return "Keep logging your check-ins — over time this helps spot patterns worth discussing with your doctor."


# Reference figures for the 12 critical pregnancy nutrients, aligned to
# NICE/ACOG/IOM-style public health guidance. Used to ground the AI's
# analysis in real numbers rather than vague generalities.
PREGNANCY_NUTRIENT_TARGETS = """
Reference daily targets during pregnancy (adjust slightly by trimester):
Folate ~600mcg, Iron ~27mg, Calcium ~1000mg, Vitamin D ~600IU (10mcg),
DHA/Omega-3 ~200-300mg, Choline ~450mg, Iodine ~220mcg, Vitamin B12 ~2.6mcg,
Zinc ~11mg, Magnesium ~350mg, Protein ~71g/day (T2-T3; ~46g in T1), Fibre ~28g/day.
Protein and calorie needs rise notably in T2 (+340 cal/day) and T3 (+450 cal/day)
compared to pre-pregnancy - not "eating for two", roughly one extra snack-sized
meal per day. Compare provided values against these targets where relevant.
"""


def get_nutrient_analysis(life_stage, stage_context, values):
    """
    values: dict like {"hemoglobin": 10.2, "vitamin_d": 18, ...}
    stage_context: e.g. "Trimester 2, Week 18" for pregnancy, or "" otherwise
    """

    values_text = ", ".join(
        f"{k.replace('_', ' ').title()}: {v}"
        for k, v in values.items()
        if v is not None
    ) or "no values provided"

    is_pregnancy = life_stage == "pregnancy"

    reference_note = PREGNANCY_NUTRIENT_TARGETS if is_pregnancy else ""

    plan_length = "3-day" if is_pregnancy else "one-day"
    plan_shape = (
        """{
    "day1": {"breakfast": "...", "lunch": "...", "dinner": "...", "snack": "..."},
    "day2": {"breakfast": "...", "lunch": "...", "dinner": "...", "snack": "..."},
    "day3": {"breakfast": "...", "lunch": "...", "dinner": "...", "snack": "..."}
  }"""
        if is_pregnancy else
        """{
    "breakfast": "...", "lunch": "...", "dinner": "...", "snack": "..."
  }"""
    )

    prompt = f"""
You are a nutrition analysis assistant for a women's health app.

Life stage: {life_stage} {stage_context}
Lab values / intake provided: {values_text}
{reference_note}

Identify which values appear low, normal, or high, and explain briefly
what each deficiency can mean for someone at this specific life stage.

Then generate a {plan_length} sample meal plan using common, accessible
foods that target the identified deficiencies and suit this life stage.
Vary the meals across days if generating multiple days.

This is general educational guidance, not a medical diagnosis, and you
should say so briefly.

Respond with ONLY valid JSON, no markdown, in this exact shape:

{{
  "deficiency_summary": "<2-4 sentences summarizing findings in plain language>",
  "meal_plan": {plan_shape}
}}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        text = response.text.strip()
        if text.startswith("```"):
            text = text.strip("`")
            text = text.replace("json", "", 1).strip()

        import json
        data = json.loads(text)

        return {
            "deficiency_summary": data.get("deficiency_summary", ""),
            "meal_plan": data.get("meal_plan", {}),
        }

    except Exception as e:
        print("GEMINI NUTRIENT ANALYSIS ERROR:", e)
        return {
            "deficiency_summary": "Unable to analyze your report right now. Please try again shortly.",
            "meal_plan": {},
        }