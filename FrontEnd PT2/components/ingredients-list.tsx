"use client"

import { useState } from "react"
import { Check, DollarSign, Download, ShoppingBag, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export function IngredientsList({ selectedMeal }: { selectedMeal: any }) {
  const [selectedStore, setSelectedStore] = useState("wholefoods")

  // This would come from an API in a real app
  const ingredients = [
    {
      id: 1,
      name: "Quinoa",
      amount: "1 cup",
      prices: {
        wholefoods: 4.99,
        traderjoes: 3.99,
        safeway: 4.49,
      },
      category: "Grains",
      inPantry: false,
    },
    {
      id: 2,
      name: "Bell Peppers",
      amount: "2",
      prices: {
        wholefoods: 3.99,
        traderjoes: 2.99,
        safeway: 3.49,
      },
      category: "Vegetables",
      inPantry: false,
    },
    {
      id: 3,
      name: "Zucchini",
      amount: "1",
      prices: {
        wholefoods: 1.99,
        traderjoes: 1.49,
        safeway: 1.79,
      },
      category: "Vegetables",
      inPantry: false,
    },
    {
      id: 4,
      name: "Cherry Tomatoes",
      amount: "1 pint",
      prices: {
        wholefoods: 3.99,
        traderjoes: 2.99,
        safeway: 3.49,
      },
      category: "Vegetables",
      inPantry: false,
    },
    {
      id: 5,
      name: "Feta Cheese",
      amount: "4 oz",
      prices: {
        wholefoods: 4.99,
        traderjoes: 3.99,
        safeway: 4.49,
      },
      category: "Dairy",
      inPantry: false,
    },
    {
      id: 6,
      name: "Olive Oil",
      amount: "2 tbsp",
      prices: {
        wholefoods: 0.5,
        traderjoes: 0.4,
        safeway: 0.45,
      },
      category: "Pantry",
      inPantry: true,
    },
    {
      id: 7,
      name: "Lemon",
      amount: "1",
      prices: {
        wholefoods: 0.99,
        traderjoes: 0.79,
        safeway: 0.89,
      },
      category: "Produce",
      inPantry: false,
    },
    {
      id: 8,
      name: "Fresh Herbs (Mint, Parsley)",
      amount: "1 bunch each",
      prices: {
        wholefoods: 4.99,
        traderjoes: 3.99,
        safeway: 4.49,
      },
      category: "Produce",
      inPantry: false,
    },
    {
      id: 9,
      name: "Salt & Pepper",
      amount: "to taste",
      prices: {
        wholefoods: 0.1,
        traderjoes: 0.1,
        safeway: 0.1,
      },
      category: "Pantry",
      inPantry: true,
    },
  ]

  const [checkedIngredients, setCheckedIngredients] = useState<number[]>(
    ingredients.filter((i) => i.inPantry).map((i) => i.id),
  )

  const toggleIngredient = (id: number) => {
    setCheckedIngredients((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  // Group ingredients by category
  const groupedIngredients = ingredients.reduce(
    (acc, ingredient) => {
      if (!acc[ingredient.category]) {
        acc[ingredient.category] = []
      }
      acc[ingredient.category].push(ingredient)
      return acc
    },
    {} as Record<string, typeof ingredients>,
  )

  const categories = Object.keys(groupedIngredients)

  // Calculate totals
  const totalPrice = ingredients
    .filter((i) => !checkedIngredients.includes(i.id))
    .reduce((sum, i) => sum + i.prices[selectedStore as keyof typeof i.prices], 0)

  const totalItems = ingredients.length - checkedIngredients.length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-medium">Ingredients for {selectedMeal?.name || "Your Meal"}</h3>
          <p className="text-gray-500 dark:text-gray-400">Select items you already have in your pantry</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Shopping</span> List
          </Button>
          <Button size="sm" className="flex items-center gap-1 bg-green-600 hover:bg-green-700">
            <ShoppingCart className="h-4 w-4" />
            Add All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Shopping List</h4>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <ShoppingBag className="h-4 w-4 mr-1" />
                {totalItems} items needed
              </div>
            </div>

            <Accordion type="multiple" defaultValue={categories} className="space-y-4">
              {categories.map((category) => (
                <AccordionItem key={category} value={category} className="border rounded-lg px-4">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <span className="font-medium">{category}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-3">
                    <div className="space-y-3">
                      {groupedIngredients[category].map((ingredient) => (
                        <div key={ingredient.id} className="flex items-center justify-between">
                          <div className="flex items-start gap-2">
                            <Checkbox
                              id={`ingredient-${ingredient.id}`}
                              checked={checkedIngredients.includes(ingredient.id)}
                              onCheckedChange={() => toggleIngredient(ingredient.id)}
                              className="mt-1"
                            />
                            <div className="grid gap-0.5">
                              <Label
                                htmlFor={`ingredient-${ingredient.id}`}
                                className={`cursor-pointer ${checkedIngredients.includes(ingredient.id) ? "line-through text-gray-400 dark:text-gray-500" : ""}`}
                              >
                                {ingredient.name}
                              </Label>
                              <span className="text-sm text-gray-500 dark:text-gray-400">{ingredient.amount}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {ingredient.inPantry && (
                              <Badge
                                variant="outline"
                                className="mr-2 bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                              >
                                In Pantry
                              </Badge>
                            )}
                            <span
                              className={`font-medium ${checkedIngredients.includes(ingredient.id) ? "text-gray-400 dark:text-gray-500" : ""}`}
                            >
                              ${ingredient.prices[selectedStore as keyof typeof ingredient.prices].toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Store Selection</h4>
              <div className="space-y-2">
                <div
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border-2 ${selectedStore === "wholefoods" ? "border-green-600 bg-green-50 dark:bg-green-900/30 dark:border-green-500" : "border-transparent"}`}
                  onClick={() => setSelectedStore("wholefoods")}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <span className="text-green-800 font-bold text-xs">WF</span>
                    </div>
                    <span className="font-medium">Whole Foods</span>
                  </div>
                  {selectedStore === "wholefoods" && <Check className="h-5 w-5 text-green-600" />}
                </div>

                <div
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border-2 ${selectedStore === "traderjoes" ? "border-green-600 bg-green-50 dark:bg-green-900/30 dark:border-green-500" : "border-transparent"}`}
                  onClick={() => setSelectedStore("traderjoes")}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
                      <span className="text-red-800 font-bold text-xs">TJ</span>
                    </div>
                    <span className="font-medium">Trader Joe's</span>
                  </div>
                  {selectedStore === "traderjoes" && <Check className="h-5 w-5 text-green-600" />}
                </div>

                <div
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border-2 ${selectedStore === "safeway" ? "border-green-600 bg-green-50 dark:bg-green-900/30 dark:border-green-500" : "border-transparent"}`}
                  onClick={() => setSelectedStore("safeway")}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                      <span className="text-blue-800 font-bold text-xs">SW</span>
                    </div>
                    <span className="font-medium">Safeway</span>
                  </div>
                  {selectedStore === "safeway" && <Check className="h-5 w-5 text-green-600" />}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Price Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Estimated Tax</span>
                  <span>${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${(totalPrice * 1.08).toFixed(2)}</span>
                </div>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {selectedStore === "traderjoes" ? "Best price!" : "Compare prices to save more"}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full bg-green-600 hover:bg-green-700">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add All to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

