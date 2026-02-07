"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Zap, Grid, BarChart2, Tag } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const navLinks = [
    { label: "Projects", href: "#social-proof", Icon: Grid },
    { label: "Analytics", href: "#our-analytics", Icon: BarChart2 },
    { label: "Pricing", href: "#pricing", Icon: Tag },
  ]

  function handleNavClick(e: React.MouseEvent, href: string) {
    // Smooth-scroll for hash links on the same page
    if (href.startsWith("#")) {
      e.preventDefault()
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      } else {
        // Fallback: navigate to the page with the hash
        router.push(`/${href}`)
      }
      setIsOpen(false)
      return
    }

    // For non-hash links, allow normal client navigation and close mobile menu
    setIsOpen(false)
  }

  // CTA helpers
  function handleGetStarted() {
    // Close any open mobile menu then navigate to the booking page
    setIsOpen(false)
    router.push('/book')
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="flex h-16 items-center justify-between">
          {/* Logo (clickable -> home) */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full" style={{ marginTop: '3px' }}>
                <Image
                  src="/Logo.png"
                  alt="Insalink Logo"
                  width={56}
                  height={56}
                  className="object-contain rounded-[9999px]"
                />
              </div>
              <span className="ml-2 font-bold text-xl block">Insalink</span>
            </div>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e as unknown as React.MouseEvent, link.href)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2"
              >
                {/* Icon + label - sleek minimal */}
                {link.Icon && <link.Icon className="h-4 w-4 text-muted-foreground/90" />}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button size="sm" className="hidden md:inline-flex rounded-full text-xs sm:text-sm px-4 sm:px-6" onClick={handleGetStarted} aria-label="Book a meeting">
              Book
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {/* Improved animated hamburger -> X: absolute-centered bars for better responsiveness */}
            <span className="relative inline-block w-5 h-5">
              <span
                className={`absolute left-1/2 top-1/2 block h-0.5 w-5 bg-current transform transition duration-300 ease-in-out -translate-x-1/2 ${isOpen ? 'rotate-45' : '-translate-y-1.5'}`}
                style={{ transformOrigin: 'center' }}
              />
              <span
                className={`absolute left-1/2 top-1/2 block h-0.5 w-5 bg-current transform transition-opacity duration-200 -translate-x-1/2 ${isOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`absolute left-1/2 top-1/2 block h-0.5 w-5 bg-current transform transition duration-300 ease-in-out -translate-x-1/2 ${isOpen ? '-rotate-45' : 'translate-y-1.5'}`}
                style={{ transformOrigin: 'center' }}
              />
            </span>
          </button>
        </div>

        {/* Mobile Menu: keep mounted but animate open/close for smooth transitions */}
        <div
          className={`md:hidden border-t border-border/30 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isOpen ? "max-h-[400px] opacity-100 py-6" : "max-h-0 opacity-0 py-0"
          }`}
        >
          <div
            className={`flex flex-col gap-1 transition-all duration-500 delay-100 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e as unknown as React.MouseEvent, link.href)}
                className="group flex items-center gap-4 px-4 py-3 text-base font-medium text-muted-foreground transition-all duration-300 hover:bg-muted/50 hover:text-foreground rounded-lg"
                style={{
                  transitionDelay: isOpen ? `${i * 60}ms` : "0ms",
                  transform: isOpen ? "translateX(0)" : "translateX(-8px)",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  {link.Icon && <link.Icon className="h-4 w-4" />}
                </div>
                <span>{link.label}</span>
              </Link>
            ))}
            <div className="mt-4 px-4">
              <Button
                className="w-full rounded-xl py-6 text-base font-semibold shadow-lg shadow-primary/10 transition-all duration-300 active:scale-[0.98]"
                onClick={handleGetStarted}
                style={{
                  transitionDelay: isOpen ? `${navLinks.length * 60}ms` : "0ms",
                  transform: isOpen ? "translateY(0)" : "translateY(10px)",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                Book a consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
