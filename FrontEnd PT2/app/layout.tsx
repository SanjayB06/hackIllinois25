import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Lora, Merriweather } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LeafLogo } from "@/components/leaf-logo"
import { DecorativeElements } from "@/components/decorative-elements"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" })
const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
})

export const metadata: Metadata = {
  title: "BrokeBites",
  description: "Cultivate your culinary journey on a budget",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lora.variable} ${merriweather.variable} font-serif`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="fixed top-4 left-4 z-50">
            <LeafLogo className="w-12 h-12" />
          </div>
          <DecorativeElements />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'