"use client"

import Link from "next/link"
import {
  Instagram,
  Linkedin,
  Home,
  Users,
  Settings,
  FolderOpen,
  Calendar,
  ArrowUpRight,
  Sparkles,
} from "lucide-react"

export function Footer() {
  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "/about", icon: Users },
    { label: "How We Work", href: "/how-we-work", icon: Settings },
    { label: "Projects", href: "/#social-proof", icon: FolderOpen },
    { label: "Book a Call", href: "/book", icon: Calendar },
  ]

  const socials = [
    {
      label: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/insalink.com_?igsh=bXhlbDIxZm1oeHJ4",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com",
    },
  ]

  return (
    <footer className="relative border-t border-border/20 bg-background/60 backdrop-blur-2xl overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10 sm:px-8 lg:px-12">
        {/* Main Footer Content: Split into rows/columns for better balance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-start">

          {/* Brand Column */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <Link href="/" className="group inline-flex items-center gap-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-500">
                Insalink
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100 mt-2" />
            </Link>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg font-medium">
              Transforming ambitious visions into high-performance digital landmarks.
            </p>

            {/* Premium Social Buttons with magnetic feel */}
            <div className="flex items-center gap-4 pt-4">
              {socials.map((social) => (
                <button
                  key={social.label}
                  aria-label={social.label}
                  onClick={() => window.open(social.href, "_blank")}
                  className="group relative inline-flex items-center justify-center h-12 w-12 rounded-2xl border border-border/30 bg-background/40 hover:border-primary/40 hover:text-primary transition-all duration-500 hover:scale-110 active:scale-90 cursor-pointer overflow-hidden shadow-sm"
                >
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.06] transition-colors duration-500" />
                  <social.icon className="h-5 w-5 transition-all duration-500 group-hover:rotate-[360deg] z-10" />

                  {/* Tooltip */}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-foreground text-background text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap scale-50 group-hover:scale-100 border border-border/10 shadow-xl">
                    {social.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col items-center lg:items-end justify-center h-full">
            <div className="space-y-8 w-full">
              <div className="hidden lg:block h-px w-24 bg-gradient-to-l from-primary/40 to-transparent ml-auto mb-8" />

              <nav>
                <ul className="flex flex-wrap items-center justify-center lg:justify-end gap-3 lg:gap-4 max-w-xl ml-auto">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group relative inline-flex items-center gap-3 px-6 py-3.5 pr-10 rounded-2xl text-[13px] font-semibold tracking-wide text-muted-foreground border border-border/20 bg-background/30 hover:border-primary/30 hover:text-foreground transition-all duration-500 shadow-sm hover:shadow-primary/5 active:scale-95"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                        <link.icon className="h-4 w-4 opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all duration-500 shrink-0" />
                        <span className="relative z-10">{link.label}</span>
                        <div className="absolute right-3.5 flex items-center justify-center">
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary transition-all duration-500" />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Separator with elegant fade */}
        <div className="relative h-px w-full mb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-2">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <p className="text-[12px] font-bold text-muted-foreground/60 tracking-wider">
              © {new Date().getFullYear()} INSALINK STUDIO
            </p>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-border" />
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">System Operational</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 py-2 px-4 rounded-full border border-primary/20 bg-primary/[0.03] text-[11px] font-black tracking-[0.25em] uppercase text-primary/80 group cursor-default shadow-inner">
              <Sparkles className="h-3.5 w-3.5 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-12" />
              <span>Innovating Beyond Pixels</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}