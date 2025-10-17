"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const imageRef = useRef<HTMLDivElement | null>(null)
  const [imageVisible, setImageVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageVisible(true)
          // stop observing after first reveal so it only appears once
          if (imageRef.current) observer.unobserve(imageRef.current)
        }
      },
      { threshold: 0.2 },
    )

    if (imageRef.current) observer.observe(imageRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Announcement Badge */}
          <div
            className={`mb-8 flex justify-center transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Badge variant="secondary" className="gap-2 rounded-full px-4 py-1.5 text-xs font-medium border border-black/10">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              New: Advanced Analytics
              <ArrowRight className="h-3 w-3" />
            </Badge>
          </div>

          {/* Main Heading */}
          <div
            className={`mb-6 text-center transition-all duration-700 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              Innovating Beyond<br />
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent pixels-underline">
                Pixels
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className={`mb-10 flex justify-center transition-all duration-700 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="relative w-full flex justify-center">
              <p className="max-w-2xl text-center text-base sm:text-lg text-muted-foreground leading-relaxed z-10">
                Transform your ideas into powerful digital products. We deliver cutting-edge solutions that drive real
                results for teams that dare to innovate.
              </p>

              {/* decorative images positioned around the subtitle; hidden on very small screens */}
              <div className="hero-images pointer-events-none" aria-hidden>
                <div className="hero-img hero-img-left">
                  <Image src="https://i.pinimg.com/736x/83/61/c9/8361c92f68359d31e5026a6a3bd34b5a.jpg" alt="Decorative left" width={220} height={140} className="rounded-lg shadow-lg block" />
                </div>
                <div className="hero-img hero-img-right">
                  <Image src="https://i.pinimg.com/736x/c8/39/d9/c839d92d60ca9a947b474b0b5cfe3314.jpg" alt="Decorative right" width={220} height={140} className="rounded-lg shadow-lg block" />
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col items-center justify-center gap-3 transition-all duration-700 delay-300 sm:flex-row sm:gap-4 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Button size="lg" className="rounded-full px-8 font-medium cta-primary" aria-label="Get started with ProHub">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 font-medium bg-transparent cta-secondary" aria-label="Watch demo video">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* CARDS image displayed after the hero section */}
      {/* Decorative preview cards above the main CARDS image (removed as requested) */}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <div
          ref={imageRef}
          className={`mx-auto max-w-4xl transition-all duration-700 ${imageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {/* padded wrapper so animated border sits around the image */}
          <div className="relative p-3">
            <Image
              src="/CARDS.png"
              alt="Cards"
              width={1200}
              height={420}
              className="w-full h-auto rounded-xl shadow-lg block"
              priority={false}
            />

            {/* SVG animated border overlay (scales responsively with the container) */}
            <svg
              className="pointer-events-none absolute inset-0 w-full h-full"
              viewBox="0 0 1200 420"
              preserveAspectRatio="none"
              aria-hidden
            >
              {/* subtle static border */}
              <rect x="6" y="6" width="1188" height="408" rx="20" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
              {/* animated dashed border */}
              <rect x="6" y="6" width="1188" height="408" rx="20" fill="none" stroke="rgba(0,0,0,0.9)" strokeWidth="3" strokeDasharray="40 300">
                <animate attributeName="stroke-dashoffset" from="0" to="-340" dur="6s" repeatCount="indefinite" />
              </rect>
            </svg>
          </div>
        </div>
      </div>
      {/* hero-specific styles and micro-interactions */}
      <style jsx>{`
        /* animated underline for 'Pixels' */
        .pixels-underline { position: relative; display: inline-block; }
        .pixels-underline::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -6px;
          transform: translateX(-50%) scaleX(0);
          transform-origin: center;
          width: 70%;
          height: 6px;
          border-radius: 6px;
          background: linear-gradient(90deg, rgba(59,130,246,0.18), rgba(59,130,246,0.36));
          transition: transform 520ms cubic-bezier(.2,.9,.2,1), opacity 380ms ease;
          opacity: 0.9;
        }
        /* reveal when hero visible */
        .${isVisible ? 'pixels-underline' : 'pixels-underline'}::after { transform: translateX(-50%) scaleX(1); }

        /* CTA styles */
        .cta-primary { box-shadow: 0 10px 30px rgba(59,130,246,0.12); background: linear-gradient(90deg, var(--primary), rgba(59,130,246,0.9)); color: white; }
        .cta-primary:hover { transform: translateY(-3px); }
        .cta-secondary { border-color: rgba(16,24,40,0.06); }

        /* decorative hero images */
        .hero-images { display: none; }
        @media (min-width: 640px) {
          .hero-images { display: block; position: absolute; left: 0; right: 0; top: -20px; bottom: -20px; pointer-events: none; }
          .hero-img { position: absolute; opacity: 0.95; transition: transform 680ms cubic-bezier(.2,.9,.2,1), opacity 300ms ease; }
          .hero-img-left { left: 0; top: 18%; transform: translateX(-12%) rotate(-3deg); }
          .hero-img-right { right: 0; top: 18%; transform: translateX(12%) rotate(3deg); }
           /* gentle float */
          .hero-img { animation: hero-float 8s ease-in-out infinite; }
          @keyframes hero-float { 0% { transform: translateY(0) } 50% { transform: translateY(-8px) } 100% { transform: translateY(0) } }
        }

        /* respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .pixels-underline::after, .cta-primary:hover, .hero-img { transition: none !important; transform: none !important; animation: none !important; }
        }

        /* hero section decorative images */
        .hero-images {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 1200px;
          pointer-events: none;
        }
        .hero-img {
          position: absolute;
          border-radius: 0.5rem;
          overflow: hidden;
          will-change: transform, opacity;
        }
        .hero-img-left {
          top: 0;
          left: -240px;
          opacity: 0.7;
          animation: slideIn 0.8s forwards;
        }
        .hero-img-right {
          top: 0;
          right: -240px;
          opacity: 0.7;
          animation: slideIn 0.8s forwards;
        }

        @keyframes slideIn {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0.7; }
        }

        /* hide decorative images on very small screens */
        @media (max-width: 639px) {
          .hero-images { display: none !important; }
        }
      `}</style>

      <style jsx global>{`
        /* Prevent overscroll bounce/scroll-chaining so user cannot scroll up past the top (navbar) */
        html, body, #__next {
          overscroll-behavior-y: none;
        }
      `}</style>
    </>
  )
}
