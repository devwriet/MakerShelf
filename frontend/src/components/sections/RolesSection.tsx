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
        <p className="whitespace-nowrap text-sm text-ink-soft">{t.roles.subtitle}</p>

        <div className="mt-12 grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
          {roles.map((role, i) => {
            // each card owns a third of the scroll progress range, so they reveal in sequence
            const cardProgress = Math.min(1, Math.max(0, (progress - i * 0.3) / 0.4))

            return (
              <LiquidGlass
                key={role.title}
                radius="2rem"
                className={cn("min-h-[280px] shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-transform duration-700 ease-out")}
                style={{
                  opacity: cardProgress,
                  transform: `translateY(${(1 - cardProgress) * 140}px) scale(${0.92 + cardProgress * 0.08})`,
                }}
                contentClassName="flex h-full flex-col justify-center p-10 text-left"
              >
                <role.icon className="size-12 text-accent" strokeWidth={1.6} />
                <h3 className="mt-6 text-2xl font-semibold text-ink">{role.title}</h3>
                <p className="mt-2 text-base text-ink-soft">{role.desc}</p>
              </LiquidGlass>
            )
          })}
        </div>
      </div>
    </section>
  )
}
