"use client"

export function Footer() {
  const footerLinks = {
    Product: ["Features", "Pricing", "Security", "Roadmap"],
    Company: ["About", "Blog", "Careers", "Contact"],
    Resources: ["Documentation", "API Docs", "Support", "Community"],
    Legal: ["Privacy", "Terms", "Cookies", "License"],
  }

  const socials = ["Twitter", "GitHub", "LinkedIn"]

  return (
    <footer className="border-t border-border/30 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 font-semibold text-foreground text-sm">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-border/30 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-xs sm:text-sm text-muted-foreground">© 2025 ProHub. All rights reserved.</p>
          <div className="flex gap-6">
            {socials.map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
