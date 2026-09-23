import { useState } from "react"
import { ClipboardList, PackageSearch, Receipt } from "lucide-react"
import { LiquidGlass } from "@/components/LiquidGlass"
import { useLanguage } from "@/i18n/LanguageContext"
import { cn } from "@/lib/utils"

const TALL = 168
const SHORT = 84
const CARD_GAP = 16
// keep the 3-box group's combined height constant whether or not one is active
const DEFAULT = (TALL + SHORT * 2) / 3
// the cards wrapper is pinned to this exact height (not left to add up on
// its own) so the heading/subtitle above it can never shift, even if the
// per-card height math above is ever changed without noticing the sum.
const CARDS_BLOCK_HEIGHT = TALL + SHORT * 2 + CARD_GAP * 2

export function FeaturesSection() {
  const [active, setActive] = useState<number | null>(null)
  const { t } = useLanguage()

  const features = [
    { icon: PackageSearch, title: t.features.stock.title, desc: t.features.stock.desc },
    { icon: ClipboardList, title: t.features.logs.title, desc: t.features.logs.desc },
    { icon: Receipt, title: t.features.settlement.title, desc: t.features.settlement.desc },
  ]

  return (
    <section id="section-3" className="snap-section flex items-center justify-center border-b border-black/10 px-6">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t.features.title}</h2>
          <p className="whitespace-nowrap text-sm text-ink-soft">{t.features.subtitle}</p>
        </div>

        <div
          className="flex w-full shrink-0 flex-col gap-4"
          style={{ height: CARDS_BLOCK_HEIGHT }}
          onMouseLeave={() => setActive(null)}
        >
          {features.map((feature, i) => {
            const isActive = active === i
            const height = active === null ? DEFAULT : isActive ? TALL : SHORT

            return (
              <LiquidGlass
                key={feature.title}
                radius="1.75rem"
                onMouseEnter={() => setActive(i)}
                className="w-full cursor-pointer transition-[height] duration-500 ease-out"
                style={{ height }}
                contentClassName="flex h-full flex-col justify-center overflow-hidden px-7"
              >
                <div className="flex items-center gap-4">
                  <feature.icon className="size-8 shrink-0 text-accent" strokeWidth={1.6} />
                  <h3 className="text-xl font-semibold text-ink">{feature.title}</h3>
                </div>
                <p
                  className={cn(
                    "mt-2 pl-12 text-sm text-ink-soft transition-opacity duration-300",
                    isActive ? "opacity-100 delay-150" : "opacity-0",
                  )}
                >
                  {feature.desc}
                </p>
              </LiquidGlass>
            )
          })}
        </div>
      </div>
    </section>
  )
}
