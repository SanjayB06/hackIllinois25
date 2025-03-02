"use client"
import { MealSuggestion } from "@/components/meal-suggestion"

export default function MealSection() {
  return (
    <div className="min-h-screen bg-sage-50 artistic-culinary-pattern flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-sage-800 mb-8 font-serif">Your Meal Suggestions</h1>
      <MealSuggestion />
    </div>
  )
}

