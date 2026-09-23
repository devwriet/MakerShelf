import { Menu, Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { LanguageToggle } from "@/components/LanguageToggle"
import { LiquidGlass } from "@/components/LiquidGlass"
import { SideMenu } from "@/components/SideMenu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/i18n/LanguageContext"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const rootRef = useRef<HTMLElement | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    if (!open) return
    const onClickAway = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onClickAway)
    document.addEventListener("keydown", onEscape)
    return () => {
      document.removeEventListener("mousedown", onClickAway)
      document.removeEventListener("keydown", onEscape)
    }
  }, [open])

  return (
    <header ref={rootRef} className="fixed inset-x-0 top-0 z-50 flex justify-center px-[18px] pt-[16px] sm:px-[46px] sm:pt-[41px]">
      <div className="flex w-full max-w-[1920px] items-start gap-3">
        <LiquidGlass
          radius="999px"
          className={cn(
            "h-[58px] min-w-0 flex-1 transition-[width] duration-500 sm:h-[74px]",
            open ? "ease-[cubic-bezier(0.16,1,0.3,1)]" : "ease-[cubic-bezier(0.7,0,0.84,0)]",
          )}
          contentClassName="flex items-center gap-3 px-4 sm:gap-5 sm:px-8"
        >
          <a href="#section-1" className="shrink-0 text-2xl font-bold tracking-tight text-ink sm:text-[40px]">
            MakerShelf
          </a>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-3 sm:gap-5">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative hidden min-w-0 max-w-md flex-1 transition-all duration-500 ease-out md:block"
            >
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-soft/60" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.nav.searchPlaceholder}
                className={cn(
                  "h-11 rounded-full border-white/40 bg-white/20 pl-10 placeholder:text-ink-soft/60 transition-[padding] duration-300 focus-visible:border-white/40 focus-visible:ring-0",
                  query ? "pr-11" : "pr-4",
                )}
              />
              <button
                type="submit"
                aria-label={t.nav.searchButton}
                tabIndex={query ? 0 : -1}
                className={cn(
                  "absolute right-1.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white transition-all duration-300 ease-out hover:scale-[1.08] active:scale-95",
                  query ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0",
                )}
              >
                <Search className="size-3.5" strokeWidth={2} />
              </button>
            </form>

            <div
              className="flex shrink-0 items-center gap-2 transition-transform duration-500 ease-out sm:gap-3"
              style={{ transform: open ? "translateX(12px)" : "translateX(0)" }}
            >
              <LanguageToggle className="hidden sm:flex" />

              <Link to="/login" className="hidden sm:inline-flex">
                <Button className="h-11 w-28 justify-center rounded-full bg-accent px-6 text-base text-white transition-all duration-300 ease-out hover:scale-[1.04] hover:bg-accent/90 hover:shadow-[0_4px_14px_rgba(0,122,255,0.35)] active:scale-95">
                  {t.nav.login}
                </Button>
              </Link>
              <Link to="/signup" className="hidden sm:inline-flex">
                <Button className="h-11 w-32 justify-center rounded-full bg-white px-6 text-base text-ink transition-all duration-300 ease-out hover:scale-[1.04] hover:bg-white/90 hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)] active:scale-95">
                  {t.nav.signup}
                </Button>
              </Link>

              <div
                className="flex shrink-0 items-center justify-center overflow-hidden transition-all duration-500 ease-out"
                style={{ width: open ? 0 : 56, height: 56, opacity: open ? 0 : 1 }}
              >
                {/* hover scale+shadow live on this plain wrapper, not the
                    glass button itself - backdrop-filter + overflow:hidden +
                    box-shadow combined on one element renders the shadow's
                    corners square in Chrome, so the glass's own base shadow
                    (always-on, not just on hover) is also switched off below.
                    The collapsing parent above is sized wider AND taller than
                    this button (56px vs 40px, both axes) so the hover shadow
                    has room to bleed outward on every side before hitting
                    that parent's own hard rectangular overflow:hidden clip -
                    otherwise the clip itself squares the shadow off
                    regardless of how round the button is. */}
                <div className="size-10 shrink-0 rounded-full transition-all duration-300 ease-out hover:scale-[1.04] hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)] active:scale-95">
                  <LiquidGlass
                    radius="999px"
                    className="size-full"
                    style={{ boxShadow: "none" }}
                    contentClassName="flex items-center justify-center"
                  >
                    <button
                      type="button"
                      aria-label="메뉴 열기"
                      onClick={() => setOpen(true)}
                      tabIndex={open ? -1 : 0}
                      className="flex size-10 shrink-0 items-center justify-center text-ink"
                    >
                      <Menu className="size-5" />
                    </button>
                  </LiquidGlass>
                </div>
              </div>
            </div>
          </div>
        </LiquidGlass>

        <SideMenu open={open} onClose={() => setOpen(false)} onNavigate={() => setOpen(false)} />
      </div>
    </header>
  )
}
