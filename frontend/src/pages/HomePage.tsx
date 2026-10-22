import { Navbar } from "@/components/Navbar"
import { CtaSection } from "@/components/sections/CtaSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { Footer } from "@/components/sections/Footer"
import { HeroSection } from "@/components/sections/HeroSection"
import { RolesSection } from "@/components/sections/RolesSection"
import { usePresentationController } from "@/hooks/usePresentationController"

export function HomePage() {
  const { progress } = usePresentationController()

  return (
    <div className="relative">
      <Navbar />

      <div
        style={{
          background: "linear-gradient(135deg, #efe9e1 0%, #dfd5c6 50%, #cbbfa4 100%)",
          backgroundAttachment: "fixed",
        }}
      >
        <HeroSection />
        <RolesSection progress={progress} />
        <FeaturesSection />
        <CtaSection />
        <Footer />
      </div>
    </div>
  )
}
