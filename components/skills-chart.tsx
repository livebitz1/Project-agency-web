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
]

const monthlyProgressionData = [
  { month: "M1", revenue: 250, engagement: 35, satisfaction: 72, leads: 45 },
  { month: "M2", revenue: 310, engagement: 48, satisfaction: 78, leads: 62 },
  { month: "M3", revenue: 385, engagement: 62, satisfaction: 82, leads: 78 },
  { month: "M4", revenue: 475, engagement: 71, satisfaction: 86, leads: 95 },
  { month: "M5", revenue: 565, engagement: 78, satisfaction: 89, leads: 112 },
  { month: "M6", revenue: 625, engagement: 85, satisfaction: 92, leads: 138 },
]

const industryDistribution = [
  { name: "SaaS", value: 28, color: "#000000" },
  { name: "E-Commerce", value: 22, color: "#4b5563" },
  { name: "FinTech", value: 18, color: "#9ca3af" },
  { name: "Healthcare", value: 16, color: "#d1d5db" },
  { name: "Other", value: 16, color: "#e9e9e9" },
]

const keyMetrics = [
  { label: "Avg Revenue Growth", value: "146%" },
  { label: "Avg Conversion Increase", value: "176%" },
  { label: "Avg Customer Retention", value: "94.4%" },
  { label: "Avg ROI", value: "334%" },
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

    const el = document.getElementById('our-skills')
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
    <section id="our-skills" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            <span className="text-foreground">OUR</span>
            {/* show a space on mobile, keep line-break on sm+ */}
            <span className="sm:hidden">&nbsp;</span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-muted-foreground to-muted-foreground/60 bg-clip-text text-transparent">SKILLS</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Key metrics and visualizations demonstrating Digitomeida’s impact across clients and projects.</p>
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
                className={`group rounded-lg p-3 md:p-4 border border-gray-200 text-center transition-all duration-700 will-change-transform ${
                  hoveredMetric === i
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
                className={`flex-1 min-w-[45%] py-2 px-2 text-xs font-medium rounded transition-all duration-300 ${
                  activeChart === btn.id
                    ? "bg-black text-white shadow-md scale-105 transform"
                    : "bg-gray-100 text-black hover:bg-gray-200 hover:shadow-sm"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Revenue Growth Chart */}
          <div
            className={`${activeChart === "revenue" ? "block" : "hidden md:block"} transition-all duration-700 hover:shadow-lg rounded-lg p-4 hover:bg-gray-50 will-change-transform`}
            style={{
              transitionProperty: 'opacity, transform, filter',
              transitionDuration: '720ms',
              transitionTimingFunction: 'cubic-bezier(.2,.9,.3,1)',
              transitionDelay: isVisible ? '360ms' : '0ms',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.995)',
              filter: isVisible ? 'blur(0px)' : 'blur(6px)'
            }}
          >
            <h3 className="text-sm md:text-base font-semibold text-black mb-3 transition-colors hover:text-gray-700">Client Revenue Growth (in thousands $)</h3>
            <ChartContainer
              config={{
                beforeRevenue: { label: "Before Digitomeida", color: "hsl(0,0%,80%)" },
                afterRevenue: { label: "After Digitomeida", color: "hsl(0,0%,0%)" },
              }}
              className="h-56 sm:h-64 md:h-72 w-full transition-all duration-300"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clientBusinessImpactData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" vertical={false} />
                  <XAxis dataKey="client" stroke="hsl(0,0%,40%)" style={{ fontSize: "10px" }} tick={{ dy: 3 }} />
                  <YAxis stroke="hsl(0,0%,40%)" style={{ fontSize: "10px" }} width={25} />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "hsl(0,0%,95%)" }} />
                  <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "11px" }} iconType="square" height={25} />
                  <Bar dataKey="beforeRevenue" fill="var(--color-beforeRevenue)" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="afterRevenue" fill="var(--color-afterRevenue)" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Conversion Chart */}
          <div
            className={`${activeChart === "conversion" ? "block" : "hidden md:block"} md:pt-4 md:border-t md:border-gray-200 transition-all duration-700 hover:shadow-lg rounded-lg p-4 hover:bg-gray-50 will-change-transform`}
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
              config={{ conversionBefore: { label: "Before Digitomeida", color: "hsl(0,0%,70%)" }, conversionAfter: { label: "After Digitomeida", color: "hsl(0,0%,0%)" } }}
              className="h-56 sm:h-64 md:h-72 w-full transition-all duration-300"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={clientBusinessImpactData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" vertical={false} />
                  <XAxis dataKey="client" stroke="hsl(0,0%,40%)" style={{ fontSize: "10px" }} tick={{ dy: 3 }} />
                  <YAxis stroke="hsl(0,0%,40%)" style={{ fontSize: "10px" }} width={25} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "11px" }} height={25} />
                  <Line type="monotone" dataKey="conversionBefore" stroke="hsl(0,0%,70%)" strokeWidth={2} dot={{ fill: "hsl(0,0%,70%)", r: 3 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="conversionAfter" stroke="hsl(0,0%,0%)" strokeWidth={2} dot={{ fill: "hsl(0,0%,0%)", r: 3 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Progression Chart */}
          <div className={`${activeChart === "progression" ? "block" : "hidden md:block"} md:pt-4 md:border-t md:border-gray-200 transition-all duration-300 hover:shadow-lg rounded-lg p-4 hover:bg-gray-50`}
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
            <h3 className="text-sm md:text-base font-semibold text-black mb-3 transition-colors hover:text-gray-700">6-Month Growth Trajectory</h3>
            <ChartContainer
              config={{ revenue: { label: "Revenue ($K)", color: "hsl(0,0%,0%)" }, engagement: { label: "Engagement (%)", color: "hsl(0,0%,50%)" } }}
              className="h-56 sm:h-64 md:h-72 w-full transition-all duration-300"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyProgressionData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(0,0%,40%)" style={{ fontSize: "10px" }} tick={{ dy: 3 }} />
                  <YAxis stroke="hsl(0,0%,40%)" style={{ fontSize: "10px" }} width={25} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "11px" }} height={25} />
                  <Area type="monotone" dataKey="revenue" fill="hsl(0,0%,90%)" stroke="hsl(0,0%,0%)" strokeWidth={2} />
                  <Area type="monotone" dataKey="engagement" fill="hsl(0,0%,95%)" stroke="hsl(0,0%,50%)" strokeWidth={2} />
                  <Area type="monotone" dataKey="satisfaction" fill="hsl(0,0%,98%)" stroke="hsl(0,0%,70%)" strokeWidth={2} />
                  <Area type="monotone" dataKey="leads" fill="hsl(0,0%,97%)" stroke="hsl(0,0%,30%)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Industry Pie */}
          <div className={`${activeChart === "industry" ? "block" : "hidden md:block"} md:pt-4 md:border-t md:border-gray-200 transition-all duration-300 hover:shadow-lg rounded-lg p-4 hover:bg-gray-50`}
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
