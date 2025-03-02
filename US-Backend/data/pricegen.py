import csv
import random

# Define lists of ingredients by category

# Fruits (30)
fruits = [
    "Apple", "Banana", "Orange", "Grapes", "Strawberry", "Blueberry", "Raspberry", "Blackberry",
    "Pineapple", "Mango", "Papaya", "Kiwi", "Peach", "Pear", "Watermelon", "Cantaloupe", 
    "Honeydew Melon", "Cherry", "Pomegranate", "Plum", "Apricot", "Grapefruit", "Lemon", 
    "Lime", "Coconut", "Avocado", "Passion Fruit", "Dragon Fruit", "Guava", "Lychee"
]

# Vegetables (40)
vegetables = [
    "Carrot", "Broccoli", "Cauliflower", "Spinach", "Kale", "Lettuce", "Cabbage", "Tomato", 
    "Potato", "Onion", "Garlic", "Bell Pepper", "Cucumber", "Zucchini", "Eggplant", "Celery", 
    "Green Beans", "Peas", "Corn", "Radish", "Beetroot", "Asparagus", "Artichoke", "Brussels Sprouts", 
    "Mushrooms", "Squash", "Sweet Potato", "Turnip", "Pumpkin", "Leek", "Okra", "Arugula", 
    "Endive", "Fennel", "Bok Choy", "Swiss Chard", "Collard Greens", "Watercress", "Parsnip"
]

# Dairy (30)
dairy = [
    "Milk", "Butter", "Cheddar Cheese", "Mozzarella Cheese", "Parmesan Cheese", "Yogurt", "Cream",
    "Cottage Cheese", "Sour Cream", "Ice Cream", "Heavy Cream", "Buttermilk", "Feta Cheese", "Gouda Cheese",
    "Swiss Cheese", "Brie Cheese", "Blue Cheese", "Ricotta Cheese", "Cream Cheese", "Evaporated Milk", 
    "Condensed Milk", "Almond Milk", "Soy Milk", "Coconut Milk", "Rice Milk", "Kefir", "Provolone Cheese",
    "Pepper Jack Cheese", "Colby Cheese", "Havarti Cheese"
]

# Meat (30)
meat = [
    "Chicken Breast", "Chicken Thighs", "Ground Chicken", "Beef Steak", "Ground Beef", "Beef Roast",
    "Pork Chop", "Ground Pork", "Pork Roast", "Lamb Chops", "Lamb Roast", "Turkey Breast", "Turkey Legs",
    "Ground Turkey", "Bacon", "Sausage", "Ham", "Prosciutto", "Veal Cutlet", "Duck Breast", "Quail",
    "Rabbit", "Corned Beef", "Brisket", "Tri-Tip Steak", "Meatballs", "Liver", "Pork Ribs", "Beef Ribs",
    "Chicken Wings"
]

# Seafood (20)
seafood = [
    "Salmon", "Tuna", "Shrimp", "Cod", "Trout", "Mackerel", "Halibut", "Sardines", "Crab", "Lobster",
    "Scallops", "Clams", "Mussels", "Oysters", "Tilapia", "Squid", "Octopus", "Catfish", "Bass", "Whitefish"
]

# Grains & Pasta (20)
grains = [
    "Rice", "White Rice", "Brown Rice", "Basmati Rice", "Jasmine Rice", "Quinoa", "Barley", "Oats",
    "Bulgur", "Couscous", "Pasta", "Spaghetti", "Penne", "Macaroni", "Fusilli", "Lasagna Noodles", 
    "Egg Noodles", "Rice Noodles", "Orzo", "Ramen"
]

# Legumes (15)
legumes = [
    "Black Beans", "Kidney Beans", "Chickpeas", "Lentils", "Pinto Beans", "Navy Beans", "Lima Beans",
    "Green Peas", "Soybeans", "Mung Beans", "Adzuki Beans", "Cannellini Beans", "Split Peas", "Fava Beans",
    "Black-eyed Peas"
]

# Nuts & Seeds (15)
nuts_seeds = [
    "Almonds", "Walnuts", "Cashews", "Pecans", "Pistachios", "Hazelnuts", "Peanuts", "Pumpkin Seeds",
    "Sunflower Seeds", "Chia Seeds", "Flax Seeds", "Sesame Seeds", "Brazil Nuts", "Macadamia Nuts",
    "Pine Nuts"
]

# Spices & Herbs (30)
spices = [
    "Salt", "Pepper", "Paprika", "Cumin", "Chili Powder", "Garlic Powder", "Onion Powder", "Cinnamon",
    "Nutmeg", "Ginger", "Turmeric", "Oregano", "Basil", "Thyme", "Rosemary", "Parsley", "Dill",
    "Sage", "Bay Leaves", "Coriander", "Allspice", "Cloves", "Cardamom", "Mustard Seeds", "Fenugreek",
    "Saffron", "Marjoram", "Tarragon", "Mint", "Lemongrass"
]

# Baked Goods & Cereals (16)
baked_goods = [
    "Bread", "Whole Wheat Bread", "Baguette", "Croissant", "Bagel", "Muffin", "Donut", "Cereal",
    "Granola", "Oatmeal", "Pancake Mix", "Waffles", "Tortilla", "Pita Bread", "English Muffin",
    "Sourdough Bread"
]

# Beverages (10)
beverages = [
    "Coffee", "Tea", "Orange Juice", "Apple Juice", "Grape Juice", "Soda", "Sparkling Water", 
    "Lemonade", "Energy Drink", "Beer"
]

# Condiments (14)
condiments = [
    "Ketchup", "Mustard", "Mayonnaise", "Barbecue Sauce", "Soy Sauce", "Vinegar", "Hot Sauce", 
    "Salsa", "Relish", "Pesto", "Tahini", "Sriracha", "Worcestershire Sauce", "Teriyaki Sauce"
]

# Other (20)
other = [
    "Chocolate", "Cocoa Powder", "Vanilla Extract", "Maple Syrup", "Molasses", "Peanut Butter", 
    "Jelly", "Jam", "Almond Butter", "Marshmallows", "Popcorn", "Pretzels", "Crackers", "Rice Cakes",
    "Brown Sugar", "Cornstarch", "Chocolate Chips", "Caramel", "Whipped Cream", "Nutella"
]

# Miscellaneous (10)
misc = [
    "Chicken Broth", "Vegetable Broth", "Beef Stock", "Chicken Stock", "Bouillon", "Miso Paste", 
    "Tofu", "Tempeh", "Seitan", "Edamame"
]

# Combine all ingredients with their category label
all_ingredients = (
    [(ing, "Fruits") for ing in fruits] +
    [(ing, "Vegetables") for ing in vegetables] +
    [(ing, "Dairy") for ing in dairy] +
    [(ing, "Meat") for ing in meat] +
    [(ing, "Seafood") for ing in seafood] +
    [(ing, "Grains & Pasta") for ing in grains] +
    [(ing, "Legumes") for ing in legumes] +
    [(ing, "Nuts & Seeds") for ing in nuts_seeds] +
    [(ing, "Spices & Herbs") for ing in spices] +
    [(ing, "Baked Goods & Cereals") for ing in baked_goods] +
    [(ing, "Beverages") for ing in beverages] +
    [(ing, "Condiments") for ing in condiments] +
    [(ing, "Other") for ing in other] +
    [(ing, "Miscellaneous") for ing in misc]
)

# Ensure we have exactly 300 ingredients
assert len(all_ingredients) == 299, f"Total ingredients count is {len(all_ingredients)} instead of 300"

# Define realistic pricing ranges (PricePerServing, RawPrice) by category
pricing_ranges = {
    "Fruits":           ((0.50, 2.00), (1.50, 8.00)),
    "Vegetables":       ((0.30, 1.50), (1.00, 6.00)),
    "Dairy":            ((0.50, 1.50), (2.00, 8.00)),
    "Meat":             ((2.00, 5.00), (8.00, 20.00)),
    "Seafood":          ((2.00, 4.50), (10.00, 25.00)),
    "Grains & Pasta":   ((0.10, 0.60), (1.00, 5.00)),
    "Legumes":          ((0.10, 0.60), (1.00, 4.00)),
    "Nuts & Seeds":     ((0.20, 1.00), (2.00, 10.00)),
    "Spices & Herbs":   ((0.05, 0.25), (0.50, 3.00)),
    "Baked Goods & Cereals": ((0.20, 1.50), (1.50, 7.00)),
    "Beverages":        ((0.50, 2.50), (1.50, 10.00)),
    "Condiments":       ((0.10, 0.75), (1.00, 6.00)),
    "Other":            ((0.25, 2.00), (1.50, 8.00)),
    "Miscellaneous":    ((0.50, 3.00), (2.00, 12.00))
}

# Create and write the CSV file.
with open("ingredients.csv", "w", newline="") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["Ingredient", "PricePerServing", "RawPrice"])
    
    for ing, category in all_ingredients:
        # Get the pricing ranges for this category.
        p_serving_range, raw_range = pricing_ranges[category]
        price_per_serving = round(random.uniform(*p_serving_range), 2)
        raw_price = round(random.uniform(*raw_range), 2)
        writer.writerow([ing, price_per_serving, raw_price])

print("CSV file 'ingredients.csv' created with 300 well-known ingredients and realistic pricing data.")
