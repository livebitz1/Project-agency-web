"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useEffect, useState } from "react"

const clientBusinessImpactData = [
  { client: "TechStartup", beforeRevenue: 250, afterRevenue: 625, conversionBefore: 2.1, conversionAfter: 5.8 },
  { client: "E-Commerce", beforeRevenue: 480, afterRevenue: 1104, conversionBefore: 1.8, conversionAfter: 4.2 },
  { client: "SaaS Platform", beforeRevenue: 320, afterRevenue: 832, conversionBefore: 2.5, conversionAfter: 6.8 },
  { client: "FinTech", beforeRevenue: 550, afterRevenue: 1210, conversionBefore: 3.2, conversionAfter: 7.1 },
  { client: "Healthcare", beforeRevenue: 180, afterRevenue: 486, conversionBefore: 1.5, conversionAfter: 4.9 },
  { client: "Marketplace", beforeRevenue: 410, afterRevenue: 980, conversionBefore: 2.0, conversionAfter: 5.1 },
  { client: "EdTech", beforeRevenue: 140, afterRevenue: 392, conversionBefore: 1.3, conversionAfter: 3.6 },
  { client: "Gaming", beforeRevenue: 300, afterRevenue: 720, conversionBefore: 1.9, conversionAfter: 4.7 },
]

const monthlyProgressionData = [
  { month: "Jan", revenue: 220, engagement: 30, satisfaction: 70, leads: 40 },
  { month: "Feb", revenue: 255, engagement: 38, satisfaction: 73, leads: 55 },
  { month: "Mar", revenue: 310, engagement: 46, satisfaction: 76, leads: 68 },
  { month: "Apr", revenue: 375, engagement: 56, satisfaction: 79, leads: 82 },
  { month: "May", revenue: 455, engagement: 65, satisfaction: 83, leads: 101 },
  { month: "Jun", revenue: 525, engagement: 72, satisfaction: 86, leads: 125 },
  { month: "Jul", revenue: 600, engagement: 78, satisfaction: 88, leads: 148 },
  { month: "Aug", revenue: 680, engagement: 83, satisfaction: 90, leads: 170 },
  { month: "Sep", revenue: 740, engagement: 87, satisfaction: 91, leads: 185 },
  { month: "Oct", revenue: 820, engagement: 90, satisfaction: 92, leads: 205 },
  { month: "Nov", revenue: 900, engagement: 92, satisfaction: 93, leads: 230 },
  { month: "Dec", revenue: 980, engagement: 94, satisfaction: 94, leads: 260 },
]

const industryDistribution = [
  { name: "SaaS", value: 26, color: "#0f172a" },
  { name: "E-Commerce", value: 24, color: "#0ea5a4" },
  { name: "FinTech", value: 18, color: "#7c3aed" },
  { name: "Healthcare", value: 16, color: "#ef4444" },
  { name: "Other", value: 16, color: "#94a3b8" },
]

const keyMetrics = [
  { label: "Avg Revenue Growth", value: "146%" },
  { label: "Avg Conversion Increase", value: "176%" },
  { label: "Projects Delivered On Time", value: "92%" },
  { label: "Avg Time-to-Launch", value: "14 days" },
]

export default function SkillsChart() {
  const [activeChart, setActiveChart] = useState<"revenue" | "conversion" | "progression" | "industry">("revenue")
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // Reveal animation when the section scrolls into view
  useEffect(() => {
    if (typeof window === 'undefined') return
    // respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setIsVisible(true)
      return
    }

    const el = document.getElementById('our-analytics')
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

  return (
    <section id="our-analytics" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            <span className="text-foreground">OUR</span>
            {/* show a space on mobile, keep line-break on sm+ */}
            <span className="sm:hidden">&nbsp;</span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-muted-foreground to-muted-foreground/60 bg-clip-text text-transparent">ANALYTICS</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Key metrics and visualizations demonstrating Insalink’s impact across clients and projects.</p>
        </div>

        <div className={`w-full space-y-6`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            {keyMetrics.map((metric, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredMetric(i)}
                onMouseLeave={() => setHoveredMetric(null)}
                // premium staggered reveal: combined opacity, transform and subtle blur removal
                style={{
                  transitionProperty: 'opacity, transform, filter',
                  transitionDuration: '720ms',
                  transitionTimingFunction: 'cubic-bezier(.2,.9,.3,1)',
                  transitionDelay: isVisible ? `${i * 110 + 120}ms` : '0ms',
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(.996)',
                  filter: isVisible ? 'blur(0px)' : 'blur(6px)',
                }}
                className={`group rounded-lg p-3 md:p-4 border border-gray-200 text-center transition-all duration-700 will-change-transform ${hoveredMetric === i
                    ? 'bg-black text-white border-black shadow-lg scale-105'
                    : 'bg-gray-50 hover:shadow-md hover:border-gray-300 hover:bg-black hover:text-white hover:scale-105'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}
              >
                <p className={`text-xs md:text-sm mb-1 transition-colors ${hoveredMetric === i ? 'text-gray-200' : 'text-gray-600'} group-hover:text-white`}>
                  {metric.label}
                </p>
                <p className={`text-lg md:text-2xl font-bold transition-colors ${hoveredMetric === i ? 'text-white' : 'text-black'} group-hover:text-white`}>
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          {/* Chart controls: mobile (stacked) and desktop (single control bar) */}
          <div className="mb-4">
            {/* Mobile controls: compact stacked buttons */}
            <div className="flex gap-2 md:hidden mb-4 flex-wrap">
              {[
                { id: "revenue", label: "Revenue" },
                { id: "conversion", label: "Conversion" },
                { id: "progression", label: "Growth" },
                { id: "industry", label: "Industry" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setActiveChart(btn.id as any)}
                  aria-pressed={activeChart === btn.id}
                  className={`flex-1 min-w-[45%] py-2 px-2 text-xs font-medium rounded transition-all duration-200 ${activeChart === btn.id
                      ? "bg-black text-white shadow-sm"
                      : "bg-gray-100 text-black hover:bg-gray-200"
                    }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Desktop controls: sleek minimal pill bar */}
            <div className="hidden md:flex items-center justify-center gap-3">
              {[
                { id: "revenue", label: "Revenue" },
                { id: "conversion", label: "Conversion" },
                { id: "progression", label: "Growth" },
                { id: "industry", label: "Industry" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setActiveChart(btn.id as any)}
                  aria-pressed={activeChart === btn.id}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-240 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/40 ${activeChart === btn.id
                      ? 'bg-foreground text-background shadow-md'
                      : 'bg-transparent text-muted-foreground border border-border/60 hover:bg-muted-foreground/6'
                    }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Revenue Growth Chart */}
          <div
            className={`${activeChart === "revenue" ? "block" : "hidden"} transition-all duration-700 hover:shadow-lg rounded-lg p-4 hover:bg-gray-50 will-change-transform`}
            style={{ transitionDelay: isVisible ? '320ms' : '0ms', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.996)' }}
          >
            <h3 className="text-sm md:text-base font-semibold text-black mb-3 transition-colors hover:text-gray-700">Client Revenue Growth (in thousands $)</h3>
            <ChartContainer
              config={{
                beforeRevenue: { label: "Before Insalink", color: "hsl(0,0%,80%)" },
                afterRevenue: { label: "After Insalink", color: "hsl(0,0%,0%)" },
              }}
              className="h-56 sm:h-64 md:h-72 w-full transition-all duration-300"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clientBusinessImpactData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                  <defs>
                    <linearGradient id="grad-beforeRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(99,102,241,0.9)" />
                      <stop offset="100%" stopColor="rgba(99,102,241,0.15)" />
                    </linearGradient>
                    <linearGradient id="grad-afterRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(15,23,42,0.95)" />
                      <stop offset="100%" stopColor="rgba(15,23,42,0.2)" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" vertical={false} />
                  <XAxis dataKey="client" stroke="hsl(0,0%,40%)" style={{ fontSize: "10px" }} tick={{ dy: 3 }} />
                  <YAxis stroke="hsl(0,0%,40%)" style={{ fontSize: "10px" }} width={25} />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "hsl(0,0%,95%)" }} />
                  <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "11px" }} iconType="square" height={25} />
                  <Bar dataKey="beforeRevenue" fill="url(#grad-beforeRevenue)" radius={[6, 6, 2, 2]} barSize={18} />
                  <Bar dataKey="afterRevenue" fill="url(#grad-afterRevenue)" radius={[6, 6, 2, 2]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Conversion Chart */}
          <div
            className={`${activeChart === "conversion" ? "block" : "hidden"} md:pt-4 md:border-t md:border-gray-200 transition-all duration-700 hover:shadow-lg rounded-lg p-4 hover:bg-gray-50 will-change-transform`}
            style={{
              transitionProperty: 'opacity, transform, filter',
              transitionDuration: '720ms',
              transitionTimingFunction: 'cubic-bezier(.2,.9,.3,1)',
              transitionDelay: isVisible ? '500ms' : '0ms',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.994)',
              filter: isVisible ? 'blur(0px)' : 'blur(6px)'
            }}
          >
            <h3 className="text-sm md:text-base font-semibold text-black mb-3 transition-colors hover:text-gray-700">Conversion Rate Improvement (%)</h3>
            <ChartContainer
              config={{ conversionBefore: { label: "Before Insalink", color: "hsl(0,0%,70%)" }, conversionAfter: { label: "After Insalink", color: "hsl(0,0%,0%)" } }}
              className="h-56 sm:h-64 md:h-72 w-full transition-all duration-300"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={clientBusinessImpactData} margin={{ top: 8, right: 8, left: -15, bottom: 6 }}>
                  {/* Minimalist gradients and small area fill for a sleek look */}
                  <defs>
                    <linearGradient id="grad-conv-before" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgba(107,114,128,0.95)" />
                      <stop offset="100%" stopColor="rgba(107,114,128,0.5)" />
                    </linearGradient>
                    <linearGradient id="grad-conv-after" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgba(15,23,42,0.95)" />
                      <stop offset="100%" stopColor="rgba(15,23,42,0.6)" />
                    </linearGradient>
                    <linearGradient id="grad-conv-after-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(15,23,42,0.12)" />
                      <stop offset="100%" stopColor="rgba(15,23,42,0.02)" />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke="#eef2f7" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="client" stroke="hsl(0,0%,40%)" style={{ fontSize: "10px" }} tick={{ dy: 3 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="hsl(0,0%,40%)" style={{ fontSize: "10px" }} width={28} axisLine={false} tickLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "11px" }} height={25} />

                  {/* Subtle filled area for the 'after' line to give depth without noise */}
                  <defs />
                  <Area type="monotone" dataKey="conversionAfter" fill="url(#grad-conv-after-fill)" stroke="none" isAnimationActive={false} />

                  <Line
                    type="monotone"
                    dataKey="conversionBefore"
                    stroke="url(#grad-conv-before)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    dot={{ r: 2 }}
                    activeDot={{ r: 5 }}
                    animationDuration={500}
                  />

                  <Line
                    type="monotone"
                    dataKey="conversionAfter"
                    stroke="url(#grad-conv-after)"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    dot={{ r: 2 }}
                    activeDot={{ r: 5 }}
                    animationDuration={600}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Progression Chart */}
          <div
            className={`${activeChart === "progression" ? "block" : "hidden"} md:pt-4 md:border-t md:border-gray-200 transition-all duration-300 hover:shadow-lg rounded-lg p-4 hover:bg-gray-50 will-change-transform`}
            style={{
              transitionProperty: 'opacity, transform, filter',
              transitionDuration: '720ms',
              transitionTimingFunction: 'cubic-bezier(.2,.9,.3,1)',
              transitionDelay: isVisible ? '660ms' : '0ms',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.993)',
              filter: isVisible ? 'blur(0px)' : 'blur(6px)'
            }}
          >
            <h3 className="text-sm md:text-base font-semibold text-black mb-3 transition-colors hover:text-gray-700">Growth Trajectory</h3>
            <ChartContainer
              config={{ revenue: { label: "Revenue ($K)", color: "hsl(0,0%,0%)" }, engagement: { label: "Engagement (%)", color: "hsl(0,0%,50%)" } }}
              className="h-56 sm:h-64 md:h-72 w-full transition-all duration-300"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyProgressionData} margin={{ top: 8, right: 12, left: -12, bottom: 6 }}>
                  {/* Minimalist grid and axis */}
                  <defs>
                    <linearGradient id="grad-prog-revenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(15,23,42,0.14)" />
                      <stop offset="100%" stopColor="rgba(15,23,42,0.02)" />
                    </linearGradient>
                    <linearGradient id="grad-prog-engagement" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(99,102,241,0.12)" />
                      <stop offset="100%" stopColor="rgba(99,102,241,0.02)" />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke="#f1f5f9" strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(0,0%,40%)" style={{ fontSize: "11px" }} tick={{ dy: 4 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="hsl(0,0%,40%)" style={{ fontSize: "11px" }} width={28} axisLine={false} tickLine={false} />

                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ paddingTop: "8px", fontSize: "11px" }} height={28} />

                  {/* Revenue: primary, slightly stronger stroke with soft fill */}
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(0,0%,6%)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    fill="url(#grad-prog-revenue)"
                    dot={{ r: 3, strokeWidth: 0, fill: 'hsl(0,0%,6%)' }}
                    activeDot={{ r: 5 }}
                    isAnimationActive={true}
                    animationDuration={700}
                    connectNulls
                  />

                  {/* Engagement: accent with lighter stroke and subtle fill */}
                  <Area
                    type="monotone"
                    dataKey="engagement"
                    stroke="rgba(99,102,241,0.95)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    fill="url(#grad-prog-engagement)"
                    dot={{ r: 2.5, strokeWidth: 0, fill: 'rgba(99,102,241,0.95)' }}
                    activeDot={{ r: 5 }}
                    isAnimationActive={true}
                    animationDuration={700}
                    connectNulls
                  />

                  {/* Optional lighter metrics kept but de-emphasized */}
                  <Area type="monotone" dataKey="satisfaction" fill="rgba(15,23,42,0.03)" stroke="rgba(15,23,42,0.18)" strokeWidth={1.5} dot={false} isAnimationActive={false} />
                  <Area type="monotone" dataKey="leads" fill="rgba(99,102,241,0.02)" stroke="rgba(99,102,241,0.12)" strokeWidth={1.5} dot={false} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Industry Pie */}
          <div className={`${activeChart === "industry" ? "block" : "hidden"} md:pt-4 md:border-t md:border-gray-200 transition-all duration-300 hover:shadow-lg rounded-lg p-4 hover:bg-gray-50`}
            style={{
              transitionProperty: 'opacity, transform, filter',
              transitionDuration: '720ms',
              transitionTimingFunction: 'cubic-bezier(.2,.9,.3,1)',
              transitionDelay: isVisible ? '800ms' : '0ms',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.992)',
              filter: isVisible ? 'blur(0px)' : 'blur(6px)'
            }}
          >
            <h3 className="text-sm md:text-base font-semibold text-black mb-3 transition-colors hover:text-gray-700">Client Distribution by Industry</h3>
            <ChartContainer config={{}} className="h-56 sm:h-64 md:h-72 w-full flex items-center justify-center transition-all duration-300">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={industryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={isClient && isMobile ? 40 : 60}
                    outerRadius={isClient && isMobile ? 70 : 100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {industryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend
                    verticalAlign={isClient && isMobile ? "bottom" : "middle"}
                    align={isClient && isMobile ? "center" : "right"}
                    layout={isClient && isMobile ? "horizontal" : "vertical"}
                    wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
