import openai
import json

# Set your OpenAI API key
openai.api_key = "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"

def generate_meal_details(meal_plan: str, allergies: str) -> str:
    """
    Generate meal details using the OpenAI API.
    The response should be a valid JSON containing:
        - ingredients: a list of ingredients (avoiding any allergens)
        - cuisine: a string describing the cuisine type
        - flavor_profile: a string describing the flavor profile
    """
    prompt = (
        f"Generate a JSON output for the following meal plan and allergies.\n\n"
        f"Meal plan: \"{meal_plan}\"\n"
        f"Allergies: \"{allergies}\"\n\n"
        "Output requirements:\n"
        "1. 'ingredients': a list of ingredients needed for this meal (avoid allergens).\n"
        "2. 'cuisine': a string describing the cuisine type.\n"
        "3. 'flavor_profile': a string describing the flavor profile.\n\n"
        "Ensure the output is valid JSON."
    )

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # or use "gpt-4" if available in your plan
        messages=[
            {"role": "system", "content": "You are a chef assistant that generates meal plans in JSON format."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content.strip()

def main():
    # Ask for user input
    meal_plan = input("Enter a meal plan: ")
    allergies = input("Enter allergies (comma separated): ")

    # Get generated JSON output from OpenAI
    generated_output = generate_meal_details(meal_plan, allergies)
    print("\nGenerated Output:\n", generated_output)
    
    # Parse the JSON output
    try:
        data = json.loads(generated_output)
    except json.JSONDecodeError as e:
        print("Error parsing JSON from the API response:", e)
        return

    # Write the data to a JSON file
    with open("meal_plan.json", "w") as outfile:
        json.dump(data, outfile, indent=4)
    
    print("\nMeal plan JSON generated and saved as 'meal_plan.json'.")

if __name__ == "__main__":
    main()
