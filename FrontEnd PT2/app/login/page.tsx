"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { GithubIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the login logic
    console.log("Login attempt with:", email, password)
    // For now, we'll just redirect to the meal section
    router.push("/meal")
  }

  return (
    <div className="min-h-screen bg-sage-50 artistic-culinary-pattern flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-sage-800">Login to BrokeBites</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sage-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-sage-50 border-sage-200 text-sage-800"
              />
            </div>
            <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700 text-white">
              Login
            </Button>
          </form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-sage-200"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-sage-600">Or continue with</span>
            </div>
          </div>
          <Button className="w-full bg-sage-100 hover:bg-sage-200 text-sage-800">
            <GithubIcon className="mr-2 h-4 w-4" /> Google
          </Button>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-sage-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-sage-800 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

