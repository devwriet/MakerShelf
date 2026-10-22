import { Building2, Store, Truck } from "lucide-react"
import { LiquidGlass } from "@/components/LiquidGlass"
import { useLanguage } from "@/i18n/LanguageContext"
import { cn } from "@/lib/utils"

interface RolesSectionProps {
  /** 0..1, driven by scroll while this section is active */
  progress: number
}

export function RolesSection({ progress }: RolesSectionProps) {
  const { t } = useLanguage()
  const roles = [
    { icon: Building2, title: t.roles.hq.title, desc: t.roles.hq.desc },
    { icon: Store, title: t.roles.store.title, desc: t.roles.store.desc },
    { icon: Truck, title: t.roles.supplier.title, desc: t.roles.supplier.desc },
  ]

  return (
    <section id="section-2" className="snap-section flex items-center justify-center border-b border-black/10 px-6">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t.roles.title}</h2>
        <p className="text-sm text-balance text-ink-soft">{t.roles.subtitle}</p>

        {/* scrollY stays pinned at this section's top while the cards are
            scrubbed in, so all three must fit one viewport - below sm they
            switch to a compact icon-left row instead of tall columns. */}
        <div className="mt-6 grid w-full grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-6">
          {roles.map((role, i) => {
            // each card owns a third of the scroll progress range, so they reveal in sequence
            const cardProgress = Math.min(1, Math.max(0, (progress - i * 0.3) / 0.4))

            return (
              <LiquidGlass
                key={role.title}
                radius="2rem"
                className={cn("shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-transform duration-700 ease-out sm:min-h-[280px]")}
                style={{
                  opacity: cardProgress,
                  transform: `translateY(${(1 - cardProgress) * 140}px) scale(${0.92 + cardProgress * 0.08})`,
                }}
                contentClassName="flex h-full items-center gap-4 p-5 text-left sm:flex-col sm:items-start sm:justify-center sm:gap-0 sm:p-10"
              >
                <role.icon className="size-9 shrink-0 text-accent sm:size-12" strokeWidth={1.6} />
                <div>
                  <h3 className="text-lg font-semibold text-ink sm:mt-6 sm:text-2xl">{role.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft sm:mt-2 sm:text-base">{role.desc}</p>
                </div>
              </LiquidGlass>
            )
          })}
        </div>
      </div>
    </section>
  )
}
