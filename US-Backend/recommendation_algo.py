
# app.py
import os
import re
import json
import asyncio
import logging
from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import openai
from openai import AsyncOpenAI

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")
client_llm = AsyncOpenAI(api_key=openai_api_key)

app = FastAPI(title="Dynamic Dish Recommender (Test Mode)")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ------------------------------
# Data Models
# ------------------------------
class UserPreferences(BaseModel):
    favorite_cuisines: list[str] = []
    liked_dishes: list[str] = []
    disliked_dishes: list[str] = []
    dietary_restrictions: list[str] = []

class UserProfile(BaseModel):
    id: str
    preferences: UserPreferences

class Dish(BaseModel):
    name: str
    cuisine: str
    ingredients: list[str]
    description: str

class RecommendationResponse(BaseModel):
    recommendations: list[Dish]

class RecommendationRequest(BaseModel):
    user_id: str
    query: str = "Suggest a new dish"

class Feedback(BaseModel):
    user_id: str
    dish_name: str
    feedback: str  # "like" or "dislike"

# ------------------------------
# In-memory "database" for testing
# ------------------------------
# Hard-coded user data for testing. In production, this would be stored in a database.
user_db = {
    "user123": UserProfile(
        id="user123",
        preferences=UserPreferences(
            favorite_cuisines=["Mexican", "Italian"],
            liked_dishes=["quesadillas", "pasta primavera"],
            disliked_dishes=["sushi"],
            dietary_restrictions=["gluten-free"]
        )
    )
}

# ------------------------------
# Helper: Fetch User Profile
# ------------------------------
async def get_user_profile(user_id: str) -> UserProfile:
    if user_id in user_db:
        return user_db[user_id]
    raise HTTPException(status_code=404, detail="User not found")

# ------------------------------
# Dish Generation Function (using OpenAI)
# ------------------------------
async def generate_dishes(preferences: UserPreferences, query: str) -> list[Dish]:
    prompt = f"""
You are a creative chef and food recommendation assistant.
Given the following user preferences:
- Favorite Cuisines: {', '.join(preferences.favorite_cuisines)}
- Liked Dishes: {', '.join(preferences.liked_dishes)}
- Disliked Dishes: {', '.join(preferences.disliked_dishes)}
- Dietary Restrictions: {', '.join(preferences.dietary_restrictions)}

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
        response = await client_llm.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a creative chef who outputs recommendations in JSON format. Do not include any explanation or extra text."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=500
        )
        output = response.choices[0].message.content.strip()
        logger.info("Raw LLM output: " + output)
        # Attempt to parse the output as JSON
        dishes_data = json.loads(output)
        return [Dish(**dish) for dish in dishes_data]
    except Exception as e:
        logger.error(f"Error generating dishes: {e}")
        raise HTTPException(status_code=500, detail=f"Error generating dishes: {e}")

# ------------------------------
# API Endpoint: Recommend Dish
# ------------------------------
@app.post("/recommend_dish", response_model=RecommendationResponse)
async def recommend_dish(request: RecommendationRequest):
    user_profile = await get_user_profile(request.user_id)
    recommendations = await generate_dishes(user_profile.preferences, request.query)
    return RecommendationResponse(recommendations=recommendations)

# ------------------------------
# Feedback Endpoint: Update Preferences
# ------------------------------
@app.post("/feedback")
async def update_feedback(feedback: Feedback):
    user_profile = await get_user_profile(feedback.user_id)
    updated = False
    if feedback.feedback.lower() == "like":
        if feedback.dish_name not in user_profile.preferences.liked_dishes:
            user_profile.preferences.liked_dishes.append(feedback.dish_name)
            updated = True
    elif feedback.feedback.lower() == "dislike":
        if feedback.dish_name not in user_profile.preferences.disliked_dishes:
            user_profile.preferences.disliked_dishes.append(feedback.dish_name)
            updated = True
    if updated:
        # In our test version, update our in-memory "database"
        user_db[feedback.user_id] = user_profile
    return {"message": "Feedback processed", "updated_preferences": user_profile.preferences.dict()}

# ------------------------------
# Endpoint to Create or Update User (for testing)
# ------------------------------
@app.post("/user", response_model=UserProfile)
async def create_or_update_user(user: UserProfile):
    user_db[user.id] = user
    return user

# To run this app: uvicorn app:app --reload
