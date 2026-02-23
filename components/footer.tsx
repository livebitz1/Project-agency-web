"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative border-t border-border/30 bg-background/50 backdrop-blur-md">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          {/* Brand section */}
          <div className="md:col-span-5 lg:col-span-6">
            <Link href="/" className="flex items-center mb-6 group w-fit">
              <span className="text-2xl font-bold tracking-tight text-foreground">Insalink</span>
            </Link>
            <p className="text-base text-muted-foreground leading-relaxed max-w-md">
              We transform ambitious visions into high-performance digital landmarks. Crafting the future for the world's most visionary brands through precision engineering and strategic artistry.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-[0.2em] mb-6">Explore</h4>
            <ul className="grid grid-cols-1 gap-4">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "How We Work", href: "/how-we-work" },
                { label: "Projects", href: "/#social-proof" },
                { label: "Book a Call", href: "/book" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-primary mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Section */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col items-start md:items-end">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-[0.2em] mb-6">Connectivity</h4>
            <div className="flex gap-3">
              {[
                {
                  label: "Instagram",
                  icon: Instagram,
                  href: "https://www.instagram.com/insalink.com_?igsh=bXhlbDIxZm1oeHJ4"
                },
                {
                  label: "LinkedIn",
                  icon: Linkedin,
                  href: "https://linkedin.com"
                }
              ].map((social) => (
                <button
                  key={social.label}
                  aria-label={social.label}
                  onClick={() => window.open(social.href, '_blank')}
                  className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-background border border-border/40 hover:border-primary/30 hover:bg-muted/50 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm group"
                >
                  <social.icon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-[360deg]" />
                </button>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground text-left md:text-right italic">
              Join our journey across digital frontiers.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border/40 to-transparent mb-10" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p className="text-xs font-medium text-muted-foreground">© {new Date().getFullYear()} Insalink Studio.</p>
            <div className="hidden md:block w-1 h-1 rounded-full bg-border" />
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground/50">Innovating Beyond Pixels</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
