"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils, ShoppingCart, Leaf, Flame, ThumbsUp, ThumbsDown } from "lucide-react"

interface Meal {
  id: number
  name: string
  image: string
  description: string
  calories: number
  protein: number
  carbs: number
  fat: number
  ingredients?: string[]
}

// Helper: Generate random nutrition values
const generateRandomNutrition = () => {
  return {
    calories: Math.floor(Math.random() * (800 - 300 + 1)) + 300,  // 300 - 800
    protein: Math.floor(Math.random() * (40 - 10 + 1)) + 10,       // 10g - 40g
    carbs: Math.floor(Math.random() * (100 - 30 + 1)) + 30,        // 30g - 100g
    fat: Math.floor(Math.random() * (30 - 5 + 1)) + 5,             // 5g - 30g
  }
}

// Fallback dummy meal without nutrition values (they will be set on the client)
const dummyMeal: Meal = {
  id: 1,
  name: "Margherita Pizza",
  image: "/placeholder.svg?height=300&width=400",
  description: "Classic pizza with fresh tomatoes, mozzarella, basil, and a crispy crust.",
  calories: 0, // default value
  protein: 0,
  carbs: 0,
  fat: 0,
  ingredients: ["dough", "tomatoes", "mozzarella", "basil"],
}

export const MealSuggestion: React.FC = () => {
  const [currentMeal, setCurrentMeal] = useState<Meal>(dummyMeal)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const [showIngredients, setShowIngredients] = useState(false)

  // Retrieve username from localStorage (set on login)
  const storedUsername = typeof window !== "undefined" ? localStorage.getItem("username") : null

  // Fetch recommended dishes from the backend and pick the first one
  const fetchRecommendedDish = async () => {
    if (!storedUsername) return

    try {
      const response = await fetch("http://localhost:5000/recommend_dish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: storedUsername, query: "Suggest a new dish" })
      })
      const data = await response.json()
      if (data.recommendations && data.recommendations.length > 0) {
        const baseDish = data.recommendations[0]
        // Set the dish without nutrition info first
        const dish: Meal = {
          id: Date.now(),
          name: baseDish.name || dummyMeal.name,
          image: baseDish.image || dummyMeal.image,
          description: baseDish.description || dummyMeal.description,
          calories: 0, // to be updated on client
          protein: 0,
          carbs: 0,
          fat: 0,
          ingredients: baseDish.ingredients || dummyMeal.ingredients,
        }
        setCurrentMeal(dish)
      }
    } catch (error) {
      console.error("Error fetching recommended dish:", error)
    }
  }

  // Update nutrition values on client mount (or when currentMeal changes with 0 nutrition)
  useEffect(() => {
    // Only update if nutrition hasn't been set yet
    if (currentMeal.calories === 0) {
      const nutrition = generateRandomNutrition()
      setCurrentMeal((prevMeal) => ({ ...prevMeal, ...nutrition }))
    }
  }, [currentMeal])

  // Send feedback to the backend (like/dislike) for the current dish
  const sendFeedback = async (dishName: string, feedbackType: "like" | "dislike") => {
    if (!storedUsername) return

    try {
      await fetch("http://localhost:5000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: storedUsername, dish_name: dishName, feedback: feedbackType })
      })
    } catch (error) {
      console.error("Error sending feedback:", error)
    }
  }

  useEffect(() => {
    if (storedUsername) {
      fetchRecommendedDish()
    }
  }, [storedUsername])

  const handleLike = async () => {
    if (!currentMeal) return
    await sendFeedback(currentMeal.name, "like")
    setShowIngredients(true)
    // Do not refresh the card on like
  }

  const handleDislike = async () => {
    if (!currentMeal) return
    await sendFeedback(currentMeal.name, "dislike")
    setDirection("left")
    setTimeout(() => {
      fetchRecommendedDish()
      setDirection(null)
      setShowIngredients(false)
    }, 300)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence>
        {currentMeal && (
          <motion.div
            key={currentMeal.id}
            initial={{ opacity: 0, x: direction === "left" ? -300 : direction === "right" ? 300 : 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === "left" ? 300 : -300 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-sage-800 font-serif">
                  {currentMeal.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={currentMeal.image || "/placeholder.svg"}
                    alt={currentMeal.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <p className="text-sage-700 font-sans">{currentMeal.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-sage-100 rounded-lg p-3 text-center flex flex-col items-center">
                    <Flame className="h-6 w-6 text-sage-600 mb-2" />
                    <p className="text-lg font-bold text-sage-800 font-display">{currentMeal.calories}</p>
                    <p className="text-sm text-sage-600 font-sans">Calories</p>
                  </div>
                  <div className="bg-sage-100 rounded-lg p-3 text-center flex flex-col items-center">
                    <Leaf className="h-6 w-6 text-sage-600 mb-2" />
                    <p className="text-lg font-bold text-sage-800 font-display">{currentMeal.protein}g</p>
                    <p className="text-sm text-sage-600 font-sans">Protein</p>
                  </div>
                  <div className="bg-sage-100 rounded-lg p-3 text-center flex flex-col items-center">
                    <Utensils className="h-6 w-6 text-sage-600 mb-2" />
                    <p className="text-lg font-bold text-sage-800 font-display">{currentMeal.carbs}g</p>
                    <p className="text-sm text-sage-600 font-sans">Carbs</p>
                  </div>
                  <div className="bg-sage-100 rounded-lg p-3 text-center flex flex-col items-center">
                    <p className="text-lg font-bold text-sage-800 font-display">{currentMeal.fat}g</p>
                    <p className="text-sm text-sage-600 font-sans">Fat</p>
                  </div>
                </div>
                
                <AnimatePresence>
                  {showIngredients && currentMeal.ingredients && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-4 bg-sage-50 rounded-lg"
                    >
                      <h3 className="text-lg font-semibold text-sage-800 mb-2">Ingredients:</h3>
                      <ul className="list-disc list-inside text-sage-700">
                        {currentMeal.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="flex justify-between">
                  <Button onClick={handleDislike} className="bg-red-500 hover:bg-red-600 text-white font-display">
                    <ThumbsDown className="mr-2 h-4 w-4" /> Dislike
                  </Button>
                  <Button onClick={handleLike} className="bg-green-500 hover:bg-green-600 text-white font-display">
                    <ThumbsUp className="mr-2 h-4 w-4" /> Like
                  </Button>
                </div>
                <div className="flex justify-between">
                  <Button className="bg-sage-600 hover:bg-sage-700 text-white font-display">
                    <Utensils className="mr-2 h-4 w-4" /> View Recipe
                  </Button>
                  <Button className="bg-sage-600 hover:bg-sage-700 text-white font-display">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Get Ingredients
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
