import csv
from flask import Flask, request, jsonify
from fuzzywuzzy import process, fuzz

app = Flask(__name__)

# Load ingredients and their raw prices from CSV
def load_ingredients(csv_file="Ingredients.csv"):
    ingredient_data = {}
    with open(csv_file, newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Use lowercase keys for case-insensitive matching
            ingredient_name = row["Ingredient"].strip().lower()
            # The right-most column "RawPrice" is used
            try:
                raw_price = float(row["RawPrice"])
            except ValueError:
                raw_price = 0.0
            ingredient_data[ingredient_name] = raw_price
    return ingredient_data

# Load the CSV data once at startup
ingredient_data = load_ingredients("Ingredients.csv")
ingredient_names = list(ingredient_data.keys())

def match_ingredient(query: str):
    """
    Use fuzzy matching to find the best match for a given ingredient.
    Returns a tuple of (matched_ingredient, raw_price) if the score is acceptable,
    otherwise (None, score).
    """
    best_match, score = process.extractOne(query.lower(), ingredient_names, scorer=fuzz.token_sort_ratio)
    if score < 80:
        return None, score
    return best_match, ingredient_data[best_match]

def calculate_dish_cost(ingredients: list) -> dict:
    """
    For a given list of ingredient names (as provided in a dish),
    fuzzy-match each one to our CSV data and sum up the raw prices.
    Returns a dictionary with the total cost and details for each ingredient.
    """
    total_cost = 0.0
    details = []
    for ing in ingredients:
        matched, result = match_ingredient(ing)
        if not matched:
            details.append({
                "input_ingredient": ing,
                "error": f"Match not found with acceptable score (score: {result})."
            })
            continue
        price = result
        total_cost += price
        details.append({
            "input_ingredient": ing,
            "matched_ingredient": matched,
            "price": price
        })
    return {"total_cost": round(total_cost, 2), "details": details}

@app.route("/")
def index():
    return "Dish Cost Calculator API is running."

@app.route("/calculate_dish_cost", methods=["POST"])
def calculate_dish_cost_endpoint():
    """
    Expects a JSON payload of the form:
      { "ingredients": ["dough", "tomatoes", "mozzarella", "basil"] }
    Returns the total cost and matching details for each ingredient.
    """
    data = request.get_json()
    ingredients = data.get("ingredients")
    if not ingredients:
        return jsonify({"error": "No ingredients provided."}), 400

    result = calculate_dish_cost(ingredients)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
