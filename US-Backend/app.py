from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample data for transactions and active challenge
sample_transactions = [
    {"id": "1", "category": "Dining", "description": "Indian Food", "amount": 50, "date": "2023-09-15"},
    {"id": "2", "category": "Groceries", "description": "Supermarket", "amount": 75, "date": "2023-09-14"},
    {"id": "3", "category": "Transport", "description": "Uber Ride", "amount": 20, "date": "2023-09-14"}
]

active_challenge = {
    "id": "challenge1",
    "title": "Chill on Indian Food",
    "description": "Your spending on Indian Food is high. This week, try to cut it down by $15!",
    "currentAmount": 50,
    "targetAmount": 35,
    "progress": 0,
    "daysLeft": 3
}

@app.route('/')
def index():
    return jsonify({"message": "Welcome to SpendBoost API"})

@app.route('/transactions', methods=['GET'])
def get_transactions():
    # In a real scenario, fetch data from your database or an external API
    return jsonify(sample_transactions)

@app.route('/challenge', methods=['GET'])
def get_challenge():
    return jsonify(active_challenge)

@app.route('/update-challenge', methods=['POST'])
def update_challenge():
    # This endpoint accepts updates for the challenge (for example, when progress is made)
    data = request.get_json()
    # Here you’d update your database or in-memory object; for now, just update the active challenge.
    active_challenge.update(data)
    return jsonify({"message": "Challenge updated", "challenge": active_challenge}), 200

if __name__ == '__main__':
    # Run the app on port 5000 by default
    app.run(debug=True)
