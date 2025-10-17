"use client"

import React from "react"
import { Button } from "@/components/ui/button"

export function PricingSection() {
  return (
    <section className="bg-transparent py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Simple, predictable pricing</h2>
          <p className="mt-4 text-base text-muted-foreground">Choose a plan that fits your team. No hidden fees, cancel anytime.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Left Card - Retainer (dark) */}
          <div className="relative rounded-2xl border border-black/20 p-6 flex flex-col overflow-hidden" style={{background: 'linear-gradient(180deg, #071428 0%, #03101a 60%, #03131a 100%)', boxShadow: '0 18px 40px rgba(2,6,23,0.6)'}}>
            {/* glossy overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01) 40%, rgba(255,255,255,0))'}} />

            <div className="flex items-start justify-between z-10">
              <div>
                <h3 className="text-3xl font-extrabold text-white">Retainer</h3>
                <p className="text-sm text-white/70 mt-1">Ideal for teams that need ongoing quick design support</p>
              </div>
              <div className="ml-4 text-right">
                <div className="text-4xl font-extrabold text-white">$1,200</div>
                <div className="text-sm text-white/70">/mo</div>
              </div>
            </div>

            <div className="mt-6 flex-1 z-10">
              <ul className="space-y-4 text-sm text-white/85">
                <li className="flex items-center gap-3"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-sm">✓</span> 1 Active request at a time</li>
                <li className="flex items-center gap-3"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-sm">✓</span> 2x Senior Designer</li>
                <li className="flex items-center gap-3"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-sm">✓</span> Bi‑weekly progress meetings</li>
                <li className="flex items-center gap-3"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-sm">✓</span> Fast turnaround</li>
                <li className="flex items-center gap-3"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-sm">✓</span> Daily 4 hours of work</li>
              </ul>
            </div>

            <div className="mt-6 z-10">
              <Button size="lg" className="w-full rounded-full bg-white text-black" style={{ transition: 'none', WebkitTransition: 'none' }} aria-label="Choose Retainer">
                Choose Retainer
              </Button>
            </div>
          </div>

          {/* Right Card - Landing Page Design (light) */}
          <div className="rounded-2xl border border-border/40 bg-white p-6 shadow-sm flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-foreground">Landing Page Design</h3>
                <p className="text-sm text-muted-foreground mt-1">Bring your dream website to life in just days, not months.</p>
              </div>
              <div className="ml-4 text-right">
                <div className="text-3xl font-extrabold">$1,800</div>
                <div className="text-sm text-muted-foreground">one‑time</div>
              </div>
            </div>

            <div className="mt-6 flex-1">
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-center gap-3"><span className="inline-block h-5 w-5 text-center text-xs leading-5">✓</span> Wireframes</li>
                <li className="flex items-center gap-3"><span className="inline-block h-5 w-5 text-center text-xs leading-5">✓</span> Custom Layout</li>
                <li className="flex items-center gap-3"><span className="inline-block h-5 w-5 text-center text-xs leading-5">✓</span> Desktop, Tablet, Mobile responsive design</li>
                <li className="flex items-center gap-3"><span className="inline-block h-5 w-5 text-center text-xs leading-5">✓</span> Brand consistency</li>
                <li className="flex items-center gap-3"><span className="inline-block h-5 w-5 text-center text-xs leading-5">✓</span> Figma file + handoff
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <Button size="lg" className="w-full rounded-full">Start Project</Button>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">Custom add‑ons, enterprise options and discounts available. Contact sales for tailored plans.</p>
      </div>
    </section>
  )
}
