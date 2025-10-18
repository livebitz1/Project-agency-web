"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function ValueSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // respect reduced motion preference
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )

    const element = document.getElementById("value-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const benefits = [
    "Seamless integration with your existing tools",
    "Advanced security and compliance features",
    "Dedicated support from our expert team",
    "Regular updates and new features",
  ]

  return (
    <section id="value-section" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column */}
          <div
            className={`flex flex-col justify-center transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{
              transitionProperty: 'opacity, transform, filter',
              transitionDuration: '720ms',
              transitionTimingFunction: 'cubic-bezier(.2,.9,.3,1)',
              transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
              filter: isVisible ? 'blur(0px)' : 'blur(6px)'
            }}
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl leading-tight">
              Why Choose Digitomedia?
            </h2>
            <p className="mb-8 text-base sm:text-lg text-muted-foreground leading-relaxed">
              We combine cutting-edge technology with intuitive design to create products that teams love to use.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3"
                  style={{
                    transitionProperty: 'opacity, transform, filter',
                    transitionDuration: '640ms',
                    transitionTimingFunction: 'cubic-bezier(.2,.9,.3,1)',
                    transitionDelay: isVisible ? `${index * 90 + 120}ms` : '0ms',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                    filter: isVisible ? 'blur(0px)' : 'blur(6px)'
                  }}
                >
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-muted-foreground text-sm sm:text-base">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Full-size CARD-2 image (card removed) */}
          <div
            className={`relative transition-all duration-700 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{
              transitionProperty: 'opacity, transform, filter',
              transitionDuration: '760ms',
              transitionTimingFunction: 'cubic-bezier(.2,.9,.3,1)',
              transitionDelay: isVisible ? '220ms' : '0ms',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(.996)',
              filter: isVisible ? 'blur(0px)' : 'blur(8px)'
            }}
          >
            <div className="flex items-center justify-center">
              <div className="w-full md:w-full relative">
                <div className="card3d-wrap">
                  <div className="card-inner">
                    <Image
                      src="/CARD-2.png"
                      alt="Digitomedia features"
                      width={1800}
                      height={1100}
                      className="w-full h-auto block"
                      priority={false}
                    />
                  </div>

                  {/* SVG border overlay removed to keep image border clean */}
                </div>

                {/* 3D shadow & float animation styles (scoped) - persistent shadow (no hover-only change) */}
                <style jsx>{`
                  .card3d-wrap { position: relative; display: block; border-radius: 14px; transform-origin: center; }
                  /* add a simple 10px border around the image container */
                  .card-inner { border-radius: 14px; overflow: hidden; border: none; }
                  /* stronger shadow visible by default for a subtle 3D effect */
                  .card3d-wrap { box-shadow: 0 28px 60px rgba(0,0,0,0.12), 0 10px 24px rgba(0,0,0,0.06); transition: transform 300ms ease; }
                  /* hover animation removed as requested */
                  /* (previously a small lift on hover, removed to keep image static) */
                  .card3d-wrap::after { content: ''; position: absolute; left: 50%; bottom: -20px; transform: translateX(-50%); width: 68%; height: 22px; background: rgba(0,0,0,0.08); filter: blur(16px); border-radius: 50%; z-index: -1; }
                `}</style>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
