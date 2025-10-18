"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const navLinks = [
    { label: "Product", href: "#product" },
    { label: "Features", href: "#features" },
    { label: "Projects", href: "#social-proof" },
    { label: "Skills", href: "#our-skills" },
    { label: "Pricing", href: "#pricing" },
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
  function handleSignIn() {
    setIsOpen(false)
    router.push("/signin")
  }

  function handleGetStarted() {
    setIsOpen(false)
    const el = document.getElementById("pricing")
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      router.push("/#pricing")
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden font-bold text-foreground sm:inline text-sm">Digitomeida</span>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e as unknown as React.MouseEvent, link.href)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex text-xs sm:text-sm"
              onClick={handleSignIn}
            >
              Sign In
            </Button>

            <Button size="sm" className="hidden md:inline-flex rounded-full text-xs sm:text-sm px-4 sm:px-6" onClick={handleGetStarted}>
              Get Started
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
          className={`md:hidden border-t border-border/30 overflow-hidden origin-top transform-gpu transition-[max-height,opacity,transform] duration-300 ease-in-out ${
            isOpen ? 'max-h-60 opacity-100 scale-y-100 py-4' : 'max-h-0 opacity-0 scale-y-95 py-0'
          }`}
        >
          <div className="space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e as unknown as React.MouseEvent, link.href)}
                className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
