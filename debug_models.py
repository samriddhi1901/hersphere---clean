from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

models = client.models.list()

print("\nAVAILABLE MODELS:\n")

for m in models:
    print(m.name)