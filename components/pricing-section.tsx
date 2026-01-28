"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"

export function PricingSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setIsVisible(true)
      return
    }

    const el = document.getElementById('pricing')
    if (!el) {
      setIsVisible(true)
      return
    }

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        obs.disconnect()
      }
    }, { threshold: 0.12 })

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const pricingData = [
    {
      id: "ecommerce",
      title: "Ecommerce Website – Custom Code",
      tiers: [
        {
          name: "Low Complexity",
          features: "Static pages, basic forms, simple backend logic",
          price: "₹40,000 – ₹50,000",
          timeline: "2–3 weeks"
        },
        {
          name: "Medium Complexity",
          features: "Auth, dashboard, CRUD operations, APIs",
          price: "₹50,000 – ₹65,000",
          timeline: "3–5 weeks"
        },
        {
          name: "High Complexity",
          features: "Advanced logic, integrations, custom workflows",
          price: "₹65,000 – ₹80,000",
          timeline: "5–7 weeks"
        }
      ]
    },
    {
      id: "shopify",
      title: "Shopify Website",
      tiers: [
        {
          name: "Basic Shopify Setup",
          features: "Theme install, basic pages, 10–20 products",
          price: "₹15,000 – ₹25,000",
          timeline: "1–2 weeks"
        },
        {
          name: "Standard Shopify Store",
          features: "+ Customization, up to 50 products, payment setup",
          price: "₹25,000 – ₹40,000",
          timeline: "2–3 weeks"
        },
        {
          name: "Advanced Shopify Store",
          features: "+ Multiple integrations, up to 150 products, advanced UI",
          price: "₹40,000 – ₹80,000",
          timeline: "3–5 weeks"
        }
      ]
    },
    {
      id: "saas",
      title: "SaaS Platforms",
      tiers: [
        {
          name: "MVP SaaS",
          features: "Core functionality with essential features",
          price: "₹1.5L – ₹4L",
          timeline: "6–12 weeks"
        },
        {
          name: "Standard SaaS",
          features: "Enhanced features with integrations",
          price: "₹4L – ₹10L",
          timeline: "3–5 months"
        },
        {
          name: "Advanced SaaS",
          features: "Complex workflows and advanced features",
          price: "₹10L – ₹30L+",
          timeline: "6–12 months"
        },
        {
          name: "Enterprise SaaS",
          features: "Full-scale enterprise solution",
          price: "₹30L – ₹1Cr+",
          timeline: "9–18 months+"
        }
      ]
    },
    {
      id: "erp",
      title: "ERP Software",
      tiers: [
        {
          name: "Basic ERP",
          features: "Core modules: Inventory, Sales, Purchases, Users, Reports",
          price: "₹6,00,000 – ₹12,00,000",
          timeline: "3–6 months"
        },
        {
          name: "Standard ERP",
          features: "+ Accounting, HR & Payroll, CRM, Permissions",
          price: "₹12,00,000 – ₹25,00,000",
          timeline: "6–10 months"
        },
        {
          name: "Advanced ERP",
          features: "+ Production/MRP, BI Dashboards, Mobile App",
          price: "₹25,00,000 – ₹50,00,000",
          timeline: "9–14 months"
        },
        {
          name: "Enterprise ERP",
          features: "Custom workflows, Multi-company, AI/Analytics",
          price: "₹50,00,000 – ₹1,50,00,000+",
          timeline: "12–24+ months"
        }
      ]
    },
    {
      id: "crm",
      title: "CRM Software",
      tiers: [
        {
          name: "Basic CRM",
          features: "Contacts, Leads, Deals, Basic Reports",
          price: "₹1,50,000 – ₹4,00,000",
          timeline: "6–10 weeks"
        },
        {
          name: "Standard CRM",
          features: "+ Tasks, Follow-ups, Email Integration, Dashboard",
          price: "₹4,00,000 – ₹8,00,000",
          timeline: "3–4 months"
        },
        {
          name: "Advanced CRM",
          features: "+ AI Insights, Sales Forecasting, Workflow Automation",
          price: "₹8,00,000 – ₹15,00,000",
          timeline: "4–6 months"
        },
        {
          name: "Enterprise CRM",
          features: "Custom Modules, Multi-Team Roles, API Integrations",
          price: "₹15,00,000 – ₹30,00,000+",
          timeline: "6–9+ months"
        }
      ]
    },
    {
      id: "portal",
      title: "Enterprise Portal",
      tiers: [
        {
          name: "Basic Enterprise Portal",
          features: "User login, roles, dashboard, static pages",
          price: "₹10,00,000 – ₹20,00,000",
          timeline: "3–5 months"
        },
        {
          name: "Standard Enterprise Portal",
          features: "+ Workflows, forms, notifications, RBAC",
          price: "₹20,00,000 – ₹40,00,000",
          timeline: "5–8 months"
        },
        {
          name: "Advanced Enterprise Portal",
          features: "+ Integrations (ERP/CRM), analytics, automation",
          price: "₹40,00,000 – ₹80,00,000",
          timeline: "8–12 months"
        },
        {
          name: "Enterprise+ Portal (Large Scale)",
          features: "Multi-tenant, AI/BI, mobile app, high security",
          price: "₹80,00,000 – ₹2,00,00,000+",
          timeline: "12–18+ months"
        }
      ]
    },
    {
      id: "marketplace",
      title: "Marketplace Platform",
      tiers: [
        {
          name: "Basic Marketplace",
          features: "User auth, product/listing, cart, orders",
          price: "₹8,00,000 – ₹15,00,000",
          timeline: "4–6 months"
        },
        {
          name: "Standard Marketplace",
          features: "+ Seller panel, reviews, payments, basic analytics",
          price: "₹15,00,000 – ₹30,00,000",
          timeline: "6–8 months"
        },
        {
          name: "Advanced Marketplace",
          features: "+ Multi-vendor, advanced filters, notifications",
          price: "₹30,00,000 – ₹50,00,000",
          timeline: "8–12 months"
        },
        {
          name: "Enterprise Marketplace",
          features: "+ Logistics, AI recommendations, high scale",
          price: "₹50,00,000 – ₹1,00,00,000+",
          timeline: "12–18+ months"
        }
      ]
    }
  ]

  return (
    <section id="pricing" className="relative w-full bg-gradient-to-b from-background via-background to-background/95 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            <span className="text-foreground">OUR</span>
            <span className="sm:hidden">&nbsp;</span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-muted-foreground to-muted-foreground/60 bg-clip-text text-transparent">PRICING</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Transparent pricing tiers for every business need—find the perfect fit for your next project.</p>
        </div>

        <div className="space-y-20">
          {pricingData.map((category) => (
            <div key={category.id} className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                {category.title.replace('Ecommerce Website – Custom Code', 'Ecommerce Website')}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.tiers.map((tier, index) => (
                  <div
                    key={index}
                    className="group relative bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:border-black hover:-translate-y-1 hover:bg-black"
                    onMouseEnter={() => setHoveredCard(`${category.id}-${index}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 transition-opacity duration-300" />
                    
                    <div className="relative space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-gray-900 group-hover:text-white transition-colors duration-300">{tier.name}</h4>
                        <p className="text-sm text-gray-600 min-h-[3rem] group-hover:text-gray-300 transition-colors duration-300">{tier.features}</p>
                      </div>

                      <div className="pt-4 border-t border-gray-100 group-hover:border-gray-700 transition-colors duration-300">
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-500 mb-1 group-hover:text-gray-400 transition-colors duration-300">Investment</p>
                            <p className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">{tier.price}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-gray-500 mb-1 group-hover:text-gray-400 transition-colors duration-300">Timeline</p>
                            <p className="text-sm font-medium text-gray-700 group-hover:text-white transition-colors duration-300">{tier.timeline}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}