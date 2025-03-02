import os
import json
import logging
from dotenv import load_dotenv
from openai import OpenAI

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=openai_api_key)

def generate_dishes(preferences, query):
    prompt = f"""
You are a creative chef and food recommendation assistant.
Given the following user preferences:
- Favorite Cuisines: {', '.join(preferences.get("favorite_cuisines", []))}
- Liked Dishes: {', '.join(preferences.get("liked_dishes", []))} 
- Disliked Dishes: {', '.join(preferences.get("disliked_dishes", []))}
- Dietary Restrictions: {', '.join(preferences.get("dietary_restrictions", []))}

Please generate exactly a JSON array (no additional text) of 3 candidate dishes that the user might enjoy.
Each dish should be a JSON object with the following keys:
    "name" (string),
    "cuisine" (string),
    "ingredients" (array of strings),
    "description" (string).

For example:
[
  {{
    "name": "Chicken Quesadillas",
    "cuisine": "Mexican",
    "ingredients": ["tortillas", "chicken", "cheese", "salsa"],
    "description": "A classic Mexican dish with a spicy kick."
  }},
  {{
    "name": "Veggie Pasta Primavera",
    "cuisine": "Italian",
    "ingredients": ["gluten-free pasta", "tomatoes", "zucchini", "basil"],
    "description": "A light and fresh pasta dish."
  }},
  {{
    "name": "Margherita Pizza",
    "cuisine": "Italian",
    "ingredients": ["dough", "tomato sauce", "mozzarella", "basil"],
    "description": "A traditional pizza with simple flavors."
  }}
]

Now, based on the query: "{query}", generate the JSON array.
"""
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # or use another available model like "gpt-4o"
            messages=[
                {
                    "role": "system",
                    "content": "You are a creative chef who outputs recommendations in JSON format. Do not include any extra explanation."
                },
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=500
        )
        output = response.choices[0].message.content.strip()
        logger.info("Raw LLM output: " + output)
        try:
            dishes_data = json.loads(output)
            return dishes_data
        except Exception as parse_error:
            logger.error("JSON parsing error: " + str(parse_error))
            return None
    except Exception as e:
        logger.error("Error generating dishes: " + str(e))
        return None

def update_user_feedback(user_profile, dish_name, feedback):
    if feedback.lower() == "like":
        if dish_name not in user_profile.get("liked_foods", []):
            user_profile.setdefault("liked_foods", []).append(dish_name)
    elif feedback.lower() == "dislike":
        if dish_name not in user_profile.get("disliked_foods", []):
            user_profile.setdefault("disliked_foods", []).append(dish_name)
    return user_profile
