"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiVercel,
  SiFigma,
  SiFramer,
  SiStripe,
  SiSupabase,
  SiGithub,
  SiDocker,
} from "react-icons/si"

const techLogos = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Prisma", icon: SiPrisma },
  { name: "Vercel", icon: SiVercel },
  { name: "Figma", icon: SiFigma },
  { name: "Framer", icon: SiFramer },
  { name: "Stripe", icon: SiStripe },
  { name: "Supabase", icon: SiSupabase },
  { name: "GitHub", icon: SiGithub },
  { name: "Docker", icon: SiDocker },
]

function TechIcon({ tech }: { tech: (typeof techLogos)[0] }) {
  const Icon = tech.icon
  return (
    <div className="tech-icon-card group relative flex flex-col items-center justify-center mx-3 sm:mx-5 md:mx-7 lg:mx-10 cursor-default">
      <div className="absolute -inset-2 sm:-inset-3 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none">
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-stone-900/[0.04] blur-sm" />
      </div>
      <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl border border-transparent bg-transparent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-stone-200/80 group-hover:bg-white group-hover:shadow-[0_4px_20px_rgba(28,25,23,0.06),0_1px_3px_rgba(28,25,23,0.04)]">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-stone-500 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-stone-900 group-hover:scale-110" />
      </div>
      <div className="relative h-4 sm:h-5 mt-1.5 sm:mt-2.5 overflow-hidden">
        <span className="block text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-stone-500 tracking-[0.06em] sm:tracking-[0.08em] uppercase whitespace-nowrap transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full group-hover:opacity-0">
          {tech.name}
        </span>
        <span className="block text-[8px] sm:text-[9px] md:text-[10px] font-bold text-stone-900 tracking-[0.06em] sm:tracking-[0.08em] uppercase whitespace-nowrap transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 group-hover:-translate-y-full group-hover:opacity-100">
          {tech.name}
        </span>
      </div>
      <span className="absolute -bottom-0.5 sm:-bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] sm:h-[2px] rounded-full bg-stone-900 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-5 sm:group-hover:w-6 group-hover:delay-100" />
    </div>
  )
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const imageRef = useRef<HTMLDivElement | null>(null)
  const [imageVisible, setImageVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageVisible(true)
          if (imageRef.current) observer.unobserve(imageRef.current)
        }
      },
      { threshold: 0.15 }
    )
    if (imageRef.current) observer.observe(imageRef.current)
    return () => observer.disconnect()
  }, [])

  const subtitleWords = "We transform ambitious visions into high-performance digital landmarks. Crafting the future for the world's most visionary brands.".split(" ")

  return (
    <>
      <section
        id="product"
        className="relative overflow-hidden pt-2 pb-12 sm:pt-6 sm:pb-20 md:pt-8 md:pb-24 lg:pt-12 lg:pb-36"
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px] rounded-full bg-primary/[0.03] blur-[60px] sm:blur-[80px] lg:blur-[100px]" />
          <div className="absolute top-1/4 -right-16 sm:-right-32 h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[400px] rounded-full bg-stone-100/50 blur-[50px] sm:blur-[80px]" />
          <div className="absolute bottom-1/4 -left-16 sm:-left-32 h-[180px] w-[180px] sm:h-[250px] sm:w-[250px] lg:h-[300px] lg:w-[300px] rounded-full bg-stone-50/40 blur-[40px] sm:blur-[60px]" />
          <div className="hidden sm:block absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: "linear-gradient(rgba(28,25,23,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(28,25,23,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,12px,0)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "0.05s",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
            className="mb-6 sm:mb-8 md:mb-10 flex justify-center"
          >
            <Badge
              variant="secondary"
              className="hero-badge group/badge gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 text-[10px] sm:text-[11px] md:text-xs font-medium border border-stone-200/60 cursor-default"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span className="hero-badge-text">Empowering Brands Digitally</span>
              <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 hero-badge-arrow" />
            </Badge>
          </div>

          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,16px,0)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "0.15s",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
            className="mb-4 sm:mb-6 md:mb-8 text-center px-2"
          >
            <h1 className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold tracking-[-0.03em] sm:tracking-[-0.04em] text-stone-900 leading-[1.1] sm:leading-[1.05] md:leading-[0.95]">
              Innovating Beyond
              <br />
              <span className="hero-gradient-text inline-block mt-0.5 sm:mt-1 md:mt-2">
                Pixels
              </span>
            </h1>
            <div className="flex justify-center mt-2 sm:mt-3 md:mt-4">
              <div className="hero-underline h-[2px] sm:h-[3px] rounded-full" />
            </div>
          </div>

          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,12px,0)",
              transitionProperty: "opacity, transform",
              transitionDuration: "0.8s",
              transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "0.25s",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
            className="mb-8 sm:mb-10 md:mb-12 flex justify-center px-2"
          >
            <div className="relative w-full flex justify-center">
              <p className="hero-subtitle max-w-[320px] sm:max-w-lg md:max-w-2xl text-center z-10 cursor-default">
                {subtitleWords.map((word, i) => (
                  <span key={i} className="hero-sub-word" style={{ ["--hw-delay" as string]: `${i * 18}ms`, transitionDelay: `${i * 18}ms` }}>
                    {word}
                  </span>
                ))}
              </p>

              <div className="hero-images pointer-events-none" aria-hidden>
                <div className="hero-img hero-img-left">
                  <Image src="https://i.pinimg.com/736x/83/61/c9/8361c92f68359d31e5026a6a3bd34b5a.jpg" alt="" width={220} height={140} className="rounded-xl shadow-lg block" />
                </div>
                <div className="hero-img hero-img-right">
                  <Image src="https://i.pinimg.com/736x/c8/39/d9/c839d92d60ca9a947b474b0b5cfe3314.jpg" alt="" width={220} height={140} className="rounded-xl shadow-lg block" />
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,12px,0)",
              transitionProperty: "opacity, transform",
              transitionDuration: "0.8s",
              transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "0.35s",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
            className="flex flex-col items-center justify-center gap-2.5 sm:gap-3 sm:flex-row sm:gap-4 px-4 sm:px-0"
          >
            <Button
              size="lg"
              className="hero-cta-primary group/primary relative rounded-full w-full sm:w-auto px-7 sm:px-8 md:px-10 py-3 sm:py-3.5 font-semibold text-[13px] sm:text-sm overflow-hidden"
              aria-label="Get started with Insalink"
              onClick={() => router.push("/book")}
            >
              <span className="hero-cta-primary-bg" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 hero-cta-primary-arrow" />
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hero-cta-secondary group/secondary relative rounded-full w-full sm:w-auto px-7 sm:px-8 md:px-10 py-3 sm:py-3.5 font-semibold text-[13px] sm:text-sm bg-transparent overflow-hidden"
              aria-label="Book a discovery call"
              onClick={() => router.push("/book")}
            >
              <span className="hero-cta-secondary-bg" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 hero-cta-secondary-play" />
                Book Now
              </span>
            </Button>
          </div>

          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translate3d(0,0,0)" : "translate3d(0,10px,0)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "0.5s",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
            className="mt-8 sm:mt-10 md:mt-14 flex items-center justify-center gap-5 sm:gap-6 md:gap-8"
          >
            {[
              { value: "12+", label: "Success Stories" },
              { value: "Elite", label: "Performance" },
              { value: "~16d", label: "To Launch" },
            ].map((stat, i) => (
              <div key={i} className="hero-stat group/stat text-center cursor-default">
                <p className="text-base sm:text-lg md:text-xl font-bold text-stone-900 tracking-[-0.02em] hero-stat-value">
                  {stat.value}
                </p>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-stone-300 uppercase tracking-[0.15em] sm:tracking-[0.2em] mt-0.5 hero-stat-label">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 mt-6 sm:mt-8 md:mt-12">
        <div
          ref={imageRef}
          className="mx-auto max-w-4xl"
          style={{
            opacity: imageVisible ? 1 : 0,
            transform: imageVisible ? "translate3d(0,0,0) scale(1)" : "translate3d(0,20px,0) scale(0.98)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        >
          <div className="group/cards relative p-1.5 sm:p-2 md:p-3">
            <div className="cards-img-wrap relative rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src="/CARDS.png"
                alt="Cards"
                width={1200}
                height={420}
                className="cards-img w-full h-auto block"
                priority={false}
              />
              <div className="cards-overlay absolute inset-0 bg-gradient-to-t from-stone-900/10 via-transparent to-transparent pointer-events-none" />
            </div>

            <svg className="pointer-events-none absolute inset-0 w-full h-full" viewBox="0 0 1200 420" preserveAspectRatio="none" aria-hidden>
              <rect x="6" y="6" width="1188" height="408" rx="20" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="2" />
              <rect x="6" y="6" width="1188" height="408" rx="20" fill="none" stroke="rgba(0,0,0,0.9)" strokeWidth="3" strokeDasharray="40 300">
                <animate attributeName="stroke-dashoffset" from="0" to="-340" dur="6s" repeatCount="indefinite" />
              </rect>
            </svg>

            <div className="cards-shadow absolute left-[10%] right-[10%] -bottom-2 sm:-bottom-3 md:-bottom-4 h-4 sm:h-6 md:h-8 rounded-full blur-lg sm:blur-xl md:blur-2xl bg-stone-900/5" />
          </div>
        </div>
      </div>

      <div
        style={{
          opacity: imageVisible ? 1 : 0,
          transform: imageVisible ? "translate3d(0,0,0)" : "translate3d(0,16px,0)",
          transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          transitionDelay: "0.3s",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
        }}
        className="mt-10 sm:mt-16 md:mt-20 lg:mt-24"
      >
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10 px-4">
          <div className="h-px w-6 sm:w-8 md:w-14 bg-gradient-to-r from-transparent to-stone-300" />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="inline-block w-1 h-1 rounded-full bg-stone-400 animate-pulse" />
            <p className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-stone-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.35em] whitespace-nowrap">
              Technologies We Use
            </p>
            <span className="inline-block w-1 h-1 rounded-full bg-stone-400 animate-pulse" />
          </div>
          <div className="h-px w-6 sm:w-8 md:w-14 bg-gradient-to-l from-transparent to-stone-300" />
        </div>

        <div className="tech-marquee-container relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-16 md:w-24 lg:w-40 z-10 tech-fade-left" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-16 md:w-24 lg:w-40 z-10 tech-fade-right" />
          <div className="absolute top-0 left-[5%] sm:left-[10%] right-[5%] sm:right-[10%] h-px bg-gradient-to-r from-transparent via-stone-200/60 to-transparent" />
          <div className="absolute bottom-0 left-[5%] sm:left-[10%] right-[5%] sm:right-[10%] h-px bg-gradient-to-r from-transparent via-stone-200/60 to-transparent" />

          <div className="tech-marquee-track flex items-center">
            {[0, 1, 2].map((s) => (
              <div key={s} className="flex items-center shrink-0 py-4 sm:py-6 md:py-8 lg:py-10" aria-hidden={s > 0}>
                {techLogos.map((tech, i) => (
                  <TechIcon key={`${s}-${i}`} tech={tech} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hero-badge {
          transition: border-color 0.5s ease, box-shadow 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 1px 4px rgba(28,25,23,0.03);
        }
        .hero-badge:hover {
          border-color: rgba(168,162,158,0.5);
          box-shadow: 0 4px 16px rgba(28,25,23,0.06);
          transform: translate3d(0,-1px,0);
        }
        .hero-badge:active {
          transform: translate3d(0,0,0) scale(0.97);
        }
        .hero-badge-text { transition: color 0.4s ease; }
        .hero-badge:hover .hero-badge-text { color: #1c1917; }
        .hero-badge-arrow { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), color 0.4s ease; }
        .hero-badge:hover .hero-badge-arrow { transform: translate3d(2px,0,0); color: #1c1917; }

        .hero-gradient-text {
          background: linear-gradient(135deg, var(--primary) 0%, rgba(59,130,246,0.6) 50%, var(--primary) 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: heroTextShimmer 4s ease-in-out infinite;
        }
        @keyframes heroTextShimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hero-underline {
          width: 0;
          background: linear-gradient(90deg, rgba(59,130,246,0.15), rgba(59,130,246,0.35), rgba(59,130,246,0.15));
          animation: heroUnderlineGrow 1s 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes heroUnderlineGrow { from { width: 0; } to { width: min(160px, 35%); } }
        @media (min-width: 640px) {
          @keyframes heroUnderlineGrow { from { width: 0; } to { width: min(200px, 40%); } }
        }

        .hero-subtitle { font-size: 13px; line-height: 1.75; display: flex; flex-wrap: wrap; justify-content: center; gap: 0 4px; }
        @media (min-width: 640px) { .hero-subtitle { font-size: 15px; line-height: 1.8; gap: 0 5px; } }
        @media (min-width: 768px) { .hero-subtitle { font-size: 17px; } }
        @media (min-width: 1024px) { .hero-subtitle { font-size: 18px; } }

        .hero-sub-word {
          display: inline-block; color: #78716c; font-weight: 300;
          transition: color 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1);
          will-change: transform;
        }
        .hero-subtitle:hover .hero-sub-word {
          color: #1c1917; font-weight: 400;
          animation: heroWordWave 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
          animation-delay: var(--hw-delay, 0ms);
        }
        @keyframes heroWordWave {
          0% { transform: translate3d(0,0,0); }
          35% { transform: translate3d(0,-2px,0); }
          100% { transform: translate3d(0,0,0); }
        }
        .hero-subtitle:not(:hover) .hero-sub-word {
          color: #78716c; font-weight: 300; animation: none; transform: translate3d(0,0,0);
        }

        .hero-cta-primary {
          background: linear-gradient(135deg, var(--primary), rgba(59,130,246,0.85));
          color: white; border: none;
          box-shadow: 0 4px 20px rgba(59,130,246,0.2), 0 1px 3px rgba(59,130,246,0.1);
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease;
        }
        .hero-cta-primary:hover { transform: translate3d(0,-2px,0); box-shadow: 0 8px 32px rgba(59,130,246,0.25), 0 2px 6px rgba(59,130,246,0.12); }
        .hero-cta-primary:active { transform: translate3d(0,0,0) scale(0.97); }
        .hero-cta-primary-bg {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          opacity: 0; transition: opacity 0.5s ease; border-radius: inherit;
        }
        .hero-cta-primary:hover .hero-cta-primary-bg { opacity: 1; }
        .hero-cta-primary-arrow { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .hero-cta-primary:hover .hero-cta-primary-arrow { transform: translate3d(3px,0,0); }

        .hero-cta-secondary {
          border-color: rgba(214,211,209,0.6); color: #44403c;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.5s ease, box-shadow 0.5s ease, color 0.5s ease;
          box-shadow: 0 1px 3px rgba(28,25,23,0.02);
        }
        .hero-cta-secondary:hover { transform: translate3d(0,-2px,0); border-color: #292524; box-shadow: 0 4px 16px rgba(28,25,23,0.08); color: white; }
        .hero-cta-secondary:active { transform: translate3d(0,0,0) scale(0.97); }
        .hero-cta-secondary-bg {
          position: absolute; inset: 0; background: #1c1917;
          transform: translate3d(0,100%,0); transition: transform 0.55s cubic-bezier(0.16,1,0.3,1); border-radius: inherit;
        }
        .hero-cta-secondary:hover .hero-cta-secondary-bg { transform: translate3d(0,0,0); }
        .hero-cta-secondary-play { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), color 0.4s ease; }
        .hero-cta-secondary:hover .hero-cta-secondary-play { transform: scale(1.15); color: white; }

        @media (max-width: 639px) {
          .hero-cta-primary:active { transform: scale(0.96); box-shadow: 0 2px 12px rgba(59,130,246,0.15); }
          .hero-cta-secondary:active { transform: scale(0.96); background: #1c1917; color: white; border-color: #1c1917; }
          .hero-cta-secondary:active .hero-cta-secondary-bg { transform: translate3d(0,0,0); }
          .hero-cta-secondary:active .hero-cta-secondary-play { color: white; }
        }

        .hero-stat { position: relative; }
        .hero-stat::after {
          content: ''; position: absolute; right: -10px; top: 50%; transform: translateY(-50%);
          width: 1px; height: 18px;
          background: linear-gradient(to bottom, transparent, rgba(214,211,209,0.5), transparent);
        }
        @media (min-width: 640px) { .hero-stat::after { right: -12px; height: 22px; } }
        @media (min-width: 768px) { .hero-stat::after { right: -16px; height: 28px; } }
        .hero-stat:last-child::after { display: none; }
        .hero-stat-value { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), color 0.4s ease; }
        .hero-stat:hover .hero-stat-value { transform: translate3d(0,-1px,0); }
        .hero-stat-label { transition: color 0.4s ease; }
        .hero-stat:hover .hero-stat-label { color: #78716c; }

        .cards-img-wrap {
          box-shadow: 0 8px 28px rgba(28,25,23,0.05), 0 2px 10px rgba(28,25,23,0.03);
          transition: box-shadow 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        @media (min-width: 640px) {
          .cards-img-wrap { box-shadow: 0 12px 40px rgba(28,25,23,0.06), 0 4px 16px rgba(28,25,23,0.03); }
        }
        .group\/cards:hover .cards-img-wrap { box-shadow: 0 20px 60px rgba(28,25,23,0.1), 0 8px 24px rgba(28,25,23,0.05); transform: translate3d(0,-3px,0); }
        .cards-img { transition: transform 1.2s cubic-bezier(0.16,1,0.3,1); }
        .group\/cards:hover .cards-img { transform: scale(1.02); }
        .cards-overlay { opacity: 0; transition: opacity 0.7s ease; }
        .group\/cards:hover .cards-overlay { opacity: 1; }
        .cards-shadow { opacity: 0.4; transition: opacity 0.7s ease; }
        @media (min-width: 640px) { .cards-shadow { opacity: 0.5; } }
        .group\/cards:hover .cards-shadow { opacity: 0.8; }

        .hero-images { display: none; }
        @media (min-width: 768px) {
          .hero-images {
            display: block; position: absolute; left: 50%; transform: translateX(-50%);
            width: 100%; max-width: 1200px; pointer-events: none;
          }
          .hero-img {
            position: absolute; border-radius: 0.75rem; overflow: hidden;
            will-change: transform, opacity; animation: heroImgFloat 8s ease-in-out infinite;
          }
          .hero-img-left { top: -10px; left: -220px; opacity: 0.65; animation-delay: 0s; }
          .hero-img-right { top: -10px; right: -220px; opacity: 0.65; animation-delay: 4s; }
          @keyframes heroImgFloat {
            0%, 100% { transform: translate3d(0,0,0) rotate(-2deg); }
            50% { transform: translate3d(0,-10px,0) rotate(-1deg); }
          }
        }

        .tech-marquee-container { padding: 0; position: relative; }
        .tech-marquee-track {
          display: flex; width: max-content;
          animation: techMarquee 60s linear infinite;
          will-change: transform; backface-visibility: hidden; -webkit-backface-visibility: hidden;
        }
        @media (max-width: 639px) { .tech-marquee-track { animation-duration: 40s; } }
        @keyframes techMarquee {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-33.333%,0,0); }
        }
        .tech-fade-left {
          background: linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0) 100%);
        }
        .tech-fade-right {
          background: linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0) 100%);
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-gradient-text, .hero-underline, .hero-badge,
          .hero-cta-primary, .hero-cta-secondary, .hero-cta-secondary-bg,
          .hero-cta-primary-bg, .hero-sub-word, .hero-stat-value,
          .hero-stat-label, .cards-img-wrap, .cards-img, .cards-overlay,
          .cards-shadow, .hero-img {
            transition: none !important; animation: none !important;
          }
          .tech-marquee-track { animation: none !important; }
          .hero-underline { width: min(160px, 35%); }
        }
      `}</style>

      <style jsx global>{`
        html, body, #__next {
          overscroll-behavior-y: none;
        }
      `}</style>
    </>
  )
}