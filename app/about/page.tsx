"use client"

import React from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Rocket, Sparkles, Trophy, Star, Target } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)


    const teamMembers = [
        {
            name: "Arpan Sarkar",
            role: "Founder & CEO",
            image: "/arpan.png",
            bio: "Dynamic young entrepreneur leading Insalink's mission. Specializes in delivering premium digital solutions for high-ticket clients and global brands.",
            linkedin: "https://linkedin.com/in/arpansarkar",
            email: "arpan@insalink.com",
            achievements: ["Forbes 30 Under 30", "TEDx Speaker", "Y Combinator Alumni"]
        },
        {
            name: "Himanshu Meena",
            role: "Chief Technology Officer",
            image: "/himanshu.jpeg",
            bio: "Experienced full-stack developer with a track record of building robust, scalable digital products across the entire stack.",
            linkedin: "https://linkedin.com/in/himanshumeena",
            email: "himanshu@insalink.com",
            achievements: ["MIT Graduate", "20+ Patents", "Open Source Contributor"]
        },
        {
            name: "Ashibur Rahaman",
            role: "Managing Director",
            image: "/ashibur.png",
            bio: "Expert coordinator bridging the gap between clients and the development team. Ensures seamless communication and project delivery excellence.",
            linkedin: "https://linkedin.com/in/ashiburrahaman",
            email: "ashibur@insalink.com",
            achievements: ["Ex-McKinsey", "Built 3 Exits", "Angel Investor"]
        },
        {
            name: "Ravi Choudhary",
            role: "UI/UX Designer",
            image: "/ravi.png",
            bio: "Creative visual thinker who transforms complex user flows into seamless, beautiful digital experiences. Passionate about human-centred design and pixel-perfect interfaces.",
            linkedin: "https://linkedin.com/in/ravichoudhary",
            email: "ravi@insalink.com",
            achievements: ["Design Award Winner", "100+ Figma Projects", "Adobe Certified"]
        },
    ]

    const steps = [
        {
            number: "01",
            title: "Discovery",
            description: "We dive deep into your industry, goals, and challenges to find the perfect angle.",
        },
        {
            number: "02",
            title: "Strategy & Design",
            description: "Mapping out the user journey and creating high-fidelity prototypes that wow.",
        },
        {
            number: "03",
            title: "Agile Development",
            description: "Building with scale in mind using the most modern and robust tech stacks.",
        },
        {
            number: "04",
            title: "Launch & Scale",
            description: "We don't stop at deployment. We optimize and grow alongside your success.",
        },
    ]




    useEffect(() => {
        if (!containerRef.current) return

        const ctx = gsap.context(() => {
            // Hero section animations
            gsap.from(".hero-content > *", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
            })



            // Team section header reveal
            gsap.from(".team-header", {
                scrollTrigger: {
                    trigger: ".team-grid",
                    start: "top 90%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
            })

            // Process section header
            gsap.from(".process-header", {
                scrollTrigger: {
                    trigger: ".process-grid",
                    start: "top 90%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div className="min-h-screen bg-background text-foreground" ref={containerRef}>
            <Navbar />

            <main>
                {/* Hero Section - ENHANCED */}
                <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32 lg:pt-36 lg:pb-40">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="hero-content">
                            {/* Badge */}
                            <div className="flex justify-center mb-6 sm:mb-8">
                                <Badge variant="secondary" className="rounded-full px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium shadow-lg backdrop-blur-sm">
                                    <Star className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1.5 sm:mr-2 fill-current" />
                                    Our Story
                                </Badge>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6 sm:mb-8 leading-tight">
                                Innovating Beyond
                                <br className="hidden sm:block" />
                                <span className="inline-block mt-2 sm:mt-0 sm:ml-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                                    Boundaries
                                </span>
                            </h1>

                            {/* Subheading */}
                            <p className="text-center mx-auto max-w-2xl lg:max-w-3xl text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed px-4 sm:px-0 mb-10 sm:mb-12">
                                We transform ambitious visions into high-performance digital landmarks. Crafting the future for the world's most visionary brands.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 sm:mb-20">
                                <Button
                                    size="lg"
                                    className="group w-full sm:w-auto px-8 py-6 text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                                    onClick={() => router.push("/book")}
                                >
                                    Start Your Project
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full sm:w-auto px-8 py-6 text-base font-semibold border-2 hover:bg-accent transition-all duration-300"
                                    onClick={() => router.push("/#social-proof")}
                                >
                                    View Our Work
                                </Button>
                            </div>

                        </div>
                    </div>

                    {/* Enhanced Background Elements */}
                    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                        {/* Gradient orbs */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
                        <div className="absolute top-1/4 -left-20 sm:left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary blur-[100px] sm:blur-[150px] rounded-full opacity-20 animate-pulse" style={{ animationDuration: '4s' }} />
                        <div className="absolute top-1/3 -right-20 sm:right-1/4 w-64 sm:w-80 h-64 sm:h-80 bg-purple-500 blur-[100px] sm:blur-[120px] rounded-full opacity-15 animate-pulse" style={{ animationDuration: '5s' }} />
                        <div className="absolute bottom-1/4 left-1/3 w-48 sm:w-64 h-48 sm:h-64 bg-pink-500 blur-[80px] sm:blur-[100px] rounded-full opacity-10 animate-pulse" style={{ animationDuration: '6s' }} />

                        {/* Grid pattern */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] sm:bg-[size:6rem_6rem] opacity-10" />

                        {/* Noise texture */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 brightness-100 contrast-150 mix-blend-soft-light" />
                    </div>
                </section>


                {/* Leadership Team Section - ORIGINAL */}
                <section className="pt-12 pb-24 bg-gradient-to-b from-background to-muted/20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 team-header">
                            <Badge variant="outline" className="mb-4">Leadership</Badge>
                            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Meet the Visionaries</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                                Our leadership team brings together decades of experience in technology, design, and business strategy to drive innovation and deliver exceptional results.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 team-grid">
                            {teamMembers.map((member, i) => (
                                <Card
                                    key={i}
                                    className="group relative overflow-hidden border-2 p-0 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl team-card"
                                >
                                    <CardContent className="p-0">
                                        <div className="relative aspect-[3/4] overflow-hidden">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                priority
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                            <p className="text-primary font-semibold text-sm mb-4">{member.role}</p>
                                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                                {member.bio}
                                            </p>

                                        </div>

                                        {/* Decorative corner accent */}
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>


                {/* Process Section - ORIGINAL */}
                <section className="py-24 bg-black text-white overflow-hidden relative">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col lg:flex-row gap-16 items-start">
                            <div className="lg:w-1/3 lg:sticky lg:top-32 process-header">
                                <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20">
                                    Our Process
                                </Badge>
                                <h2 className="text-3xl font-bold sm:text-4xl mb-6">How We Bring Your Vision to Life</h2>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    Transparent, collaborative, and designed for results. Our process ensures zero friction and maximum impact.
                                </p>
                                <div className="mt-12 hidden lg:block">
                                    <Sparkles className="w-16 h-16 text-primary/50" />
                                </div>
                            </div>

                            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 process-grid">
                                {steps.map((step, i) => (
                                    <div key={i} className="relative group process-step">
                                        <span className="text-7xl font-bold text-white/5 absolute -top-12 -left-4 group-hover:text-white/10 transition-colors">
                                            {step.number}
                                        </span>
                                        <div className="relative">
                                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                                <span className="block w-2 h-2 rounded-full bg-primary group-hover:w-3 group-hover:h-3 transition-all" />
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-400 leading-relaxed">{step.description}</p>
                                        </div>
                                        {i < steps.length - 1 && (
                                            <div className="hidden sm:block absolute top-0 -right-6 w-px h-full bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 blur-[150px] rounded-full" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full" />
                    </div>
                </section>

            </main>

        </div>
    )
}