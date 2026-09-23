import { Link } from "react-router-dom"
import { AuthInput } from "@/components/AuthInput"
import { AuthLayout } from "@/components/AuthLayout"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/i18n/LanguageContext"

export function LoginPage() {
  const { t } = useLanguage()
  const copy = t.auth.login

  return (
    <AuthLayout>
      <h1 className="text-center text-4xl font-extralight text-ink">{copy.title}</h1>

      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <AuthInput type="text" placeholder={copy.id} autoComplete="username" />
        <AuthInput type="password" placeholder={copy.password} autoComplete="current-password" />

        <Button
          type="submit"
          className="mt-2 h-[50px] rounded-full bg-accent text-base text-white transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-accent/90 hover:shadow-[0_4px_14px_rgba(0,122,255,0.35)] active:scale-95"
        >
          {copy.submit}
        </Button>
      </form>

      <div className="h-px bg-black/10" />

      <div className="flex flex-col items-center gap-4">
        <span className="text-sm text-ink-soft">{copy.noAccount}</span>
        <Link to="/signup" className="w-full">
          <Button
            type="button"
            variant="outline"
            className="h-[50px] w-full rounded-full border-black/10 bg-white text-base text-ink transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-white/90 hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)] active:scale-95"
          >
            {copy.switch}
          </Button>
        </Link>
      </div>
    </AuthLayout>
  )
}
