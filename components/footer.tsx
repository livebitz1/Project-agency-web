"use client"

import { useState } from "react"

export function Footer() {
  const socials = ["Twitter", "GitHub", "LinkedIn"]
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    // Simple client-side validation
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!isValid) {
      setStatus("error")
      return
    }

    // Simulate async subscribe (replace with real API call)
    try {
      await new Promise((res) => setTimeout(res, 700))
      setStatus("success")
      setEmail("")
    } catch (err) {
      setStatus("error")
    }
  }

  return (
    <footer className="border-t border-border/30 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Enhanced footer layout: brand, newsletter, socials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8">
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Insalink</h4>
            <p className="text-sm text-muted-foreground max-w-sm">We build products that scale — design, engineering and product thinking for teams that ship.</p>
          </div>

          <div className="md:col-span-1">
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3 w-full max-w-md">
              <label htmlFor="footer-email" className="text-sm font-medium text-foreground">Subscribe to updates</label>
              <div className="flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your work email"
                  className="flex-1 rounded-md border border-border/40 px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-95 disabled:opacity-60"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Subscribe"}
                </button>
              </div>
              <p className={`text-xs ${status === "error" ? "text-destructive" : "text-muted-foreground"}`}>
                {status === "success" ? "Thanks — you're subscribed!" : status === "error" ? "Please enter a valid email." : "Get product updates and case studies."}
              </p>
            </form>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-sm font-medium text-foreground">Follow us</p>
            <div className="flex gap-3">
              <button aria-label="Instagram" onClick={() => window.open('https://www.instagram.com/insalink.com_?igsh=bXhlbDIxZm1oeHJ4', '_blank')} className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-background/80 border border-border/30 hover:bg-background/95">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1-5.25 5.25A5.25 5.25 0 0 1 12 6.75zm0 1.5a3.75 3.75 0 1 0 3.75 3.75A3.75 3.75 0 0 0 12 8.25zm5.38-.88a1.13 1.13 0 1 1-1.13 1.13a1.13 1.13 0 0 1 1.13-1.13z"/></svg>
              </button>
              <button aria-label="LinkedIn" onClick={() => window.open('https://linkedin.com', '_blank')} className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-background/80 border border-border/30 hover:bg-background/95">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.01 5.01 2.5 2.5 0 01.01-5.01zM3 9h4v12H3zM9 9h3.6v1.71h.05c.5-.95 1.72-1.96 3.55-1.96C20.2 8.75 21 11 21 14.43V21H17v-6.1c0-1.46-.03-3.33-2.03-3.33-2.03 0-2.34 1.58-2.34 3.2V21H9z"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border/30 mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground">© 2025 Insalink. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs sm:text-sm text-muted-foreground">Privacy</span>
            <span className="text-xs sm:text-sm text-muted-foreground">Terms</span>
            <span className="text-xs sm:text-sm text-muted-foreground">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
