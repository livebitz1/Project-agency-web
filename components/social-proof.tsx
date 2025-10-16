"use client"

import { useState, useEffect } from "react"
import { Video, Github, Infinity, BookOpen, Youtube, Grid3x3, Send, Play, CreditCard, Mail, Zap, Users } from "lucide-react"

export function SocialProof() {
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

    const element = document.getElementById("social-proof")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const tools = [
    { icon: Video, label: "Zoom", color: "text-blue-600" },
    { icon: Github, label: "GitHub", color: "text-gray-900" },
    { icon: Infinity, label: "Infinity", color: "text-gray-900" },
    { icon: BookOpen, label: "Notion", color: "text-gray-900" },
    { icon: Youtube, label: "YouTube", color: "text-red-600" },
    { icon: Grid3x3, label: "Apps", color: "text-blue-500" },
    { icon: Send, label: "Telegram", color: "text-blue-500" },
    { icon: Play, label: "Vimeo", color: "text-blue-600" },
    { icon: CreditCard, label: "Visa", color: "text-gray-900" },
    { icon: Mail, label: "Email", color: "text-rose-600" },
    { icon: Zap, label: "Zapier", color: "text-amber-500" },
    { icon: Users, label: "Teams", color: "text-gray-900" },
  ]

  return (
    <section id="social-proof" className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-16 sm:mb-20 md:mb-28 text-center">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4 sm:mb-6">
              Integrations
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              <span className="text-foreground">Works with your</span>
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-muted-foreground to-muted-foreground/60 bg-clip-text text-transparent">
                favorite tools
              </span>
            </h2>
            <p className="mt-6 sm:mt-8 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Seamlessly integrate with the tools your team already loves and uses every day
            </p>
          </div>

          <div className="hidden md:grid grid-cols-3 gap-x-12 gap-y-8 place-items-center relative h-96 lg:h-[420px]">
            {tools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <div
                  key={tool.label}
                  className="flex flex-col items-center"
                  style={{
                    transitionDelay: isVisible ? `${index * 50}ms` : "0ms",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.95)",
                    transitionProperty: "opacity, transform",
                    transitionDuration: "700ms",
                    transitionTimingFunction: "cubic-bezier(.2,.9,.2,1)",
                  }}
                >
                  <div className="group relative">
                    <div className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-white border border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-colors duration-300 group-hover:bg-black overflow-hidden relative cursor-pointer">
                      {/* glossy highlight */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent opacity-60 pointer-events-none" />
                      <Icon
                        className={`relative h-6 w-6 md:h-9 md:w-9 text-black transition-colors duration-300 group-hover:text-white`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{tool.label}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="md:hidden">
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {tools.map((tool, index) => {
                const Icon = tool.icon
                return (
                  <div
                    key={tool.label}
                    className={`flex flex-col items-center gap-3 transition-all duration-700 ease-out`}
                    style={{
                      transitionDelay: isVisible ? `${index * 50}ms` : "0ms",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0)" : "translateY(12px)",
                    }}
                  >
                    <div className="group relative">
                      <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-white border border-black/10 shadow-md transition-colors duration-300 group-hover:bg-black overflow-hidden cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent opacity-60 pointer-events-none" />
                        <Icon
                          className={`relative h-6 w-6 sm:h-8 sm:w-8 text-black transition-colors duration-300 group-hover:text-white`}
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-muted-foreground text-center">
                      {tool.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
