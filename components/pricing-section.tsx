"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"

export function PricingSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="relative w-full bg-gradient-to-b from-background via-background to-background/95 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center justify-center mb-4 sm:mb-6">
            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-xs sm:text-sm font-semibold text-primary">Transparent Pricing</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 sm:mb-6 leading-tight">
            Simple, predictable pricing
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Choose a plan that fits your team. No hidden fees, cancel anytime. Scale your business with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-stretch">
          {/* Left Card - Retainer (Dark Theme) */}
          <div
            className="group relative rounded-2xl overflow-hidden transition-all duration-500 ease-out"
            onMouseEnter={() => setHoveredCard("retainer")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #0c1425 50%, #0a0f1a 100%)",
              }}
            />

            {/* Glossy overlay effect */}
            <div
              className="absolute inset-0 rounded-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0) 100%)",
              }}
            />

            {/* Border glow effect on hover */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1), transparent 70%)",
              }}
            />

            {/* Card border */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors duration-500" />

            {/* Card content */}
            <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col h-full">
              {/* Header section */}
              <div className="mb-8 sm:mb-10">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0">
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Retainer</h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      Ideal for teams that need ongoing quick design support
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl sm:text-4xl font-bold text-white">$1,200</div>
                    <div className="text-sm text-white/60 mt-1">/month</div>
                  </div>
                </div>
              </div>

              {/* Features list */}
              <div className="flex-1 mb-8 sm:mb-10">
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    "1 Active request at a time",
                    "2x Senior Designer",
                    "Bi-weekly progress meetings",
                    "Fast turnaround",
                    "Daily 4 hours of work",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-white/80 group/item">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 group-hover/item:bg-white/20 transition-colors duration-300">
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                      </div>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="mt-auto">
                <Button
                  size="lg"
                  className="w-full rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all duration-300 group/btn"
                  aria-label="Choose Retainer plan"
                >
                  <span className="flex items-center justify-center gap-2">
                    Choose Retainer
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  </span>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Card - Landing Page Design (Light Theme) */}
          <div
            className="group relative rounded-2xl overflow-hidden transition-all duration-500 ease-out"
            onMouseEnter={() => setHoveredCard("landing")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f9fafb 50%, #f3f4f6 100%)",
              }}
            />

            {/* Subtle overlay */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "radial-gradient(circle at 50% 0%, rgba(0,0,0,0.02), transparent 70%)",
              }}
            />

            {/* Card border */}
            <div className="absolute inset-0 rounded-2xl border border-black/8 group-hover:border-black/12 transition-colors duration-500" />

            {/* Shadow effect */}
            <div className="absolute inset-0 rounded-2xl shadow-lg shadow-black/5 group-hover:shadow-xl group-hover:shadow-black/10 transition-shadow duration-500" />

            {/* Card content */}
            <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col h-full">
              {/* Header section */}
              <div className="mb-8 sm:mb-10">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0">
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Landing Page Design</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Bring your dream website to life in just days, not months.
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl sm:text-4xl font-bold text-foreground">$1,800</div>
                    <div className="text-sm text-muted-foreground mt-1">one-time</div>
                  </div>
                </div>
              </div>

              {/* Features list */}
              <div className="flex-1 mb-8 sm:mb-10">
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    "Wireframes",
                    "Custom Layout",
                    "Desktop, Tablet, Mobile responsive design",
                    "Brand consistency",
                    "Figma file + handoff",
                  ].map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm sm:text-base text-foreground/80 group/item"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-black/8 group-hover/item:bg-black/12 transition-colors duration-300">
                          <Check className="w-3 h-3 text-foreground" strokeWidth={3} />
                        </div>
                      </div>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="mt-auto">
                <Button
                  size="lg"
                  className="w-full rounded-full bg-foreground text-background font-semibold hover:bg-foreground/90 transition-all duration-300 group/btn"
                  aria-label="Start Landing Page Design project"
                >
                  <span className="flex items-center justify-center gap-2">
                    Start Project
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
