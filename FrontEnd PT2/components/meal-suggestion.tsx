"use client"

import type React from "react"
import { useState } from "react"
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
}

const dummyMeals: Meal[] = [
  {
    id: 1,
    name: "Quinoa Garden Salad",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "A refreshing and nutritious salad featuring quinoa, mixed greens, cherry tomatoes, cucumber, and a zesty lemon vinaigrette.",
    calories: 380,
    protein: 12,
    carbs: 45,
  },
  {
    id: 2,
    name: "Grilled Salmon with Asparagus",
    image: "/placeholder.svg?height=300&width=400",
    description: "Perfectly grilled salmon fillet served with tender-crisp asparagus and a lemon butter sauce.",
    calories: 450,
    protein: 28,
    carbs: 12,
  },
  {
    id: 3,
    name: "Vegetarian Chickpea Curry",
    image: "/placeholder.svg?height=300&width=400",
    description: "A hearty and flavorful chickpea curry with a blend of aromatic spices, served over brown rice.",
    calories: 420,
    protein: 15,
    carbs: 60,
  },
]

export const MealSuggestion: React.FC = () => {
  const [currentMeal, setCurrentMeal] = useState<Meal>(dummyMeals[0])
  const [direction, setDirection] = useState<"left" | "right" | null>(null)

  const handleLike = () => {
    setDirection("right")
    setTimeout(() => {
      const nextMeal = dummyMeals[currentMeal.id % dummyMeals.length]
      setCurrentMeal(nextMeal)
      setDirection(null)
    }, 300)
  }

  const handleDislike = () => {
    setDirection("left")
    setTimeout(() => {
      const nextMeal = dummyMeals[currentMeal.id % dummyMeals.length]
      setCurrentMeal(nextMeal)
      setDirection(null)
    }, 300)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence>
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
              </div>

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
      </AnimatePresence>
    </div>
  )
}

