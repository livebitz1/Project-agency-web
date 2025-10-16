"use client"

import { useState, useEffect } from "react"

export function ValueSection() {
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

    const element = document.getElementById("value-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const benefits = [
    "Seamless integration with your existing tools",
    "Advanced security and compliance features",
    "Dedicated support from our expert team",
    "Regular updates and new features",
  ]

  return (
    <section id="value-section" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column */}
          <div
            className={`flex flex-col justify-center transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl leading-tight">
              Why Choose ProHub?
            </h2>
            <p className="mb-8 text-base sm:text-lg text-muted-foreground leading-relaxed">
              We combine cutting-edge technology with intuitive design to create products that teams love to use.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-muted-foreground text-sm sm:text-base">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Feature Showcase */}
          <div
            className={`relative transition-all duration-700 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 blur-2xl" />
            <div className="relative rounded-2xl border border-border/30 bg-card/30 p-8 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <div className="h-2 w-24 rounded bg-muted" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full rounded bg-muted" />
                  <div className="h-2 w-5/6 rounded bg-muted" />
                  <div className="h-2 w-4/6 rounded bg-muted" />
                </div>
                <div className="pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-16 rounded-lg bg-muted/50" />
                    <div className="h-16 rounded-lg bg-muted/50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
