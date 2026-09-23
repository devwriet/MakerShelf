import { useLanguage } from "@/i18n/LanguageContext"

export function Footer() {
  const { t } = useLanguage()

  const linkColumns = [
    { title: t.footer.service.title, links: [t.footer.service.stock, t.footer.service.logistics, t.footer.service.settlement] },
    { title: t.footer.support.title, links: [t.footer.support.guide, t.footer.support.faq, t.footer.support.contact] },
    { title: t.footer.company.title, links: [t.footer.company.about, t.footer.company.careers, t.footer.company.blog] },
  ]

  return (
    <footer className="border-t border-black/10 px-6 pb-10 pt-16 sm:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="flex max-w-xs flex-col gap-3">
            <span className="text-2xl font-bold tracking-tight text-ink">MakerShelf</span>
            <p className="text-sm text-ink-soft">{t.footer.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3">
            {linkColumns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-ink">{col.title}</span>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-ink-soft transition-colors hover:text-ink">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-black/10 pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <span>{t.footer.rights}</span>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-ink">
              {t.footer.terms}
            </a>
            <a href="#" className="transition-colors hover:text-ink">
              {t.footer.privacy}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
