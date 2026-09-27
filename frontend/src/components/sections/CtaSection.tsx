import { ArrowRight } from "lucide-react"
import { LiquidGlass } from "@/components/LiquidGlass"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/i18n/LanguageContext"

export function CtaSection() {
  const { t } = useLanguage()

  return (
    <section id="section-4" className="snap-section flex items-center justify-center px-6">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <h2 className="text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
          {t.cta.title1}
          <br />
          {t.cta.title2}
        </h2>
        <p className="text-ink-soft">{t.cta.subtitle}</p>
        <LiquidGlass radius="999px" className="mt-2">
          <Button className="group h-13 w-56 justify-center gap-2 rounded-full bg-accent px-8 text-base text-white hover:bg-accent/90">
            {t.cta.button}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </LiquidGlass>
      </div>
    </section>
  )
}
