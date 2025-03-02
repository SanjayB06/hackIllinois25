import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GithubIcon } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-sage-50 artistic-culinary-pattern flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-sage-200 to-sage-300 transform -skew-y-6 shadow-lg z-0"></div>
        <div className="relative bg-white shadow-xl rounded-lg overflow-hidden z-10">
          <div className="px-8 py-12 sm:px-12">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-sage-800 mb-4 animate-fade-up font-serif">BrokeBites</h1>
              <p className="text-xl text-sage-600 animate-fade-up font-sans" style={{ animationDelay: "0.2s" }}>
                Cultivate your culinary journey on a budget
              </p>
            </div>

            <div className="space-y-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <Button
                asChild
                variant="outline"
                className="w-full bg-sage-100 hover:bg-sage-200 text-sage-800 border-sage-300 font-display"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full bg-sage-100 hover:bg-sage-200 text-sage-800 border-sage-300 font-display"
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-sage-300"></span>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-sage-600 font-sans">Or continue with</span>
                </div>
              </div>
              <Button className="w-full bg-sage-600 hover:bg-sage-700 text-white font-display">
                Google
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-sage-600 animate-fade-up font-sans text-center" style={{ animationDelay: "0.6s" }}>
        <p className="text-lg font-serif italic mb-2">By Amit, Sanjay, and Vishnu Arha Aravind</p>
        <div className="w-16 h-1 bg-sage-400 mx-auto mb-2"></div>
        <p className="text-sm font-display uppercase tracking-wide">Created by 542 Incorporated</p>
      </div>
    </div>
  )
}

