"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Zap, Users, Globe } from "lucide-react"

interface FeatureCardProps {
  icon: React.ComponentType<any>
  title: string
  description: string
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/30 bg-card/30 p-6 sm:p-8 transition-all duration-300 hover:border-border/60 hover:bg-card/60 hover:shadow-lg hover:shadow-primary/5">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 transition-all duration-300 group-hover:bg-primary/20">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="mb-2 font-semibold text-foreground text-base sm:text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export function FeaturesGrid() {
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

    const element = document.getElementById("features-grid")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance that keeps your team moving at the speed of innovation.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Built for seamless teamwork with real-time updates and intuitive interfaces.",
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Deploy anywhere with our distributed infrastructure and enterprise-grade reliability.",
    },
  ]

  return (
    <section id="features-grid" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 gap-6 md:grid-cols-3 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
