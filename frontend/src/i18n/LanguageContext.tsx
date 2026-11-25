import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { LOCALES, type Locale, TRANSLATIONS, type TranslationShape } from "@/i18n/translations"

const STORAGE_KEY = "makershelf-locale"

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "ko"
  // storage can throw when blocked (privacy modes, sandboxed iframes) -
  // fall back to the browser language instead of crashing the whole app
  let stored: string | null = null
  try {
    stored = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    // ignore
  }
  if (stored && (LOCALES as readonly string[]).includes(stored)) return stored as Locale
  return navigator.language.toLowerCase().startsWith("en") ? "en" : "ko"
}

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: TranslationShape
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      // storage blocked - the choice just won't persist across reloads
    }
    document.documentElement.lang = locale
  }, [locale])

  // memoized so consumers only re-render on an actual locale change, not
  // every time a parent re-renders (e.g. on each scroll-progress update)
  const value = useMemo(() => ({ locale, setLocale: setLocaleState, t: TRANSLATIONS[locale] }), [locale])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider")
  return ctx
}
