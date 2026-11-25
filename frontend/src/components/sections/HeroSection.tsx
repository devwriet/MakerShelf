import { useLanguage } from "@/i18n/LanguageContext"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section id="section-1" className="snap-section flex items-center justify-center border-b border-black/10 px-6">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl">
          {t.hero.title}
        </h1>
        <p className="max-w-xl text-base text-ink-soft sm:text-lg">
          {t.hero.subtitleLine1}
          <br />
          {t.hero.subtitleLine2}
        </p>
      </div>

      <ScrollHint />
    </section>
  )
}

function ScrollHint() {
  const { t } = useLanguage()

  return (
    <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-soft/70">
      <span className="text-xs tracking-widest">{t.hero.scroll}</span>
      <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden="true" className="animate-bounce">
        <rect x="1" y="1" width="12" height="18" rx="6" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="7" cy="6" r="1.4" fill="currentColor" />
      </svg>
    </div>
  )
}
