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
            <h4 className="text-lg font-semibold text-foreground mb-2">ProHub</h4>
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
              <button aria-label="Twitter" onClick={() => window.open('https://twitter.com', '_blank')} className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-background/80 border border-border/30 hover:bg-background/95">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.92c-.63.28-1.3.47-2 .56.72-.43 1.27-1.11 1.53-1.92-.68.4-1.44.69-2.25.85A3.33 3.33 0 0015.5 4c-1.83 0-3.32 1.5-3.32 3.34 0 .26.03.52.08.77C9.08 8 5.3 6.14 2.79 3.16c-.29.5-.46 1.08-.46 1.7 0 1.17.6 2.2 1.52 2.8-.56-.02-1.09-.17-1.55-.42v.04c0 1.6 1.13 2.93 2.63 3.23-.27.07-.56.11-.86.11-.21 0-.42-.02-.62-.06.42 1.3 1.64 2.25 3.09 2.28A6.66 6.66 0 012 19.54 9.35 9.35 0 006.29 21c7.55 0 11.68-6.26 11.68-11.68v-.53c.8-.58 1.5-1.3 2.06-2.12-.74.33-1.53.55-2.36.65z"/></svg>
              </button>
              <button aria-label="GitHub" onClick={() => window.open('https://github.com', '_blank')} className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-background/80 border border-border/30 hover:bg-background/95">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.19a11.07 11.07 0 015.79 0c2.21-1.5 3.18-1.19 3.18-1.19.63 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.66.42.36.79 1.08.79 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.68.8.56A10.52 10.52 0 0023.5 12c0-6.35-5.15-11.5-11.5-11.5z"/></svg>
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
          <p className="text-xs sm:text-sm text-muted-foreground">© 2025 ProHub. All rights reserved.</p>
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
