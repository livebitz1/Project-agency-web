"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Lightbulb,
  PenTool,
  Code2,
  Rocket,
  HeartHandshake,
  ArrowDown,
  Sparkles,
  Clock,
  Target,
} from "lucide-react"
import { useRouter } from "next/navigation"

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    phase: "Discovery",
    title: "We Listen First",
    description: "Every great product starts with understanding. We open with a deep-dive session to map your vision, your audience, and what success looks like.",
    deliverables: ["Strategic vision document", "Goals & KPI alignment", "Market opportunity brief"],
    duration: "Day 1–2",
  },
  {
    number: "02",
    icon: Lightbulb,
    phase: "Strategy",
    title: "We Architect the Plan",
    description: "Before a single pixel is drawn, we lock in the creative strategy, information architecture, and tech stack. A clear roadmap — no ambiguity.",
    deliverables: ["Technical architecture", "UX wireframes & flows", "Project milestones"],
    duration: "Day 3–7",
  },
  {
    number: "03",
    icon: PenTool,
    phase: "Design",
    title: "We Bring it to Life",
    description: "High-fidelity prototypes that feel like the real product. We iterate until every interaction perfectly aligns with your brand.",
    deliverables: ["Complete design system", "Interactive prototype", "Brand-aligned UI kit"],
    duration: "Week 2–3",
  },
  {
    number: "04",
    icon: Code2,
    phase: "Build",
    title: "We Engineer it Right",
    description: "Clean, scalable code with performance and security built-in from day one. Weekly demos keep you in the loop. Nothing hides in a black box.",
    deliverables: ["Production codebase", "Weekly sprint demos", "Staging environment"],
    duration: "Week 3–6",
  },
  {
    number: "05",
    icon: CheckCircle2,
    phase: "Polish",
    title: "We Perfect Every Detail",
    description: "Multi-device testing, performance audits, accessibility checks. If it's not perfect, it doesn't ship. Our bar is higher than most.",
    deliverables: ["Full QA report", "90+ Lighthouse score", "UAT sign-off"],
    duration: "Week 6–7",
  },
  {
    number: "06",
    icon: Rocket,
    phase: "Launch",
    title: "We Launch & Stay",
    description: "Flawless deployment, real-time monitoring, and continuous improvement. Launch is the starting line, not the finish.",
    deliverables: ["Zero-downtime deploy", "Analytics & monitoring", "Ongoing optimization"],
    duration: "Week 7+",
  },
]

function AnimatedWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ")
  return (
    <span className={`hww-words ${className || ""}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="hww-word"
          style={{ ["--wrd-delay" as string]: `${i * 18}ms`, transitionDelay: `${i * 18}ms` }}
        >
          {word}
        </span>
      ))}
    </span>
  )
}

export default function HowWeWorkPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set())
  const [activeStep, setActiveStep] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    stepRefs.current.forEach((ref, i) => {
      if (!ref) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => new Set(prev).add(i))
            setActiveStep(i)
            obs.disconnect()
          }
        },
        { threshold: 0.2 }
      )
      obs.observe(ref)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="min-h-screen bg-white text-stone-900 overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-4 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-stone-100/50 blur-[80px] sm:blur-[120px]" />
          <div className="absolute top-1/4 -right-32 w-[300px] h-[300px] rounded-full bg-stone-50/40 blur-[80px]" />
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            className="flex justify-center mb-8 sm:mb-10"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,12px,0)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "0.05s",
            }}
          >
            <div className="inline-flex items-center gap-2.5">
              <div className="w-6 h-px bg-gradient-to-r from-stone-400 to-transparent" />
              <p className="text-[10px] sm:text-[11px] font-semibold text-stone-400 uppercase tracking-[0.3em]">The Process</p>
              <div className="w-6 h-px bg-gradient-to-l from-stone-400 to-transparent" />
            </div>
          </div>

          <div
            className="text-center mb-6 sm:mb-8 px-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,16px,0)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "0.15s",
            }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[1.05] sm:leading-[0.95]">
              <span className="text-stone-900">How We Turn</span>
              <br />
              <span className="text-stone-900">Vision Into </span>
              <span className="hww-shimmer inline-block">Reality</span>
            </h1>
            <div className="flex justify-center mt-3 sm:mt-4">
              <div className="hww-hero-line h-[2px] sm:h-[3px] rounded-full" />
            </div>
          </div>

          <div
            className="text-center mb-10 sm:mb-14 px-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,12px,0)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "0.25s",
            }}
          >
            <p className="hww-subtitle max-w-md mx-auto cursor-default">
              <AnimatedWords text="6 levels. One mission. From your first call to a product your users love — and your competitors fear." />
            </p>
          </div>

          <div
            className="flex items-center justify-center gap-8 sm:gap-14 mb-10 sm:mb-14"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,10px,0)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "0.35s",
            }}
          >
            {[
              { value: "~8wk", label: "Avg Delivery" },
              { value: "100%", label: "On-time" },
              { value: "24/7", label: "Comms" },
            ].map((stat, i) => (
              <div key={i} className="hww-stat group/stat text-center cursor-default">
                <p className="text-xl sm:text-2xl font-bold text-stone-900 tracking-[-0.02em] hww-stat-val">{stat.value}</p>
                <p className="text-[9px] sm:text-[10px] font-semibold text-stone-300 uppercase tracking-[0.15em] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          <div
            className="flex items-center justify-center gap-2 mb-10 sm:mb-14"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,8px,0)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "0.45s",
            }}
          >
            {steps.map((step, i) => {
              const Icon = step.icon
              const isActive = visibleSteps.has(i)
              return (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className={`hww-minimap-node flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? "bg-stone-900 border-stone-900 hww-minimap-active" : "bg-white border-stone-200"
                    } border`}
                  >
                    <Icon className={`w-3.5 h-3.5 transition-colors duration-500 ${isActive ? "text-white" : "text-stone-300"}`} />
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-4 sm:w-6 h-px transition-all duration-700 ${visibleSteps.has(i) ? "bg-stone-900" : "bg-stone-200"}`} />
                  )}
                </div>
              )
            })}
          </div>

          <div
            className="flex flex-col items-center gap-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 1s ease",
              transitionDelay: "0.6s",
            }}
          >
            <span className="text-[9px] uppercase tracking-[0.2em] text-stone-300 font-semibold">Start the journey</span>
            <ArrowDown className="w-4 h-4 text-stone-300 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="relative py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-stone-50/60 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[0.95]">
              <span className="text-stone-900">6 Levels.</span>{" "}
              <span className="text-stone-300">One Promise.</span>
            </h2>
            <p className="mt-4 text-sm text-stone-400 font-light max-w-sm mx-auto leading-relaxed">
              Each level builds on the last. No shortcuts, no skipped steps.
            </p>
          </div>

          <div className="relative">
            <div className="hww-spine hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px">
              <div className="absolute inset-0 bg-stone-100" />
              <div
                className="hww-spine-fill absolute top-0 left-0 right-0 bg-stone-900"
                style={{
                  height: `${Math.min(100, (visibleSteps.size / steps.length) * 100)}%`,
                  transition: "height 1.2s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </div>

            <div className="space-y-8 sm:space-y-12 lg:space-y-0">
              {steps.map((step, i) => {
                const Icon = step.icon
                const isLeft = i % 2 === 0
                const stepVisible = visibleSteps.has(i)

                return (
                  <div
                    key={i}
                    ref={(el) => { stepRefs.current[i] = el }}
                    className={`lg:flex lg:items-center ${isLeft ? "" : "lg:flex-row-reverse"} relative`}
                  >
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10 items-center justify-center">
                      <div
                        className={`hww-node w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${
                          stepVisible ? "bg-stone-900 border-stone-900" : "bg-white border-stone-200"
                        }`}
                      >
                        <Icon className={`w-4 h-4 transition-colors duration-700 ${stepVisible ? "text-white" : "text-stone-400"}`} />
                      </div>
                    </div>

                    <div className={`lg:w-[calc(50%-36px)] ${isLeft ? "lg:pr-6" : "lg:pl-6"}`}>
                      <div
                        className="hww-card group/card relative rounded-2xl sm:rounded-3xl border border-stone-200/50 bg-white overflow-hidden"
                        style={{
                          opacity: stepVisible ? 1 : 0,
                          transform: stepVisible
                            ? "translate3d(0,0,0)"
                            : `translate3d(${isLeft ? "-40px" : "40px"},20px,0)`,
                          transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                          transitionDelay: `${0.1 + i * 0.05}s`,
                        }}
                      >
                        <span className="hww-card-fill" />

                        <div className="relative z-10 p-6 sm:p-8">
                          <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                              <span className="lg:hidden hww-card-num text-[11px] font-mono font-bold text-stone-200">{step.number}</span>
                              <span className="hww-card-phase text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">{step.phase}</span>
                            </div>
                            <div className="hww-card-icon-wrap flex items-center justify-center w-10 h-10 rounded-xl bg-stone-50">
                              <Icon className="hww-card-icon w-[18px] h-[18px] text-stone-400" />
                            </div>
                          </div>

                          <h3 className="hww-card-title text-xl sm:text-2xl font-bold text-stone-900 tracking-[-0.02em] mb-3">{step.title}</h3>

                          <div className="hww-card-sep w-0 h-[1.5px] rounded-full bg-white/25 mb-4" />

                          <p className="hww-card-desc text-[13px] sm:text-sm text-stone-400 leading-[1.7] font-light mb-6">{step.description}</p>

                          <div className="space-y-2 mb-5">
                            {step.deliverables.map((d, di) => (
                              <div key={di} className="hww-card-del flex items-center gap-2.5">
                                <CheckCircle2 className="hww-card-check w-3.5 h-3.5 text-stone-200 shrink-0" />
                                <span className="hww-card-del-text text-xs font-medium text-stone-500">{d}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <Clock className="hww-card-clock w-3 h-3 text-stone-200" />
                              <span className="hww-card-dur text-[10px] font-semibold text-stone-300 uppercase tracking-wider">{step.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Target className="hww-card-target w-3 h-3 text-stone-200" />
                              <span className="hww-card-milestone text-[10px] font-semibold text-stone-300 uppercase tracking-wider">Level {step.number}</span>
                            </div>
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden rounded-b-3xl">
                          <div className="hww-card-bottom h-full bg-white/20" />
                        </div>
                      </div>

                      {i < steps.length - 1 && (
                        <div className={`hidden lg:flex items-center justify-center mt-4 mb-4 ${isLeft ? "pr-6" : "pl-6"}`}>
                          <div
                            className="hww-connector-label flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-50 border border-stone-100"
                            style={{
                              opacity: stepVisible ? 1 : 0,
                              transform: stepVisible ? "translate3d(0,0,0) scale(1)" : "translate3d(0,8px,0) scale(0.9)",
                              transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                              transitionDelay: `${0.4 + i * 0.05}s`,
                            }}
                          >
                            <ArrowDown className="w-2.5 h-2.5 text-stone-300" />
                            <span className="text-[8px] font-bold text-stone-300 uppercase tracking-[0.15em]">Next Level</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="hidden lg:block lg:w-[calc(50%-36px)]" />

                    {i < steps.length - 1 && <div className="hidden lg:block h-8" />}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPLETION ── */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-stone-900 border border-stone-800 mb-6">
            <Sparkles className="w-4 h-4 text-white/60" />
            <span className="text-xs sm:text-sm font-semibold text-white/80 tracking-wide">All 6 Levels Complete</span>
            <span className="text-xs font-mono text-white/30">100%</span>
          </div>
          <p className="text-sm text-stone-400 font-light max-w-sm mx-auto leading-relaxed">
            Your product is live, monitored, and continuously improving. The journey doesn&apos;t end — it evolves.
          </p>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        /* ═══ HERO ═══ */
        .hww-shimmer {
          background: linear-gradient(135deg, #1c1917 0%, #78716c 50%, #1c1917 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: hwwShimmer 4s ease-in-out infinite;
        }
        @keyframes hwwShimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hww-hero-line {
          width: 0;
          background: linear-gradient(90deg, rgba(28,25,23,0.08), rgba(28,25,23,0.2), rgba(28,25,23,0.08));
          animation: hwwLineGrow 1s 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes hwwLineGrow { from { width: 0; } to { width: min(180px, 35%); } }

        .hww-subtitle {
          font-size: 14px; line-height: 1.8;
          display: flex; flex-wrap: wrap; justify-content: center; gap: 0 5px;
        }
        @media (min-width: 640px) { .hww-subtitle { font-size: 15px; } }
        .hww-word {
          display: inline-block; color: #a8a29e; font-weight: 300;
          transition: color 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1);
          will-change: transform;
        }
        .hww-words:hover .hww-word {
          color: #1c1917; font-weight: 400;
          animation: hwwWordWave 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
          animation-delay: var(--wrd-delay, 0ms);
        }
        @keyframes hwwWordWave {
          0% { transform: translate3d(0,0,0); }
          35% { transform: translate3d(0,-2px,0); }
          100% { transform: translate3d(0,0,0); }
        }
        .hww-words:not(:hover) .hww-word {
          color: #a8a29e; font-weight: 300; animation: none; transform: translate3d(0,0,0);
        }

        .hww-stat { position: relative; }
        .hww-stat::after {
          content: ''; position: absolute; right: -16px; top: 50%; transform: translateY(-50%);
          width: 1px; height: 24px;
          background: linear-gradient(to bottom, transparent, rgba(214,211,209,0.5), transparent);
        }
        @media (min-width: 640px) { .hww-stat::after { right: -28px; } }
        .hww-stat:last-child::after { display: none; }
        .hww-stat-val { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .hww-stat:hover .hww-stat-val { transform: translate3d(0,-1px,0); }

        .hww-minimap-node { box-shadow: 0 1px 3px rgba(28,25,23,0.03); }
        .hww-minimap-active {
          box-shadow: 0 2px 8px rgba(28,25,23,0.12);
          animation: hwwNodePop 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes hwwNodePop {
          0% { transform: scale(1); }
          40% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }

        /* ═══ SPINE ═══ */
        .hww-spine-fill { will-change: height; }
        .hww-node { box-shadow: 0 2px 8px rgba(28,25,23,0.06); }

        /* ═══ STEP CARDS ═══ */
        .hww-card {
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease, border-color 0.5s ease;
          box-shadow: 0 1px 3px rgba(28,25,23,0.02);
        }
        .hww-card:hover {
          transform: translate3d(0,-4px,0) !important;
          box-shadow: 0 16px 48px rgba(28,25,23,0.08), 0 4px 12px rgba(28,25,23,0.04);
          border-color: #292524;
        }
        .hww-card:active { transform: translate3d(0,-1px,0) scale(0.99) !important; transition-duration: 0.15s; }

        .hww-card-fill {
          position: absolute; inset: 0; background: #1c1917; border-radius: inherit;
          transform: translate3d(0,100%,0);
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); z-index: 0;
        }
        .hww-card:hover .hww-card-fill { transform: translate3d(0,0,0); }

        .hww-card-num { transition: color 0.4s ease; }
        .hww-card:hover .hww-card-num { color: rgba(255,255,255,0.3); }
        .hww-card-phase { transition: color 0.4s ease; }
        .hww-card:hover .hww-card-phase { color: rgba(255,255,255,0.4); }
        .hww-card-icon-wrap { transition: background-color 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .hww-card:hover .hww-card-icon-wrap { background-color: rgba(255,255,255,0.1); transform: scale(1.05); }
        .hww-card-icon { transition: color 0.4s ease; }
        .hww-card:hover .hww-card-icon { color: white; }
        .hww-card-title { transition: color 0.4s ease; }
        .hww-card:hover .hww-card-title { color: white; }
        .hww-card-sep { transition: width 0.6s cubic-bezier(0.16,1,0.3,1), background-color 0.4s ease; }
        .hww-card:hover .hww-card-sep { width: 40px; background-color: rgba(255,255,255,0.2); }
        .hww-card-desc { transition: color 0.4s ease; }
        .hww-card:hover .hww-card-desc { color: #a8a29e; }
        .hww-card-check { transition: color 0.4s ease; }
        .hww-card:hover .hww-card-check { color: rgba(255,255,255,0.3); }
        .hww-card-del-text { transition: color 0.4s ease; }
        .hww-card:hover .hww-card-del-text { color: rgba(255,255,255,0.6); }
        .hww-card-del { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .hww-card:hover .hww-card-del:nth-child(1) { transform: translate3d(2px,0,0); transition-delay: 0.05s; }
        .hww-card:hover .hww-card-del:nth-child(2) { transform: translate3d(4px,0,0); transition-delay: 0.1s; }
        .hww-card:hover .hww-card-del:nth-child(3) { transform: translate3d(6px,0,0); transition-delay: 0.15s; }

        .hww-card-clock, .hww-card-target { transition: color 0.4s ease; }
        .hww-card:hover .hww-card-clock, .hww-card:hover .hww-card-target { color: rgba(255,255,255,0.2); }
        .hww-card-dur, .hww-card-milestone { transition: color 0.4s ease; }
        .hww-card:hover .hww-card-dur, .hww-card:hover .hww-card-milestone { color: rgba(255,255,255,0.35); }

        .hww-card-bottom { width: 0; transition: width 0.7s cubic-bezier(0.16,1,0.3,1); }
        .hww-card:hover .hww-card-bottom { width: 100%; }

        .hww-connector-label { box-shadow: 0 1px 3px rgba(28,25,23,0.02); }

        /* ═══ MOBILE — AUTO DARK ON SCROLL ═══ */
        @media (max-width: 1023px) {
          .hww-card[style*="opacity: 1"] .hww-card-fill {
            transform: translate3d(0,0,0);
            transition-delay: 0.3s;
          }
          .hww-card[style*="opacity: 1"] .hww-card-num { color: rgba(255,255,255,0.3); }
          .hww-card[style*="opacity: 1"] .hww-card-phase { color: rgba(255,255,255,0.4); }
          .hww-card[style*="opacity: 1"] .hww-card-icon-wrap { background-color: rgba(255,255,255,0.1); }
          .hww-card[style*="opacity: 1"] .hww-card-icon { color: white; }
          .hww-card[style*="opacity: 1"] .hww-card-title { color: white; }
          .hww-card[style*="opacity: 1"] .hww-card-sep { width: 40px; background-color: rgba(255,255,255,0.2); }
          .hww-card[style*="opacity: 1"] .hww-card-desc { color: #a8a29e; }
          .hww-card[style*="opacity: 1"] .hww-card-check { color: rgba(255,255,255,0.3); }
          .hww-card[style*="opacity: 1"] .hww-card-del-text { color: rgba(255,255,255,0.6); }
          .hww-card[style*="opacity: 1"] .hww-card-clock,
          .hww-card[style*="opacity: 1"] .hww-card-target { color: rgba(255,255,255,0.2); }
          .hww-card[style*="opacity: 1"] .hww-card-dur,
          .hww-card[style*="opacity: 1"] .hww-card-milestone { color: rgba(255,255,255,0.35); }
          .hww-card[style*="opacity: 1"] .hww-card-bottom { width: 100%; }
          .hww-card[style*="opacity: 1"] { border-color: #292524; }
        }

        /* ═══ REDUCED MOTION ═══ */
        @media (prefers-reduced-motion: reduce) {
          .hww-shimmer, .hww-hero-line, .hww-word,
          .hww-card, .hww-card-fill, .hww-card-num, .hww-card-phase,
          .hww-card-icon-wrap, .hww-card-icon, .hww-card-title,
          .hww-card-sep, .hww-card-desc, .hww-card-check,
          .hww-card-del-text, .hww-card-del, .hww-card-dur, .hww-card-milestone,
          .hww-card-clock, .hww-card-target, .hww-card-bottom,
          .hww-stat-val, .hww-minimap-node, .hww-minimap-active,
          .hww-spine-fill, .hww-node, .hww-connector-label {
            transition: none !important; animation: none !important;
          }
          .hww-card-fill { display: none !important; }
          .hww-hero-line { width: min(180px, 35%); }
        }
      `}</style>
    </div>
  )
}