import { Link } from "react-router-dom"
import { AuthLayout } from "@/components/AuthLayout"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/i18n/LanguageContext"

// catch-all for unknown URLs - reuses the auth card chrome so a bad link
// still lands on something branded with a way back home.
export function NotFoundPage() {
  const { t } = useLanguage()
  const copy = t.notFound

  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-6xl font-extralight text-ink-soft">404</span>
        <h1 className="text-3xl font-extralight text-ink">{copy.title}</h1>
        <p className="text-sm text-ink-soft">{copy.description}</p>
      </div>

      <Button
        asChild
        className="h-[50px] w-full rounded-full bg-accent text-base text-white transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-accent/90 hover:shadow-[0_4px_14px_rgba(0,122,255,0.35)] active:scale-95"
      >
        <Link to="/">{copy.home}</Link>
      </Button>
    </AuthLayout>
  )
}
