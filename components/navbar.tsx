"use client"

import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import {
  Home,
  FolderOpen,
  BarChart2,
  Workflow,
  Info,
  ArrowRight,
  Calendar,
  Tag,
  Shield,
} from "lucide-react"

const topNavItems = [
  { label: "Home", href: "/", Icon: Home, isHash: false },
  { label: "Projects", href: "#social-proof", Icon: FolderOpen, isHash: true },
  {
    label: "How We Work",
    href: "#services-section",
    Icon: Workflow,
    isHash: true,
  },
  { label: "About", href: "/about", Icon: Info, isHash: false },
]

const bottomItems = [
  { label: "Home", href: "#product", Icon: Home, isHash: true },
  { label: "Projects", href: "#social-proof", Icon: FolderOpen, isHash: true },
  { label: "Value", href: "#value-section", Icon: Shield, isHash: true },
  {
    label: "How We Work",
    href: "#services-section",
    Icon: Workflow,
    isHash: true,
  },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [bottomBarReady, setBottomBarReady] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [mounted, setMounted] = useState(false)
  const isMobile = useIsMobile()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Track active section + hero visibility
  useEffect(() => {
    const ids = bottomItems.map((n) => n.href.slice(1))

    function onScroll() {
      // Check if past hero section
      const heroEl = document.getElementById("product")
      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect()
        // Hide bottom bar when hero bottom is still in view
        setPastHero(heroRect.bottom < 100)
      } else {
        setPastHero(window.scrollY > 400)
      }

      // Track active section
      let current = ""
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom > 200) {
            current = id
            break
          }
        }
      }
      setActiveSection(current)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    setBottomBarReady(true)
  }, [])

  const isTopActive = useCallback(
    (item: (typeof topNavItems)[0]) => {
      if (item.label === "How We Work" && pathname === "/how-we-work")
        return true
      if (item.isHash) return activeSection === item.href.slice(1)
      if (item.href === "/") return pathname === "/" && !activeSection
      return pathname.startsWith(item.href)
    },
    [activeSection, pathname]
  )

  const isBottomActive = useCallback(
    (item: (typeof bottomItems)[0]) => {
      if (item.label === "How We Work" && pathname === "/how-we-work")
        return true
      return activeSection === item.href.slice(1)
    },
    [activeSection, pathname]
  )

  function handleNavClick(e: React.MouseEvent, href: string) {
    if (href.startsWith("#")) {
      e.preventDefault()
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      } else {
        router.push(`/${href}`)
      }
      setIsOpen(false)
      return
    }
    setIsOpen(false)
  }

  function handleGetStarted() {
    setIsOpen(false)
    router.push("/book")
  }

  // Bottom bar should show only when ready AND past hero
  const showBottomBar = bottomBarReady && pastHero

  return (
    <>
      {/* ── TOP NAVBAR ── */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? "top-navbar-scrolled" : "top-navbar-clear"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            <Link
              href="/"
              className="top-nav-logo group/logo flex items-center gap-2 flex-shrink-0 relative z-10"
            >
              <div className="top-nav-logo-ring relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                <span className="top-nav-logo-glow" />
                <Image
                  src="/Logo.png"
                  alt="Insalink Logo"
                  width={40}
                  height={40}
                  className="top-nav-logo-img object-contain rounded-full relative z-10"
                />
              </div>
              <span className="top-nav-logo-text font-bold text-lg sm:text-xl text-stone-900 leading-none">
                Insalink
              </span>
            </Link>

            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center">
              <div className="top-nav-pill flex items-center gap-0.5 rounded-full px-1.5 py-1">
                {topNavItems.map((item) => {
                  const active = isTopActive(item)
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={(e) =>
                        handleNavClick(
                          e as unknown as React.MouseEvent,
                          item.href
                        )
                      }
                      className={`top-nav-link group/tlink relative flex items-center gap-1.5 px-3.5 lg:px-4 py-2 rounded-full text-[13px] font-medium ${
                        active
                          ? "text-stone-900 top-nav-link-active"
                          : "text-stone-500"
                      }`}
                    >
                      {active && <span className="top-nav-link-active-bg" />}
                      <span className="top-nav-link-fill" />
                      <span className="relative z-10 top-nav-link-label">
                        {item.label}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3 relative z-10">
              <Button
                size="sm"
                className="top-nav-cta group/tcta relative rounded-full text-[13px] px-5 lg:px-6 py-2 font-semibold overflow-hidden"
                onClick={handleGetStarted}
                aria-label="Book a meeting"
              >
                <span className="top-nav-cta-fill" />
                <span className="top-nav-cta-shine" />
                <span className="relative z-10 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 top-nav-cta-icon" />
                  <span className="top-nav-cta-text">Book</span>
                  <ArrowRight className="w-3 h-3 top-nav-cta-arrow" />
                </span>
              </Button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative z-10 flex items-center justify-center w-10 h-10 rounded-xl top-nav-hamburger"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <span className="relative inline-block w-[18px] h-[14px]">
                <span
                  className={`absolute left-0 block h-[1.5px] w-full bg-current rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen
                      ? "top-1/2 -translate-y-1/2 rotate-45"
                      : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 block h-[1.5px] bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "w-0 opacity-0" : "w-3/4 opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.5px] w-full bg-current rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen
                      ? "bottom-1/2 translate-y-1/2 -rotate-45"
                      : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-white/95 backdrop-blur-xl transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`relative z-10 h-full flex flex-col pt-20 pb-28 px-6 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="flex-1 flex flex-col gap-1">
            {topNavItems.map((item, i) => {
              const href = item.label === "How We Work" ? "/how-we-work" : item.href
              return (
                <Link
                  key={item.label}
                  href={href}
                  onClick={(e) =>
                    handleNavClick(e as unknown as React.MouseEvent, href)
                  }
                className="mobile-menu-link group/mmlink relative flex items-center gap-4 px-4 py-4 rounded-2xl overflow-hidden"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen
                    ? "translate3d(0,0,0)"
                    : "translate3d(0,12px,0)",
                  transitionProperty: "opacity, transform",
                  transitionDuration: "0.5s",
                  transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                  transitionDelay: isOpen ? `${80 + i * 50}ms` : "0ms",
                }}
              >
                <span className="mobile-menu-fill" />
                <div className="mobile-menu-icon relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-stone-50 shrink-0">
                  <item.Icon className="h-[18px] w-[18px] text-stone-400 mobile-menu-icon-svg" />
                </div>
                <div className="relative z-10 flex-1 flex items-center justify-between">
                  <span className="text-[15px] font-semibold text-stone-800 mobile-menu-label">
                    {item.label}
                  </span>
                  <span className="mobile-menu-num text-[10px] font-mono font-medium text-stone-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <ArrowRight className="relative z-10 w-4 h-4 text-stone-300 mobile-menu-arrow" />
                <span className="mobile-menu-underline" />
              </Link>
            )})}
          </div>

          <div
            className="mt-6 space-y-3"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen
                ? "translate3d(0,0,0)"
                : "translate3d(0,16px,0)",
              transitionProperty: "opacity, transform",
              transitionDuration: "0.5s",
              transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: isOpen
                ? `${80 + topNavItems.length * 50}ms`
                : "0ms",
            }}
          >
            <button
              className="mobile-menu-cta w-full relative rounded-2xl py-4 text-[15px] font-semibold overflow-hidden"
              onClick={handleGetStarted}
            >
              <span className="mobile-menu-cta-shimmer" />
              <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                <Calendar className="w-4 h-4" />
                Book a Consultation
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
            <div className="flex items-center justify-center gap-2 pt-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-semibold text-stone-400 tracking-[0.15em] uppercase">
                Available for projects
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM FLOATING BAR ── */}
      {mounted && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <div
            className={`pointer-events-auto bb ${
              showBottomBar ? "bb-show" : "bb-hide"
            }`}
          >
            <div className="flex items-center gap-0.5 sm:gap-1">
              {bottomItems
                .filter((item) => !(item.label === "How We Work" && isMobile))
                .map((item) => {
                  const Icon = item.Icon
                  const active = isBottomActive(item)
                  const href = item.href
                  return (
                    <Link
                      key={`bb-${item.label}`}
                      href={href}
                      onClick={(e) =>
                        handleNavClick(e as unknown as React.MouseEvent, href)
                      }
                      className={`bbi group/bbi ${active ? "bbi-active" : ""}`}
                      aria-label={item.label}
                    >
                    <span className={`bbi-bg ${active ? "bbi-bg-on" : ""}`} />
                    <span className={`bbi-dot ${active ? "bbi-dot-on" : ""}`} />
                    <span className="bbi-iw">
                      <Icon className={`bbi-i ${active ? "bbi-i-on" : ""}`} />
                    </span>
                    <span className={`bbi-lbl ${active ? "bbi-lbl-on" : ""}`}>
                      {item.label}
                    </span>
                  </Link>
                )
              })}
            </div>

            <div className="bb-div" />

            <Link href="/pricing" className="bb-cta group/bcta">
              <span className="bb-cta-fill" />
              <span className="bb-cta-shine" />
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <Tag className="bb-cta-tag" />
                <span className="bb-cta-text">
                  <span className="hidden sm:inline">View Plans &</span> Pricing
                </span>
                <ArrowRight className="bb-cta-arr" />
              </span>
            </Link>
          </div>
        </div>
      )}

      <div className="h-16 sm:h-20" />

      <style jsx global>{`
        /* ═══ TOP NAVBAR ═══ */
        .top-navbar-clear {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid transparent;
        }
        .top-navbar-scrolled {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(214, 211, 209, 0.3);
          box-shadow: 0 1px 3px rgba(28, 25, 23, 0.02),
            0 4px 12px rgba(28, 25, 23, 0.02);
        }

        .top-nav-logo-ring {
          position: relative;
        }
        .top-nav-logo-glow {
          position: absolute;
          inset: -2px;
          border-radius: 9999px;
          background: conic-gradient(
            from 0deg,
            transparent 0%,
            rgba(59, 130, 246, 0.3) 25%,
            transparent 50%,
            rgba(59, 130, 246, 0.3) 75%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.6s ease;
          animation: logoSpin 3s linear infinite;
          animation-play-state: paused;
        }
        .top-nav-logo:hover .top-nav-logo-glow {
          opacity: 1;
          animation-play-state: running;
        }
        @keyframes logoSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .top-nav-logo-img {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .top-nav-logo:hover .top-nav-logo-img {
          transform: scale(1.08);
        }
        .top-nav-logo-text {
          transition: color 0.4s ease,
            letter-spacing 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .top-nav-logo:hover .top-nav-logo-text {
          color: #1c1917;
          letter-spacing: 0.02em;
        }
        .top-nav-logo-sub {
          transition: color 0.4s ease,
            letter-spacing 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .top-nav-logo:hover .top-nav-logo-sub {
          color: #78716c;
          letter-spacing: 0.3em;
        }

        .top-nav-pill {
          background: rgba(250, 250, 249, 0.6);
          border: 1px solid rgba(214, 211, 209, 0.4);
          backdrop-filter: blur(8px);
          transition: background 0.4s ease, border-color 0.4s ease;
        }
        .top-navbar-scrolled .top-nav-pill {
          background: rgba(250, 250, 249, 0.8);
          border-color: rgba(214, 211, 209, 0.5);
        }

        .top-nav-link {
          position: relative;
          overflow: hidden;
        }
        .top-nav-link-fill {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: #1c1917;
          transform: translate3d(-101%, 0, 0);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 0;
        }
        .top-nav-link:hover .top-nav-link-fill {
          transform: translate3d(0, 0, 0);
        }
        .top-nav-link-label {
          transition: color 0.4s ease;
        }
        .top-nav-link:hover .top-nav-link-label {
          color: white;
        }
        .top-nav-link-active:hover .top-nav-link-fill {
          background: rgba(28, 25, 23, 0.06);
        }
        .top-nav-link-active:hover .top-nav-link-label {
          color: #1c1917;
        }
        .top-nav-link-active-bg {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: white;
          box-shadow: 0 1px 3px rgba(28, 25, 23, 0.04);
          z-index: 0;
          animation: topNavAct 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes topNavAct {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .top-nav-link:active {
          transform: scale(0.95);
          transition: transform 0.15s ease;
        }

        .top-nav-cta {
          background: linear-gradient(
            135deg,
            var(--primary),
            rgba(59, 130, 246, 0.85)
          );
          color: white;
          border: none;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.5s ease;
        }
        .top-nav-cta:hover {
          transform: translate3d(0, -2px, 0);
          box-shadow: 0 6px 24px rgba(59, 130, 246, 0.22);
        }
        .top-nav-cta:active {
          transform: translate3d(0, 0, 0) scale(0.96);
        }
        .top-nav-cta-fill {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.15),
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          border-radius: inherit;
        }
        .top-nav-cta:hover .top-nav-cta-fill {
          opacity: 1;
        }
        .top-nav-cta-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.15),
            transparent
          );
          z-index: 1;
          pointer-events: none;
          border-radius: inherit;
        }
        .top-nav-cta:hover .top-nav-cta-shine {
          animation: tcs 0.6s 0.15s ease-out forwards;
        }
        @keyframes tcs {
          0% {
            transform: translate3d(-100%, 0, 0);
          }
          100% {
            transform: translate3d(350%, 0, 0);
          }
        }
        .top-nav-cta-icon {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .top-nav-cta:hover .top-nav-cta-icon {
          transform: rotate(12deg) scale(1.1);
        }
        .top-nav-cta-text {
          position: relative;
        }
        .top-nav-cta-text::after {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0;
          height: 1px;
          background: rgba(255, 255, 255, 0.5);
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .top-nav-cta:hover .top-nav-cta-text::after {
          width: 100%;
        }
        .top-nav-cta-arrow {
          opacity: 0;
          transform: translate3d(-6px, 0, 0);
          transition: opacity 0.4s ease,
            transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .top-nav-cta:hover .top-nav-cta-arrow {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
        .top-nav-hamburger {
          color: #44403c;
          transition: color 0.3s ease, background-color 0.3s ease;
        }
        .top-nav-hamburger:active {
          background-color: rgba(28, 25, 23, 0.04);
          color: #1c1917;
        }

        /* ═══ MOBILE MENU ═══ */
        .mobile-menu-link {
          position: relative;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mobile-menu-link:active {
          transform: scale(0.98);
        }
        .mobile-menu-fill {
          position: absolute;
          inset: 0;
          background: #1c1917;
          border-radius: inherit;
          transform: translate3d(0, 100%, 0);
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 0;
        }
        .mobile-menu-link:active .mobile-menu-fill {
          transform: translate3d(0, 0, 0);
        }
        .mobile-menu-icon {
          transition: background-color 0.3s ease;
        }
        .mobile-menu-link:active .mobile-menu-icon {
          background-color: rgba(255, 255, 255, 0.1);
        }
        .mobile-menu-icon-svg {
          transition: color 0.3s ease,
            transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mobile-menu-link:active .mobile-menu-icon-svg {
          color: white;
          transform: scale(1.1);
        }
        .mobile-menu-label {
          transition: color 0.3s ease;
        }
        .mobile-menu-link:active .mobile-menu-label {
          color: white;
        }
        .mobile-menu-num {
          transition: color 0.3s ease;
        }
        .mobile-menu-link:active .mobile-menu-num {
          color: rgba(255, 255, 255, 0.3);
        }
        .mobile-menu-arrow {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            color 0.3s ease;
        }
        .mobile-menu-link:active .mobile-menu-arrow {
          transform: translate3d(4px, 0, 0);
          color: rgba(255, 255, 255, 0.5);
        }
        .mobile-menu-underline {
          position: absolute;
          bottom: 0;
          left: 16px;
          right: 16px;
          height: 1px;
          background: rgba(214, 211, 209, 0.3);
          z-index: 2;
          transition: opacity 0.3s ease;
        }
        .mobile-menu-link:active .mobile-menu-underline {
          opacity: 0;
        }
        .mobile-menu-cta {
          background: linear-gradient(
            135deg,
            var(--primary),
            rgba(59, 130, 246, 0.85)
          );
          border: none;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.2);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.3s ease;
        }
        .mobile-menu-cta:active {
          transform: scale(0.97);
        }
        .mobile-menu-cta-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          z-index: 0;
          border-radius: inherit;
          animation: msh 3s ease-in-out infinite;
        }
        @keyframes msh {
          0%,
          100% {
            transform: translate3d(-100%, 0, 0);
          }
          50% {
            transform: translate3d(350%, 0, 0);
          }
        }

        /* ═══ BOTTOM BAR ═══ */
        .bb {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 6px 6px 8px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(24px) saturate(1.4);
          -webkit-backdrop-filter: blur(24px) saturate(1.4);
          border: 1px solid rgba(214, 211, 209, 0.35);
          box-shadow: 0 4px 24px rgba(28, 25, 23, 0.06),
            0 8px 48px rgba(28, 25, 23, 0.04),
            0 0 0 0.5px rgba(255, 255, 255, 0.6) inset;
          margin-bottom: 12px;
          /* Smooth show/hide */
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
        }
        @media (min-width: 640px) {
          .bb {
            gap: 8px;
            padding: 7px 8px 7px 10px;
            border-radius: 24px;
            margin-bottom: 16px;
          }
        }

        .bb-show {
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }
        .bb-hide {
          transform: translate3d(0, 100px, 0);
          opacity: 0;
          pointer-events: none;
        }

        /* ═══ BOTTOM ITEMS ═══ */
        .bbi {
          position: relative;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          cursor: pointer;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }
        @media (min-width: 640px) {
          .bbi {
            width: 48px;
            height: 48px;
            border-radius: 14px;
          }
        }

        .bbi-active {
          width: 80px;
          animation: bbiPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media (min-width: 640px) {
          .bbi-active {
            width: 90px;
          }
        }
        @keyframes bbiPop {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          30% {
            transform: translate3d(0, -2px, 0) scale(1.04);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        .bbi-bg {
          position: absolute;
          inset: 2px;
          border-radius: inherit;
          background: rgba(59, 130, 246, 0.08);
          transform: scale(0);
          opacity: 0;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.5s ease;
          z-index: 0;
        }
        .bbi-bg-on {
          transform: scale(1);
          opacity: 1;
        }

        .bbi::before {
          content: "";
          position: absolute;
          inset: 2px;
          border-radius: inherit;
          background: transparent;
          transition: background 0.4s ease;
          z-index: 0;
        }
        .bbi:hover::before {
          background: rgba(28, 25, 23, 0.03);
        }
        .bbi-active:hover::before {
          background: transparent;
        }
        .bbi:hover {
          transform: translate3d(0, -2px, 0);
        }
        .bbi:active {
          transform: translate3d(0, 0, 0) scale(0.92);
          transition-duration: 0.15s;
        }

        .bbi-dot {
          position: absolute;
          top: 3px;
          left: 50%;
          width: 3px;
          height: 3px;
          border-radius: 9999px;
          background: var(--primary);
          z-index: 2;
          transform: translateX(-50%) translate3d(0, -6px, 0) scale(0);
          opacity: 0;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.4s ease;
        }
        .bbi-dot-on {
          transform: translateX(-50%) translate3d(0, 0, 0) scale(1);
          opacity: 1;
        }

        .bbi-iw {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bbi-i {
          width: 18px;
          height: 18px;
          color: #a8a29e;
          transition: color 0.5s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (min-width: 640px) {
          .bbi-i {
            width: 19px;
            height: 19px;
          }
        }
        .bbi:hover .bbi-i {
          color: #57534e;
          transform: scale(1.08);
        }
        .bbi-i-on {
          color: var(--primary) !important;
          transform: scale(1.05);
        }
        .bbi:hover .bbi-i-on {
          transform: scale(1.12);
        }

        .bbi-lbl {
          position: relative;
          z-index: 1;
          font-size: 0;
          font-weight: 700;
          color: var(--primary);
          letter-spacing: 0.01em;
          margin-top: 0;
          white-space: nowrap;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: font-size 0.5s cubic-bezier(0.16, 1, 0.3, 1),
            max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.4s ease,
            margin-top 0.5s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translate3d(0, 4px, 0);
        }
        .bbi-lbl-on {
          font-size: 8px;
          max-height: 14px;
          opacity: 1;
          margin-top: 2px;
          transform: translate3d(0, 0, 0);
        }
        @media (min-width: 640px) {
          .bbi-lbl-on {
            font-size: 9px;
          }
        }

        /* ═══ BOTTOM DIVIDER ═══ */
        .bb-div {
          width: 1px;
          height: 28px;
          flex-shrink: 0;
          margin: 0 2px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(214, 211, 209, 0.5),
            transparent
          );
        }
        @media (min-width: 640px) {
          .bb-div {
            height: 32px;
            margin: 0 4px;
          }
        }

        /* ═══ BOTTOM CTA ═══ */
        .bb-cta {
          position: relative;
          display: flex;
          align-items: center;
          padding: 10px 14px;
          border-radius: 14px;
          background: #1c1917;
          color: white;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          flex-shrink: 0;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(28, 25, 23, 0.12);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.5s ease;
        }
        @media (min-width: 640px) {
          .bb-cta {
            padding: 12px 18px;
            border-radius: 16px;
            font-size: 13px;
          }
        }
        .bb-cta:hover {
          transform: translate3d(0, -2px, 0);
          box-shadow: 0 6px 24px rgba(28, 25, 23, 0.18);
        }
        .bb-cta:active {
          transform: translate3d(0, 0, 0) scale(0.96);
          transition-duration: 0.15s;
        }

        .bb-cta-fill {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.9),
            var(--primary)
          );
          transform: translate3d(-101%, 0, 0);
          transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: inherit;
          z-index: 0;
        }
        .bb-cta:hover .bb-cta-fill {
          transform: translate3d(0, 0, 0);
        }

        .bb-cta-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.12),
            transparent
          );
          z-index: 1;
          pointer-events: none;
          border-radius: inherit;
        }
        .bb-cta:hover .bb-cta-shine {
          animation: bcs 0.6s 0.2s ease-out forwards;
        }
        @keyframes bcs {
          0% {
            transform: translate3d(-100%, 0, 0);
          }
          100% {
            transform: translate3d(350%, 0, 0);
          }
        }

        .bb-cta-tag {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bb-cta:hover .bb-cta-tag {
          transform: rotate(-12deg) scale(1.1);
        }
        .bb-cta-text {
          position: relative;
        }
        .bb-cta-text::after {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0;
          height: 1px;
          background: rgba(255, 255, 255, 0.4);
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bb-cta:hover .bb-cta-text::after {
          width: 100%;
        }
        .bb-cta-arr {
          width: 12px;
          height: 12px;
          flex-shrink: 0;
          opacity: 0;
          transform: translate3d(-6px, 0, 0);
          transition: opacity 0.4s ease,
            transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bb-cta:hover .bb-cta-arr {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        @media (max-width: 639px) {
          .bb-cta:active .bb-cta-fill {
            transform: translate3d(0, 0, 0);
          }
          .bb-cta:active .bb-cta-tag {
            transform: rotate(-12deg) scale(1.1);
          }
          .bb-cta:active .bb-cta-arr {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
          .bb-cta:active .bb-cta-text::after {
            width: 100%;
          }
        }

        /* ═══ REDUCED MOTION ═══ */
        @media (prefers-reduced-motion: reduce) {
          .top-nav-logo-glow,
          .top-nav-logo-img,
          .top-nav-logo-text,
          .top-nav-logo-sub,
          .top-nav-pill,
          .top-nav-link,
          .top-nav-link-fill,
          .top-nav-link-label,
          .top-nav-link-active-bg,
          .top-nav-cta,
          .top-nav-cta-fill,
          .top-nav-cta-shine,
          .top-nav-cta-icon,
          .top-nav-cta-text::after,
          .top-nav-cta-arrow,
          .top-nav-hamburger,
          .mobile-menu-link,
          .mobile-menu-fill,
          .mobile-menu-icon,
          .mobile-menu-icon-svg,
          .mobile-menu-label,
          .mobile-menu-num,
          .mobile-menu-arrow,
          .mobile-menu-underline,
          .mobile-menu-cta,
          .mobile-menu-cta-shimmer,
          .bb,
          .bbi,
          .bbi::before,
          .bbi-bg,
          .bbi-dot,
          .bbi-i,
          .bbi-lbl,
          .bb-cta,
          .bb-cta-fill,
          .bb-cta-shine,
          .bb-cta-tag,
          .bb-cta-text::after,
          .bb-cta-arr {
            transition: none !important;
            animation: none !important;
          }
          .top-nav-link-fill,
          .top-nav-cta-shine,
          .mobile-menu-fill,
          .mobile-menu-cta-shimmer,
          .bb-cta-fill,
          .bb-cta-shine {
            display: none !important;
          }
          .bb-show {
            transform: none;
            opacity: 1;
          }
          .bbi-bg-on {
            transform: scale(1);
            opacity: 1;
          }
          .bbi-dot-on {
            transform: translateX(-50%) scale(1);
            opacity: 1;
          }
          .bbi-lbl-on {
            font-size: 9px;
            max-height: 14px;
            opacity: 1;
            margin-top: 2px;
            transform: none;
          }
        }
      `}</style>
    </>
  )
}