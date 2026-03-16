"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight, Clock, Sparkles } from "lucide-react"

export function PricingSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [visibleCategories, setVisibleCategories] = useState<Set<string>>(new Set())
  const categoryRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  useEffect(() => {
    if (typeof window === "undefined") return
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setIsVisible(true)
      return
    }

    const el = document.getElementById("pricing")
    if (!el) {
      setIsVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCategories((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    categoryRefs.current.forEach((el) => {
      if (el) obs.observe(el)
    })

    return () => obs.disconnect()
  }, [isVisible])

  const pricingData = [
    {
      id: "ecommerce",
      title: "Ecommerce Website – Custom Code",
      tiers: [
        {
          name: "Low Complexity",
          features: "Static pages, basic forms, simple backend logic",
          price: "₹40,000 – ₹50,000",
          timeline: "2–3 weeks",
        },
        {
          name: "Medium Complexity",
          features: "Auth, dashboard, CRUD operations, APIs",
          price: "₹50,000 – ₹65,000",
          timeline: "3–5 weeks",
        },
        {
          name: "High Complexity",
          features: "Advanced logic, integrations, custom workflows",
          price: "₹65,000 – ₹80,000",
          timeline: "5–7 weeks",
        },
      ],
    },
    {
      id: "shopify",
      title: "Shopify Website",
      tiers: [
        {
          name: "Basic Shopify Setup",
          features: "Theme install, basic pages, 10–20 products",
          price: "₹15,000 – ₹25,000",
          timeline: "1–2 weeks",
        },
        {
          name: "Standard Shopify Store",
          features: "+ Customization, up to 50 products, payment setup",
          price: "₹25,000 – ₹40,000",
          timeline: "2–3 weeks",
        },
        {
          name: "Advanced Shopify Store",
          features:
            "+ Multiple integrations, up to 150 products, advanced UI",
          price: "₹40,000 – ₹80,000",
          timeline: "3–5 weeks",
        },
      ],
    },
    {
      id: "saas",
      title: "SaaS Platforms",
      tiers: [
        {
          name: "MVP SaaS",
          features: "Core functionality with essential features",
          price: "₹1.5L – ₹4L",
          timeline: "6–12 weeks",
        },
        {
          name: "Standard SaaS",
          features: "Enhanced features with integrations",
          price: "₹4L – ₹10L",
          timeline: "3–5 months",
        },
        {
          name: "Advanced SaaS",
          features: "Complex workflows and advanced features",
          price: "₹10L – ₹30L+",
          timeline: "6–12 months",
        },
        {
          name: "Enterprise SaaS",
          features: "Full-scale enterprise solution",
          price: "₹30L – ₹1Cr+",
          timeline: "9–18 months+",
        },
      ],
    },
    {
      id: "erp",
      title: "ERP Software",
      tiers: [
        {
          name: "Basic ERP",
          features:
            "Core modules: Inventory, Sales, Purchases, Users, Reports",
          price: "₹6,00,000 – ₹12,00,000",
          timeline: "3–6 months",
        },
        {
          name: "Standard ERP",
          features: "+ Accounting, HR & Payroll, CRM, Permissions",
          price: "₹12,00,000 – ₹25,00,000",
          timeline: "6–10 months",
        },
        {
          name: "Advanced ERP",
          features: "+ Production/MRP, BI Dashboards, Mobile App",
          price: "₹25,00,000 – ₹50,00,000",
          timeline: "9–14 months",
        },
        {
          name: "Enterprise ERP",
          features: "Custom workflows, Multi-company, AI/Analytics",
          price: "₹50,00,000 – ₹1,50,00,000+",
          timeline: "12–24+ months",
        },
      ],
    },
    {
      id: "crm",
      title: "CRM Software",
      tiers: [
        {
          name: "Basic CRM",
          features: "Contacts, Leads, Deals, Basic Reports",
          price: "₹1,50,000 – ₹4,00,000",
          timeline: "6–10 weeks",
        },
        {
          name: "Standard CRM",
          features: "+ Tasks, Follow-ups, Email Integration, Dashboard",
          price: "₹4,00,000 – ₹8,00,000",
          timeline: "3–4 months",
        },
        {
          name: "Advanced CRM",
          features: "+ AI Insights, Sales Forecasting, Workflow Automation",
          price: "₹8,00,000 – ₹15,00,000",
          timeline: "4–6 months",
        },
        {
          name: "Enterprise CRM",
          features: "Custom Modules, Multi-Team Roles, API Integrations",
          price: "₹15,00,000 – ₹30,00,000+",
          timeline: "6–9+ months",
        },
      ],
    },
    {
      id: "portal",
      title: "Enterprise Portal",
      tiers: [
        {
          name: "Basic Enterprise Portal",
          features: "User login, roles, dashboard, static pages",
          price: "₹10,00,000 – ₹20,00,000",
          timeline: "3–5 months",
        },
        {
          name: "Standard Enterprise Portal",
          features: "+ Workflows, forms, notifications, RBAC",
          price: "₹20,00,000 – ₹40,00,000",
          timeline: "5–8 months",
        },
        {
          name: "Advanced Enterprise Portal",
          features: "+ Integrations (ERP/CRM), analytics, automation",
          price: "₹40,00,000 – ₹80,00,000",
          timeline: "8–12 months",
        },
        {
          name: "Enterprise+ Portal (Large Scale)",
          features: "Multi-tenant, AI/BI, mobile app, high security",
          price: "₹80,00,000 – ₹2,00,00,000+",
          timeline: "12–18+ months",
        },
      ],
    },
    {
      id: "marketplace",
      title: "Marketplace Platform",
      tiers: [
        {
          name: "Basic Marketplace",
          features: "User auth, product/listing, cart, orders",
          price: "₹8,00,000 – ₹15,00,000",
          timeline: "4–6 months",
        },
        {
          name: "Standard Marketplace",
          features: "+ Seller panel, reviews, payments, basic analytics",
          price: "₹15,00,000 – ₹30,00,000",
          timeline: "6–8 months",
        },
        {
          name: "Advanced Marketplace",
          features: "+ Multi-vendor, advanced filters, notifications",
          price: "₹30,00,000 – ₹50,00,000",
          timeline: "8–12 months",
        },
        {
          name: "Enterprise Marketplace",
          features: "+ Logistics, AI recommendations, high scale",
          price: "₹50,00,000 – ₹1,00,00,000+",
          timeline: "12–18+ months",
        },
      ],
    },
  ]

  return (
    <section
      id="pricing"
      className="relative w-full bg-gradient-to-b from-background via-background to-background/95 py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Background decorations (grain/grid effect removed) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-60 -right-60 w-[500px] h-[500px] bg-gradient-to-br from-primary/[0.03] to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] bg-gradient-to-tr from-accent/[0.03] to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-primary/[0.02] to-transparent rounded-full blur-3xl" />
        {/* Grid pattern overlay removed */}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mx-auto max-w-3xl text-center mb-20 md:mb-24 transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/50 bg-muted/30 backdrop-blur-sm mb-6">
            <Sparkles className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
              Transparent Pricing
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            <span className="text-foreground">OUR</span>{" "}
            <span className="bg-gradient-to-r from-muted-foreground to-muted-foreground/50 bg-clip-text text-transparent">
              PRICING
            </span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Transparent pricing tiers for every business need—find the perfect
            fit for your next project.
          </p>
          <div className="mt-6 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent" />
        </div>

        {/* Pricing Categories */}
        <div className="space-y-28 md:space-y-32">
          {pricingData.map((category, catIdx) => {
            const isPopular = (tierIdx: number) => {
              if (category.tiers.length === 3) return tierIdx === 1
              if (category.tiers.length === 4) return tierIdx === 1
              return false
            }

            return (
              <div
                key={category.id}
                id={`cat-${category.id}`}
                ref={(el) => {
                  if (el) categoryRefs.current.set(`cat-${category.id}`, el)
                }}
                className={`space-y-10 transition-all duration-700 ease-out ${
                  visibleCategories.has(`cat-${category.id}`)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                {/* Category Header */}
                <div className="relative text-center">
                  <div className="inline-flex items-center gap-3">
                    <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-muted-foreground/40" />
                    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/60">
                      {String(catIdx + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-muted-foreground/40" />
                  </div>
                  <h3 className="mt-3 text-2xl sm:text-3xl md:text-[2rem] font-bold text-foreground tracking-tight">
                    {category.title.replace(
                      "Ecommerce Website – Custom Code",
                      "Ecommerce Website"
                    )}
                  </h3>
                </div>

                {/* Tier Cards */}
                <div
                  className={`grid grid-cols-1 gap-5 ${
                    category.tiers.length === 3
                      ? "md:grid-cols-2 lg:grid-cols-3"
                      : "md:grid-cols-2 xl:grid-cols-4"
                  }`}
                >
                  {category.tiers.map((tier, index) => {
                    const cardId = `${category.id}-${index}`
                    const isHovered = hoveredCard === cardId
                    const popular = isPopular(index)

                    return (
                      <div
                        key={index}
                        className={`relative transition-all duration-500 ease-out ${
                          visibleCategories.has(`cat-${category.id}`)
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                        }`}
                        style={{
                          transitionDelay: `${200 + index * 100}ms`,
                        }}
                      >
                        {/* Popular badge */}
                        {popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                            <div className="px-4 py-1 bg-foreground text-background text-[10px] font-bold tracking-[0.15em] uppercase rounded-full shadow-lg">
                              Most Popular
                            </div>
                          </div>
                        )}

                        <div
                          className={`group relative h-full rounded-2xl transition-all duration-500 ease-out cursor-default
                            ${
                              popular
                                ? "bg-foreground text-background shadow-2xl shadow-foreground/10 scale-[1.02] border-2 border-foreground"
                                : "bg-background border border-border/60 hover:border-foreground/30 hover:shadow-2xl hover:shadow-foreground/5"
                            }
                            ${!popular && isHovered ? "-translate-y-2" : ""}
                          `}
                          onMouseEnter={() => setHoveredCard(cardId)}
                          onMouseLeave={() => setHoveredCard(null)}
                        >
                          {/* Hover glow effect for non-popular */}
                          {!popular && (
                            <div
                              className={`absolute -inset-px rounded-2xl bg-gradient-to-b from-foreground/[0.08] to-transparent opacity-0 transition-opacity duration-500 pointer-events-none ${
                                isHovered ? "opacity-100" : ""
                              }`}
                            />
                          )}

                          <div className="relative p-6 sm:p-7 flex flex-col h-full">
                            {/* Tier number */}
                            <div
                              className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-4 ${
                                popular
                                  ? "text-background/40"
                                  : "text-muted-foreground/40"
                              }`}
                            >
                              Tier {String(index + 1).padStart(2, "0")}
                            </div>

                            {/* Name */}
                            <h4
                              className={`text-lg font-semibold leading-snug mb-2 ${
                                popular ? "text-background" : "text-foreground"
                              }`}
                            >
                              {tier.name}
                            </h4>

                            {/* Features */}
                            <p
                              className={`text-sm leading-relaxed mb-6 min-h-[2.75rem] ${
                                popular
                                  ? "text-background/60"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {tier.features}
                            </p>

                            {/* Divider */}
                            <div
                              className={`w-full h-px mb-6 ${
                                popular
                                  ? "bg-background/10"
                                  : "bg-border/60"
                              }`}
                            />

                            {/* Price & Timeline */}
                            <div className="mt-auto space-y-4">
                              <div>
                                <p
                                  className={`text-[10px] font-medium tracking-[0.15em] uppercase mb-1.5 ${
                                    popular
                                      ? "text-background/40"
                                      : "text-muted-foreground/60"
                                  }`}
                                >
                                  Investment
                                </p>
                                <p
                                  className={`text-xl sm:text-[1.35rem] font-bold tracking-tight ${
                                    popular
                                      ? "text-background"
                                      : "text-foreground"
                                  }`}
                                >
                                  {tier.price}
                                </p>
                              </div>

                              <div className="flex items-center gap-2">
                                <Clock
                                  className={`w-3.5 h-3.5 flex-shrink-0 ${
                                    popular
                                      ? "text-background/40"
                                      : "text-muted-foreground/50"
                                  }`}
                                />
                                <p
                                  className={`text-sm font-medium ${
                                    popular
                                      ? "text-background/70"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {tier.timeline}
                                </p>
                              </div>

                              {/* CTA indicator */}
                              <div
                                className={`flex items-center gap-1.5 pt-2 transition-all duration-300 ${
                                  popular
                                    ? "text-background/60"
                                    : isHovered
                                    ? "text-foreground"
                                    : "text-muted-foreground/40"
                                }`}
                              >
                                <span className="text-xs font-medium tracking-wide">
                                  Get Started
                                </span>
                                <ArrowRight
                                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                                    isHovered || popular
                                      ? "translate-x-1"
                                      : ""
                                  }`}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Bottom accent line */}
                          <div
                            className={`absolute bottom-0 left-6 right-6 h-px transition-all duration-500 ${
                              popular
                                ? "bg-background/20"
                                : isHovered
                                ? "bg-foreground/20"
                                : "bg-transparent"
                            }`}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-28 md:mt-32 text-center transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-muted/30 to-transparent rounded-3xl blur-xl" />
            <div className="relative bg-background border border-border/50 rounded-2xl px-8 sm:px-12 py-10 sm:py-12 max-w-2xl mx-auto">
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                Not sure which plan fits your needs? Let&apos;s discuss your
                project requirements and find the perfect solution.
              </p>
              <Button
                variant="default"
                size="lg"
                className="group rounded-full px-8 h-12 text-sm font-semibold tracking-wide"
              >
                <span>Schedule a Consultation</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}