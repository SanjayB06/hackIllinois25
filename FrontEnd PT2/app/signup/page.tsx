"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GithubIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    accountNumber: "",
    password: "",
    dietType: "omnivore", // "omnivore" | "vegetarian" | "vegan"
    allergies: {
      gluten: false,
      dairy: false,
      nuts: false,
      eggs: false,
    },
    mealSize: "medium", // "small" | "medium" | "large"
  });

  const router = useRouter();

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAllergyChange = (allergy: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      allergies: {
        ...prev.allergies,
        [allergy]: checked,
      },
    }));
  };

  // -----------------------------------------
  // POST to Flask /create_user
  // -----------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", formData);

    // Convert the user’s input to match the Flask endpoint requirements
    const { email, password, dietType, allergies, mealSize } = formData;

    // Build arrays from the user’s selected allergies
    // For example, if gluten=true and dairy=true, then ["gluten", "dairy"]
    const allergyArray = Object.keys(allergies).filter((key) => allergies[key as keyof typeof allergies]);

    // If the user is vegetarian or vegan, we treat that as a dietary restriction
    const dietaryRestrictions = dietType === "omnivore" ? [] : [dietType];

    // We'll just set placeholders or empty arrays for the other required fields
    const requestBody = {
      username: email, // or ask the user for a separate "username" field
      email,
      password,
      liked_foods: [],            // placeholder array
      disliked_foods: [],         // placeholder array
      liked_cuisines: [],         // placeholder array
      food_allergies: allergyArray,
      dietary_restrictions: dietaryRestrictions,
      location: "",               // placeholder
      monthly_income: 0,          // placeholder
      monthly_bills: 0,           // placeholder
      expenses: 0,                // placeholder
    };

    try {
      const response = await fetch("http://localhost:5000/create_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        // If Flask returns an error JSON, show it
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
        return;
      }

      // On success, show a success message and navigate
      const userData = await response.json();
      alert(`User created successfully! ID: ${userData._id}`);
      // Example: navigate to a "meal" page
      router.push("/meal");
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong while creating the user.");
    }
  };

  // Step navigation
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-sage-50 artistic-culinary-pattern flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-sage-800">
            {step === 1 && "Create Your Account"}
            {step === 2 && "Tell Us About Your Preferences"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Step 1: Basic Account Info */}
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sage-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    className="bg-sage-50 border-sage-200 text-sage-800 placeholder-sage-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber" className="text-sage-700">
                    Account Number
                  </Label>
                  <Input
                    id="accountNumber"
                    type="text"
                    placeholder="Enter your account number"
                    value={formData.accountNumber}
                    onChange={(e) => handleChange("accountNumber", e.target.value)}
                    required
                    className="bg-sage-50 border-sage-200 text-sage-800 placeholder-sage-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sage-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Type your password in here"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    required
                    className="bg-sage-50 border-sage-200 text-sage-800"
                  />
                </div>
                <Button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-sage-600 hover:bg-sage-700 text-white"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}

            {/* Step 2: Dietary Preferences */}
            {step === 2 && (
              <>
                <div className="space-y-4">
                  <Label className="text-sage-700">Dietary Preference</Label>
                  <RadioGroup
                    value={formData.dietType}
                    onValueChange={(value) => handleChange("dietType", value)}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {["omnivore", "vegetarian", "vegan"].map((diet) => (
                      <div
                        key={diet}
                        className="flex items-center space-x-2 bg-sage-100 rounded-lg p-4 cursor-pointer"
                      >
                        <RadioGroupItem value={diet} id={diet} />
                        <Label
                          htmlFor={diet}
                          className="capitalize cursor-pointer text-sage-800"
                        >
                          {diet}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-sage-700">Allergies & Restrictions</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.keys(formData.allergies).map((allergy) => (
                      <div
                        key={allergy}
                        className="flex items-center space-x-2 bg-sage-100 rounded-lg p-4"
                      >
                        <Checkbox
                          id={allergy}
                          checked={formData.allergies[allergy as keyof typeof formData.allergies]}
                          onCheckedChange={(checked) =>
                            handleAllergyChange(allergy, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={allergy}
                          className="capitalize cursor-pointer text-sage-800"
                        >
                          {allergy}-free
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-sage-700">Meal Size</Label>
                  <RadioGroup
                    value={formData.mealSize}
                    onValueChange={(value) => handleChange("mealSize", value)}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {["small", "medium", "large"].map((size) => (
                      <div
                        key={size}
                        className="flex items-center space-x-2 bg-sage-100 rounded-lg p-4 cursor-pointer"
                      >
                        <RadioGroupItem value={size} id={size} />
                        <Label
                          htmlFor={size}
                          className="capitalize cursor-pointer text-sage-800"
                        >
                          {size}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="bg-sage-100 hover:bg-sage-200 text-sage-800"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button
                    type="submit"
                    className="bg-sage-600 hover:bg-sage-700 text-white"
                  >
                    Create Account
                  </Button>
                </div>
              </>
            )}
          </form>
        </CardContent>

        {/* Footer only appears on Step 1 */}
        {step === 1 && (
          <CardFooter className="flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-sage-200"></span>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-sage-600">Or sign up with</span>
              </div>
            </div>
            <Button className="w-full bg-sage-100 hover:bg-sage-200 text-sage-800">
              Google
            </Button>
            <p className="text-sm text-sage-600 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-sage-800 hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
