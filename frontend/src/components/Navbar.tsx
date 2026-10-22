import { Menu, Search, UserRound, X } from "lucide-react"
import { useEffect, useRef, useState, useSyncExternalStore, type ComponentProps } from "react"
import { Link } from "react-router-dom"
import { LanguageToggle } from "@/components/LanguageToggle"
import { LiquidGlass } from "@/components/LiquidGlass"
import { SearchField } from "@/components/SearchField"
import { SideMenu } from "@/components/SideMenu"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/i18n/LanguageContext"
import { cn } from "@/lib/utils"

// How much of the bar fits at the current width:
//  - full    (>= 1400px): search field + language + login/signup all inline
//  - compact (>= 1100px): search collapses to an icon; opening it swaps the
//    language/login/signup group out for the field
//  - icons   (>= 883px):  search and account are both icons; opening either
//    pushes the wordmark out to make room for the field / auth buttons
//  - menu    (<= 882px):  just the wordmark and menu button - search,
//    language and login/signup move into the side menu (SideMenu.tsx)
type NavTier = "full" | "compact" | "icons" | "menu"
type Expanded = "search" | "account" | null

const FULL_QUERY = "(min-width: 1400px)"
const COMPACT_QUERY = "(min-width: 1100px)"
const ICONS_QUERY = "(min-width: 883px)"

const getTier = (): NavTier => {
  if (window.matchMedia(FULL_QUERY).matches) return "full"
  if (window.matchMedia(COMPACT_QUERY).matches) return "compact"
  if (window.matchMedia(ICONS_QUERY).matches) return "icons"
  return "menu"
}

const subscribeTier = (onChange: () => void) => {
  const queries = [FULL_QUERY, COMPACT_QUERY, ICONS_QUERY].map((q) => window.matchMedia(q))
  queries.forEach((mq) => mq.addEventListener("change", onChange))
  return () => queries.forEach((mq) => mq.removeEventListener("change", onChange))
}

function NavIconButton({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full text-ink transition-all duration-300 ease-out hover:scale-[1.04] hover:bg-white/30 active:scale-95",
        className,
      )}
      {...props}
    />
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [expanded, setExpanded] = useState<Expanded>(null)
  const rootRef = useRef<HTMLElement | null>(null)
  const { t } = useLanguage()
  const tier = useSyncExternalStore(subscribeTier, getTier)

  // a toggle only exists in the tiers that collapse it, so resizing past a
  // breakpoint drops whatever was expanded instead of leaving it stuck open
  const active: Expanded =
    tier === "full" || tier === "menu" || (tier === "compact" && expanded === "account") ? null : expanded

  const showSearchField = tier === "full" || active === "search"
  const showAuthButtons = tier === "full" || (tier === "compact" && !active) || active === "account"
  const hideLogo = tier === "icons" && active !== null

  useEffect(() => {
    if (!open) return
    const onClickAway = (e: MouseEvent) => {
      const target = e.target as Element
      // the menu's language dropdown renders in a portal outside the header
      if (target.closest?.("[data-radix-popper-content-wrapper]")) return
      if (rootRef.current && !rootRef.current.contains(target)) setOpen(false)
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

  useEffect(() => {
    if (!active) return
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(null)
    }
    document.addEventListener("keydown", onEscape)
    return () => document.removeEventListener("keydown", onEscape)
  }, [active])

  return (
    <header ref={rootRef} className="fixed inset-x-0 top-0 z-50 flex justify-center px-[18px] pt-[16px] sm:px-[46px] sm:pt-[41px]">
      <div className="relative flex w-full max-w-[1920px] items-start gap-3">
        <LiquidGlass
          radius="999px"
          className={cn(
            "h-[58px] min-w-0 flex-1 transition-[width] sm:h-[74px]",
            // up to 740px the side menu goes fullscreen over this bar and
            // takes the wordmark with it - hide the bar the moment it opens
            // (neither property is transitioned, so no flat-glass fade) and
            // bring it back right away on close. opacity is needed on top
            // of visibility: Chrome keeps painting a hidden element's
            // backdrop-filter layer as a faint ghost of the bar.
            open && "max-[741px]:invisible max-[741px]:opacity-0",
            open
              ? "duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
              : "duration-500 ease-[cubic-bezier(0.7,0,0.84,0)]",
          )}
          contentClassName="flex items-center gap-3 px-4 sm:gap-5 sm:px-8"
        >
          <a
            href="#section-1"
            aria-hidden={hideLogo}
            tabIndex={hideLogo ? -1 : 0}
            className={cn(
              "shrink-0 overflow-hidden text-2xl font-bold tracking-tight whitespace-nowrap text-ink transition-all duration-500 ease-out sm:text-[40px]",
              // shrinking to nothing (gap included) while the expanded
              // field grows in from the right reads as being pushed out
              hideLogo ? "-mr-3 max-w-0 opacity-0 sm:-mr-5" : "max-w-[320px] opacity-100",
            )}
          >
            MakerShelf
          </a>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-3 sm:gap-5">
            {showSearchField && (
              <SearchField
                value={query}
                onValueChange={setQuery}
                // only when it just appeared from the icon - the always-on
                // full-width field shouldn't grab focus on page load
                autoFocus={tier !== "full"}
                className={cn(
                  "flex-1",
                  tier === "full" ? "max-w-md" : "animate-in fade-in slide-in-from-right-4 duration-300",
                )}
                inputClassName="bg-white/20"
              />
            )}

            <div
              className={cn(
                "flex min-w-0 items-center justify-end gap-2 transition-transform duration-500 ease-out sm:gap-3",
                active === "account" ? "flex-1" : "shrink-0",
              )}
              style={{ transform: open ? "translateX(12px)" : "translateX(0)" }}
            >
              {(tier === "compact" || tier === "icons") && !active && (
                <NavIconButton aria-label={t.nav.searchButton} onClick={() => setExpanded("search")}>
                  <Search className="size-5" strokeWidth={1.8} />
                </NavIconButton>
              )}
              {tier === "icons" && !active && (
                <NavIconButton aria-label={t.nav.account} onClick={() => setExpanded("account")}>
                  <UserRound className="size-5" strokeWidth={1.8} />
                </NavIconButton>
              )}

              {tier !== "menu" && !active && <LanguageToggle />}

              {showAuthButtons && (
                <>
                  <Button
                    asChild
                    className={cn(
                      "h-11 justify-center rounded-full bg-accent px-6 text-base text-white transition-all duration-300 ease-out hover:scale-[1.04] hover:bg-accent/90 hover:shadow-[0_4px_14px_rgba(0,122,255,0.35)] active:scale-95",
                      active === "account" ? "min-w-0 flex-1 px-4 animate-in fade-in slide-in-from-right-4" : "w-28",
                    )}
                  >
                    <Link to="/login">{t.nav.login}</Link>
                  </Button>
                  <Button
                    asChild
                    className={cn(
                      "h-11 justify-center rounded-full bg-white px-6 text-base text-ink transition-all duration-300 ease-out hover:scale-[1.04] hover:bg-white/90 hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)] active:scale-95",
                      active === "account" ? "min-w-0 flex-1 px-4 animate-in fade-in slide-in-from-right-4" : "w-32",
                    )}
                  >
                    <Link to="/signup">{t.nav.signup}</Link>
                  </Button>
                </>
              )}

              {active && (
                <NavIconButton aria-label={t.nav.close} onClick={() => setExpanded(null)} className="animate-in fade-in">
                  <X className="size-5" strokeWidth={1.8} />
                </NavIconButton>
              )}

              <div
                className="flex shrink-0 items-center justify-center overflow-hidden transition-all duration-500 ease-out"
                style={{ width: open ? 0 : 56, height: 56, visibility: open ? "hidden" : "visible" }}
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
                      aria-label={t.nav.openMenu}
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
