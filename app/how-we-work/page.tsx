"use client"

import React, { useEffect, useRef, useState } from "react"
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
    BarChart3,
    HeartHandshake,
    Zap,
    Shield,
} from "lucide-react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// ─── DATA ────────────────────────────────────────────────────────────
const steps = [
    {
        number: "01",
        icon: MessageSquare,
        phase: "Discovery Call",
        title: "We Listen First",
        tagline: "No templates. Just real talk.",
        description:
            "Every great product starts with understanding — not assumptions. We open with a deep-dive session where we map your vision, your audience, your goals, and what success truly looks like. You talk, we absorb, we ask the hard questions.",
        deliverables: ["Strategic vision document", "Goals & KPI alignment", "Market opportunity brief"],
        duration: "Day 1 – 2",
        accent: "#7C3AED",
        glow: "rgba(124,58,237,0.25)",
        bg: "from-violet-900/20 via-violet-800/5 to-transparent",
    },
    {
        number: "02",
        icon: Lightbulb,
        phase: "Strategy & Blueprint",
        title: "We Architect the Plan",
        tagline: "Vision turned into a roadmap.",
        description:
            "Before a single pixel is drawn or a line of code typed, we lock in the creative strategy, information architecture, and tech stack. You receive a clear, detailed roadmap — no ambiguity, no surprises, ever.",
        deliverables: ["Technical architecture doc", "UX wireframes & user flows", "Project timeline & milestones"],
        duration: "Day 3 – 7",
        accent: "#0EA5E9",
        glow: "rgba(14,165,233,0.25)",
        bg: "from-sky-900/20 via-sky-800/5 to-transparent",
    },
    {
        number: "03",
        icon: PenTool,
        phase: "Design & Prototyping",
        title: "We Bring it to Life Visually",
        tagline: "Pixels that earn attention.",
        description:
            "Our designers craft high-fidelity prototypes that feel and behave like the real product. We present, iterate, and refine until every colour, typeface, spacing decision, and micro-interaction perfectly aligns with your brand DNA.",
        deliverables: ["Complete design system", "Interactive Figma prototype", "Brand-aligned UI kit"],
        duration: "Week 2 – 3",
        accent: "#EC4899",
        glow: "rgba(236,72,153,0.25)",
        bg: "from-pink-900/20 via-pink-800/5 to-transparent",
    },
    {
        number: "04",
        icon: Code2,
        phase: "Engineering & Build",
        title: "We Build it Right",
        tagline: "Clean code. Zero compromise.",
        description:
            "World-class code meets design precision. We build with clean, scalable architecture — performance, accessibility, and security are built-in from day one. Weekly sprint demos keep you in the loop. Nothing hides in a black box.",
        deliverables: ["Production-ready codebase", "Weekly sprint demos", "Staging environment access"],
        duration: "Week 3 – 6",
        accent: "#10B981",
        glow: "rgba(16,185,129,0.25)",
        bg: "from-emerald-900/20 via-emerald-800/5 to-transparent",
    },
    {
        number: "05",
        icon: CheckCircle2,
        phase: "QA & Refinement",
        title: "We Perfect Every Detail",
        tagline: "If it's not perfect, it doesn't ship.",
        description:
            "Rigorous multi-device, cross-browser testing. Performance audits. Accessibility checks. User acceptance testing. We ensure zero issues reach your users. Our definition of 'done' is stricter than most people's definition of 'great'.",
        deliverables: ["Full QA test report", "90+ Lighthouse performance score", "UAT sign-off document"],
        duration: "Week 6 – 7",
        accent: "#F59E0B",
        glow: "rgba(245,158,11,0.25)",
        bg: "from-amber-900/20 via-amber-800/5 to-transparent",
    },
    {
        number: "06",
        icon: Rocket,
        phase: "Launch & Grow",
        title: "We Launch & Grow With You",
        tagline: "Launch is the starting gun, not the finish line.",
        description:
            "Launch day is a celebration, not a gamble. We handle CI/CD pipelines, monitoring, and a staged rollout so your launch is flawless. Then we stay — monitoring real user behaviour, running A/B tests, and shipping rapid improvements to keep you ahead.",
        deliverables: ["Zero-downtime deployment", "Analytics & monitoring setup", "Conversion rate optimisation"],
        duration: "Week 7 – Ongoing ∞",
        accent: "#6366F1",
        glow: "rgba(99,102,241,0.25)",
        bg: "from-indigo-900/20 via-indigo-800/5 to-transparent",
    },
]

const principles = [
    {
        icon: HeartHandshake,
        title: "Radical Transparency",
        description: "You always know what we're building, why, and when. No black boxes, no surprises.",
        accent: "#7C3AED",
    },
    {
        icon: Zap,
        title: "Speed Without Sacrifice",
        description: "We move at startup speed — but never at the expense of quality, security, or scalability.",
        accent: "#F59E0B",
    },
    {
        icon: Shield,
        title: "Outcome-Obsessed",
        description: "We don't celebrate shipping features. We celebrate when your metrics move in the right direction.",
        accent: "#10B981",
    },
]

// ─── COMPONENTS ──────────────────────────────────────────────────────
function FloatingOrb({
    className,
    style,
}: {
    className?: string
    style?: React.CSSProperties
}) {
    return (
        <div
            className={`absolute rounded-full pointer-events-none blur-3xl ${className}`}
            style={style}
        />
    )
}

// Animated background particles
function DotGrid({ opacity = 0.03 }: { opacity?: number }) {
    return (
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
                backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
                opacity,
            }}
        />
    )
}


// ─── STICKY NOTE ──────────────────────────────────────────────────────

// Floating icon tile — glossy dark themed
function HeroIcon({
    icon: Icon,
    label,
    style,
}: {
    icon: React.ElementType
    label: string
    style: React.CSSProperties
}) {
    return (
        <div
            className="hero-float-icon absolute flex items-center justify-center w-[56px] h-[56px] rounded-[14px] transition-transform duration-700"
            style={{
                background: "linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 60%, #111111 100%)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.07)",
                ...style,
            }}
            title={label}
        >
            <Icon className="h-6 w-6 text-white" strokeWidth={1.6} style={{ filter: "drop-shadow(0 1px 2px rgba(255,255,255,0.15))" }} />
        </div>
    )
}

// ─── PAGE ─────────────────────────────────────────────────────────────
export default function HowWeWorkPage() {
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeStep, setActiveStep] = useState<number | null>(null)
    const [scrollPct, setScrollPct] = useState(0)

    // Scroll-progress tracker for the spine fill
    useEffect(() => {
        const onScroll = () => {
            const el = containerRef.current
            if (!el) return
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement
            setScrollPct((scrollTop / (scrollHeight - clientHeight)) * 100)
        }
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        if (!containerRef.current) return

        const ctx = gsap.context(() => {
            // ── Hero
            const heroTl = gsap.timeline()
            heroTl
                .from(".hww-badge", { y: 24, opacity: 0, duration: 0.6, ease: "power3.out" })
                .from(".hww-h1 .line-1", { y: 60, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=0.3")
                .from(".hww-h1 .line-2", { y: 60, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=0.65")
                .from(".hww-hero-desc", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
                .from(".hww-hero-cta", { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
                .from(".hww-hero-stats .stat-item", { y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" }, "-=0.4")

            // ── Scrolling timeline number (spine progress visual)
            gsap.to(".journey-spine", {
                scrollTrigger: {
                    trigger: ".steps-section",
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                },
                opacity: 0.55,
            })

            // ── Step cards: cinematic alternating entrance
            gsap.utils.toArray<HTMLElement>(".step-row").forEach((row, i) => {
                const isEven = i % 2 === 0
                const card = row.querySelector(".step-card-inner")
                const bubble = row.querySelector(".step-bubble")
                const tagEl = row.querySelector(".step-tag")

                if (card) {
                    gsap.from(card, {
                        scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
                        x: isEven ? -80 : 80,
                        opacity: 0,
                        duration: 1,
                        ease: "power4.out",
                    })
                }

                if (bubble) {
                    gsap.from(bubble, {
                        scrollTrigger: { trigger: bubble, start: "top 88%", toggleActions: "play none none none" },
                        scale: 0,
                        opacity: 0,
                        duration: 0.8,
                        ease: "back.out(2)",
                    })
                }

                if (tagEl) {
                    gsap.from(tagEl, {
                        scrollTrigger: { trigger: tagEl, start: "top 88%" },
                        y: 15,
                        opacity: 0,
                        duration: 0.6,
                        ease: "power3.out",
                    })
                }
            })

            // ── Deliverable check items stagger per card
            gsap.utils.toArray<HTMLElement>(".deliverable-item").forEach((el) => {
                gsap.from(el, {
                    scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
                    x: -20,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out",
                })
            })



            // ── CTA
            gsap.from(".hww-cta-section > *", {
                scrollTrigger: { trigger: ".hww-cta-section", start: "top 80%" },
                y: 50,
                opacity: 0,
                duration: 0.9,
                stagger: 0.15,
                ease: "power3.out",
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />

            {/* ─── HERO ──────────────────────────────────────────────────── */}
            <section className="relative flex flex-col items-center justify-center text-center px-5 pt-8 pb-10 sm:pt-28 sm:pb-24 overflow-hidden sm:min-h-[88vh]">

                {/* Full-area dot grid */}
                <DotGrid opacity={0.04} />

                {/* Subtle centre glow */}
                <FloatingOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5" />

                {/* ── LEFT floating icons (desktop only) ─────────────────── */}
                <div className="absolute left-0 inset-y-0 w-[260px] sm:w-[300px] lg:w-[340px] hidden md:block pointer-events-none select-none">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                            opacity: 0.045,
                            maskImage: "linear-gradient(to right, black 60%, transparent 100%)",
                            WebkitMaskImage: "linear-gradient(to right, black 60%, transparent 100%)",
                        }}
                    />
                    <HeroIcon icon={MessageSquare} label="Strategy" style={{ top: "8%", left: "38%" }} />
                    <HeroIcon icon={PenTool} label="Design" style={{ top: "22%", left: "8%" }} />
                    <HeroIcon icon={Code2} label="Engineering" style={{ top: "22%", left: "38%" }} />
                    <HeroIcon icon={Lightbulb} label="Blueprint" style={{ top: "42%", left: "14%" }} />
                    <HeroIcon icon={Shield} label="Security" style={{ top: "55%", left: "38%" }} />
                    <HeroIcon icon={Zap} label="Speed" style={{ top: "68%", left: "8%" }} />
                    <HeroIcon icon={HeartHandshake} label="Partnership" style={{ top: "82%", left: "32%" }} />
                </div>

                {/* ── RIGHT floating icons (desktop only) ──────────────────── */}
                <div className="absolute right-0 inset-y-0 w-[260px] sm:w-[300px] lg:w-[340px] hidden md:block pointer-events-none select-none">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                            opacity: 0.045,
                            maskImage: "linear-gradient(to left, black 60%, transparent 100%)",
                            WebkitMaskImage: "linear-gradient(to left, black 60%, transparent 100%)",
                        }}
                    />
                    <HeroIcon icon={Rocket} label="Launch" style={{ top: "5%", right: "36%" }} />
                    <HeroIcon icon={BarChart3} label="Analytics" style={{ top: "18%", right: "10%" }} />
                    <HeroIcon icon={CheckCircle2} label="QA" style={{ top: "32%", right: "36%" }} />
                    <HeroIcon icon={ArrowRight} label="Delivery" style={{ top: "46%", right: "5%" }} />
                    <HeroIcon icon={Lightbulb} label="Innovation" style={{ top: "60%", right: "38%" }} />
                    <HeroIcon icon={Code2} label="Dev" style={{ top: "72%", right: "10%" }} />
                    <HeroIcon icon={HeartHandshake} label="Trust" style={{ top: "84%", right: "34%" }} />
                </div>

                {/* ── Centre content ──────────────────────────────────────── */}
                <div className="relative z-10 max-w-xl mx-auto w-full">
                    <h1 className="hww-h1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-[1.05] mb-5 text-foreground">
                        <span className="line-1 block">How We Turn</span>
                        <span className="line-2 block">Vision Into</span>
                        <span className="block bg-gradient-to-r from-violet-500 via-pink-500 to-amber-400 bg-clip-text text-transparent">
                            Reality
                        </span>
                    </h1>

                    <p className="hww-hero-desc text-sm sm:text-base text-muted-foreground max-w-xs sm:max-w-sm mx-auto leading-relaxed mb-6 sm:mb-8">
                        A 6-step journey from your first call to a product your users will love — and your competitors will fear.
                    </p>

                    {/* Inline stats */}
                    <div className="hww-hero-stats flex items-start justify-center gap-8 sm:gap-14 mb-8">
                        {[
                            { value: "8 wks", label: "avg. delivery" },
                            { value: "100%", label: "on-time rate" },
                            { value: "24 / 7", label: "client comms" },
                        ].map((s) => (
                            <div key={s.label} className="stat-item flex flex-col items-start gap-0.5">
                                <span className="text-2xl sm:text-3xl font-black text-foreground">{s.value}</span>
                                <span className="text-[11px] font-medium text-muted-foreground/60">{s.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* ── Mobile icon grid (hidden on desktop) ────────── */}
                    <div className="md:hidden w-full mt-2">
                        <div className="flex flex-wrap justify-center gap-3">
                            {[
                                MessageSquare, PenTool, Code2, Lightbulb, Shield,
                                Zap, HeartHandshake, Rocket, BarChart3, CheckCircle2,
                                ArrowRight,
                            ].map((IconComp, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-center w-11 h-11 rounded-[11px]"
                                    style={{
                                        background: "linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 60%, #111111 100%)",
                                        boxShadow: "0 4px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                    }}
                                >
                                    <IconComp className="h-5 w-5 text-white" strokeWidth={1.6} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scroll hint — inline on mobile, absolute on desktop */}
                    <div className="md:hidden flex flex-col items-center gap-1.5 mt-8 opacity-40">
                        <span className="text-[9px] uppercase tracking-widest text-muted-foreground">Scroll to explore</span>
                        <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
                            <rect x="1" y="1" width="12" height="20" rx="6" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="7" cy="7" r="2" fill="currentColor" className="animate-bounce" />
                        </svg>
                    </div>
                </div>

                {/* Scroll hint — only visible on desktop */}
                <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 opacity-35 animate-bounce">
                    <span className="text-[9px] uppercase tracking-widest text-muted-foreground">Scroll to explore</span>
                    <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
                        <rect x="1" y="1" width="12" height="20" rx="6" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="7" cy="7" r="2" fill="currentColor" className="animate-bounce" />
                    </svg>
                </div>
            </section>

            {/* ─── STICKY NOTES PROCESS ─────────────────────────────────── */}
            <section className="steps-section relative py-16 sm:py-24 px-4">
                <div className="mx-auto max-w-6xl">

                    {/* Section header */}
                    <div className="text-center mb-14">
                        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground/50 mb-2">
                            The Journey
                        </p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.03em]">
                            6 Steps.{" "}
                            <span className="bg-gradient-to-r from-muted-foreground/60 to-muted-foreground/30 bg-clip-text text-transparent">
                                One Promise.
                            </span>
                        </h2>
                    </div>

                    {/* Sticky notes grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {steps.map((step, index) => (
                            <StickyNote key={step.number} step={step} index={index} />
                        ))}
                    </div>

                    {/* Bottom dashed connector SVG between last row */}
                    <div className="hidden lg:flex justify-center mt-6 opacity-20">
                        <svg width="600" height="32" viewBox="0 0 600 32" fill="none">
                            <path
                                d="M60 16 Q200 0 300 16 Q400 32 540 16"
                                stroke="hsl(var(--foreground))"
                                strokeWidth="1.5"
                                strokeDasharray="8 6"
                                fill="none"
                            />
                        </svg>
                    </div>
                </div>
            </section>


            {/* ─── FINAL CTA ─────────────────────────────────────────────── */}
            <section className="relative py-24 sm:py-36 px-4 overflow-hidden">
                {/* Background aurora */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.08) 0%, rgba(236,72,153,0.05) 40%, transparent 70%)",
                    }}
                />
                <DotGrid opacity={0.025} />

                {/* Top doodle wave */}
                <div className="absolute top-0 left-0 right-0">
                    <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full opacity-[0.07]">
                        <path
                            d="M0 25 Q360 0 720 25 Q1080 50 1440 25"
                            stroke="hsl(var(--foreground))"
                            strokeWidth="1.5"
                            strokeDasharray="10 8"
                            fill="none"
                        />
                    </svg>
                </div>

                <div className="hww-cta-section relative z-10 mx-auto max-w-3xl text-center">
                    <div
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-10"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Ready to Begin?
                    </div>

                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.04em] leading-[1.0] mb-6">
                        Your Vision.
                        <br />
                        <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-amber-400 bg-clip-text text-transparent">
                            Our Craft.
                        </span>
                    </h2>

                    <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed font-light">
                        You have seen our process. Now let's put it to work for you. A 30-minute call is all it takes to get started — and it costs you absolutely nothing.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            size="lg"
                            className="rounded-full px-12 h-14 text-base font-bold shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-95 group"
                            onClick={() => router.push("/book")}
                        >
                            Book a Free Discovery Call
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                    <p className="mt-8 text-sm text-muted-foreground/50 italic">
                        No commitment. No pressure. 100% free.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    )
}

// ─── STICKY NOTE ──────────────────────────────────────────────────────
const TILTS = [-2.2, 1.5, -1.8, 2.0, -1.2, 2.5]

function StickyNote({ step, index }: { step: (typeof steps)[0]; index: number }) {
    const Icon = step.icon
    const tilt = TILTS[index % TILTS.length]

    // Pastel note background colours (dark-mode friendly translucent tints)
    const noteBgs = [
        "rgba(124,58,237,0.08)",   // violet
        "rgba(14,165,233,0.08)",   // sky
        "rgba(236,72,153,0.08)",   // pink
        "rgba(16,185,129,0.08)",   // emerald
        "rgba(245,158,11,0.08)",   // amber
        "rgba(99,102,241,0.08)",   // indigo
        "rgba(20,184,166,0.08)",   // teal
    ]
    const noteBg = noteBgs[index % noteBgs.length]

    // Each step's push-pin colour (colorful, matching reference)
    const pinColors = ["#22c55e", "#ef4444", "#14b8a6", "#3b82f6", "#eab308", "#a855f7", "#f97316"]
    const pinColor = pinColors[index % pinColors.length]

    return (
        <div
            className="step-card-inner group relative flex flex-col"
            style={{ transform: `rotate(${tilt}deg)`, transformOrigin: "center top" }}
        >
            {/* Push-pin */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                {/* Pin head */}
                <div
                    className="w-6 h-6 rounded-full shadow-lg border-2 border-white/20"
                    style={{ background: `radial-gradient(circle at 35% 35%, ${pinColor}ee, ${pinColor}88)` }}
                />
                {/* Pin shaft */}
                <div
                    className="w-[2px] h-4 rounded-b-full"
                    style={{ background: `linear-gradient(to bottom, ${pinColor}cc, transparent)` }}
                />
            </div>

            {/* Note card */}
            <div
                className="relative rounded-2xl overflow-hidden transition-all duration-400 group-hover:shadow-2xl group-hover:scale-[1.02]"
                style={{
                    background: noteBg,
                    border: `1px solid ${step.accent}25`,
                    backdropFilter: "blur(12px)",
                    boxShadow: `0 4px 24px rgba(0,0,0,0.12), 0 0 0 1px ${step.accent}15, inset 0 1px 0 rgba(255,255,255,0.05)`,
                }}
            >
                {/* Subtle top colour stripe */}
                <div
                    className="h-1 w-full"
                    style={{ background: `linear-gradient(to right, ${step.accent}, ${step.accent}60)` }}
                />

                <div className="p-6">
                    {/* Number + icon row */}
                    <div className="flex items-start justify-between mb-4">
                        <span
                            className="text-3xl font-black leading-none"
                            style={{ color: step.accent }}
                        >
                            {step.number}
                        </span>
                        <div
                            className="flex items-center justify-center w-11 h-11 rounded-xl"
                            style={{
                                background: `${step.accent}18`,
                                border: `1px solid ${step.accent}30`,
                            }}
                        >
                            <Icon className="h-5 w-5" style={{ color: step.accent }} />
                        </div>
                    </div>

                    {/* Phase label */}
                    <p
                        className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1"
                        style={{ color: step.accent }}
                    >
                        {step.phase}
                    </p>

                    {/* Title */}
                    <h3 className="text-lg font-black text-foreground leading-snug mb-1">
                        {step.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-xs italic text-muted-foreground/60 mb-3">
                        &ldquo;{step.tagline}&rdquo;
                    </p>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {step.description}
                    </p>

                    {/* Divider */}
                    <div
                        className="h-px w-full mb-3"
                        style={{ background: `linear-gradient(to right, ${step.accent}40, transparent)` }}
                    />

                    {/* Deliverables */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {step.deliverables.map((d) => (
                            <span
                                key={d}
                                className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                style={{
                                    background: `${step.accent}12`,
                                    color: step.accent,
                                    border: `1px solid ${step.accent}25`,
                                }}
                            >
                                <CheckCircle2 className="h-2.5 w-2.5" />
                                {d}
                            </span>
                        ))}
                    </div>

                    {/* Duration badge */}
                    <div className="flex items-center justify-end">
                        <span
                            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                            style={{
                                background: `${step.accent}18`,
                                color: step.accent,
                                border: `1px solid ${step.accent}30`,
                            }}
                        >
                            {step.duration}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
