"use client"

import { useState, useEffect } from "react"
import {
  MessageCircle,
  Search,
  Palette,
  Code2,
  Rocket,
  HeartHandshake,
  ArrowRight,
  FileText,
  GitBranch,
  CheckSquare,
  Settings,
  BarChart3,
  Users,
  Sparkles,
  Clock,
  Target,
} from "lucide-react"
import Link from "next/link"

const steps = [
  {
    title: "Discovery Call",
    icon: MessageCircle,
    card1: { label: "Intro Call", icon: MessageCircle, lines: ["Understand your vision & goals", "Identify key challenges", "Align on project timeline"], tag: "Day 1" },
    card2: { label: "Requirements Brief", icon: FileText, lines: ["Define feature requirements", "Evaluate tech preferences", "Set budget & milestones"], tag: "Day 1" },
    preview: { heading: "Discovery Call", day: "Day 1", desc: "Every great product starts with a real conversation. We listen first — understanding your business, your users, and where you want to go. By the end, we'll have a crystal-clear brief ready to act on.", points: ["30-minute deep-dive intro call", "Stakeholder alignment session", "Documented project brief & scope"] },
  },
  {
    title: "Research & Strategy",
    icon: Search,
    card1: { label: "Market Analysis", icon: Search, lines: ["Competitive landscape audit", "Target audience profiling", "Opportunity gap mapping"], tag: "Day 2–3" },
    card2: { label: "Technical Blueprint", icon: BarChart3, lines: ["Architecture & stack selection", "Infrastructure planning", "Scalability roadmap"], tag: "Day 2–3" },
    preview: { heading: "Research & Strategy", day: "Day 2–3", desc: "Data-driven decisions from the start. We research your market, analyze competitors, map user journeys, and architect a technical foundation built for growth — not just for launch.", points: ["Full competitive & market analysis", "User persona & journey mapping", "Technical architecture document"] },
  },
  {
    title: "Design & Prototype",
    icon: Palette,
    card1: { label: "Interface Design", icon: Palette, lines: ["High-fidelity UI mockups", "Component design system", "Responsive layout specs"], tag: "Day 4–7" },
    card2: { label: "Interactive Prototype", icon: GitBranch, lines: ["Clickable user flows", "Stakeholder review session", "Iteration & refinement"], tag: "Day 4–7" },
    preview: { heading: "Design & Prototype", day: "Day 4–7", desc: "Your product takes visual form. We design every screen, every interaction, every micro-animation — then build a clickable prototype so you can experience it before a single line of code is written.", points: ["Pixel-perfect Figma designs", "Interactive clickable prototype", "Design system & component library"] },
  },
  {
    title: "Development",
    icon: Code2,
    card1: { label: "Frontend Engineering", icon: Code2, lines: ["Next.js & React development", "Responsive implementation", "Performance optimization"], tag: "Day 8–14" },
    card2: { label: "Backend & APIs", icon: Settings, lines: ["Server & database architecture", "API development & testing", "Authentication & security"], tag: "Day 8–14" },
    preview: { heading: "Development", day: "Day 8–14", desc: "Where design meets engineering. We build with modern frameworks, ship in weekly sprints, and demo progress every few days. Clean code, real-time collaboration, zero surprises.", points: ["Production-grade Next.js codebase", "RESTful & GraphQL API layer", "Weekly progress demos & reviews"] },
  },
  {
    title: "Launch & Deploy",
    icon: Rocket,
    card1: { label: "Quality Assurance", icon: CheckSquare, lines: ["Cross-browser testing suite", "Performance & load testing", "Accessibility compliance"], tag: "Day 15–16" },
    card2: { label: "Production Deploy", icon: Rocket, lines: ["CI/CD pipeline setup", "Domain & SSL configuration", "Monitoring & alerting"], tag: "Day 15–16" },
    preview: { heading: "Launch & Deploy", day: "Day 15–16", desc: "Launch day should feel exciting, not stressful. We handle rigorous QA, performance tuning, infrastructure setup, and a smooth zero-downtime deployment. Your product goes live with confidence.", points: ["Comprehensive QA & regression testing", "Optimized build & CDN deployment", "Real-time monitoring dashboard"] },
  },
  {
    title: "Support & Grow",
    icon: HeartHandshake,
    card1: { label: "Ongoing Monitoring", icon: BarChart3, lines: ["Uptime & performance tracking", "Error detection & resolution", "Usage analytics dashboard"], tag: "Ongoing" },
    card2: { label: "Growth Partnership", icon: Users, lines: ["Feature iteration sprints", "User feedback integration", "Scale & performance tuning"], tag: "Ongoing" },
    preview: { heading: "Support & Grow", day: "Ongoing", desc: "We don't disappear after launch. Our partnership continues with proactive monitoring, regular feature updates, and data-driven optimizations that help your product — and your business — grow.", points: ["24/7 monitoring & incident response", "Monthly feature iteration sprints", "Quarterly growth strategy reviews"] },
  },
]

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) { setIsVisible(true); return }
    const el = document.getElementById("services-section")
    if (!el) { setIsVisible(true); return }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { requestAnimationFrame(() => setIsVisible(true)); obs.disconnect() }
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function getConnectors(i: number) {
    return {
      rightDesktop: i === 0 || i === 1 || i === 3 || i === 4,
      bottomDesktop: false,
      rightTablet: i === 0 || i === 2 || i === 4,
      bottomTablet: i === 1 || i === 3,
      bottomMobile: i < 5,
    }
  }

  function renderPreview(icon: React.ElementType, label: string, tag: string, heading: string, desc: string, lines: string[]) {
    const PvIcon = icon
    return (
      <div className="hw-pv pointer-events-none">
        <div className="hw-pv-card hw-pv-glass p-5 sm:p-6 rounded-2xl sm:rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/8 border border-white/5">
                <PvIcon className="w-[18px] h-[18px] text-white/75" />
              </div>
              <div>
                <p className="text-[13px] sm:text-sm font-bold text-white/90 leading-tight tracking-[-0.01em]">{label}</p>
                <p className="text-[10px] font-medium text-white/25 mt-0.5 tracking-wide">Part of {heading}</p>
              </div>
            </div>
            <span className="text-[9px] font-bold text-white/35 px-2.5 py-1 rounded-full bg-white/5 border border-white/6 tracking-wider uppercase">{tag}</span>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-white/0 via-white/8 to-white/0 mb-4" />
          <p className="text-[12px] sm:text-[13px] text-white/45 leading-[1.75] font-light mb-5">{desc}</p>
          <div className="mb-4">
            <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] mb-2.5">Key Deliverables</p>
            <div className="space-y-2">
              {lines.map((line, li) => (
                <div key={li} className="flex items-start gap-2.5">
                  <div className="w-[5px] h-[5px] rounded-full shrink-0 bg-white/20 mt-[5px]" />
                  <span className="text-[11px] sm:text-xs font-medium text-white/55 leading-relaxed">{line}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-white/20" />
              <span className="text-[9px] font-semibold text-white/25 tracking-wider uppercase">{tag}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Target className="w-3 h-3 text-white/20" />
              <span className="text-[9px] font-semibold text-white/25 tracking-wider uppercase">Milestone</span>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full hw-label-glass">
          <span className="text-[10px] font-semibold text-white/65 tracking-wide whitespace-nowrap">{label}</span>
        </div>
      </div>
    )
  }

  return (
  <section id="services-section" className="relative py-20 sm:py-28 lg:py-36 overflow-hidden hidden sm:block">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-stone-100/40 blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-[350px] h-[350px] rounded-full bg-stone-50/50 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 sm:mb-16 lg:mb-20" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,20px,0)", transitionProperty: "opacity, transform", transitionDuration: "0.8s", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.1s", willChange: "transform, opacity", backfaceVisibility: "hidden" }}>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-end">
            <div>
              <div className="inline-flex items-center gap-2.5 mb-5">
                <div className="w-6 h-px bg-gradient-to-r from-stone-400 to-transparent" />
                <p className="text-[10px] sm:text-[11px] font-semibold text-stone-400 uppercase tracking-[0.3em]">The Journey</p>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[0.95]">
                <span className="text-stone-900">How We</span><br /><span className="text-stone-300">Work</span>
              </h2>
            </div>
            <div className="lg:text-right">
              <p className="text-sm sm:text-[15px] text-stone-400 leading-[1.8] font-light max-w-md lg:ml-auto mb-4">
                From the first hello to launch day and beyond — here&apos;s how we turn your idea into a product people love.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-50 border border-stone-100">
                <Sparkles className="w-3 h-3 text-stone-400" />
                <span className="text-[10px] font-semibold text-stone-400 tracking-wider uppercase">Idea to launch in ~16 days</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hw-grid rounded-2xl sm:rounded-3xl border border-stone-200/50" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,16px,0)", transitionProperty: "opacity, transform", transitionDuration: "0.8s", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.25s", willChange: "transform, opacity", backfaceVisibility: "hidden" }}>
          {steps.map((step, i) => {
            const Icon = step.icon
            const Icon1 = step.card1.icon
            const Icon2 = step.card2.icon
            const conn = getConnectors(i)

            return (
              <div key={i} className="hw-cell group relative flex flex-col items-center justify-center p-8 sm:p-10 lg:p-12" style={{ overflow: "visible", zIndex: 1 }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.zIndex = "20" }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.zIndex = "1" }}>
                <span className="hw-num absolute top-4 left-5 text-[9px] font-mono font-bold text-stone-200 tracking-wider">{String(i + 1).padStart(2, "0")}</span>
                <span className="hw-day absolute top-4 right-5 text-[8px] font-semibold text-stone-300 tracking-wider uppercase px-2 py-0.5 rounded-full bg-stone-50 border border-stone-100">{step.card1.tag}</span>

                {conn.rightDesktop && <div className="hw-conn-h hw-conn-h-desktop"><div className="hw-conn-line-h" /><div className="hw-conn-dot hw-conn-dot-start" /><div className="hw-conn-dot hw-conn-dot-end" /></div>}
                {conn.rightTablet && <div className="hw-conn-h hw-conn-h-tablet"><div className="hw-conn-line-h" /><div className="hw-conn-dot hw-conn-dot-start" /><div className="hw-conn-dot hw-conn-dot-end" /></div>}
                {conn.bottomDesktop && <div className="hw-conn-v hw-conn-v-desktop"><div className="hw-conn-line-v" /><div className="hw-conn-dot hw-conn-dot-top" /><div className="hw-conn-dot hw-conn-dot-bottom" /></div>}
                {conn.bottomTablet && <div className="hw-conn-v hw-conn-v-tablet"><div className="hw-conn-line-v" /><div className="hw-conn-dot hw-conn-dot-top" /><div className="hw-conn-dot hw-conn-dot-bottom" /></div>}
                {conn.bottomMobile && <div className="hw-conn-v hw-conn-v-mobile"><div className="hw-conn-line-v" /><div className="hw-conn-dot hw-conn-dot-top" /><div className="hw-conn-dot hw-conn-dot-bottom" /></div>}

                <div className="relative w-36 h-[72px] mb-5 sm:mb-6">
                  <div className="group/c1 absolute inset-0">
                    <div className="hw-mini hw-mini-1 absolute w-[104px] h-[64px] rounded-xl cursor-pointer hw-glass p-2 flex flex-col justify-between overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-4 h-4 rounded-md flex items-center justify-center shrink-0 bg-white/10"><Icon1 className="w-2.5 h-2.5 text-white/70" /></div>
                        <span className="text-[7px] font-bold text-white/90 truncate leading-none">{step.card1.label}</span>
                      </div>
                      <div className="space-y-[3px] px-0.5">
                        {step.card1.lines.map((line, li) => (<div key={li} className="flex items-center gap-1"><div className="w-[3px] h-[3px] rounded-full shrink-0 bg-white/20" /><span className="text-[5.5px] text-white/50 truncate font-medium">{line}</span></div>))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[5px] font-bold text-white/25 uppercase tracking-wider">{step.card1.tag}</span>
                        <div className="flex gap-0.5"><div className="w-1 h-1 rounded-full bg-white/30" /><div className="w-1 h-1 rounded-full bg-white/15" /><div className="w-1 h-1 rounded-full bg-white/08" /></div>
                      </div>
                    </div>
                    {renderPreview(Icon1, step.card1.label, step.card1.tag, step.preview.heading, step.preview.desc, step.preview.points)}
                  </div>

                  <div className="group/c2 absolute inset-0">
                    <div className="hw-mini hw-mini-2 absolute left-7 w-[104px] h-[64px] rounded-xl cursor-pointer hw-glass p-2 flex flex-col justify-between overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-4 h-4 rounded-md flex items-center justify-center shrink-0 bg-white/10"><Icon2 className="w-2.5 h-2.5 text-white/70" /></div>
                        <span className="text-[7px] font-bold text-white/90 truncate leading-none">{step.card2.label}</span>
                      </div>
                      <div className="space-y-[3px] px-0.5">
                        {step.card2.lines.map((line, li) => (<div key={li} className="flex items-center gap-1"><div className="w-[3px] h-[3px] rounded-full shrink-0 bg-white/20" /><span className="text-[5.5px] text-white/50 truncate font-medium">{line}</span></div>))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[5px] font-bold text-white/25 uppercase tracking-wider">{step.card2.tag}</span>
                        <div className="flex gap-0.5"><div className="w-1 h-1 rounded-full bg-white/15" /><div className="w-1 h-1 rounded-full bg-white/30" /><div className="w-1 h-1 rounded-full bg-white/15" /></div>
                      </div>
                    </div>
                    {renderPreview(Icon2, step.card2.label, step.card2.tag, step.preview.heading, step.preview.desc, step.preview.points)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hw-icon-wrap flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-stone-50">
                    <Icon className="hw-icon w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-400" />
                  </div>
                  <h3 className="hw-title text-sm sm:text-[15px] font-semibold text-stone-800 tracking-[-0.01em]">{step.title}</h3>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,12px,0)", transitionProperty: "opacity, transform", transitionDuration: "0.8s", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.5s", willChange: "transform, opacity", backfaceVisibility: "hidden" }}>
          <p className="text-stone-400 text-sm sm:text-base font-light">Ready to start your journey?</p>
          <Link href="/book" className="group/cta inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-stone-900 text-white text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(28,25,23,0.15)] active:scale-[0.97]">
            Book a Discovery Call
            <ArrowRight className="w-4 h-4 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-1" />
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .hw-grid { display: grid; grid-template-columns: repeat(1, 1fr); background: white; overflow: visible; }
        @media (min-width: 640px) { .hw-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .hw-grid { grid-template-columns: repeat(3, 1fr); } }

        .hw-cell { border: 1px solid rgba(214,211,209,0.25); transition: border-color 0.5s ease, background-color 0.5s ease; }
        .hw-cell:hover { border-color: #1c1917; background-color: #fafaf9; }
        .hw-num { transition: color 0.4s ease; }
        .hw-cell:hover .hw-num { color: #1c1917; }
        .hw-day { transition: color 0.4s ease, background-color 0.4s ease, border-color 0.4s ease; }
        .hw-cell:hover .hw-day { color: #1c1917; background-color: #f5f5f4; border-color: #d6d3d1; }
        .hw-icon-wrap { transition: background-color 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .hw-cell:hover .hw-icon-wrap { background-color: #1c1917; transform: scale(1.05); }
        .hw-icon { transition: color 0.4s ease; }
        .hw-cell:hover .hw-icon { color: white; }
        .hw-title { transition: color 0.4s ease; }
        .hw-cell:hover .hw-title { color: #1c1917; }

        .hw-conn-h, .hw-conn-v { display: none; }
        .hw-conn-h { position: absolute; top: 50%; right: -1px; width: 2px; height: 1px; z-index: 5; transform: translateY(-50%); }
        .hw-conn-line-h { position: absolute; top: 50%; left: -14px; right: -14px; height: 0; border-top: 2px dashed #1c1917; opacity: 0.12; transform: translateY(-50%); }
        .hw-conn-dot-start, .hw-conn-dot-end { position: absolute; width: 7px; height: 7px; border-radius: 9999px; background: #1c1917; opacity: 0.15; top: 50%; transform: translateY(-50%); }
        .hw-conn-dot-start { left: -16px; } .hw-conn-dot-end { right: -16px; }
        .hw-conn-v { position: absolute; bottom: -1px; left: 50%; width: 1px; height: 2px; z-index: 5; transform: translateX(-50%); }
        .hw-conn-line-v { position: absolute; left: 50%; top: -14px; bottom: -14px; width: 0; border-left: 2px dashed #1c1917; opacity: 0.12; transform: translateX(-50%); }
        .hw-conn-dot-top, .hw-conn-dot-bottom { position: absolute; width: 7px; height: 7px; border-radius: 9999px; background: #1c1917; opacity: 0.15; left: 50%; transform: translateX(-50%); }
        .hw-conn-dot-top { top: -16px; } .hw-conn-dot-bottom { bottom: -16px; }
        .hw-cell:hover .hw-conn-line-h, .hw-cell:hover .hw-conn-line-v { opacity: 0.35; }
        .hw-cell:hover .hw-conn-dot-start, .hw-cell:hover .hw-conn-dot-end, .hw-cell:hover .hw-conn-dot-top, .hw-cell:hover .hw-conn-dot-bottom { opacity: 0.5; }
        .hw-conn-line-h, .hw-conn-line-v, .hw-conn-dot-start, .hw-conn-dot-end, .hw-conn-dot-top, .hw-conn-dot-bottom { transition: opacity 0.5s ease; }
        @media (max-width: 639px) { .hw-conn-v-mobile { display: block; } }
        @media (min-width: 640px) and (max-width: 1023px) { .hw-conn-h-tablet { display: block; } .hw-conn-v-tablet { display: block; } }
        @media (min-width: 1024px) { .hw-conn-h-desktop { display: block; } .hw-conn-v-desktop { display: block; } }

        .hw-glass { background: rgba(28,25,23,0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 4px 16px rgba(0,0,0,0.2), 0 0 0 0.5px rgba(255,255,255,0.05) inset; }
        .hw-mini { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.4s ease; z-index: 2; }
        .hw-mini-1 { z-index: 3; animation: hwFloat1 4s ease-in-out infinite; }
        .hw-mini-2 { animation: hwFloat2 4s ease-in-out infinite; animation-delay: 2s; }
        @keyframes hwFloat1 { 0%, 100% { transform: translate3d(2px,0,0) rotate(-2deg); } 50% { transform: translate3d(-2px,-3px,0) rotate(-4deg); } }
        @keyframes hwFloat2 { 0%, 100% { transform: translate3d(-2px,0,0) rotate(2deg); } 50% { transform: translate3d(2px,-3px,0) rotate(4deg); } }
        .hw-cell:hover .hw-mini-1 { animation: none; transform: translate3d(-8px,-2px,0) rotate(-6deg); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
        .hw-cell:hover .hw-mini-2 { animation: none; transform: translate3d(8px,-2px,0) rotate(6deg); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
        .group\/c1:hover .hw-mini-1 { animation: none !important; transform: translate3d(-12px,-5px,0) rotate(-8deg) scale(1.08) !important; box-shadow: 0 12px 32px rgba(0,0,0,0.35) !important; border-color: rgba(255,255,255,0.15) !important; z-index: 10; }
        .group\/c2:hover .hw-mini-2 { animation: none !important; transform: translate3d(12px,-5px,0) rotate(8deg) scale(1.08) !important; box-shadow: 0 12px 32px rgba(0,0,0,0.35) !important; border-color: rgba(255,255,255,0.15) !important; z-index: 10; }

        .hw-pv { position: fixed; top: 50%; left: 50%; z-index: 9999; opacity: 0; transform: translate(-50%, -50%) translate3d(0,16px,0) scale(0.94); transition: opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1); will-change: transform, opacity; backface-visibility: hidden; }
        .hw-pv-glass { background: rgba(28,25,23,0.92); backdrop-filter: blur(24px) saturate(1.2); -webkit-backdrop-filter: blur(24px) saturate(1.2); border: 1px solid rgba(255,255,255,0.06); box-shadow: 0 32px 100px rgba(0,0,0,0.3), 0 12px 40px rgba(0,0,0,0.15), 0 0 0 0.5px rgba(255,255,255,0.04) inset; max-width: min(90vw, 420px); }
        .hw-label-glass { background: rgba(28,25,23,0.9); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
        .group\/c1:hover > .hw-pv, .group\/c2:hover > .hw-pv { opacity: 1; transform: translate(-50%, -50%) translate3d(0,0,0) scale(1); }
        @media (max-width: 639px) { .hw-pv-glass { max-width: min(92vw, 360px); } }

        @media (prefers-reduced-motion: reduce) {
          .hw-cell, .hw-num, .hw-day, .hw-icon-wrap, .hw-icon, .hw-title, .hw-mini, .hw-pv,
          .hw-conn-line-h, .hw-conn-line-v, .hw-conn-dot-start, .hw-conn-dot-end, .hw-conn-dot-top, .hw-conn-dot-bottom {
            transition: none !important; animation: none !important;
          }
          .hw-pv { display: none !important; }
        }
      `}</style>
    </section>
  )
}