"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"

export function SocialProof() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxClosing, setLightboxClosing] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  function openLightbox(image?: string) {
    setLightboxImage(image || null)
    setLightboxOpen(true)
    setLightboxClosing(false)
  }

  function closeLightbox() {
    setLightboxClosing(true)
    setTimeout(() => {
      setLightboxOpen(false)
      setLightboxClosing(false)
      setLightboxImage(null)
    }, 400)
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox()
    }
    if (lightboxOpen) {
      document.addEventListener("keydown", onKey)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [lightboxOpen])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.06 }
    )
    const element = document.getElementById("social-proof")
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const sliderRef = useRef<HTMLDivElement | null>(null)
  const isDownRef = useRef(false)
  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const isDraggingRef = useRef(false)
  const dragDistRef = useRef(0)
  const touchDirectionRef = useRef<"horizontal" | "vertical" | null>(null)

  const onMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current || isMobile) return
    isDownRef.current = true
    isDraggingRef.current = false
    dragDistRef.current = 0
    startXRef.current = e.pageX - sliderRef.current.offsetLeft
    scrollLeftRef.current = sliderRef.current.scrollLeft
  }

  const onMouseLeave = () => {
    isDownRef.current = false
  }

  const onMouseUp = () => {
    isDownRef.current = false
    setTimeout(() => {
      isDraggingRef.current = false
    }, 10)
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !sliderRef.current || isMobile) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = x - startXRef.current
    dragDistRef.current += Math.abs(walk)
    if (dragDistRef.current > 5) isDraggingRef.current = true
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk
  }

  const onTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return
    isDownRef.current = true
    isDraggingRef.current = false
    dragDistRef.current = 0
    touchDirectionRef.current = null
    startXRef.current = e.touches[0].pageX
    startYRef.current = e.touches[0].pageY
    scrollLeftRef.current = sliderRef.current.scrollLeft
  }

  const onTouchMoveWrapper = (e: React.TouchEvent) => {
    if (!sliderRef.current || !isDownRef.current) return
    const x = e.touches[0].pageX
    const y = e.touches[0].pageY
    const dx = x - startXRef.current
    const dy = y - startYRef.current

    if (!touchDirectionRef.current) {
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        touchDirectionRef.current =
          Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical"
      }
      return
    }

    if (touchDirectionRef.current === "horizontal") {
      e.preventDefault()
      dragDistRef.current += Math.abs(dx)
      if (dragDistRef.current > 5) isDraggingRef.current = true
      sliderRef.current.scrollLeft = scrollLeftRef.current - dx
    }
  }

  const onTouchEnd = () => {
    if (sliderRef.current && touchDirectionRef.current === "horizontal") {
      const container = sliderRef.current
      const children = Array.from(container.children) as HTMLElement[]
      const containerCenter =
        container.scrollLeft + container.clientWidth / 2
      let closest = 0
      let minDist = Infinity
      children.forEach((child, i) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2
        const dist = Math.abs(containerCenter - childCenter)
        if (dist < minDist) {
          minDist = dist
          closest = i
        }
      })
      scrollToCard(closest)
    }
    isDownRef.current = false
    touchDirectionRef.current = null
    setTimeout(() => {
      isDraggingRef.current = false
    }, 10)
  }

  const updateActiveIndex = useCallback(() => {
    if (!sliderRef.current) return
    const container = sliderRef.current
    const children = Array.from(container.children) as HTMLElement[]
    if (!children.length) return

    const containerLeft = container.scrollLeft
    const containerCenter = containerLeft + container.clientWidth / 2

    let closest = 0
    let minDist = Infinity
    children.forEach((child, i) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2
      const dist = Math.abs(containerCenter - childCenter)
      if (dist < minDist) {
        minDist = dist
        closest = i
      }
    })
    setActiveIndex(closest)
  }, [])

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return
    slider.addEventListener("scroll", updateActiveIndex, { passive: true })
    return () => slider.removeEventListener("scroll", updateActiveIndex)
  }, [updateActiveIndex])

  const scrollToCard = (index: number) => {
    if (!sliderRef.current) return
    const children = Array.from(sliderRef.current.children) as HTMLElement[]
    if (!children[index]) return
    const card = children[index]
    const container = sliderRef.current
    const scrollTarget =
      card.offsetLeft - container.clientWidth / 2 + card.offsetWidth / 2
    container.scrollTo({ left: scrollTarget, behavior: "smooth" })
  }

  const scrollByWidth = (dir: "left" | "right") => {
    const newIndex =
      dir === "left"
        ? Math.max(activeIndex - 1, 0)
        : Math.min(activeIndex + 1, caseStudies.length - 1)
    scrollToCard(newIndex)
  }

  const descriptions = [
    "Seamless tournament management and real-time match updates. Centaurus Arena brings gamers together for competitive, fair, and exciting events.",
    "Instantly create a fully functional website from your prompt. Say to Site turns your ideas into live web pages in seconds, no coding required.",
    "Twinance provides users with clear financial insights and a comprehensive dashboard, allowing them to view their bank statements in an organized and intuitive manner.",
    "Inteliq enables users to exchange tokens on the Solana chain while interacting with AI, send SOL, and access real-time market data simply by prompting the AI.",
    "Agenix features a modern UI designed to manage and interact with multiple AI agents, providing users with a seamless experience for leveraging several AI-powered tools in one place.",
    "Lemo is a 3D GPU-focused website with advanced animations and integrated AI that provides insights about GPUs. The application offers a seamless experience and a sleek, modern UI.",
  ]

  return (
    <section
      id="social-proof"
      className="relative py-16 sm:py-28 md:py-36 lg:py-40 overflow-hidden bg-transparent"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 sm:left-1/4 w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] rounded-full bg-stone-100/40 blur-[80px] sm:blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-0 sm:right-1/4 w-[250px] sm:w-[400px] lg:w-[500px] h-[250px] sm:h-[400px] lg:h-[500px] rounded-full bg-stone-50/30 blur-[60px] sm:blur-[100px] animate-pulse-slow-delayed" />
      </div>

      <div className="mx-auto max-w-[96rem] relative z-10">
        <div
          className={`transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-12 sm:translate-y-16 opacity-0"
          }`}
        >
          {/* Header */}
          <div className="mb-10 sm:mb-20 md:mb-28 lg:mb-32 text-center px-5 sm:px-6">
            <div
              className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="inline-flex items-center gap-2 sm:gap-2.5 mb-4 sm:mb-6">
                <div className="w-5 sm:w-8 h-px bg-gradient-to-r from-transparent to-stone-300" />
                <p className="text-[9px] sm:text-[11px] font-semibold text-stone-400 uppercase tracking-[0.3em] sm:tracking-[0.35em]">
                  Selected Work
                </p>
                <div className="w-5 sm:w-8 h-px bg-gradient-to-l from-transparent to-stone-300" />
              </div>
            </div>
            <div
              className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[350ms] ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <h2 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-[5.25rem] font-bold tracking-[-0.03em] sm:tracking-[-0.04em] leading-[1] sm:leading-[0.9]">
                <span className="text-stone-900 inline-block premium-text-shimmer">
                  Showcase
                </span>
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                <span className="text-stone-200 inline-block">Past Work</span>
              </h2>
            </div>
            <div
              className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[500ms] ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <p className="mt-4 sm:mt-6 md:mt-8 text-[13px] sm:text-sm md:text-[15px] text-stone-400 max-w-xs sm:max-w-md md:max-w-lg mx-auto leading-[1.7] sm:leading-[1.8] font-light">
                A curated selection of projects demonstrating our design,
                product, and engineering work.
              </p>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative">
            {/* Desktop nav arrows */}
            <button
              aria-label="Scroll left"
              onClick={() => scrollByWidth("left")}
              className={`hidden md:inline-flex absolute left-2 lg:left-10 top-[38%] -translate-y-1/2 z-20 items-center justify-center h-12 lg:h-14 w-12 lg:w-14 rounded-full border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-md nav-btn-premium ${
                activeIndex === 0
                  ? "opacity-0 pointer-events-none scale-75"
                  : "opacity-100 hover:scale-110"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              aria-label="Scroll right"
              onClick={() => scrollByWidth("right")}
              className={`hidden md:inline-flex absolute right-2 lg:right-10 top-[38%] -translate-y-1/2 z-20 items-center justify-center h-12 lg:h-14 w-12 lg:w-14 rounded-full border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-md nav-btn-premium ${
                activeIndex === caseStudies.length - 1
                  ? "opacity-0 pointer-events-none scale-75"
                  : "opacity-100 hover:scale-110"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slider */}
            <div
              ref={sliderRef}
              className="carousel-track flex gap-4 sm:gap-6 lg:gap-9 overflow-x-auto snap-x snap-mandatory py-3 sm:py-6 px-[calc(50vw-160px)] sm:px-[calc(50vw-230px)] md:px-28 lg:px-40"
              onMouseDown={onMouseDown}
              onMouseLeave={onMouseLeave}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMoveWrapper}
              onTouchEnd={onTouchEnd}
            >
              {caseStudies.map((c, index) => {
                const isHovered = hoveredCard === index
                const descWords = descriptions[index].split(" ")
                return (
                  <article
                    key={c.title}
                    className="card snap-center flex-shrink-0 w-[320px] sm:w-[460px] md:w-[520px] lg:w-[580px]"
                    style={{
                      transitionDelay: isVisible ? `${550 + index * 120}ms` : "0ms",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
                      transitionProperty: "opacity, transform",
                      transitionDuration: "1100ms",
                      transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                    }}
                    onMouseEnter={() => !isMobile && setHoveredCard(index)}
                    onMouseLeave={() => !isMobile && setHoveredCard(null)}
                  >
                    <div
                      className={`card-inner relative h-full rounded-2xl sm:rounded-[22px] overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isHovered ? "card-shadow-hover -translate-y-1" : "card-shadow-rest"
                      }`}
                    >
                      {/* Border */}
                      <div className="absolute inset-0 rounded-2xl sm:rounded-[22px] border border-stone-200/80 pointer-events-none z-10 transition-colors duration-700" />
                      <div
                        className={`absolute inset-0 rounded-2xl sm:rounded-[22px] pointer-events-none z-10 transition-opacity duration-700 ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                          background: "linear-gradient(135deg, rgba(28,25,23,0.06) 0%, transparent 50%, rgba(28,25,23,0.03) 100%)",
                        }}
                      />

                      {/* Image */}
                      <div
                        className="image-wrap relative w-full aspect-[16/10] overflow-hidden cursor-pointer bg-stone-50"
                        onClick={() => !isDraggingRef.current && openLightbox(c.image)}
                      >
                        <Image
                          src={c.image || "/placeholder.svg"}
                          alt={c.title}
                          fill
                          sizes="(max-width: 640px) 320px, (max-width: 768px) 460px, (max-width: 1024px) 520px, 580px"
                          className={`object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isHovered ? "scale-[1.06]" : "scale-100"
                          }`}
                        />

                        {/* Cinematic overlay */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent transition-opacity duration-700 ${
                            isHovered ? "opacity-100" : "opacity-0"
                          }`}
                        />

                        {/* Expand indicator — hidden on mobile */}
                        <div
                          className={`absolute inset-0 hidden sm:flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isHovered ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <div
                            className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-sm text-stone-900 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                              isHovered ? "scale-100 rotate-0" : "scale-50 rotate-12"
                            }`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                          </div>
                        </div>

                        {/* Mobile tap hint */}
                        <div className="absolute bottom-2 right-2 sm:hidden">
                          <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full px-2.5 py-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                            <span className="text-[9px] font-medium text-stone-500">Tap</span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative bg-white p-4 sm:p-6 md:p-8">
                        {/* Number + Title */}
                        <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-5">
                          <span
                            className={`flex-shrink-0 text-[10px] sm:text-[11px] font-mono font-medium mt-1 sm:mt-1.5 tracking-tight transition-colors duration-500 ${
                              isHovered ? "text-stone-500" : "text-stone-200"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="min-w-0">
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-stone-900 tracking-[-0.02em] leading-tight">
                              {c.title}
                            </h3>
                          </div>
                        </div>

                        {/* Separator */}
                        <div className="relative w-full h-px mb-3 sm:mb-5 overflow-hidden">
                          <div className="absolute inset-0 bg-stone-100" />
                          <div
                            className={`absolute inset-y-0 left-0 bg-stone-300 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                              isHovered ? "w-full" : "w-0"
                            }`}
                          />
                        </div>

                        {/* ═══ ANIMATED DESCRIPTION ═══ */}
                        <p className="desc-container mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                          {descWords.map((word, wi) => (
                            <span
                              key={wi}
                              className="desc-word"
                              style={{
                                ["--w-delay" as string]: `${wi * 18}ms`,
                                transitionDelay: `${wi * 18}ms`,
                              }}
                            >
                              {word}
                            </span>
                          ))}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-0.5 sm:pt-1">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div
                              className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-all duration-700 ${
                                isHovered ? "bg-stone-900 scale-100" : "bg-stone-200 scale-75"
                              }`}
                            />
                            <span className="text-[9px] sm:text-[10px] font-semibold text-stone-300 tracking-[0.18em] sm:tracking-[0.2em] uppercase">
                              Project
                            </span>
                          </div>
                          <button
                            onClick={() => !isDraggingRef.current && openLightbox(c.image)}
                            className="view-link group/link inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-stone-400 transition-colors duration-500 hover:text-stone-900 active:text-stone-900"
                          >
                            <span className="relative">
                              View<span className="hidden sm:inline"> Project</span>
                              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-stone-900 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:w-full" />
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Controls */}
            <div
              className={`mt-8 sm:mt-14 md:mt-16 flex flex-col items-center gap-4 sm:gap-7 px-4 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[800ms] ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              {/* Progress bar */}
              <div className="relative w-40 sm:w-56 md:w-72 h-[2px] bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-stone-700 to-stone-900 rounded-full transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ width: `${((activeIndex + 1) / caseStudies.length) * 100}%` }}
                />
                <div
                  className="absolute top-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-stone-900 border-2 sm:border-[2.5px] border-white shadow-sm transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ left: `${((activeIndex + 1) / caseStudies.length) * 100}%`, transform: `translate(-50%, -50%)` }}
                />
              </div>

              {/* Counter + Mobile nav */}
              <div className="flex items-center gap-5 sm:gap-7">
                <button
                  aria-label="Previous"
                  onClick={() => scrollByWidth("left")}
                  className={`md:hidden inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-90 nav-btn-premium ${
                    activeIndex === 0 ? "opacity-15 pointer-events-none" : "opacity-100"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex items-baseline gap-1 sm:gap-1.5 select-none">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tabular-nums tracking-[-0.02em] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm sm:text-base text-stone-200 font-extralight mx-1 sm:mx-2">/</span>
                  <span className="text-sm sm:text-base text-stone-200 font-extralight tabular-nums">
                    {String(caseStudies.length).padStart(2, "0")}
                  </span>
                </div>

                <button
                  aria-label="Next"
                  onClick={() => scrollByWidth("right")}
                  className={`md:hidden inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-90 nav-btn-premium ${
                    activeIndex === caseStudies.length - 1 ? "opacity-15 pointer-events-none" : "opacity-100"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Dot nav */}
              <div className="flex items-center gap-2 sm:gap-3">
                {caseStudies.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToCard(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className={`rounded-full transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      i === activeIndex
                        ? "w-6 sm:w-8 h-1 sm:h-[5px] bg-stone-900"
                        : "w-1 sm:w-[5px] h-1 sm:h-[5px] bg-stone-200 hover:bg-stone-400 sm:hover:scale-125"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8"
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox() }}
        >
          <div
            className={`absolute inset-0 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              lightboxClosing ? "opacity-0 backdrop-blur-none" : "lb-backdrop-in"
            }`}
            style={{ backgroundColor: "rgba(10, 10, 10, 0.92)" }}
          />
          <div className={`relative z-10 w-full max-w-[95vw] sm:max-w-[92vw] max-h-[90vh] sm:max-h-[92vh] ${lightboxClosing ? "lb-content-out" : "lb-content-in"}`}>
            <div className="absolute -top-11 sm:-top-14 md:-top-16 right-0 z-20 flex items-center gap-3 sm:gap-5">
              <span className="text-[10px] sm:text-[11px] text-stone-500 font-light hidden sm:block tracking-wide">Press ESC to close</span>
              <button
                onClick={closeLightbox}
                aria-label="Close"
                className="inline-flex items-center justify-center h-9 w-9 sm:h-11 sm:w-11 rounded-full border border-stone-700/50 bg-stone-800/50 backdrop-blur-md text-stone-400 hover:text-white hover:border-stone-500 hover:bg-stone-700/60 transition-all duration-500 sm:hover:rotate-90 active:scale-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-stone-700/40 shadow-2xl">
              {lightboxImage ? (
                <img src={lightboxImage} alt="Project preview" className="block max-h-[75vh] sm:max-h-[82vh] w-full sm:w-auto min-w-0 object-contain mx-auto" />
              ) : null}
            </div>
            <div className="mt-3 sm:mt-5 text-center">
              <p className="text-[11px] sm:text-xs text-stone-500 font-light tracking-wide">{caseStudies[activeIndex]?.title}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .carousel-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        .carousel-track::-webkit-scrollbar { display: none; }

        @media (min-width: 768px) {
          .carousel-track { cursor: grab; }
          .carousel-track:active { cursor: grabbing; }
        }
        @media (max-width: 767px) {
          .carousel-track { touch-action: pan-x pan-y; cursor: default; }
        }

        .card-shadow-rest {
          box-shadow: 0 1px 2px rgba(28,25,23,0.04), 0 4px 16px rgba(28,25,23,0.03), 0 12px 40px rgba(28,25,23,0.02);
        }
        .card-shadow-hover {
          box-shadow: 0 4px 8px rgba(28,25,23,0.06), 0 12px 32px rgba(28,25,23,0.08), 0 24px 64px rgba(28,25,23,0.06);
        }
        @media (max-width: 767px) {
          .card-shadow-rest {
            box-shadow: 0 1px 3px rgba(28,25,23,0.06), 0 4px 12px rgba(28,25,23,0.04);
          }
        }

        .nav-btn-premium {
          border-color: rgba(214,211,209,0.6);
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          color: #44403c;
        }
        .nav-btn-premium:hover {
          border-color: rgba(168,162,158,0.8);
          background: #1c1917;
          color: white;
          box-shadow: 0 4px 20px rgba(28,25,23,0.15);
        }
        .nav-btn-premium:active {
          background: #1c1917;
          color: white;
        }

        .premium-text-shimmer {
          background: linear-gradient(135deg, #1c1917 0%, #44403c 50%, #1c1917 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: textShimmer 6s ease-in-out infinite;
        }
        @keyframes textShimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .lb-backdrop-in { animation: lbBackdropIn 400ms cubic-bezier(0.16,1,0.3,1) forwards; }
        .lb-content-in { animation: lbContentIn 600ms cubic-bezier(0.16,1,0.3,1) forwards; }
        .lb-content-out { animation: lbContentOut 400ms cubic-bezier(0.7,0,0.84,0) forwards; }

        @keyframes lbBackdropIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(8px); }
        }
        @keyframes lbContentIn {
          from { opacity: 0; transform: scale(0.92) translateY(16px); filter: blur(4px); }
          to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
        }
        @keyframes lbContentOut {
          from { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
          to { opacity: 0; transform: scale(0.95) translateY(8px); filter: blur(4px); }
        }

        @keyframes pulseSlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .animate-pulse-slow { animation: pulseSlow 8s ease-in-out infinite; }
        .animate-pulse-slow-delayed { animation: pulseSlow 8s ease-in-out 4s infinite; }

        /* ═══ DESCRIPTION WORD ANIMATION ═══ */

        .desc-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0 4px;
          font-size: 12px;
          line-height: 1.7;
          cursor: default;
        }
        @media (min-width: 640px) {
          .desc-container {
            font-size: 13px;
            line-height: 1.8;
            gap: 0 4.5px;
          }
        }
        @media (min-width: 768px) {
          .desc-container {
            font-size: 14px;
          }
        }

        .desc-word {
          display: inline-block;
          color: #a8a29e;
          font-weight: 300;
          transition:
            color 0.35s cubic-bezier(0.16,1,0.3,1),
            transform 0.35s cubic-bezier(0.16,1,0.3,1);
          will-change: transform;
        }

        /* On card hover — parent .card-inner triggers desc animation */
        .card-inner:hover .desc-word {
          color: #44403c;
          animation: descWave 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
          animation-delay: var(--w-delay, 0ms);
        }

        @keyframes descWave {
          0% { transform: translate3d(0, 0, 0); }
          35% { transform: translate3d(0, -2px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        /* On card un-hover — smooth revert */
        .card-inner:not(:hover) .desc-word {
          color: #a8a29e;
          font-weight: 300;
          animation: none;
          transform: translate3d(0, 0, 0);
        }

        @media (prefers-reduced-motion: reduce) {
          .lb-backdrop-in, .lb-content-in, .lb-content-out,
          .animate-pulse-slow, .animate-pulse-slow-delayed {
            animation: none !important;
          }
          .card { transition: none !important; }
          .card .card-inner { transition: none !important; }
          .premium-text-shimmer { animation: none !important; }
          .desc-word {
            transition: none !important;
            animation: none !important;
          }
          .card-inner:hover .desc-word {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}

const caseStudies = [
  {
    title: "Centaurus Arena",
    image: "https://himanshumeena.vercel.app/images/projects/centaurus-arena-screenshot.png",
  },
  {
    title: "Say to Site",
    image: "https://himanshumeena.vercel.app/images/projects/say-to-site-screenshot.png",
  },
  {
    title: "Twinance",
    image: "https://himanshumeena.vercel.app/images/projects/Gvpbic6XMAAl8U_.jpg",
  },
  {
    title: "Inteliq",
    image: "https://himanshumeena.vercel.app/images/projects/Screenshot%202025-08-02%20191132.png",
  },
  {
    title: "Agenix",
    image: "https://himanshumeena.vercel.app/images/projects/Screenshot%202025-08-02%20191359.png",
  },
  {
    title: "Lemo",
    image: "https://himanshumeena.vercel.app/images/projects/Screenshot%202025-06-01%20171452.png",
  },
]