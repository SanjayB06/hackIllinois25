"use client"

import { useState, useEffect } from "react"
import { Clock, Flame, Heart, Info, Leaf, ThumbsUp, Utensils } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"

export function MealRecommendation({
  preferences,
  accountDetails,
  updateFormData,
}: {
  preferences: any
  accountDetails: any
  updateFormData: (data: any) => void
}) {
  const [loading, setLoading] = useState(true)
  const [meal, setMeal] = useState<any>(null)

  // Simulate API call to get meal recommendation
  useEffect(() => {
    const timer = setTimeout(() => {
      // This would be replaced with an actual API call in a real app
      const recommendedMeal = {
        id: 1,
        name: "Mediterranean Quinoa Bowl",
        description:
          "A delicious and nutritious bowl featuring quinoa, roasted vegetables, feta cheese, and a lemon herb dressing.",
        image: "/placeholder.svg?height=300&width=400",
        prepTime: 25,
        calories: 450,
        protein: 18,
        carbs: 52,
        fat: 20,
        rating: 4.8,
        reviews: 124,
        tags: ["High Protein", "Vegetarian", "Mediterranean"],
        difficulty: "Easy",
      }

      setMeal(recommendedMeal)
      setLoading(false)
      updateFormData(recommendedMeal)
    }, 1500)

    return () => clearTimeout(timer)
  }, [updateFormData])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium text-green-800 dark:text-green-300">Finding the perfect meal for you...</p>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-center max-w-md">
          We're analyzing your preferences and account details to recommend the ideal meal
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="relative rounded-xl overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <Button variant="outline" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90">
            <Heart className="h-5 w-5 text-red-500" />
            <span className="sr-only">Save meal</span>
          </Button>
        </div>
        <Image
          src={meal.image || "/placeholder.svg"}
          alt={meal.name}
          width={800}
          height={400}
          className="w-full h-64 object-cover rounded-xl"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-2xl font-bold text-white">{meal.name}</h3>
          <div className="flex items-center mt-1">
            <div className="flex items-center">
              <ThumbsUp className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-white text-sm">{meal.rating}</span>
            </div>
            <span className="text-white/80 text-sm mx-2">•</span>
            <span className="text-white/80 text-sm">{meal.reviews} reviews</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-3 flex flex-col items-center justify-center text-center">
            <Clock className="h-5 w-5 text-green-600 mb-1" />
            <p className="text-sm font-medium">{meal.prepTime} min</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Prep Time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 flex flex-col items-center justify-center text-center">
            <Flame className="h-5 w-5 text-orange-500 mb-1" />
            <p className="text-sm font-medium">{meal.calories}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Calories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 flex flex-col items-center justify-center text-center">
            <Utensils className="h-5 w-5 text-blue-500 mb-1" />
            <p className="text-sm font-medium">{meal.difficulty}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Difficulty</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 flex flex-col items-center justify-center text-center">
            <Leaf className="h-5 w-5 text-green-600 mb-1" />
            <p className="text-sm font-medium">{meal.protein}g</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Protein</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h4 className="text-lg font-medium mb-2">Description</h4>
        <p className="text-gray-700 dark:text-gray-300">{meal.description}</p>
      </div>

      <div>
        <h4 className="text-lg font-medium mb-2">Nutrition Information</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 dark:bg-green-900/50 p-3 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Protein</p>
            <p className="text-lg font-medium">{meal.protein}g</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/50 p-3 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Carbs</p>
            <p className="text-lg font-medium">{meal.carbs}g</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/50 p-3 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Fat</p>
            <p className="text-lg font-medium">{meal.fat}g</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium mb-2">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {meal.tags.map((tag: string) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Based on your preferences and account details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          This meal was recommended based on your dietary preferences, allergies, and previous orders. It fits within
          your budget preference and cooking time constraints.
        </p>
      </div>
    </div>
  )
}

