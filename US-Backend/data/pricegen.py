import csv
import random

# Meat (extended)
meat = [
    "Chicken Breast", "Chicken Thighs", "Ground Chicken", "Beef Steak", "Ground Beef", "Beef Roast",
    "Pork Chop", "Ground Pork", "Pork Roast", "Lamb Chops", "Lamb Roast", "Turkey Breast", "Turkey Legs",
    "Ground Turkey", "Bacon", "Sausage", "Ham", "Prosciutto", "Veal Cutlet", "Duck Breast", "Quail",
    "Rabbit", "Corned Beef", "Brisket", "Tri-Tip Steak", "Meatballs", "Liver", "Pork Ribs", "Beef Ribs",
    "Chicken Wings", "Goat Meat", "Bison", "Ostrich", "Kangaroo"
]

# Seafood (extended)
seafood = [
    "Salmon", "Tuna", "Shrimp", "Cod", "Trout", "Mackerel", "Halibut", "Sardines", "Crab", "Lobster",
    "Scallops", "Clams", "Mussels", "Oysters", "Tilapia", "Squid", "Octopus", "Catfish", "Bass", "Whitefish",
    "Swordfish", "Haddock", "Eel", "Monkfish", "Sea Bass"
]

# Grains & Pasta (extended)
grains = [
    "Rice", "White Rice", "Brown Rice", "Basmati Rice", "Jasmine Rice", "Quinoa", "Barley", "Oats",
    "Bulgur", "Couscous", "Pasta", "Spaghetti", "Penne", "Macaroni", "Fusilli", "Lasagna Noodles", 
    "Egg Noodles", "Rice Noodles", "Orzo", "Ramen", "Millet", "Sorghum", "Freekeh", "Amaranth"
]

# Legumes (extended)
legumes = [
    "Black Beans", "Kidney Beans", "Chickpeas", "Lentils", "Pinto Beans", "Navy Beans", "Lima Beans",
    "Green Peas", "Soybeans", "Mung Beans", "Adzuki Beans", "Cannellini Beans", "Split Peas", "Fava Beans",
    "Black-eyed Peas", "Pigeon Peas", "Bambara Beans"
]

# Nuts & Seeds (extended)
nuts_seeds = [
    "Almonds", "Walnuts", "Cashews", "Pecans", "Pistachios", "Hazelnuts", "Peanuts", "Pumpkin Seeds",
    "Sunflower Seeds", "Chia Seeds", "Flax Seeds", "Sesame Seeds", "Brazil Nuts", "Macadamia Nuts",
    "Pine Nuts", "Chestnuts", "Hemp Seeds", "Watermelon Seeds"
]

# Spices & Herbs (expanded further)
spices = [
    "Salt", "Pepper", "Paprika", "Cumin", "Chili Powder", "Garlic Powder", "Onion Powder", "Cinnamon",
    "Nutmeg", "Ginger", "Turmeric", "Oregano", "Basil", "Thyme", "Rosemary", "Parsley", "Dill",
    "Sage", "Bay Leaves", "Coriander", "Allspice", "Cloves", "Cardamom", "Mustard Seeds", "Fenugreek",
    "Saffron", "Marjoram", "Tarragon", "Mint", "Lemongrass", "Star Anise", "Fennel Seeds", "Celery Seed",
    "Sumac", "Lavender", "Curry Powder", "Smoked Paprika", "White Pepper", "Chinese Five Spice", "Herbes de Provence"
]

# Baked Goods & Cereals (extended)
baked_goods = [
    "Bread", "Whole Wheat Bread", "Baguette", "Croissant", "Bagel", "Muffin", "Donut", "Cereal",
    "Granola", "Oatmeal", "Pancake Mix", "Waffles", "Tortilla", "Pita Bread", "English Muffin",
    "Sourdough Bread", "Ciabatta", "Focaccia", "Rye Bread", "Scone", "Brioche"
]

# Beverages (extended)
beverages = [
    "Coffee", "Tea", "Orange Juice", "Apple Juice", "Grape Juice", "Soda", "Sparkling Water", 
    "Lemonade", "Energy Drink", "Beer", "Wine", "Champagne", "Whiskey", "Vodka", "Iced Tea", "Milkshake",
    "Smoothie", "Cider", "Hot Chocolate"
]

# Condiments (extended)
condiments = [
    "Ketchup", "Mustard", "Mayonnaise", "Barbecue Sauce", "Soy Sauce", "Vinegar", "Hot Sauce", 
    "Salsa", "Relish", "Pesto", "Tahini", "Sriracha", "Worcestershire Sauce", "Teriyaki Sauce",
    "Ranch Dressing", "Blue Cheese Dressing", "Buffalo Sauce", "Fish Sauce", "Chutney", "Honey Mustard", "Aioli"
]

# Other (extended)
other = [
    "Chocolate", "Cocoa Powder", "Vanilla Extract", "Maple Syrup", "Molasses", "Peanut Butter", 
    "Jelly", "Jam", "Almond Butter", "Marshmallows", "Popcorn", "Pretzels", "Crackers", "Rice Cakes",
    "Brown Sugar", "Cornstarch", "Chocolate Chips", "Caramel", "Whipped Cream", "Nutella", "Marzipan", "Nougat"
]

# Miscellaneous (extended)
misc = [
    "Chicken Broth", "Vegetable Broth", "Beef Stock", "Chicken Stock", "Bouillon", "Miso Paste", 
    "Tofu", "Tempeh", "Seitan", "Edamame", "Textured Vegetable Protein (TVP)", "Pea Protein"
]

# New Category: Vegetables (extended)
vegetables = [
    "Carrot", "Broccoli", "Spinach", "Tomato", "Bell Pepper", "Cucumber", "Onion", "Garlic", 
    "Zucchini", "Eggplant", "Cauliflower", "Green Beans", "Peas", "Corn", "Mushrooms", 
    "Potato", "Sweet Potato", "Lettuce", "Kale", "Cabbage", "Asparagus", "Brussels Sprouts", 
    "Radish", "Beet", "Celery", "Leek", "Artichoke", "Butternut Squash", "Acorn Squash", "Turnip"
]

# New Category: Fruits (extended)
fruits = [
    "Apple", "Banana", "Orange", "Strawberry", "Blueberry", "Raspberry", "Grapes", "Mango", 
    "Pineapple", "Peach", "Pear", "Plum", "Cherry", "Watermelon", "Cantaloupe", "Kiwi", 
    "Lemon", "Lime", "Papaya", "Avocado", "Blackberry", "Cranberry", "Pomegranate", "Guava",
    "Passion Fruit", "Dragon Fruit", "Lychee", "Fig"
]

# New Category: Dairy (extended)
dairy = [
    "Milk", "Cheddar Cheese", "Mozzarella", "Yogurt", "Butter", "Cream", "Parmesan", "Swiss Cheese", 
    "Blue Cheese", "Feta", "Cottage Cheese", "Sour Cream", "Ricotta", "Gouda", "Brie", 
    "Provolone", "Cream Cheese", "Eggs", "Heavy Cream", "Buttermilk", "Goat Cheese", "Skim Milk"
]

# New Category: Oils & Fats (extended)
oils_fats = [
    "Olive Oil", "Canola Oil", "Vegetable Oil", "Coconut Oil", "Sesame Oil", "Avocado Oil", 
    "Peanut Oil", "Sunflower Oil", "Ghee", "Lard", "Palm Oil", "Flaxseed Oil", "Safflower Oil", 
    "Rice Bran Oil", "Walnut Oil", "Hemp Oil", "Truffle Oil"
]

# New Category: Baking & Sweets (extended)
baking_sweets = [
    "Flour", "Sugar", "Baking Powder", "Baking Soda", "Yeast", "Honey", "Corn Syrup", 
    "Icing Sugar", "Brown Sugar", "Vanilla Bean", "Molasses", "Maple Syrup", "Caramel", "Sprinkles", 
    "Cocoa Butter", "Cocoa Nibs", "Glucose Syrup", "Agave Nectar"
]

# New Category: Fermented Foods (10)
fermented = [
    "Sauerkraut", "Kimchi", "Pickled Cucumbers", "Olives", "Kombucha", "Natto", "Fermented Tofu", 
    "Fermented Vegetables", "Sourdough Starter", "Pickled Beets"
]

# New Category: Non-Dairy Alternatives (10)
non_dairy = [
    "Almond Milk", "Soy Milk", "Coconut Milk", "Oat Milk", "Rice Milk", "Cashew Milk", "Hemp Milk",
    "Pea Milk", "Flax Milk", "Macadamia Milk"
]

# New Category: Sea Vegetables (5)
sea_vegetables = [
    "Nori", "Kombu", "Wakame", "Dulse", "Hijiki"
]

# New Category: Desserts (10)
desserts = [
    "Ice Cream", "Cake", "Pie", "Cookie", "Brownie", "Pudding", "Custard", "Fudge", "Mousse", "Macarons"
]

# Combine all ingredients with their category label from all categories
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
    [(ing, "Miscellaneous") for ing in misc] +
    [(ing, "Oils & Fats") for ing in oils_fats] +
    [(ing, "Baking & Sweets") for ing in baking_sweets] +
    [(ing, "Fermented Foods") for ing in fermented] +
    [(ing, "Non-Dairy Alternatives") for ing in non_dairy] +
    [(ing, "Sea Vegetables") for ing in sea_vegetables] +
    [(ing, "Desserts") for ing in desserts]
)

# Define realistic pricing ranges (PricePerServing, RawPrice) by category
pricing_ranges = {
    "Fruits":                ((0.50, 2.00), (1.50, 8.00)),
    "Vegetables":            ((0.30, 1.50), (1.00, 6.00)),
    "Dairy":                 ((0.50, 1.50), (2.00, 8.00)),
    "Meat":                  ((2.00, 5.00), (8.00, 20.00)),
    "Seafood":               ((2.00, 4.50), (10.00, 25.00)),
    "Grains & Pasta":        ((0.10, 0.60), (1.00, 5.00)),
    "Legumes":               ((0.10, 0.60), (1.00, 4.00)),
    "Nuts & Seeds":          ((0.20, 1.00), (2.00, 10.00)),
    "Spices & Herbs":        ((0.05, 0.25), (0.50, 3.00)),
    "Baked Goods & Cereals": ((0.20, 1.50), (1.50, 7.00)),
    "Beverages":             ((0.50, 2.50), (1.50, 10.00)),
    "Condiments":            ((0.10, 0.75), (1.00, 6.00)),
    "Other":                 ((0.25, 2.00), (1.50, 8.00)),
    "Miscellaneous":         ((0.50, 3.00), (2.00, 12.00)),
    "Oils & Fats":           ((0.30, 1.50), (2.00, 10.00)),
    "Baking & Sweets":       ((0.25, 2.00), (2.00, 8.00)),
    "Fermented Foods":       ((0.30, 1.50), (2.00, 10.00)),
    "Non-Dairy Alternatives":((0.50, 2.00), (2.00, 10.00)),
    "Sea Vegetables":        ((0.50, 3.00), (2.00, 12.00)),
    "Desserts":              ((0.75, 3.00), (2.50, 12.00))
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
