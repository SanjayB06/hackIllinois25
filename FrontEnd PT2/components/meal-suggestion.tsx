"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils, Leaf, Flame, ThumbsUp, ThumbsDown, ShoppingCart, Droplet } from "lucide-react"

interface Meal {
  id: number
  name: string
  image?: string
  description: string
  calories: number
  protein: number
  carbs: number
  fat: number
  ingredients?: string[]
}

// Helper: Generate random nutrition values within new ranges and calculate calories.
const generateRandomNutrition = () => {
  const protein = Math.floor(Math.random() * (30 - 10 + 1)) + 10   // 10g - 30g
  const carbs = Math.floor(Math.random() * (80 - 30 + 1)) + 30       // 30g - 80g
  const fat = Math.floor(Math.random() * (20 - 5 + 1)) + 5           // 5g - 20g
  const calories = 9 * fat + 4 * carbs + 4 * protein
  return { protein, carbs, fat, calories }
}

const dummyMeal: Meal = {
  id: 1,
  name: "Margherita Pizza",
  description: "Classic pizza with fresh tomatoes, mozzarella, basil, and a crispy crust.",
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  ingredients: ["dough", "tomatoes", "mozzarella", "basil"],
}

export const MealSuggestion: React.FC = () => {
  const [currentMeal, setCurrentMeal] = useState<Meal>(dummyMeal)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const [showIngredients, setShowIngredients] = useState(false)
  const [totalCost, setTotalCost] = useState<number | null>(null)

  const storedUsername = typeof window !== "undefined" ? localStorage.getItem("username") : null

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
        const dish: Meal = {
          id: Date.now(),
          name: baseDish.name || dummyMeal.name,
          description: baseDish.description || dummyMeal.description,
          calories: 0,
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

  // Update nutrition on client mount or when currentMeal lacks nutrition values.
  useEffect(() => {
    if (currentMeal.calories === 0) {
      const nutrition = generateRandomNutrition()
      setCurrentMeal((prevMeal) => ({ ...prevMeal, ...nutrition }))
    }
  }, [currentMeal])

  const calculateDishCost = async () => {
    if (!currentMeal.ingredients) return

    try {
      const response = await fetch('http://localhost:5000/calculate_dish_cost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: currentMeal.ingredients })
      })
      const data = await response.json()
      setTotalCost(data.total_cost)
    } catch (error) {
      console.error('Error calculating dish cost:', error)
    }
  }

  useEffect(() => {
    if (showIngredients && currentMeal.ingredients) {
      calculateDishCost()
    }
  }, [showIngredients])

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
  }

  const handleDislike = async () => {
    if (!currentMeal) return
    await sendFeedback(currentMeal.name, "dislike")
    setDirection("left")
    setTimeout(() => {
      fetchRecommendedDish()
      setDirection(null)
      setShowIngredients(false)
      setTotalCost(null)
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
                {/* Image container removed */}
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
                    <Droplet className="h-6 w-6 text-sage-600 mb-2" />
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
                      {totalCost !== null && (
                        <p className="mt-2 text-sage-800 font-semibold">Total Cost: ${totalCost.toFixed(2)}</p>
                      )}
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
