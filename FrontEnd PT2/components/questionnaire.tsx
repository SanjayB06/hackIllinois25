"use client"

import { useState } from "react"
import { Beef, Fish, Leaf, Wheat, Milk, Egg, Nut, AlertTriangle } from "lucide-react"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export function Questionnaire({ updateFormData }: { updateFormData: (data: any) => void }) {
  const [preferences, setPreferences] = useState({
    dietType: "omnivore",
    allergies: {
      gluten: false,
      dairy: false,
      nuts: false,
      eggs: false,
    },
    mealSize: "medium",
  })

  const handleChange = (field: string, value: any) => {
    const newPreferences = {
      ...preferences,
      [field]: value,
    }
    setPreferences(newPreferences)
    updateFormData(newPreferences)
  }

  const handleAllergyChange = (allergy: string, checked: boolean) => {
    const newPreferences = {
      ...preferences,
      allergies: {
        ...preferences.allergies,
        [allergy]: checked,
      },
    }
    setPreferences(newPreferences)
    updateFormData(newPreferences)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Dietary Preference</h3>
        <RadioGroup
          value={preferences.dietType}
          onValueChange={(value) => handleChange("dietType", value)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-green-50 dark:hover:bg-green-900 cursor-pointer [&:has(:checked)]:bg-green-100 dark:[&:has(:checked)]:bg-green-800 [&:has(:checked)]:border-green-600">
            <RadioGroupItem value="omnivore" id="omnivore" />
            <Label htmlFor="omnivore" className="flex items-center cursor-pointer">
              <Beef className="mr-2 h-5 w-5 text-red-600" />
              Omnivore
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-green-50 dark:hover:bg-green-900 cursor-pointer [&:has(:checked)]:bg-green-100 dark:[&:has(:checked)]:bg-green-800 [&:has(:checked)]:border-green-600">
            <RadioGroupItem value="pescatarian" id="pescatarian" />
            <Label htmlFor="pescatarian" className="flex items-center cursor-pointer">
              <Fish className="mr-2 h-5 w-5 text-blue-600" />
              Pescatarian
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-green-50 dark:hover:bg-green-900 cursor-pointer [&:has(:checked)]:bg-green-100 dark:[&:has(:checked)]:bg-green-800 [&:has(:checked)]:border-green-600">
            <RadioGroupItem value="vegetarian" id="vegetarian" />
            <Label htmlFor="vegetarian" className="flex items-center cursor-pointer">
              <Leaf className="mr-2 h-5 w-5 text-green-600" />
              Vegetarian
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Allergies & Restrictions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 border rounded-lg p-4">
            <Checkbox
              id="gluten"
              checked={preferences.allergies.gluten}
              onCheckedChange={(checked) => handleAllergyChange("gluten", checked as boolean)}
            />
            <Label htmlFor="gluten" className="flex items-center cursor-pointer">
              <Wheat className="mr-2 h-5 w-5 text-amber-600" />
              Gluten-free
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-4">
            <Checkbox
              id="dairy"
              checked={preferences.allergies.dairy}
              onCheckedChange={(checked) => handleAllergyChange("dairy", checked as boolean)}
            />
            <Label htmlFor="dairy" className="flex items-center cursor-pointer">
              <Milk className="mr-2 h-5 w-5 text-blue-300" />
              Dairy-free
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-4">
            <Checkbox
              id="nuts"
              checked={preferences.allergies.nuts}
              onCheckedChange={(checked) => handleAllergyChange("nuts", checked as boolean)}
            />
            <Label htmlFor="nuts" className="flex items-center cursor-pointer">
              <Nut className="mr-2 h-5 w-5 text-amber-800" />
              Nut-free
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-4">
            <Checkbox
              id="eggs"
              checked={preferences.allergies.eggs}
              onCheckedChange={(checked) => handleAllergyChange("eggs", checked as boolean)}
            />
            <Label htmlFor="eggs" className="flex items-center cursor-pointer">
              <Egg className="mr-2 h-5 w-5 text-yellow-400" />
              Egg-free
            </Label>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Meal Size</h3>
        <RadioGroup
          value={preferences.mealSize}
          onValueChange={(value) => handleChange("mealSize", value)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-green-50 dark:hover:bg-green-900 cursor-pointer [&:has(:checked)]:bg-green-100 dark:[&:has(:checked)]:bg-green-800 [&:has(:checked)]:border-green-600">
            <RadioGroupItem value="small" id="small" />
            <Label htmlFor="small" className="cursor-pointer">
              Small
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-green-50 dark:hover:bg-green-900 cursor-pointer [&:has(:checked)]:bg-green-100 dark:[&:has(:checked)]:bg-green-800 [&:has(:checked)]:border-green-600">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium" className="cursor-pointer">
              Medium
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-green-50 dark:hover:bg-green-900 cursor-pointer [&:has(:checked)]:bg-green-100 dark:[&:has(:checked)]:bg-green-800 [&:has(:checked)]:border-green-600">
            <RadioGroupItem value="large" id="large" />
            <Label htmlFor="large" className="cursor-pointer">
              Large
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-start">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 mr-2 mt-0.5" />
        <p className="text-sm text-amber-800 dark:text-amber-300">
          Please note that all allergy information is used for recommendations only. Always check ingredient labels for
          potential allergens.
        </p>
      </div>
    </div>
  )
}

