"use client"

import React from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles, ArrowDown } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)
    const [heroVisible, setHeroVisible] = useState(false)

    useEffect(() => { setHeroVisible(true) }, [])

    const teamMembers = [
        { name: "Arpan Sarkar", role: "Founder & CEO", image: "/arpan.png", bio: "Dynamic young entrepreneur leading Insalink's mission. Specializes in delivering premium digital solutions for high-ticket clients and global brands.", linkedin: "https://linkedin.com/in/arpansarkar", email: "arpan@insalink.com", achievements: ["Forbes 30 Under 30", "TEDx Speaker", "Y Combinator Alumni"] },
        { name: "Himanshu Meena", role: "Chief Technology Officer", image: "/himanshu.jpeg", bio: "Experienced full-stack developer with a track record of building robust, scalable digital products across the entire stack.", linkedin: "https://linkedin.com/in/himanshumeena", email: "himanshu@insalink.com", achievements: ["MIT Graduate", "20+ Patents", "Open Source Contributor"] },
        { name: "Ashibur Rahaman", role: "Managing Director", image: "/ashibur.png", bio: "Expert coordinator bridging the gap between clients and the development team. Ensures seamless communication and project delivery excellence.", linkedin: "https://linkedin.com/in/ashiburrahaman", email: "ashibur@insalink.com", achievements: ["Ex-McKinsey", "Built 3 Exits", "Angel Investor"] },
        { name: "Ravi Choudhary", role: "UI/UX Designer", image: "/ravi.png", bio: "Creative visual thinker who transforms complex user flows into seamless, beautiful digital experiences. Passionate about human-centred design and pixel-perfect interfaces.", linkedin: "https://linkedin.com/in/ravichoudhary", email: "ravi@insalink.com", achievements: ["Design Award Winner", "100+ Figma Projects", "Adobe Certified"] },
    ]

    const steps = [
        { number: "01", title: "Discovery", description: "We dive deep into your industry, goals, and challenges to find the perfect angle." },
        { number: "02", title: "Strategy & Design", description: "Mapping out the user journey and creating high-fidelity prototypes that wow." },
        { number: "03", title: "Agile Development", description: "Building with scale in mind using the most modern and robust tech stacks." },
        { number: "04", title: "Launch & Scale", description: "We don't stop at deployment. We optimize and grow alongside your success." },
    ]

    useEffect(() => {
        if (!containerRef.current) return
        const ctx = gsap.context(() => {
            gsap.from(".team-header", { scrollTrigger: { trigger: ".team-grid", start: "top 90%" }, y: 30, opacity: 0, duration: 1, ease: "power2.out" })
            gsap.from(".process-header", { scrollTrigger: { trigger: ".process-grid", start: "top 90%" }, y: 30, opacity: 0, duration: 1, ease: "power2.out" })
        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <div className="min-h-screen bg-background text-foreground" ref={containerRef}>
            <Navbar />

            <main>
                {/* ── HERO ── */}
                <section className="relative pt-6 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
                    {/* Ambient */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-stone-100/40 blur-[80px] sm:blur-[120px]" />
                        <div className="absolute bottom-1/4 -left-32 w-[250px] h-[250px] rounded-full bg-stone-50/30 blur-[60px]" />
                    </div>

                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Top bar — label + scroll hint */}
                        <div
                            className="flex items-center justify-between mb-12 sm:mb-16 lg:mb-20"
                            style={{
                                opacity: heroVisible ? 1 : 0,
                                transform: heroVisible ? "translate3d(0,0,0)" : "translate3d(0,10px,0)",
                                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                                transitionDelay: "0.05s",
                            }}
                        >
                            <div className="inline-flex items-center gap-2.5">
                                <div className="w-8 h-px bg-stone-900" />
                                <p className="text-[10px] sm:text-[11px] font-semibold text-stone-500 uppercase tracking-[0.3em]">
                                    About Insalink
                                </p>
                            </div>
                            <p className="text-[9px] font-mono text-stone-300 tracking-wider uppercase hidden sm:block">
                                EST. 2024
                            </p>
                        </div>

                        {/* Main content — asymmetric layout */}
                        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-end">
                            {/* Left — large heading spans 8 cols */}
                            <div
                                className="lg:col-span-8"
                                style={{
                                    opacity: heroVisible ? 1 : 0,
                                    transform: heroVisible ? "translate3d(0,0,0)" : "translate3d(0,20px,0)",
                                    transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                                    transitionDelay: "0.15s",
                                }}
                            >
                                <h1 className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold tracking-[-0.04em] leading-[0.9] sm:leading-[0.88]">
                                    <span className="text-stone-900 block">Innovating</span>
                                    <span className="text-stone-900 block">Beyond</span>
                                    <span className="text-stone-200 block mt-1 sm:mt-2">Boundaries</span>
                                </h1>
                            </div>

                            {/* Right — description + CTA, spans 4 cols, bottom-aligned */}
                            <div
                                className="lg:col-span-4 lg:pb-2"
                                style={{
                                    opacity: heroVisible ? 1 : 0,
                                    transform: heroVisible ? "translate3d(0,0,0)" : "translate3d(0,16px,0)",
                                    transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                                    transitionDelay: "0.3s",
                                }}
                            >
                                <p className="text-[13px] sm:text-sm text-stone-400 leading-[1.8] font-light mb-6">
                                    A remote-first studio of engineers, designers, and strategists.
                                    We craft high-performance digital products for brands that refuse to settle.
                                </p>

                                <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5">
                                    <button
                                        className="ab-btn-p group relative rounded-full px-6 py-3 text-[13px] font-semibold overflow-hidden w-full sm:w-auto"
                                        onClick={() => router.push("/book")}
                                    >
                                        <span className="ab-btn-p-fill" />
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Start a Project
                                            <ArrowRight className="w-3.5 h-3.5 ab-btn-p-arr" />
                                        </span>
                                    </button>
                                    <button
                                        className="ab-btn-s group relative rounded-full px-6 py-3 text-[13px] font-semibold overflow-hidden w-full sm:w-auto"
                                        onClick={() => router.push("/#social-proof")}
                                    >
                                        <span className="ab-btn-s-fill" />
                                        <span className="relative z-10">View Our Work</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Animated underline */}
                        <div
                            className="mt-8 sm:mt-10"
                            style={{
                                opacity: heroVisible ? 1 : 0,
                                transition: "opacity 0.8s ease",
                                transitionDelay: "0.4s",
                            }}
                        >
                            <div className="ab-underline h-px rounded-full" />
                        </div>

                        {/* Value propositions — replaces fake stats */}
                        <div
                            className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
                            style={{
                                opacity: heroVisible ? 1 : 0,
                                transform: heroVisible ? "translate3d(0,0,0)" : "translate3d(0,12px,0)",
                                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                                transitionDelay: "0.5s",
                            }}
                        >
                            {[
                                { title: "Design-Driven Development", desc: "Every line of code starts with a design decision. We build products that look as good as they perform." },
                                { title: "Performance-First Engineering", desc: "Sub-second load times, 90+ Lighthouse scores, and infrastructure built to scale from day one." },
                                { title: "Scalable Digital Products", desc: "From MVP to enterprise. We architect systems that grow with your business, not against it." },
                            ].map((item, i) => (
                                <div key={i} className="ab-vp group cursor-default">
                                    <div className="flex items-center gap-2.5 mb-3">
                                        <span className="ab-vp-num text-[9px] font-mono font-bold text-stone-200">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <div className="ab-vp-line flex-1 h-px bg-stone-100" />
                                    </div>
                                    <h3 className="ab-vp-title text-sm font-semibold text-stone-900 tracking-[-0.01em] mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="ab-vp-desc text-[12px] sm:text-[13px] text-stone-400 leading-[1.7] font-light">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Scroll indicator */}
                        <div
                            className="flex flex-col items-center gap-2 mt-14 sm:mt-18"
                            style={{
                                opacity: heroVisible ? 1 : 0,
                                transition: "opacity 1s ease",
                                transitionDelay: "0.7s",
                            }}
                        >
                            <span className="text-[9px] uppercase tracking-[0.2em] text-stone-300 font-semibold">
                                Meet the team
                            </span>
                            <ArrowDown className="w-4 h-4 text-stone-300 animate-bounce" />
                        </div>
                    </div>
                </section>

                {/* Leadership Team Section - UNCHANGED */}
                <section className="pt-12 pb-24 bg-gradient-to-b from-background to-muted/20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 team-header">
                            <Badge variant="outline" className="mb-4">Leadership</Badge>
                            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Meet the Visionaries</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Our leadership team brings together decades of experience in technology, design, and business strategy to drive innovation and deliver exceptional results.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 team-grid">
                            {teamMembers.map((member, i) => (
                                <Card key={i} className="group relative overflow-hidden border-2 p-0 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl team-card">
                                    <CardContent className="p-0">
                                        <div className="relative aspect-[3/4] overflow-hidden"><Image src={member.image} alt={member.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" priority /><div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /></div>
                                        <div className="p-6"><h3 className="text-xl font-bold mb-1">{member.name}</h3><p className="text-primary font-semibold text-sm mb-4">{member.role}</p><p className="text-muted-foreground text-sm leading-relaxed mb-4">{member.bio}</p></div>
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process Section - UNCHANGED */}
                <section className="py-24 bg-black text-white overflow-hidden relative">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col lg:flex-row gap-16 items-start">
                            <div className="lg:w-1/3 lg:sticky lg:top-32 process-header">
                                <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20">Our Process</Badge>
                                <h2 className="text-3xl font-bold sm:text-4xl mb-6">How We Bring Your Vision to Life</h2>
                                <p className="text-gray-400 text-lg leading-relaxed">Transparent, collaborative, and designed for results. Our process ensures zero friction and maximum impact.</p>
                                <div className="mt-12 hidden lg:block"><Sparkles className="w-16 h-16 text-primary/50" /></div>
                            </div>
                            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 process-grid">
                                {steps.map((step, i) => (
                                    <div key={i} className="relative group process-step">
                                        <span className="text-7xl font-bold text-white/5 absolute -top-12 -left-4 group-hover:text-white/10 transition-colors">{step.number}</span>
                                        <div className="relative"><h3 className="text-xl font-bold mb-4 flex items-center gap-3"><span className="block w-2 h-2 rounded-full bg-primary group-hover:w-3 group-hover:h-3 transition-all" />{step.title}</h3><p className="text-gray-400 leading-relaxed">{step.description}</p></div>
                                        {i < steps.length - 1 && <div className="hidden sm:block absolute top-0 -right-6 w-px h-full bg-gradient-to-b from-white/20 via-white/10 to-transparent" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 blur-[150px] rounded-full" /><div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full" /></div>
                </section>
            </main>

            <style jsx global>{`
                /* ═══ UNDERLINE ═══ */
                .ab-underline {
                    width: 0;
                    background: linear-gradient(90deg, #1c1917, rgba(28,25,23,0.1));
                    animation: abLine 1.2s 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
                }
                @keyframes abLine { from { width: 0; } to { width: 100%; } }

                /* ═══ BUTTONS ═══ */
                .ab-btn-p {
                    background: #1c1917; color: white; border: none;
                    box-shadow: 0 1px 4px rgba(28,25,23,0.08);
                    transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease;
                }
                .ab-btn-p:hover { transform: translate3d(0,-2px,0); box-shadow: 0 6px 20px rgba(28,25,23,0.15); }
                .ab-btn-p:active { transform: scale(0.97); transition-duration: 0.15s; }
                .ab-btn-p-fill {
                    position: absolute; inset: 0;
                    background: linear-gradient(135deg, rgba(255,255,255,0.06), transparent);
                    opacity: 0; transition: opacity 0.5s ease; border-radius: inherit;
                }
                .ab-btn-p:hover .ab-btn-p-fill { opacity: 1; }
                .ab-btn-p-arr { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); }
                .ab-btn-p:hover .ab-btn-p-arr { transform: translate3d(3px,0,0); }

                .ab-btn-s {
                    background: transparent; color: #44403c;
                    border: 1px solid rgba(214,211,209,0.5);
                    transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.5s ease, color 0.5s ease;
                }
                .ab-btn-s:hover { transform: translate3d(0,-2px,0); border-color: #1c1917; color: white; }
                .ab-btn-s:active { transform: scale(0.97); transition-duration: 0.15s; }
                .ab-btn-s-fill {
                    position: absolute; inset: 0; background: #1c1917;
                    transform: translate3d(0,100%,0);
                    transition: transform 0.55s cubic-bezier(0.16,1,0.3,1); border-radius: inherit;
                }
                .ab-btn-s:hover .ab-btn-s-fill { transform: translate3d(0,0,0); }

                @media (max-width: 639px) {
                    .ab-btn-p:active { transform: scale(0.96); }
                    .ab-btn-s:active { transform: scale(0.96); background: #1c1917; color: white; }
                    .ab-btn-s:active .ab-btn-s-fill { transform: translate3d(0,0,0); }
                }

                /* ═══ VALUE PROPS ═══ */
                .ab-vp {
                    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
                }
                .ab-vp:hover { transform: translate3d(0,-2px,0); }

                .ab-vp-num { transition: color 0.4s ease; }
                .ab-vp:hover .ab-vp-num { color: #1c1917; }

                .ab-vp-line { transition: background-color 0.4s ease; }
                .ab-vp:hover .ab-vp-line { background-color: #1c1917; }

                .ab-vp-title { transition: color 0.4s ease; }

                .ab-vp-desc { transition: color 0.4s ease; }
                .ab-vp:hover .ab-vp-desc { color: #57534e; }

                /* ═══ REDUCED MOTION ═══ */
                @media (prefers-reduced-motion: reduce) {
                    .ab-underline, .ab-btn-p, .ab-btn-p-fill, .ab-btn-p-arr,
                    .ab-btn-s, .ab-btn-s-fill, .ab-vp, .ab-vp-num, .ab-vp-line,
                    .ab-vp-title, .ab-vp-desc {
                        transition: none !important; animation: none !important;
                    }
                    .ab-underline { width: 100%; }
                }
            `}</style>
        </div>
    )
}