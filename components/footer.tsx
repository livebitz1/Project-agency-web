"use client"

import Link from "next/link"
import { useEffect, useState, useRef, useCallback } from "react"
import {
  Instagram,
  Linkedin,
  Home,
  Users,
  Settings,
  FolderOpen,
  Calendar,
  ArrowUpRight,
  Sparkles,
  Mail,
  MapPin,
  ChevronRight,
  ExternalLink,
  Zap,
  Globe,
  Clock,
  Layers,
} from "lucide-react"

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)
  const [hoveredFact, setHoveredFact] = useState<number | null>(null)
  const [isStatusHovered, setIsStatusHovered] = useState(false)
  const [tappedNavItem, setTappedNavItem] = useState<string | null>(null)
  const footerRef = useRef<HTMLElement | null>(null)
  const tapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setIsVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => setIsVisible(true))
          obs.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const navLinks = [
    { label: "Home", href: "/", icon: Home, desc: "Back to start" },
    { label: "About", href: "/about", icon: Users, desc: "Our story" },
    { label: "How We Work", href: "/how-we-work", icon: Settings, desc: "Our process" },
    { label: "Projects", href: "/#social-proof", icon: FolderOpen, desc: "Case studies" },
    { label: "Book a Call", href: "/book", icon: Calendar, desc: "Let's talk", featured: true },
  ]

  const socials = [
    { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/insalink.com_?igsh=bXhlbDIxZm1oeHJ4", handle: "@insalink" },
    { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", handle: "Insalink Studio" },
  ]

  const companyFacts = [
    { label: "Founded", value: "2024", icon: Clock },
    { label: "Team", value: "Remote-first", icon: Globe },
    { label: "Focus", value: "Web & AI products", icon: Layers },
  ]

  const services = ["Design", "Development", "AI Products", "Web3", "SaaS", "Strategy", "Branding", "UI/UX"]

  const handleNavTap = useCallback((label: string) => {
    if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current)
    setTappedNavItem(label)
    tapTimeoutRef.current = setTimeout(() => setTappedNavItem(null), 300)
  }, [])

  useEffect(() => {
    return () => { if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current) }
  }, [])

  return (
    <footer ref={footerRef} className="relative border-t border-stone-200/60 bg-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-stone-300/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">

        {/* ── CTA Banner ── */}
        <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,24px,0)", transitionProperty: "opacity, transform", transitionDuration: "0.8s", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.1s", willChange: "transform, opacity", backfaceVisibility: "hidden" }}>
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-stone-900 px-5 sm:px-8 md:px-10 lg:px-14 py-8 sm:py-10 md:py-14 mt-12 sm:mt-16 md:mt-20 shadow-[0_4px_24px_rgba(28,25,23,0.08),0_12px_48px_rgba(28,25,23,0.04)]">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-white/[0.02] rounded-full blur-[40px] md:blur-[60px] -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-white/[0.03] rounded-full blur-[30px] md:blur-[50px] translate-y-1/2 -translate-x-1/4" />
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            </div>
            <div className="relative z-10 flex flex-col items-center text-center md:flex-row md:text-left md:justify-between gap-5 sm:gap-6 md:gap-8">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-[-0.02em] leading-tight mb-2 sm:mb-3">
                  Ready to build something<br className="hidden sm:block" /><span className="sm:hidden"> </span><span className="text-stone-400">extraordinary?</span>
                </h3>
                <p className="text-[11px] sm:text-xs md:text-sm text-stone-400 font-light max-w-md mx-auto md:mx-0 leading-relaxed">Let&apos;s transform your vision into a digital product that drives real results.</p>
              </div>
              <Link href="/book" className="group/cta relative inline-flex items-center gap-2 sm:gap-2.5 px-5 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full bg-white text-stone-900 text-xs sm:text-sm font-semibold shrink-0 w-full sm:w-auto justify-center overflow-hidden transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] active:scale-[0.97]">
                <span className="absolute inset-0 bg-stone-900 translate-y-full group-hover/cta:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full" />
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:rotate-12 group-hover/cta:text-white" />
                <span className="relative z-10 transition-colors duration-400 group-hover/cta:text-white">Book a Call</span>
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 relative z-10 transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 group-hover/cta:text-white" />
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════ */}
        {/* ── MOBILE LAYOUT ── */}
        {/* ══════════════════════════════════════════════ */}
        <div className="md:hidden pt-10 pb-6">
          {/* Mobile Brand */}
          <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,20px,0)", transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.15s", willChange: "transform, opacity", backfaceVisibility: "hidden" }}>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100/50 border border-stone-200/60 p-5 mb-6 shadow-[0_1px_4px_rgba(28,25,23,0.03),0_4px_16px_rgba(28,25,23,0.02)]">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <h4 className="text-lg font-black tracking-[-0.02em] text-stone-900 leading-none">Insalink</h4>
                </div>
                <p className="text-[12px] text-stone-400 leading-[1.7] font-light mb-5 max-w-[260px]">Transforming ambitious visions into high-performance digital landmarks.</p>
                <div className="flex flex-wrap gap-2">
                  <a href="mailto:hello@insalink.com" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200/80 text-[11px] font-medium text-stone-500 active:bg-stone-900 active:text-white active:border-stone-800 transition-[background-color,color,border-color,transform] duration-200 active:scale-95"><Mail className="w-3 h-3" />Email Us</a>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200/80 text-[11px] font-medium text-stone-500"><MapPin className="w-3 h-3" />Worldwide</div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[11px] font-medium text-emerald-600 transition-[background-color,border-color,color] duration-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 cursor-default">Available</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Nav Grid */}
          <div className="mb-6" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,20px,0)", transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.25s", willChange: "transform, opacity", backfaceVisibility: "hidden" }}>
            <div className="flex items-center gap-2 mb-3 px-1"><div className="w-3 h-px bg-stone-300" /><p className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.25em]">Quick Links</p></div>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.filter((l) => !l.featured).map((link) => (
                <Link key={link.label} href={link.href} onClick={() => handleNavTap(link.label)} className={`group/mnav relative overflow-hidden rounded-xl border transition-[background-color,border-color,transform] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] shadow-[0_1px_3px_rgba(28,25,23,0.02)] ${tappedNavItem === link.label ? "bg-stone-900 border-stone-800" : "bg-white border-stone-200/60"}`}>
                  <div className="relative z-10 p-3.5">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg mb-2.5 transition-colors duration-250 ${tappedNavItem === link.label ? "bg-white/10" : "bg-stone-50"}`}>
                      <link.icon className={`w-4 h-4 transition-colors duration-250 ${tappedNavItem === link.label ? "text-white" : "text-stone-400"}`} />
                    </div>
                    <p className={`text-[13px] font-semibold tracking-[-0.01em] mb-0.5 transition-colors duration-250 ${tappedNavItem === link.label ? "text-white" : "text-stone-800"}`}>{link.label}</p>
                    <p className={`text-[10px] font-medium transition-colors duration-250 ${tappedNavItem === link.label ? "text-stone-400" : "text-stone-300"}`}>{link.desc}</p>
                    <div className="absolute top-3 right-3"><ChevronRight className={`w-3 h-3 transition-[color,transform] duration-250 group-active/mnav:translate-x-0.5 ${tappedNavItem === link.label ? "text-white/40" : "text-stone-200"}`} /></div>
                  </div>
                </Link>
              ))}
            </div>
            {navLinks.filter((l) => l.featured).map((link) => (
              <Link key={link.label} href={link.href} onClick={() => handleNavTap(link.label)} className="group/mfeat relative mt-2 flex items-center gap-3 overflow-hidden rounded-xl bg-stone-900 border border-stone-800 p-4 transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] shadow-[0_4px_16px_rgba(28,25,23,0.12)]">
                <div className="absolute inset-0 pointer-events-none"><div className="absolute -top-8 -right-8 w-24 h-24 bg-white/[0.04] rounded-full blur-lg" /></div>
                <div className="relative z-10 flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-active/mfeat:scale-110 group-active/mfeat:rotate-6"><Zap className="w-4 h-4 text-white" /></div>
                <div className="relative z-10 flex-1"><p className="text-[13px] font-semibold text-white leading-none mb-0.5">{link.label}</p><p className="text-[10px] font-medium text-stone-400">{link.desc}</p></div>
                <ArrowUpRight className="relative z-10 w-4 h-4 text-stone-500 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-active/mfeat:translate-x-0.5 group-active/mfeat:-translate-y-0.5" />
              </Link>
            ))}
          </div>

          {/* Mobile Social */}
          <div className="flex gap-2 mb-6" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,20px,0)", transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.35s", willChange: "transform, opacity", backfaceVisibility: "hidden" }}>
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="group/msoc flex-1 relative overflow-hidden rounded-xl border border-stone-200/60 bg-white p-3.5 transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] shadow-[0_1px_3px_rgba(28,25,23,0.02)]">
                <span className="absolute inset-0 bg-stone-900 scale-0 group-active/msoc:scale-100 transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center rounded-xl" />
                <div className="relative z-10 flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-stone-50 transition-colors duration-300 group-active/msoc:bg-white/10"><social.icon className="w-4 h-4 text-stone-400 transition-colors duration-300 group-active/msoc:text-white" /></div>
                  <div className="min-w-0"><p className="text-[12px] font-semibold text-stone-700 leading-none mb-0.5 transition-colors duration-300 group-active/msoc:text-white">{social.label}</p><p className="text-[10px] text-stone-300 truncate transition-colors duration-300 group-active/msoc:text-stone-500">{social.handle}</p></div>
                </div>
                <ExternalLink className="absolute top-3 right-3 w-3 h-3 text-stone-200 z-10 transition-colors duration-300 group-active/msoc:text-stone-500" />
              </a>
            ))}
          </div>

          {/* Mobile Company */}
          <div className="mb-6" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,16px,0)", transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.4s", willChange: "transform, opacity", backfaceVisibility: "hidden" }}>
            <div className="overflow-hidden rounded-xl border border-stone-200/60 bg-white">
              {companyFacts.map((item, i) => (
                <div key={item.label} className={`flex items-center justify-between px-4 py-3 ${i < companyFacts.length - 1 ? "border-b border-stone-100" : ""}`}>
                  <span className="text-[10px] font-semibold text-stone-300 uppercase tracking-[0.2em]">{item.label}</span>
                  <span className="text-[12px] font-semibold text-stone-700">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Marquee */}
          <div className="mb-6" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,12px,0)", transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.45s", willChange: "transform, opacity", backfaceVisibility: "hidden" }}>
            <div className="relative overflow-hidden rounded-xl bg-stone-50 border border-stone-100 py-3">
              <div className="flex w-max animate-[marqueeScroll_25s_linear_infinite]">
                {[...Array(3)].map((_, s) => (<div key={s} className="flex items-center shrink-0" aria-hidden={s > 0}>{services.map((tag, i) => (<div key={`${s}-${i}`} className="flex items-center gap-2 mx-4 shrink-0"><div className="w-1 h-1 rounded-full bg-stone-300" /><span className="text-[10px] font-semibold text-stone-400 tracking-wider uppercase whitespace-nowrap">{tag}</span></div>))}</div>))}
              </div>
            </div>
          </div>

          {/* Mobile Bottom */}
          <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,10px,0)", transitionProperty: "opacity, transform", transitionDuration: "0.7s", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.5s", willChange: "transform, opacity", backfaceVisibility: "hidden" }}>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-stone-200/80 to-transparent mb-5" />
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-stone-50 border border-stone-100"><Sparkles className="h-2.5 w-2.5 text-stone-300" /><span className="text-[9px] font-bold text-stone-300 tracking-[0.2em] uppercase">Innovating Beyond Pixels</span></div>
              <div className="flex items-center gap-3"><p className="text-[10px] font-semibold text-stone-300 tracking-[0.1em] uppercase">© {new Date().getFullYear()} Insalink</p><div className="w-px h-2.5 bg-stone-200" /><div className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /><span className="text-[9px] font-semibold text-stone-300 tracking-wider uppercase">Operational</span></div></div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════ */}
        {/* ── DESKTOP / MONITOR LAYOUT ── */}
        {/* ══════════════════════════════════════════════ */}
        <div className="hidden md:block pt-16 lg:pt-20 pb-12 lg:pb-16">
          <div className="grid grid-cols-12 gap-6 lg:gap-8">

            {/* Brand Panel */}
            <div className="col-span-12 lg:col-span-4" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,24px,0)", transitionProperty: "opacity, transform", transitionDuration: "0.8s", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.15s", willChange: "transform, opacity", backfaceVisibility: "hidden" }}>
              <div className="group/brand relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-br from-stone-50 to-stone-100/30 border border-stone-200/60 p-6 lg:p-8 h-full transition-shadow duration-600 shadow-[0_1px_4px_rgba(28,25,23,0.02),0_6px_24px_rgba(28,25,23,0.02)] hover:shadow-[0_2px_8px_rgba(28,25,23,0.04),0_8px_32px_rgba(28,25,23,0.03)]">
                <div className="relative z-10">
                  <div className="flex items-center gap-3.5 mb-6">
                    <h4 className="text-xl lg:text-2xl font-black tracking-[-0.03em] text-stone-900 leading-none">Insalink</h4>
                  </div>

                  <p className="text-[13px] lg:text-sm text-stone-400 leading-[1.8] font-light mb-6 max-w-xs">Transforming ambitious visions into high-performance digital landmarks that stand the test of time.</p>

                  {/* Email link with slide-up text */}
                  <div className="space-y-2.5 mb-6">
                    <a href="mailto:hello@insalink.com" className="group/mail inline-flex items-center gap-2.5 text-xs lg:text-[13px] text-stone-400 transition-colors duration-400 hover:text-stone-900">
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white border border-stone-200/80 transition-[background-color,border-color] duration-400 group-hover/mail:bg-stone-900 group-hover/mail:border-stone-900 shadow-[0_1px_2px_rgba(28,25,23,0.02)]">
                        <Mail className="w-3 h-3 text-stone-400 transition-colors duration-400 group-hover/mail:text-white" />
                      </div>
                      <span className="relative inline-flex flex-col h-[1.3em] overflow-hidden">
                        <span className="transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/mail:-translate-y-full leading-[1.3]">hello@insalink.com</span>
                        <span className="font-semibold text-stone-900 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/mail:-translate-y-full leading-[1.3]">hello@insalink.com</span>
                      </span>
                    </a>
                    <div className="inline-flex items-center gap-2.5 text-xs lg:text-[13px] text-stone-400">
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white border border-stone-200/80 shadow-[0_1px_2px_rgba(28,25,23,0.02)]"><MapPin className="w-3 h-3 text-stone-400" /></div>
                      Remote · Worldwide
                    </div>
                  </div>

                  {/* Social buttons with horizontal fill */}
                  <div className="flex items-center gap-3">
                    {socials.map((social) => (
                      <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} onMouseEnter={() => setHoveredSocial(social.label)} onMouseLeave={() => setHoveredSocial(null)} className="group/dsoc relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-stone-200/80 bg-white overflow-hidden transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] hover:border-stone-800 active:scale-[0.97] shadow-[0_1px_3px_rgba(28,25,23,0.02)] hover:shadow-[0_4px_16px_rgba(28,25,23,0.1)]">
                        <span className="absolute inset-0 bg-stone-900 -translate-x-full group-hover/dsoc:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-xl" />
                        <social.icon className="h-4 w-4 text-stone-400 relative z-10 transition-colors duration-400 group-hover/dsoc:text-white" />
                        <span className="text-[11px] font-medium text-stone-500 relative z-10 transition-colors duration-400 group-hover/dsoc:text-stone-300">{social.handle}</span>
                        <ArrowUpRight className={`h-3 w-3 relative z-10 transition-[opacity,transform,color] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] text-stone-400 ${hoveredSocial === social.label ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"}`} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════ */}
            {/* ── NAVIGATE LINKS (THE STAR) ── */}
            {/* ═══════════════════════════════════════ */}
            <div className="col-span-12 lg:col-span-5" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,24px,0)", transitionProperty: "opacity, transform", transitionDuration: "0.8s", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.25s", willChange: "transform, opacity", backfaceVisibility: "hidden" }}>
              <div className="flex items-center gap-2 mb-4 px-1">
                <div className="w-5 h-px bg-gradient-to-r from-stone-300 to-transparent" />
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em]">Navigate</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {navLinks.filter((l) => !l.featured).map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group/nav relative overflow-hidden rounded-xl border border-stone-200/60 bg-white transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-stone-700 active:scale-[0.98] shadow-[0_1px_3px_rgba(28,25,23,0.02)] hover:shadow-[0_8px_32px_rgba(28,25,23,0.12),0_2px_8px_rgba(28,25,23,0.06)]"
                  >
                    {/* ── Dark fill that sweeps up from bottom ── */}
                    <span className="absolute inset-0 bg-stone-900 translate-y-full group-hover/nav:translate-y-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] rounded-xl z-0" />

                    {/* ── Shine sweep across card ── */}
                    <span className="absolute top-0 -left-full w-[60%] h-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent z-[1] pointer-events-none group-hover/nav:animate-[shineSweep_0.7s_0.2s_ease-out_forwards]" />

                    {/* ── Content ── */}
                    <div className="relative z-10 p-4 lg:p-5">
                      <div className="flex items-start justify-between mb-3">
                        {/* Icon container */}
                        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-stone-50 transition-[background-color] duration-500 group-hover/nav:bg-white/[0.12]">
                          <link.icon className="w-4 h-4 text-stone-400 transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/nav:text-white group-hover/nav:scale-110 group-hover/nav:rotate-[-8deg]" />
                        </div>
                        {/* Arrow slides in diagonally */}
                        <ArrowUpRight className="w-3.5 h-3.5 text-stone-300 opacity-0 translate-x-[-6px] translate-y-[6px] transition-[opacity,transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/nav:opacity-100 group-hover/nav:translate-x-0 group-hover/nav:translate-y-0 group-hover/nav:text-white/60" />
                      </div>

                      {/* Title */}
                      <p className="text-sm font-semibold tracking-[-0.01em] mb-1 text-stone-800 transition-colors duration-500 group-hover/nav:text-white">
                        {link.label}
                      </p>

                      {/* Animated underline that grows left→right */}
                      <span className="block w-0 h-[1px] bg-white/30 transition-[width] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/nav:w-full" />

                      {/* Description */}
                      <p className="text-[11px] font-medium text-stone-300 mt-1.5 transition-colors duration-500 group-hover/nav:text-stone-400">
                        {link.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Featured Book a Call link */}
              {navLinks.filter((l) => l.featured).map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group/feat relative mt-3 flex items-center gap-4 overflow-hidden rounded-xl bg-stone-900 border border-stone-800 p-5 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 active:scale-[0.99] shadow-[0_4px_20px_rgba(28,25,23,0.12),0_8px_40px_rgba(28,25,23,0.06)] hover:shadow-[0_12px_40px_rgba(28,25,23,0.18),0_20px_60px_rgba(28,25,23,0.1)]"
                >
                  {/* Shimmer sweep */}
                  <span className="absolute top-0 -left-full w-[50%] h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent z-[1] pointer-events-none group-hover/feat:animate-[shimmerSweep_0.8s_ease-out_forwards]" />

                  {/* Glow orbs */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/[0.03] rounded-full blur-xl transition-[transform,opacity] duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/feat:scale-150 group-hover/feat:opacity-[0.06]" />
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/[0.02] rounded-full blur-lg" />
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/feat:scale-105 group-hover/feat:bg-white/[0.15]">
                    <Zap className="w-5 h-5 text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/feat:rotate-12" />
                  </div>

                  {/* Text */}
                  <div className="relative z-10 flex-1">
                    <p className="text-sm font-semibold text-white leading-none mb-1">{link.label}</p>
                    <p className="text-[11px] font-medium text-stone-400">Schedule a free consultation with our team</p>
                  </div>

                  {/* Arrow */}
                  <ArrowUpRight className="relative z-10 w-5 h-5 text-stone-500 transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/feat:text-stone-300 group-hover/feat:translate-x-0.5 group-hover/feat:-translate-y-0.5" />
                </Link>
              ))}
            </div>

            {/* Company Column */}
            <div className="col-span-12 lg:col-span-3" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,24px,0)", transitionProperty: "opacity, transform", transitionDuration: "0.8s", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.35s", willChange: "transform, opacity", backfaceVisibility: "hidden" }}>
              <div className="flex items-center gap-2 mb-4 px-1"><div className="w-5 h-px bg-gradient-to-r from-stone-300 to-transparent" /><p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em]">Company</p></div>

              {/* Status */}
              <div 
                onMouseEnter={() => setIsStatusHovered(true)} 
                onMouseLeave={() => setIsStatusHovered(false)}
                className={`group/status relative overflow-hidden rounded-xl border mb-3 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white shadow-[0_1px_3px_rgba(28,25,23,0.02)] ${isStatusHovered ? "-translate-y-0.5 border-stone-700 shadow-[0_4px_16px_rgba(28,25,23,0.1)]" : "border-stone-200/60"}`}
              >
                <span className={`absolute inset-0 bg-stone-900 -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-xl z-0 ${isStatusHovered ? "translate-x-0" : ""}`} />
                <div className="relative z-10 p-4 lg:p-5 flex items-center gap-3">
                  <div>
                    <p className={`text-[13px] font-semibold leading-none mb-1 transition-colors duration-400 ${isStatusHovered ? "text-white" : "text-stone-700"}`}>Available</p>
                    <p className={`text-[10px] font-medium transition-colors duration-400 ${isStatusHovered ? "text-stone-400" : "text-stone-300"}`}>Open for new projects</p>
                  </div>
                </div>
              </div>

              {/* Facts with horizontal fill sweep */}
              <div className="space-y-2.5">
                {companyFacts.map((item, i) => {
                  const FactIcon = item.icon
                  return (
                    <div key={item.label} onMouseEnter={() => setHoveredFact(i)} onMouseLeave={() => setHoveredFact(null)} className={`group/fact relative flex items-center gap-3 p-3.5 lg:p-4 rounded-xl border cursor-default overflow-hidden transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white shadow-[0_1px_3px_rgba(28,25,23,0.02)] ${hoveredFact === i ? "-translate-y-0.5 border-stone-700 shadow-[0_4px_16px_rgba(28,25,23,0.1)]" : "border-stone-200/60"}`}>
                      <span className={`absolute inset-0 bg-stone-900 -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-xl z-0 ${hoveredFact === i ? "translate-x-0" : ""}`} />
                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg relative z-10 transition-colors duration-400 ${hoveredFact === i ? "bg-white/10" : "bg-stone-50"}`}>
                        <FactIcon className={`w-3.5 h-3.5 transition-colors duration-400 ${hoveredFact === i ? "text-white" : "text-stone-400"}`} />
                      </div>
                      <div className="min-w-0 flex-1 relative z-10">
                        <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] mb-0.5 transition-colors duration-400 ${hoveredFact === i ? "text-stone-500" : "text-stone-300"}`}>{item.label}</p>
                        <p className={`text-[13px] font-semibold transition-colors duration-400 ${hoveredFact === i ? "text-white" : "text-stone-700"}`}>{item.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Services Marquee */}
          <div className="mt-10 lg:mt-12" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,16px,0)", transitionProperty: "opacity, transform", transitionDuration: "0.8s", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.45s", willChange: "transform, opacity", backfaceVisibility: "hidden" }}>
            <div className="relative overflow-hidden rounded-2xl bg-stone-50/80 border border-stone-100 py-4">
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 lg:w-24 z-10 bg-gradient-to-r from-[rgba(250,250,249,1)] to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 lg:w-24 z-10 bg-gradient-to-l from-[rgba(250,250,249,1)] to-transparent" />
              <div className="flex w-max animate-[marqueeScroll_35s_linear_infinite] hover:[animation-play-state:paused]">
                {[...Array(4)].map((_, s) => (<div key={s} className="flex items-center shrink-0" aria-hidden={s > 0}>{services.map((tag, i) => (<div key={`${s}-${i}`} className="group/mtag flex items-center gap-3 mx-6 lg:mx-8 shrink-0 cursor-default"><div className="w-1.5 h-1.5 rounded-full bg-stone-300 transition-[transform,background-color] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/mtag:scale-150 group-hover/mtag:bg-stone-600" /><span className="text-[11px] lg:text-xs font-semibold text-stone-400 tracking-[0.15em] uppercase whitespace-nowrap transition-colors duration-400 group-hover/mtag:text-stone-600">{tag}</span></div>))}</div>))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 lg:mt-12">
            <div className="relative h-px w-full overflow-hidden"><div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-200/80 to-transparent" /></div>
            <div className="flex items-center justify-between py-8" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,12px,0)", transitionProperty: "opacity, transform", transitionDuration: "0.8s", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.55s", willChange: "transform, opacity", backfaceVisibility: "hidden" }}>
              <div className="flex items-center gap-5">
                <p className="text-[11px] font-semibold text-stone-300 tracking-[0.15em] uppercase">© {new Date().getFullYear()} Insalink</p>
                <div className="w-px h-3.5 bg-stone-200" />
                <div className="group/stat flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-50 border border-stone-100 cursor-default"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /><span className="text-[10px] font-semibold text-stone-400 tracking-wider uppercase transition-colors duration-400 group-hover/stat:text-stone-600">System Operational</span></div>
              </div>

              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group/top flex items-center gap-2 text-[11px] font-semibold text-stone-300 cursor-pointer transition-colors duration-400 hover:text-stone-600">
                <span className="relative tracking-wider uppercase">Back to Top<span className="absolute -bottom-0.5 left-0 w-0 h-px bg-stone-600 transition-[width] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/top:w-full" /></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/top:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
              </button>

              <div className="group/tag flex items-center gap-2 py-1.5 px-4 rounded-full border border-stone-100 bg-stone-50/50 cursor-default">
                <Sparkles className="h-3 w-3 text-stone-300 transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tag:text-stone-600 group-hover/tag:rotate-12 group-hover/tag:scale-110" />
                <span className="text-[11px] font-semibold text-stone-300 tracking-[0.2em] uppercase transition-colors duration-400 group-hover/tag:text-stone-600">Innovating Beyond Pixels</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Only keyframes — all hover animations use Tailwind group-hover */}
      <style jsx global>{`
        @keyframes shineSweep {
          0% { transform: translate3d(-100%, 0, 0); }
          100% { transform: translate3d(350%, 0, 0); }
        }
        @keyframes shimmerSweep {
          0% { transform: translate3d(-100%, 0, 0); }
          100% { transform: translate3d(400%, 0, 0); }
        }
        @keyframes marqueeScroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </footer>
  )
}