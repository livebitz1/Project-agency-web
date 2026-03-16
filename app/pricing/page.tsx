import { Navbar } from "@/components/navbar"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="relative overflow-hidden">
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
