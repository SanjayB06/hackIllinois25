import os
import hashlib
from flask import Flask, request, jsonify, session
from pymongo import MongoClient
from dotenv import load_dotenv
from bson.objectid import ObjectId

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will allow all origins by default
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


from customeranalysis import user_insights
load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")
client = MongoClient(MONGODB_URI)
db = client.get_database("UserDB")
users_collection = db["users"]

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

@app.route("/create_user", methods=["POST"])
def create_user():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing JSON payload"}), 400
    required_fields = ["username", "email", "password", "liked_foods", "disliked_foods",
                       "liked_cuisines", "food_allergies", "dietary_restrictions", "location",
                       "monthly_income", "monthly_bills", "expenses"]
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
    user_doc["_id"] = str(result.inserted_id)
    return jsonify(user_doc), 201

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
    session["user_id"] = str(user["_id"])
    return jsonify({"message": "Login successful", "user_id": session["user_id"]})

@app.route("/me", methods=["GET"])
def get_profile():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Not logged in"}), 401
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        return jsonify({"error": "User not found"}), 404
    user["_id"] = str(user["_id"])
    return jsonify(user)

@app.route("/update_liked_cuisines/<string:account_number>", methods=["PUT"])
def update_liked_cuisines():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Not logged in"}), 401
    data = user_insights
    if not data or "liked_cuisines" not in data:
        return jsonify({"error": "Missing liked_cuisines field"}), 400
    users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"liked_cuisines": data["liked_cuisines"]}}
    )
    return jsonify({"message": "Liked cuisines updated successfully"})


if __name__ == "__main__":
    app.run(debug=True)
