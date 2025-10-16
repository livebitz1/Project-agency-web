"use client"

import { useState, useEffect } from "react"

interface StatItemProps {
  value: number
  label: string
  suffix?: string
}

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrameId: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [end, duration])

  return <span>{count.toLocaleString()}</span>
}

function StatItem({ value, label, suffix = "+" }: StatItemProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="text-3xl sm:text-4xl font-bold text-primary">
        <AnimatedCounter end={value} />
        {suffix}
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

export function StatsSection() {
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

    const element = document.getElementById("stats-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats-section" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 gap-8 rounded-2xl border border-border/30 bg-card/30 p-8 sm:grid-cols-3 backdrop-blur-sm transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <StatItem value={500} label="Active Teams" />
          <StatItem value={98} label="Satisfaction Rate" suffix="%" />
          <StatItem value={24} label="Hours Support" suffix="/7" />
        </div>
      </div>
    </section>
  )
}
