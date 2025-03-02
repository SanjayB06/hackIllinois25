import os
import hashlib
import json
import logging
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from bson.objectid import ObjectId
from recommendation_algo import generate_dishes, update_user_feedback

# Load environment variables from .env file
load_dotenv()

# Retrieve environment variables by key
MONGODB_URI = os.getenv("MONGODB_URI")
SECRET_KEY = os.getenv("SECRET_KEY")

# Ensure required variables are set
if not MONGODB_URI:
    raise Exception("MONGODB_URI environment variable not set!")
if not SECRET_KEY:
    raise Exception("SECRET_KEY environment variable not set!")

# Initialize Flask app
app = Flask(__name__)
app.secret_key = SECRET_KEY

# Enable CORS (allow all origins or restrict as needed)
CORS(app)

# Set up MongoDB connection
client = MongoClient(MONGODB_URI)
db = client.get_database("UserDB")
users_collection = db["users"]

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

@app.route("/create_user", methods=["POST"])
def create_user():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing JSON payload"}), 400

    # Remove custom "id" requirement. Use MongoDB _id.
    required_fields = [
        "username", "email", "password", "liked_foods", "disliked_foods",
        "liked_cuisines", "food_allergies", "dietary_restrictions", "location",
        "monthly_income", "monthly_bills", "expenses"
    ]
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

    if users_collection.find_one({"email": data["email"]}):
        return jsonify({"error": "User with that email already exists."}), 400

    hashed_password = hash_password(data["password"])
    user_doc = {
        "username": data["username"],
        "email": data["email"],
        "password": hashed_password,
        "liked_foods": data["liked_foods"],
        "disliked_foods": data["disliked_foods"],
        "liked_cuisines": data["liked_cuisines"],
        "food_allergies": data["food_allergies"],
        "dietary_restrictions": data["dietary_restrictions"],
        "location": data["location"],
        "monthly_income": data["monthly_income"],
        "monthly_bills": data["monthly_bills"],
        "expenses": data["expenses"]
    }
    result = users_collection.insert_one(user_doc)
    user_id = str(result.inserted_id)
    return jsonify({"message": "User created successfully", "user_id": user_id}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data or "email" not in data or "password" not in data:
        return jsonify({"error": "Missing email or password"}), 400

    email = data["email"]
    password = data["password"]
    hashed = hash_password(password)
    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found"}), 404
    if user["password"] != hashed:
        return jsonify({"error": "Invalid credentials"}), 401

    # Use MongoDB _id as the user identifier
    session["user_id"] = str(user["_id"])
    return jsonify({"message": "Login successful", "user_id": session["user_id"]})

@app.route("/me", methods=["GET"])
def get_profile():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Not logged in"}), 401

    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)})
    except Exception:
        return jsonify({"error": "Invalid user id format"}), 400

    if not user:
        return jsonify({"error": "User not found"}), 404

    user["_id"] = str(user["_id"])
    return jsonify(user)

@app.route("/recommend_dish", methods=["POST"])
def recommend_dish():
    data = request.get_json()
    if not data or "user_id" not in data:
        return jsonify({"error": "Missing user_id"}), 400

    try:
        user = users_collection.find_one({"_id": ObjectId(data["user_id"])})
    except Exception:
        return jsonify({"error": "Invalid user id format"}), 400

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Construct preferences for recommendation engine
    preferences = {
        "favorite_cuisines": [str(item["cuisine"]) for item in user.get("liked_cuisines", [])],
        "liked_dishes": user.get("liked_foods", []),
        "disliked_dishes": user.get("disliked_foods", []),
        "dietary_restrictions": user.get("dietary_restrictions", [])
    }
    query = data.get("query", "Suggest a new dish")
    recommendations = generate_dishes(preferences, query)
    if recommendations is None:
        return jsonify({"error": "Failed to generate dishes"}), 500
    return jsonify({"recommendations": recommendations})

@app.route("/feedback", methods=["POST"])
def feedback():
    data = request.get_json()
    if not data or "user_id" not in data or "dish_name" not in data or "feedback" not in data:
        return jsonify({"error": "Missing fields"}), 400

    try:
        user = users_collection.find_one({"_id": ObjectId(data["user_id"])})
    except Exception:
        return jsonify({"error": "Invalid user id format"}), 400

    if not user:
        return jsonify({"error": "User not found"}), 404

    updated_user = update_user_feedback(user, data["dish_name"], data["feedback"])
    users_collection.update_one({"_id": ObjectId(data["user_id"])}, {"$set": updated_user})
    return jsonify({
        "message": "Feedback processed",
        "updated_preferences": updated_user.get("preferences", {})
    })

@app.route("/update_liked_cuisines", methods=["PUT"])
def update_liked_cuisines():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Not logged in"}), 401

    data = request.get_json()
    if not data or "liked_cuisines" not in data:
        return jsonify({"error": "Missing liked_cuisines field"}), 400

    try:
        users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"liked_cuisines": data["liked_cuisines"]}}
        )
    except Exception:
        return jsonify({"error": "Failed to update liked cuisines"}), 500

    return jsonify({"message": "Liked cuisines updated successfully"})

if __name__ == "__main__":
    app.run(debug=True)
