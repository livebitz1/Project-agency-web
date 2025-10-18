"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("cta-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="cta-section" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-primary/10 to-primary/5 p-8 sm:p-12 lg:p-16 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          </div>
          <div className="relative z-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl leading-tight">
              Ready to Transform Your Workflow?
            </h2>
            <p className="mb-8 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Join hundreds of teams already using Digitomedia to innovate faster and deliver better results.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button size="lg" className="rounded-full px-8 font-medium">
               Book Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 font-medium bg-transparent">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
