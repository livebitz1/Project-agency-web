"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { ArrowRight, Zap, Shield, Users, RefreshCw } from "lucide-react"
import Link from "next/link"

const LABELS = [
  "Seamless Integration",
  "Advanced Security",
  "Dedicated Support",
  "Regular Updates",
]

export function ValueSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const tooltipTextRef = useRef<HTMLSpanElement | null>(null)
  const benefitRefs = useRef<(HTMLDivElement | null)[]>([])
  const cursorPos = useRef({ x: 0, y: 0 })
  const targetPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)
  const hotspotIndex = useRef(0)
  const phaseRef = useRef<"moving" | "paused">("moving")
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const typeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const moveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sectionInView = useRef(false)

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setIsVisible(true)
      return
    }

    const el = document.getElementById("value-section")
    if (!el) {
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
      { threshold: 0.08 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function getCardTarget(index: number) {
    const section = sectionRef.current
    const card = benefitRefs.current[index]
    if (!section || !card) return { x: 0, y: 0 }

    const sectionRect = section.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()
    const isSmall = typeof window !== "undefined" && window.innerWidth < 640

    return {
      x: isSmall 
        ? cardRect.left - sectionRect.left + cardRect.width * 0.8 
        : cardRect.right - sectionRect.left - 30,
      y: cardRect.top - sectionRect.top + cardRect.height / 2 - 12,
    }
  }

  const animate = useCallback(() => {
    const lerp = 0.055
    cursorPos.current.x += (targetPos.current.x - cursorPos.current.x) * lerp
    cursorPos.current.y += (targetPos.current.y - cursorPos.current.y) * lerp

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`
    }

    const dx = Math.abs(targetPos.current.x - cursorPos.current.x)
    const dy = Math.abs(targetPos.current.y - cursorPos.current.y)

    if (dx < 1.5 && dy < 1.5 && phaseRef.current === "moving") {
      phaseRef.current = "paused"

      if (cursorRef.current) {
        cursorRef.current.classList.add("ac-arrived")
      }

      // Trigger hover on the current benefit card
      const currentCard = benefitRefs.current[hotspotIndex.current]
      if (currentCard) {
        currentCard.classList.add("benefit-card-hovered")
      }

      typeText(LABELS[hotspotIndex.current])

      pauseTimer.current = setTimeout(() => {
        if (cursorRef.current) {
          cursorRef.current.classList.remove("ac-arrived")
        }
        if (tooltipTextRef.current) {
          tooltipTextRef.current.textContent = ""
        }

        // Remove hover from current card
        const card = benefitRefs.current[hotspotIndex.current]
        if (card) {
          card.classList.remove("benefit-card-hovered")
        }

        moveTimer.current = setTimeout(() => {
          hotspotIndex.current = (hotspotIndex.current + 1) % LABELS.length
          const target = getCardTarget(hotspotIndex.current)
          targetPos.current.x = target.x
          targetPos.current.y = target.y
          phaseRef.current = "moving"
        }, 400)
      }, 2000)
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  function typeText(text: string) {
    if (!tooltipTextRef.current) return
    tooltipTextRef.current.textContent = ""
    let i = 0

    function typeChar() {
      if (!tooltipTextRef.current) return
      if (i < text.length) {
        tooltipTextRef.current.textContent = text.slice(0, i + 1)
        i++
        typeTimer.current = setTimeout(typeChar, 30 + Math.random() * 20)
      }
    }

    typeTimer.current = setTimeout(typeChar, 250)
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sectionInView.current) {
          sectionInView.current = true
          hotspotIndex.current = 0
          phaseRef.current = "moving"

          const firstTarget = getCardTarget(0)
          cursorPos.current.x = firstTarget.x - 50
          cursorPos.current.y = firstTarget.y - 40
          targetPos.current.x = firstTarget.x
          targetPos.current.y = firstTarget.y

          if (cursorRef.current) {
            cursorRef.current.classList.add("ac-visible")
            cursorRef.current.classList.remove("ac-hidden")
          }

          rafRef.current = requestAnimationFrame(animate)
        } else if (!entry.isIntersecting && sectionInView.current) {
          sectionInView.current = false

          if (cursorRef.current) {
            cursorRef.current.classList.remove("ac-visible")
            cursorRef.current.classList.add("ac-hidden")
            cursorRef.current.classList.remove("ac-arrived")
          }

          // Remove hover from all cards
          benefitRefs.current.forEach((card) => {
            if (card) card.classList.remove("benefit-card-hovered")
          })

          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          if (pauseTimer.current) clearTimeout(pauseTimer.current)
          if (typeTimer.current) clearTimeout(typeTimer.current)
          if (moveTimer.current) clearTimeout(moveTimer.current)

          hotspotIndex.current = 0
          phaseRef.current = "moving"

          if (tooltipTextRef.current) {
            tooltipTextRef.current.textContent = ""
          }
        }
      },
      { threshold: 0.15 }
    )

    obs.observe(section)

    return () => {
      obs.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (pauseTimer.current) clearTimeout(pauseTimer.current)
      if (typeTimer.current) clearTimeout(typeTimer.current)
      if (moveTimer.current) clearTimeout(moveTimer.current)
    }
  }, [animate])

  const benefits = [
    {
      icon: Zap,
      title: "Seamless Integration",
      desc: "Seamless integration with your existing tools and workflow",
    },
    {
      icon: Shield,
      title: "Advanced Security",
      desc: "Advanced security and compliance features built-in",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      desc: "Dedicated support from our expert team around the clock",
    },
    {
      icon: RefreshCw,
      title: "Regular Updates",
      desc: "Regular updates and new features shipped continuously",
    },
  ]

  const stats = [
    { value: "99.9%", label: "Uptime" },
    { value: "2x", label: "Faster" },
    { value: "24/7", label: "Support" },
  ]

  const subtitleWords =
    "We combine cutting-edge technology with intuitive design to create products that teams love to use — built for scale, designed for humans.".split(
      " "
    )

  return (
    <section
      id="value-section"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden"
    >
      {/* Auto cursor */}
      <div ref={cursorRef} className="ac ac-hidden" aria-hidden="true">
        <svg className="ac-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z"
            fill="#1c1917"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        <span className="ac-ring" />
        <div className="ac-tooltip">
          <span className="ac-tooltip-arrow" />
          <span ref={tooltipTextRef} className="ac-tooltip-text" />
          <span className="ac-tooltip-caret" />
        </div>
      </div>

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full bg-stone-100/40 blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-[350px] h-[350px] rounded-full bg-stone-50/50 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-center">
          {/* ── Left Column ── */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,24px,0)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "0.1s",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-6 h-px bg-gradient-to-r from-stone-400 to-transparent" />
              <p className="text-[10px] sm:text-[11px] font-semibold text-stone-400 uppercase tracking-[0.3em]">
                Why Choose Us
              </p>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1.1] mb-5">
              <span className="text-stone-900">Why Choose</span>
              <br />
              <span className="text-stone-300">Insalink?</span>
            </h2>

            <p className="subtitle-container max-w-md mb-10 leading-[1.9] cursor-default">
              {subtitleWords.map((word, i) => (
                <span key={i} className="subtitle-word" style={{ transitionDelay: `${i * 20}ms` }}>
                  {word}
                </span>
              ))}
            </p>

            <div className="space-y-3">
  {benefits.map((benefit, i) => {
    const Icon = benefit.icon
    return (
      <div
        key={i}
        ref={(el) => { benefitRefs.current[i] = el }}
        className="group/b benefit-card relative flex items-center gap-4 p-4 rounded-xl border border-stone-200/60 bg-white cursor-default overflow-hidden"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,16px,0)",
          transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          transitionDelay: isVisible ? `${0.2 + i * 0.08}s` : "0s",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
        }}
      >
        <span className="benefit-fill absolute inset-0 rounded-xl z-0" />
        <div className="benefit-icon-wrap relative z-10 flex items-center justify-center w-10 h-10 rounded-xl bg-stone-50 shrink-0">
          <Icon className="benefit-icon w-4 h-4 text-stone-500" />
        </div>
        <div className="flex-1 min-w-0 relative z-10">
          <p className="benefit-title text-sm font-semibold tracking-[-0.01em] mb-0.5 text-stone-800">
            {benefit.title}
          </p>
          <p className="benefit-desc text-[12px] sm:text-[13px] font-light leading-relaxed text-stone-400">
            {benefit.desc}
          </p>
        </div>
        <span className="benefit-underline absolute bottom-0 left-0 h-[2px] w-0 bg-white/20 z-10" />
      </div>
    )
  })}
</div>
          

            <div
              className="flex items-center gap-6 sm:gap-8 mt-10 pt-8 border-t border-stone-100"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,12px,0)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: isVisible ? "0.6s" : "0s",
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
              }}
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <p className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-[-0.02em]">{stat.value}</p>
                  <p className="text-[11px] sm:text-xs font-medium text-stone-400 mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
              <div className="hidden sm:block w-px h-10 bg-stone-200 mx-2" />
              <Link href="/book" className="hidden sm:inline-flex group/cta items-center gap-2 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors duration-400">
                <span className="relative">
                  Get Started
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-stone-900 transition-[width] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:w-full" />
                </span>
                <ArrowRight className="w-3 h-3 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* ── Right Column — Image ── */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,28px,0)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "0.25s",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="group/img relative">
              <div className="img-card relative rounded-2xl sm:rounded-3xl overflow-hidden">
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-stone-200/60 pointer-events-none z-10" />
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
                  <Image src="/CARD-2.png" alt="Insalink features" width={1800} height={1100} className="img-main w-full h-auto block" priority={false} />
                  <div className="img-overlay absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-transparent" />
                </div>
              </div>
              <div className="img-shadow absolute left-[15%] right-[15%] -bottom-6 h-6 rounded-full blur-xl bg-stone-900/5" />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* ═══ AUTO CURSOR ═══ */
        .ac {
          position: absolute; top: 0; left: 0; z-index: 20;
          pointer-events: none; will-change: transform; backface-visibility: hidden;
        }

        .ac-visible { opacity: 1; transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1); }
        .ac-hidden { opacity: 0; transition: opacity 0.4s ease; }

        .ac-pointer {
          display: block;
          filter: drop-shadow(0 2px 4px rgba(28,25,23,0.15));
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
          width: 24px; height: 24px;
        }
        @media (max-width: 640px) { .ac-pointer { width: 20px; height: 20px; } }

        .ac-arrived .ac-pointer { transform: scale(0.85); }

        .ac-ring {
          position: absolute; top: 2px; left: 2px;
          width: 20px; height: 20px; border-radius: 9999px;
          border: 1.5px solid rgba(28,25,23,0.15);
          opacity: 0; transform: scale(0.5);
        }
        @media (max-width: 640px) { .ac-ring { width: 16px; height: 16px; } }

        .ac-arrived .ac-ring {
          animation: acRipple 0.7s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes acRipple {
          0% { opacity: 0.5; transform: scale(0.5); }
          100% { opacity: 0; transform: scale(2.2); }
        }

        .ac-tooltip {
          position: absolute; top: 26px; left: 18px;
          display: flex; flex-direction: column; align-items: flex-start;
          opacity: 0; transform: translate3d(0, 5px, 0);
          transition: opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        @media (max-width: 640px) { .ac-tooltip { top: 22px; left: 14px; } }

        .ac-arrived .ac-tooltip { opacity: 1; transform: translate3d(0, 0, 0); }

        .ac-tooltip-arrow {
          width: 9px; height: 9px; background: #1c1917;
          transform: rotate(45deg); border-radius: 1.5px;
          margin-bottom: -5px; margin-left: 7px; z-index: 0;
        }
        @media (max-width: 640px) { .ac-tooltip-arrow { width: 7px; height: 7px; margin-left: 5px; } }

        .ac-tooltip-text {
          position: relative; z-index: 1;
          display: inline-block; min-width: 16px; min-height: 14px;
          padding: 6px 12px; border-radius: 9px; background: #1c1917;
          color: white; font-size: 11px; font-weight: 600;
          letter-spacing: 0.01em; white-space: nowrap;
          box-shadow: 0 3px 12px rgba(28,25,23,0.16), 0 1px 4px rgba(28,25,23,0.08);
        }
        @media (max-width: 640px) { .ac-tooltip-text { font-size: 9px; padding: 4px 8px; border-radius: 7px; } }

        .ac-tooltip-caret {
          position: absolute; bottom: 6px; right: -1px;
          width: 1.5px; height: 12px; background: rgba(255,255,255,0.6);
          border-radius: 1px; opacity: 0; z-index: 2;
        }
        @media (max-width: 640px) { .ac-tooltip-caret { height: 10px; bottom: 4px; } }
        .ac-arrived .ac-tooltip-caret {
          animation: acCaret 0.5s ease-in-out infinite;
        }
        @keyframes acCaret {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        /* ═══ SUBTITLE ═══ */
        .subtitle-container {
          font-size: 14px; line-height: 1.9;
          display: flex; flex-wrap: wrap; gap: 0 5px;
        }
        @media (min-width: 640px) { .subtitle-container { font-size: 15px; } }

        .subtitle-word {
          display: inline-block; color: #a8a29e; font-weight: 300;
          transition: color 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1);
          will-change: transform;
        }
        .subtitle-container:hover .subtitle-word {
          color: #1c1917; font-weight: 400;
          animation: wordWave 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
          animation-delay: var(--word-delay, 0ms);
        }
        .subtitle-word:nth-child(1){--word-delay:0ms}.subtitle-word:nth-child(2){--word-delay:20ms}.subtitle-word:nth-child(3){--word-delay:40ms}.subtitle-word:nth-child(4){--word-delay:60ms}.subtitle-word:nth-child(5){--word-delay:80ms}.subtitle-word:nth-child(6){--word-delay:100ms}.subtitle-word:nth-child(7){--word-delay:120ms}.subtitle-word:nth-child(8){--word-delay:140ms}.subtitle-word:nth-child(9){--word-delay:160ms}.subtitle-word:nth-child(10){--word-delay:180ms}.subtitle-word:nth-child(11){--word-delay:200ms}.subtitle-word:nth-child(12){--word-delay:220ms}.subtitle-word:nth-child(13){--word-delay:240ms}.subtitle-word:nth-child(14){--word-delay:260ms}.subtitle-word:nth-child(15){--word-delay:280ms}.subtitle-word:nth-child(16){--word-delay:300ms}.subtitle-word:nth-child(17){--word-delay:320ms}.subtitle-word:nth-child(18){--word-delay:340ms}.subtitle-word:nth-child(19){--word-delay:360ms}.subtitle-word:nth-child(20){--word-delay:380ms}.subtitle-word:nth-child(21){--word-delay:400ms}.subtitle-word:nth-child(22){--word-delay:420ms}.subtitle-word:nth-child(23){--word-delay:440ms}.subtitle-word:nth-child(24){--word-delay:460ms}.subtitle-word:nth-child(25){--word-delay:480ms}.subtitle-word:nth-child(26){--word-delay:500ms}.subtitle-word:nth-child(27){--word-delay:520ms}

        @keyframes wordWave {
          0% { transform: translate3d(0,0,0); }
          40% { transform: translate3d(0,-3px,0); }
          100% { transform: translate3d(0,0,0); }
        }
        .subtitle-container:not(:hover) .subtitle-word {
          color: #a8a29e; font-weight: 300; animation: none;
        }

        /* ═══ BENEFIT CARDS ═══ */
        .benefit-card { box-shadow: 0 1px 3px rgba(28,25,23,0.02); }
        @media (max-width: 767px) { .benefit-card { pointer-events: none; } }
        .benefit-fill {
          background: #1c1917; transform: translate3d(0,100%,0);
          transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
        }
        .benefit-card:hover .benefit-fill,
        .benefit-card-hovered .benefit-fill { transform: translate3d(0,0,0); }

        .benefit-card:hover,
        .benefit-card-hovered {
          border-color: #292524;
          box-shadow: 0 4px 20px rgba(28,25,23,0.1);
          transform: translate3d(0,-2px,0) !important;
        }
        .benefit-card {
          transition: border-color 0.5s ease, box-shadow 0.5s ease,
            transform 0.5s cubic-bezier(0.16,1,0.3,1) !important;
        }

        .benefit-icon-wrap { transition: background-color 0.4s ease; }
        .benefit-card:hover .benefit-icon-wrap,
        .benefit-card-hovered .benefit-icon-wrap { background-color: rgba(255,255,255,0.1); }

        .benefit-icon { transition: color 0.4s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1); }
        .benefit-card:hover .benefit-icon,
        .benefit-card-hovered .benefit-icon { color: white; transform: scale(1.1); }

        .benefit-title { transition: color 0.4s ease; }
        .benefit-card:hover .benefit-title,
        .benefit-card-hovered .benefit-title { color: white; }

        .benefit-desc { transition: color 0.4s ease; }
        .benefit-card:hover .benefit-desc,
        .benefit-card-hovered .benefit-desc { color: #a8a29e; }

        .benefit-arrow {
          opacity: 0; transform: translate3d(-8px,0,0);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1), color 0.4s ease;
        }
        .benefit-card:hover .benefit-arrow,
        .benefit-card-hovered .benefit-arrow { opacity: 1; transform: translate3d(0,0,0); color: #a8a29e; }

        .benefit-underline { transition: width 0.6s cubic-bezier(0.16,1,0.3,1); }
        .benefit-card:hover .benefit-underline,
        .benefit-card-hovered .benefit-underline { width: 100%; }

        .benefit-card:active { transform: translate3d(0,0,0) scale(0.98) !important; }

        /* ═══ IMAGE CARD ═══ */
        .img-card {
          transition: transform 0.7s cubic-bezier(0.16,1,0.3,1), box-shadow 0.7s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 12px 40px rgba(28,25,23,0.08), 0 4px 16px rgba(28,25,23,0.04);
        }
        .group\/img:hover .img-card {
          transform: translate3d(0,-4px,0);
          box-shadow: 0 20px 60px rgba(28,25,23,0.14), 0 8px 24px rgba(28,25,23,0.06);
        }
        .img-main { transition: transform 1.2s cubic-bezier(0.16,1,0.3,1); }
        .group\/img:hover .img-main { transform: scale(1.03); }
        .img-overlay { opacity: 0; transition: opacity 0.7s ease; }
        .group\/img:hover .img-overlay { opacity: 1; }
        .img-shadow { opacity: 0.6; transition: opacity 0.7s ease; }
        .group\/img:hover .img-shadow { opacity: 1; }

        /* ═══ REDUCED MOTION ═══ */
        @media (prefers-reduced-motion: reduce) {
          .ac { display: none !important; }
          .subtitle-word, .benefit-fill, .benefit-card, .benefit-icon-wrap,
          .benefit-icon, .benefit-title, .benefit-desc, .benefit-arrow,
          .benefit-underline, .img-card, .img-main, .img-overlay, .img-shadow {
            transition: none !important; animation: none !important;
          }
          .benefit-fill { display: none !important; }
          .subtitle-container:hover .subtitle-word { animation: none !important; }
        }
      `}</style>
    </section>
  )
}