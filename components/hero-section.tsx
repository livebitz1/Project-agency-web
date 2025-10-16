"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative overflow-hidden pt-20 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Announcement Badge */}
        <div
          className={`mb-8 flex justify-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <Badge variant="secondary" className="gap-2 rounded-full px-4 py-1.5 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            New: Advanced Analytics
            <ArrowRight className="h-3 w-3" />
          </Badge>
        </div>

        {/* Main Heading */}
        <div
          className={`mb-6 text-center transition-all duration-700 delay-100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            Innovating Beyond
            <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Pixels
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div
          className={`mb-10 flex justify-center transition-all duration-700 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="max-w-2xl text-center text-base sm:text-lg text-muted-foreground leading-relaxed">
            Transform your ideas into powerful digital products. We deliver cutting-edge solutions that drive real
            results for teams that dare to innovate.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col items-center justify-center gap-3 transition-all duration-700 delay-300 sm:flex-row sm:gap-4 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <Button size="lg" className="rounded-full px-8 font-medium">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 font-medium bg-transparent">
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  )
}
