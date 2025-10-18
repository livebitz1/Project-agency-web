import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { SocialProof } from "@/components/social-proof"
import { ValueSection } from "@/components/value-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { PricingSection } from "@/components/pricing-section"
import SkillsChart from "@/components/skills-chart"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="relative overflow-hidden">
        <HeroSection />
        <SocialProof />

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
        </div>

        <ValueSection />
        {/* OUR SKILLS section (charts) */}
        <SkillsChart />
        {/* Pricing section moved to follow OUR SKILLS as requested */}
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
