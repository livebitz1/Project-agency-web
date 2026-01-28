"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export function SocialProof() {
  const [isVisible, setIsVisible] = useState(false)

  // Lightbox (image modal) state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  // Open lightbox with given image URL
  function openLightbox(image?: string) {
    setLightboxImage(image || null)
    setLightboxOpen(true)
  }

  function closeLightbox() {
    setLightboxOpen(false)
    // delay clearing image to allow close animation (optional)
    setTimeout(() => setLightboxImage(null), 300)
  }

  // Close on Escape and prevent body scroll when open
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
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("social-proof")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  // Slider refs & handlers
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const isDownRef = useRef(false)
  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const scrollLeftRef = useRef(0)

  const onMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    isDownRef.current = true
    sliderRef.current.classList.add("dragging")
    startXRef.current = e.pageX - sliderRef.current.offsetLeft
    scrollLeftRef.current = sliderRef.current.scrollLeft
  }

  const onMouseLeave = () => {
    if (!sliderRef.current) return
    isDownRef.current = false
    sliderRef.current.classList.remove("dragging")
  }

  const onMouseUp = () => {
    if (!sliderRef.current) return
    isDownRef.current = false
    sliderRef.current.classList.remove("dragging")
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !sliderRef.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startXRef.current) * 1
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk
  }

  const onTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return
    // capture initial touch X and Y to determine gesture direction
    isDownRef.current = true
    startXRef.current = e.touches[0].pageX - sliderRef.current.offsetLeft
    startYRef.current = e.touches[0].pageY
    scrollLeftRef.current = sliderRef.current.scrollLeft
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!sliderRef.current) return

    const x = e.touches[0].pageX - sliderRef.current.offsetLeft
    const y = e.touches[0].pageY
    const dx = x - startXRef.current
    const dy = y - startYRef.current

    // If the user is performing a predominantly horizontal gesture, prevent the page
    // from vertically scrolling and handle the carousel swipe. If it's vertical, allow
    // the browser to handle the scroll (do not preventDefault).
    if (Math.abs(dx) > Math.abs(dy)) {
      // horizontal gesture -> handle carousel
      if (!isDownRef.current) isDownRef.current = true
      e.preventDefault()
      const walk = dx * 1
      sliderRef.current.scrollLeft = scrollLeftRef.current - walk
    } else {
      // vertical gesture -> let the page scroll normally
      isDownRef.current = false
    }
  }

  // Wrapper to block touch swiping on mobile devices so cards remain fixed and
  // can only be moved programmatically via the buttons.
  const onTouchMoveWrapper = (e: React.TouchEvent) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      // On small screens, prevent touch-based horizontal swiping
      e.preventDefault()
      return
    }
    // Otherwise, use the normal touch move handler
    onTouchMoveInternal(e)
  }

  // Rename original handler for internal use
  const onTouchMoveInternal = (e: React.TouchEvent) => {
    if (!sliderRef.current) return

    const x = e.touches[0].pageX - sliderRef.current.offsetLeft
    const y = e.touches[0].pageY
    const dx = x - startXRef.current
    const dy = y - startYRef.current

    if (Math.abs(dx) > Math.abs(dy)) {
      if (!isDownRef.current) isDownRef.current = true
      e.preventDefault()
      const walk = dx * 1
      sliderRef.current.scrollLeft = scrollLeftRef.current - walk
    } else {
      isDownRef.current = false
    }
  }

  const onTouchEnd = () => {
    isDownRef.current = false
  }

  const scrollByWidth = (dir: "left" | "right") => {
    if (!sliderRef.current) return
    const width = sliderRef.current.clientWidth * 0.8
    const amount = dir === "left" ? -width : width
    sliderRef.current.scrollBy({ left: amount, behavior: "smooth" })
  }

  return (
    <section id="social-proof" className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-12 sm:mb-16 md:mb-24 text-center">
            <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3 sm:mb-4">
              Portfolio
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              <span className="text-foreground">Showcase</span>
              {/* show a space on mobile, keep line-break on sm+ */}
              <span className="sm:hidden">&nbsp;</span>
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-muted-foreground to-muted-foreground/60 bg-clip-text text-transparent">
                Past Work
              </span>
            </h2>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A curated selection of projects demonstrating our design, product, and engineering work.
            </p>
          </div>

          <div className="relative group">
            {/* Left button - desktop only, minimalistic design */}
            <button
              aria-label="Scroll left"
              onClick={() => scrollByWidth("left")}
              className="hidden md:inline-flex absolute left-0 top-1/2 -translate-y-1/2 z-20 items-center justify-center h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background/95 transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div
              ref={sliderRef}
              // Prevent manual finger swiping on mobile; still allow programmatic scroll via buttons.
              className="carousel flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-2 px-0 sm:px-2 md:px-10"
              onWheel={(e) => e.preventDefault()}
              onMouseDown={onMouseDown}
              onMouseLeave={onMouseLeave}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMoveWrapper}
              onTouchEnd={onTouchEnd}
            >
              {caseStudies.map((c, index) => (
                <article
                  key={c.title}
                  className="snap-start flex-shrink-0 w-[min(420px,95vw)] sm:w-[min(560px,90vw)] md:w-[44%] lg:w-[40%] bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-border/50"
                  style={{
                    transitionDelay: isVisible ? `${index * 80}ms` : "0ms",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(12px)",
                    transitionProperty: "opacity, transform",
                    transitionDuration: "700ms",
                    transitionTimingFunction: "cubic-bezier(.2,.9,.2,1)",
                  }}
                >
                  <div className="w-full aspect-[16/10] relative rounded-t-lg overflow-hidden">
                    <Image src={c.image || "/placeholder.svg"} alt={c.title} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover rounded-t-lg" />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-2">{c.title}</h3>

                    {/* Project description for Centaurus Arena */}
                    {index === 0 && c.description && (
                      <p className="mb-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{c.description}</p>
                    )}

                    {/* Project review bubble for each project */}
                    <div className="mt-3">
                      <div className="rounded-2xl bg-muted-foreground/6 p-4 text-sm text-foreground leading-relaxed shadow-sm doodle-anim">
                        <span className="not-italic">
                          {index === 0
                            ? "Seamless tournament management and real-time match updates. Centaurus Arena brings gamers together for competitive, fair, and exciting events."
                            : index === 1
                            ? "Instantly create a fully functional website from your prompt. Say to Site turns your ideas into live web pages in seconds, no coding required."
                            : index === 2
                            ? "Twinance provides users with clear financial insights and a comprehensive dashboard, allowing them to view their bank statements in an organized and intuitive manner."
                            : index === 3
                            ? "Inteliq enables users to exchange tokens on the Solana chain while interacting with AI, send SOL, and access real-time market data simply by prompting the AI."
                            : index === 4
                            ? "Agenix features a modern UI designed to manage and interact with multiple AI agents, providing users with a seamless experience for leveraging several AI-powered tools in one place."
                            : index === 5
                            ? "Lemo is a 3D GPU-focused website with advanced animations and integrated AI that provides insights about GPUs. The application offers a seamless experience and a sleek, modern UI."
                            : "Functional design meets beauty. Their designs are always creative and aligned with our brand."}
                        </span>
                      </div>
                    </div>

                    {/* Footer: removed avatar, client info, and chat bubble */}
                    <div className="mt-4 flex items-center justify-between gap-4">
                      {/* All client info and avatar removed */}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Right button - desktop only, minimalistic design */}
            <button
              aria-label="Scroll right"
              onClick={() => scrollByWidth("right")}
              className="hidden md:inline-flex absolute right-0 top-1/2 -translate-y-1/2 z-20 items-center justify-center h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background/95 transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* End controls: persistent scroll buttons positioned at the end of the card area */}
            <div className="end-controls md:hidden absolute right-4 bottom-4 z-30 flex items-center gap-2 md:gap-3">
              <button
                aria-label="Scroll left"
                onClick={() => scrollByWidth("left")}
                className="end-btn h-10 w-10 rounded-full bg-background/90 border border-border/40 flex items-center justify-center hover:bg-background/95 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                aria-label="Scroll right"
                onClick={() => scrollByWidth("right")}
                className="end-btn h-10 w-10 rounded-full bg-background/90 border border-border/40 flex items-center justify-center hover:bg-background/95 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <style jsx>{`
              .carousel { scrollbar-width: none; -ms-overflow-style: none; scroll-behavior: smooth; -webkit-overflow-scrolling: touch; touch-action: pan-y; }
              .carousel::-webkit-scrollbar { display: none; }
              .carousel.dragging { cursor: grabbing; cursor: -webkit-grabbing; }

              /* double-border effect: keep existing outer border, add an inner 2px accent border */
              .carousel > article { position: relative; overflow: visible; }
              .carousel > article::before {
                content: '';
                position: absolute;
                inset: 9px; /* space from outer edge to reveal double-border look */
                border-radius: 12px;
                border: 2px solid rgba(0,0,0,0.06);
                pointer-events: none;
                z-index: 0;
              }
              .carousel > article > * { position: relative; z-index: 1; }

              /* card visual enhancements */
              .carousel > article {
                background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,250,250,0.98));
                border-radius: 12px;
                transition: transform 240ms cubic-bezier(.2,.9,.2,1), box-shadow 240ms ease;
                will-change: transform;
              }

              /* image area: soft gradient overlay and gentle reveal */
              .carousel > article > div:first-child { position: relative; overflow: hidden; }
              .carousel > article > div:first-child::after {
                content: '';
                position: absolute;
                inset: 0;
                background: linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.02) 40%, rgba(0,0,0,0) 100%);
                pointer-events: none;
                opacity: 0.95;
                transition: opacity 300ms ease;
              }

              /* doodly animated scribble over the image (subtle, decorative) */
              .carousel > article > div:first-child::before {
                content: '';
                position: absolute;
                width: 88px;
                height: 88px;
                right: 18px;
                top: 18px;
                border-radius: 50%;
                border: 2px dashed rgba(255,255,255,0.65);
                mix-blend-mode: overlay;
                transform: rotate(-12deg) translateZ(0);
                opacity: 0.95;
                pointer-events: none;
                filter: drop-shadow(0 6px 14px rgba(2,6,23,0.06));
                animation: doodle-float 6s ease-in-out infinite;
              }

              @keyframes doodle-float {
                0% { transform: rotate(-10deg) translateY(0) scale(1); opacity: 0.95 }
                25% { transform: rotate(-6deg) translateY(-4px) scale(1.02); opacity: 0.9 }
                50% { transform: rotate(-12deg) translateY(-2px) scale(1); opacity: 0.95 }
                75% { transform: rotate(-8deg) translateY(-6px) scale(1.01); opacity: 0.92 }
                100% { transform: rotate(-10deg) translateY(0) scale(1); opacity: 0.95 }
              }

              /* hover / focus: lift and reveal */
              .carousel > article:hover, .carousel > article:focus-within {
                transform: translateY(-8px) scale(1.02);
                box-shadow: 0 30px 60px rgba(16,24,40,0.12), 0 10px 24px rgba(16,24,40,0.06);
              }
              .carousel > article:hover > div:first-child::after { opacity: 0.7; }

              /* typography tweaks to feel more premium */
              .carousel > article h3 { font-size: 1.0625rem; line-height: 1.2; }
              .carousel > article p { color: rgba(15,23,42,0.7); }

              /* ensure the double-border doesn't clip rounded corners on small screens */
              @media (max-width: 767px) {
                .carousel > article::before { inset: 6px; border-radius: 10px; }
                .carousel > article > div:first-child::before { right: 12px; top: 12px; width: 64px; height: 64px; }
                /* Disable manual horizontal scrolling on small screens */
                .carousel { overflow-x: hidden; }
              }

              /* modal animation for lightbox */
              .modal-enter { animation: modal-in 320ms cubic-bezier(.2,.9,.2,1) forwards; transform-origin: center; }
              @keyframes modal-in { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }

              /* minimal sleek hover for eye button */
              .eye-btn { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 8px; transition: transform 220ms cubic-bezier(.2,.9,.2,1), box-shadow 220ms ease; }
              .eye-btn svg { transition: transform 220ms cubic-bezier(.2,.9,.2,1); }
              .eye-btn::after { content: ''; position: absolute; inset: 0; border-radius: 8px; box-shadow: 0 10px 30px rgba(59,130,246,0.06); opacity: 0; transform: scale(0.96); transition: opacity 220ms ease, transform 220ms cubic-bezier(.2,.9,.2,1); pointer-events: none; }
              .eye-btn:hover { transform: translateY(-3px) scale(1.03); }
              .eye-btn:hover svg { transform: scale(1.08) rotate(-6deg); }
              .eye-btn:hover::after { opacity: 1; transform: scale(1); }

              /* doodly interactions: animate on hover only (no continuous animation) */
              .doodle-anim, .doodle-avatar, .doodle-chat {
                transition: transform 320ms cubic-bezier(.2,.9,.2,1), box-shadow 260ms ease, background-color 260ms ease, color 260ms ease;
                transform-origin: center;
              } 

              /* hover-driven micro-interactions */
              .doodle-anim:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgba(16,24,40,0.06); background-color: rgba(0,0,0,0.95); color: #fff; }
              .doodle-anim:hover .not-italic { color: inherit; }
              .doodle-avatar:hover { transform: translateY(-4px) scale(1.03); box-shadow: 0 12px 30px rgba(16,24,40,0.06); }
              .doodle-chat:hover { transform: translateY(-5px); box-shadow: 0 18px 40px rgba(16,24,40,0.08); }

               /* respect prefers-reduced-motion */
               @media (prefers-reduced-motion: reduce) {
                 .doodle-anim, .doodle-avatar, .doodle-chat { transition: none !important; transform: none !important; }
               }

              /* end-controls: desktop -> anchored bottom-right; mobile -> centered below carousel */
              /* hide by default (desktop). show only on small screens via media query to avoid CSS specificity clashes */
              .end-controls { position: absolute; right: 1rem; bottom: 1rem; display: none; gap: .5rem; align-items: center; }

              /* matte minimal black buttons */
              .end-controls .end-btn {
                background: #0b0c0d; /* flat dark matte */
                color: #fff;
                border: 1px solid rgba(255,255,255,0.03);
                box-shadow: 0 6px 14px rgba(2,6,23,0.12);
                height: 40px;
                width: 40px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                border-radius: 10px; /* slight rounding for a modern matte look */
                transition: transform 180ms cubic-bezier(.2,.9,.2,1), box-shadow 180ms ease, opacity 140ms ease, background-color 180ms ease;
              }

              .end-controls .end-btn svg { stroke: #fff; color: #fff; }

              .end-controls .end-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 22px rgba(2,6,23,0.18);
                opacity: 0.99;
              }

              @media (max-width: 767px) {
                .end-controls { display: flex; position: static; justify-content: center; width: 100%; margin-top: 0.75rem; transform: none; }
                .end-controls .end-btn { height: 44px; width: 44px; }
              }
            `}</style>
          </div>
        </div>
      </div>

      {/* Lightbox modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={(e) => {
            // close when clicking on overlay only
            if (e.target === e.currentTarget) closeLightbox()
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" />

          <div className="relative z-10 max-w-[90vw] max-h-[90vh] p-4">
            <div className="rounded-lg overflow-hidden bg-black/0 shadow-xl transform modal-enter">
              <button
                onClick={closeLightbox}
                aria-label="Close image"
                className="absolute right-2 top-2 z-20 inline-flex items-center justify-center h-9 w-9 rounded-full bg-background/80 text-foreground hover:bg-background/95 border border-border"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {lightboxImage ? (
                // plain <img> to avoid next/image domain config issues
                <img src={lightboxImage} alt="Case image" className="block max-h-[80vh] w-auto min-w-0 object-contain" />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

// Case studies data (descriptions removed)
const caseStudies = [
  {
    title: "Centaurus Arena",
    image: "https://himanshumeena.vercel.app/images/projects/centaurus-arena-screenshot.png",
  },
  { title: "Say to Site", image: "https://himanshumeena.vercel.app/images/projects/say-to-site-screenshot.png" },
  { title: "Twinance", image: "https://himanshumeena.vercel.app/images/projects/Gvpbic6XMAAl8U_.jpg" },
  { title: "Inteliq", image: "https://himanshumeena.vercel.app/images/projects/Screenshot%202025-08-02%20191132.png" },
  { title: "Agenix", image: "https://himanshumeena.vercel.app/images/projects/Screenshot%202025-08-02%20191359.png" },
  { title: "Lemo", image: "https://himanshumeena.vercel.app/images/projects/Screenshot%202025-06-01%20171452.png" },
]