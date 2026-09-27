import { Home } from "lucide-react"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { LanguageToggle } from "@/components/LanguageToggle"
import { LiquidGlass } from "@/components/LiquidGlass"
import { useLanguage } from "@/i18n/LanguageContext"

interface AuthLayoutProps {
  children: ReactNode
}

// shared chrome for the Login / Signup cards - measured from the Figma
// "Login" / "Create account" frames: MakerShelf wordmark above a liquid
// glass card, with a home button and language toggle in the card's own
// header row.
export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useLanguage()

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-16"
      style={{
        background: "linear-gradient(135deg, #efe9e1 0%, #dfd5c6 50%, #cbbfa4 100%)",
      }}
    >
      <Link to="/" className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        MakerShelf
      </Link>

      <LiquidGlass radius="2.5rem" className="w-full max-w-3xl" contentClassName="flex flex-col gap-8 p-8 sm:p-14">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            aria-label={t.auth.home}
            className="flex size-10 items-center justify-center rounded-xl bg-black/5 text-ink-soft transition-all duration-300 ease-out hover:scale-[1.04] hover:bg-black/10 hover:text-ink active:scale-95"
          >
            <Home className="size-[18px]" strokeWidth={1.6} />
          </Link>
          <LanguageToggle />
        </div>

        {children}
      </LiquidGlass>
    </div>
  )
}
