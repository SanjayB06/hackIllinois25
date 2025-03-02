"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, ChefHat, Clipboard, ShoppingBag, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Questionnaire } from "@/components/questionnaire"
import { AccountDetails } from "@/components/account-details"
import { MealRecommendation } from "@/components/meal-recommendation"
import { IngredientsList } from "@/components/ingredients-list"

export function MealPlanner() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    preferences: {},
    accountDetails: {},
    selectedMeal: null,
  })

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 4))
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const steps = [
    { id: 1, name: "Questionnaire", icon: <Clipboard className="h-5 w-5" /> },
    { id: 2, name: "Account", icon: <User className="h-5 w-5" /> },
    { id: 3, name: "Meal", icon: <ChefHat className="h-5 w-5" /> },
    { id: 4, name: "Ingredients", icon: <ShoppingBag className="h-5 w-5" /> },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-300 mb-2">
          Personalized Meal Planner
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover delicious meals tailored to your preferences and budget
        </p>
      </div>

      {/* Progress Steps */}
      <div className="hidden md:flex justify-between items-center max-w-3xl mx-auto mb-8">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step >= s.id ? "bg-green-600 border-green-600 text-white" : "border-gray-300 text-gray-400"
              }`}
            >
              {step > s.id ? <Check className="h-5 w-5" /> : s.icon}
            </div>
            <div className={`ml-2 ${step >= s.id ? "text-green-800 dark:text-green-300" : "text-gray-400"}`}>
              {s.name}
            </div>
            {i < steps.length - 1 && (
              <div className={`w-16 md:w-24 h-1 mx-2 ${step > s.id ? "bg-green-600" : "bg-gray-300"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Mobile Progress Indicator */}
      <div className="md:hidden">
        <div className="flex justify-between px-2 mb-2">
          <span className="text-sm font-medium text-green-800 dark:text-green-300">
            Step {step} of {steps.length}
          </span>
          <span className="text-sm font-medium text-green-800 dark:text-green-300">{steps[step - 1].name}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(step / steps.length) * 100}%` }}></div>
        </div>
      </div>

      <Card className="border-green-200 dark:border-green-800 shadow-lg">
        <CardHeader className="border-b border-green-100 dark:border-green-800 bg-green-50 dark:bg-green-900 rounded-t-lg">
          <CardTitle className="flex items-center text-green-800 dark:text-green-300">
            {steps[step - 1].icon}
            <span className="ml-2">{steps[step - 1].name}</span>
          </CardTitle>
          <CardDescription>
            {step === 1 && "Tell us about your dietary preferences and restrictions"}
            {step === 2 && "Review your account details"}
            {step === 3 && "Check out your personalized meal recommendation"}
            {step === 4 && "Here are the ingredients you'll need"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {step === 1 && <Questionnaire updateFormData={(data) => updateFormData("preferences", data)} />}
          {step === 2 && <AccountDetails updateFormData={(data) => updateFormData("accountDetails", data)} />}
          {step === 3 && (
            <MealRecommendation
              preferences={formData.preferences}
              accountDetails={formData.accountDetails}
              updateFormData={(meal) => updateFormData("selectedMeal", meal)}
            />
          )}
          {step === 4 && <IngredientsList selectedMeal={formData.selectedMeal} />}
        </CardContent>
        <CardFooter className="border-t border-green-100 dark:border-green-800 bg-green-50 dark:bg-green-900 rounded-b-lg flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={step === 1}
            className="border-green-600 text-green-700 hover:bg-green-100 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={nextStep}
            disabled={step === 4}
            className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600"
          >
            {step < 4 ? (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Finish
                <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

