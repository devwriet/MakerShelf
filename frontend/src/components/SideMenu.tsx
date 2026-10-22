import { ArrowRight, Code2, Gift, Headphones, PanelRightClose, Search, Settings, Users, X } from "lucide-react"
import { useEffect, useState, type CSSProperties } from "react"
import { Link } from "react-router-dom"
import { LanguageToggle } from "@/components/LanguageToggle"
import { LiquidGlass } from "@/components/LiquidGlass"
import { SearchField } from "@/components/SearchField"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/i18n/LanguageContext"
import { cn } from "@/lib/utils"

// measured from the Figma "사이드바" mockup (panel 350 wide, header icon 56,
// "MENU" label 40px, pills 313x69 with a 31px icon 47px from the pill's left
// edge, 35px gaps between pills, and a wider gap separating the first
// highlighted pill from the plain list below it).
const PANEL_W = 350
const PANEL_PAD = 18
const ITEM_W = 313
const ITEM_H = 69
const ITEM_GAP = 35
const HEADER_H = 40

interface SideMenuProps {
  open: boolean
  onClose: () => void
  onNavigate?: () => void
}

// Grows inline right next to the navbar (same fixed-top flex row, see
// Navbar.tsx) instead of an off-canvas overlay: as this panel's width grows
// from 0, the navbar (flex-1) yields the space, so the toggle button ends up
// sitting right at this panel's edge instead of jumping across the screen.
export function SideMenu({ open, onClose, onNavigate }: SideMenuProps) {
  const [active, setActive] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const { t } = useLanguage()

  // fullscreen (<= 740px) the menu is modal: freeze the page behind it.
  // overflow:hidden stops native scrolling; the attribute tells the slide
  // controller (usePresentationController) to stop driving it too.
  useEffect(() => {
    if (!open || !window.matchMedia("(max-width: 740.98px)").matches) return
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = "hidden"
    root.setAttribute("data-scroll-locked", "")
    return () => {
      root.style.overflow = prevOverflow
      root.removeAttribute("data-scroll-locked")
    }
  }, [open])

  const first = { icon: ArrowRight, label: t.sideMenu.getStarted, href: "#" }
  const rest = [
    { icon: Users, label: t.sideMenu.credits, href: "#" },
    { icon: Headphones, label: t.sideMenu.support, href: "#" },
    { icon: Code2, label: t.sideMenu.github, href: "#" },
    { icon: Gift, label: t.sideMenu.donate, href: "#" },
    { icon: Settings, label: t.sideMenu.setting, href: "#" },
  ]

  return (
    <LiquidGlass
      radius="2rem"
      aria-hidden={!open}
      className={cn(
        // up to 740px the panel overlays the whole navbar row at full width
        // (a 350px side panel no longer fits beside the bar) instead of
        // sitting next to it.
        // `!` because the unlayered .liquid-glass rule (position: relative)
        // otherwise outranks Tailwind's layered utilities.
        "side-menu shrink-0 overflow-hidden transition-all max-[741px]:absolute! max-[741px]:top-0 max-[741px]:right-0",
        // opening uses a soft ease-out (cubic, not expo - expo front-loads
        // nearly the whole width into the first few frames and reads as
        // the panel popping out) over a longer 700ms; closing keeps the
        // quicker ease-in so dismissing still feels snappy. Navbar.tsx
        // mirrors these timings so the bar yields space in lockstep.
        open
          ? "duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
          : "duration-500 ease-[cubic-bezier(0.7,0,0.84,0)]",
        // no opacity fade here: opacity < 1 on an ancestor makes Chrome
        // drop every backdrop-filter inside it, so the glass went flat for
        // the whole animation. The width/height clip does the reveal, and
        // visibility (which flips only at the end of a hide) keeps the
        // collapsed panel's shadow from lingering as a smudge.
        open
          ? "visible h-[calc(100svh-2rem)] w-full sm:h-[calc(100vh-5.5rem)] min-[741px]:w-(--panel-w)"
          : "pointer-events-none invisible h-0 w-0",
      )}
      style={
        {
          "--panel-w": `${PANEL_W}px`,
          "--item-w": `${ITEM_W}px`,
          "--item-gap": `${ITEM_GAP}px`,
          transform: open ? "scale(1)" : "scale(0.96)",
        } as CSSProperties
      }
      contentClassName="overflow-hidden"
      contentStyle={{ padding: PANEL_PAD }}
    >
      {/* fixed width (not w-full) so the contents don't reflow while the
          panel's width animates - when fullscreen that's the row width minus
          the header's (18px, 46px from sm) and panel's own horizontal padding. */}
      <div className="flex h-full w-[calc(100vw-72px)] shrink-0 flex-col sm:max-[741px]:w-[calc(100vw-128px)] min-[741px]:w-(--item-w)">
        {/* height + negative top margin (canceling the panel's own
            PANEL_PAD) match this row to the navbar's own h-[58px]/h-[74px]
            and top Y - so the "메뉴" row lines up exactly with the navbar
            bar sitting next to it, same top edge and same height. No bottom
            margin either, so the divider line right after this sits flush
            against its bottom edge - which is now also the navbar's own
            bottom edge, so the two line up. */}
        <div
          className="relative flex h-[58px] shrink-0 items-center justify-center sm:h-[74px]"
          style={{ marginTop: -PANEL_PAD }}
        >
          {/* <= 740px the menu goes fullscreen over the navbar, so the
              wordmark moves into this row and takes the "MENU" label's place */}
          <div className="flex items-baseline">
            <a
              href="#section-1"
              tabIndex={open ? 0 : -1}
              onClick={onNavigate}
              className="text-2xl leading-none font-bold tracking-tight text-ink min-[741px]:hidden"
            >
              MakerShelf
            </a>
            <span className="text-2xl leading-none font-light tracking-wide text-ink-soft max-[741px]:hidden">
              {t.sideMenu.menu}
            </span>
          </div>
          {/* hover scale+shadow live on this plain wrapper, not the glass
              button itself - backdrop-filter + overflow:hidden + box-shadow
              combined on one element renders the shadow's corners square in
              Chrome, so the glass's own base shadow (always-on, not just on
              hover) is also switched off below. */}
          <div
            className="absolute right-0 shrink-0 rounded-full transition-all duration-300 ease-out hover:scale-[1.04] hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)] active:scale-95"
            style={{ width: HEADER_H, height: HEADER_H }}
          >
            <LiquidGlass
              radius="999px"
              className="size-full"
              style={{ boxShadow: "none" }}
              contentClassName="flex items-center justify-center"
            >
              <button
                type="button"
                aria-label={t.nav.closeMenu}
                onClick={onClose}
                tabIndex={open ? 0 : -1}
                className="flex items-center justify-center text-ink-soft transition-colors hover:text-ink"
                style={{ width: HEADER_H, height: HEADER_H }}
              >
                <PanelRightClose className="size-[18px]" strokeWidth={1.5} />
              </button>
            </LiquidGlass>
          </div>
        </div>

        {/* measured from Figma's "Line 2" - 1px #9D9D9D, full item width */}
        <div className="mb-6 h-px shrink-0 bg-[#9D9D9D]/50 min-[883px]:mb-10" />

        <nav className="flex min-h-0 flex-1 flex-col">
          {/* at <= 882px the navbar has no room for these, so the menu
              carries search, language and login/signup instead */}
          <div className="mb-6 flex shrink-0 flex-col gap-3 min-[883px]:hidden">
            {/* collapsed: a 2-column grid matching the login/signup row
                below, so search sits centered over login and language over
                signup; expanded: the field + close button take the whole row */}
            <div className={cn("h-11 items-center gap-3", searchOpen ? "flex" : "grid grid-cols-2 justify-items-center")}>
              {searchOpen ? (
                <>
                  <SearchField
                    value={query}
                    onValueChange={setQuery}
                    autoFocus
                    className="flex-1 animate-in fade-in"
                    inputClassName="bg-white/40"
                  />
                  <button
                    type="button"
                    aria-label={t.nav.close}
                    onClick={() => setSearchOpen(false)}
                    className="flex size-10 shrink-0 items-center justify-center rounded-full text-ink transition-all duration-300 ease-out hover:bg-white/30 active:scale-95"
                  >
                    <X className="size-5" strokeWidth={1.8} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    aria-label={t.nav.searchButton}
                    onClick={() => setSearchOpen(true)}
                    className="flex size-10 shrink-0 items-center justify-center rounded-full text-ink transition-all duration-300 ease-out hover:scale-[1.04] hover:bg-white/30 active:scale-95"
                  >
                    <Search className="size-5" strokeWidth={1.8} />
                  </button>
                  <LanguageToggle />
                </>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                asChild
                className="h-11 min-w-0 flex-1 justify-center rounded-full bg-accent text-base text-white transition-all duration-300 ease-out hover:scale-[1.04] hover:bg-accent/90 hover:shadow-[0_4px_14px_rgba(0,122,255,0.35)] active:scale-95"
              >
                <Link to="/login">{t.nav.login}</Link>
              </Button>
              <Button
                asChild
                className="h-11 min-w-0 flex-1 justify-center rounded-full bg-white text-base text-ink transition-all duration-300 ease-out hover:scale-[1.04] hover:bg-white/90 hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)] active:scale-95"
              >
                <Link to="/signup">{t.nav.signup}</Link>
              </Button>
            </div>
          </div>
          <div className="mb-6 h-px shrink-0 bg-[#9D9D9D]/50 min-[883px]:hidden" />

          {/* hover scale+shadow live on this plain wrapper, not the glass
              pill itself - combining backdrop-filter + overflow:hidden +
              box-shadow on one element renders the shadow's corners square
              in Chrome, so the shadow needs its own unfiltered layer. */}
          <div
            className="mb-10 shrink-0 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out hover:scale-[1.04] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-95"
            style={{ height: ITEM_H }}
          >
            <div className="size-full overflow-hidden rounded-full bg-white">
              <a
                href={first.href}
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  setActive(0)
                  onNavigate?.()
                }}
                className="flex h-full items-center justify-center gap-3 px-[47px] text-lg font-semibold tracking-wide whitespace-nowrap text-ink"
              >
                {first.label}
                <first.icon className="size-5 shrink-0" strokeWidth={1.8} />
              </a>
            </div>
          </div>

          {/* measured from Figma's "Line 8" - same style, between Get
              Started and the first plain menu item */}
          <div className="h-px shrink-0 bg-[#9D9D9D]/50" />

          {/* only this list scrolls when the panel is too short for every
              pill - everything above it stays put. The negative margin +
              matching padding gives the pills' shadows and hover scale room
              before the scroll box clips them, and the bottom margin pulls the
              box down through the panel's own padding so overflowing pills
              run on to the panel's bottom edge instead of being cut off on a
              straight line 18px above it. min-h-full
              (instead of justify-center on the scroller itself) keeps the
              list centered when it fits without cutting off its top when it
              doesn't. Scrolling + the fade only switch on below a viewport
              height (see .side-menu-list in index.css). The mask fades both ends so pills dissolve into the
              divider above and the panel edge below; the padding equals each
              fade's length, so at rest nothing sits in a fade. (Masking makes
              this box the pills' backdrop root, so their own blur no longer
              reaches the page - fine, since the panel behind them is already
              blurred glass. Separate blur strips instead left a seam on top
              and a smudge of blurred shadow at the bottom.) */}
          <div className="relative -mx-[18px] -mb-[18px] min-h-0 flex-1">
            <div
              data-own-scroll
              className="side-menu-list h-full overscroll-contain px-[18px] pt-9 pb-14 [scrollbar-width:none]"
            >
              <div className="flex min-h-full flex-col justify-center gap-5 min-[883px]:gap-(--item-gap)">
                {rest.map((item, i) => {
                  const idx = i + 1
                  const isActive = active === idx
                  return (
                    <div
                      key={item.label}
                      className={cn(
                        "shrink-0 rounded-full shadow-[0_6px_6px_rgba(0,0,0,0.15),0_0_20px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:scale-[1.04] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] active:scale-95",
                        isActive && "shadow-[0_2px_10px_rgba(0,0,0,0.08)]",
                      )}
                      style={{ height: ITEM_H }}
                    >
                      <LiquidGlass
                        radius="999px"
                        className="size-full"
                        style={{ boxShadow: "none" }}
                        contentClassName="block"
                      >
                        <a
                          href={item.href}
                          tabIndex={open ? 0 : -1}
                          onClick={() => {
                            setActive(idx)
                            onNavigate?.()
                          }}
                          className={cn(
                            "flex h-full items-center justify-center gap-3 px-[47px] text-lg font-medium tracking-wide whitespace-nowrap transition",
                            isActive ? "text-ink" : "text-ink-soft hover:text-ink",
                          )}
                        >
                          <item.icon className="size-[31px] shrink-0" strokeWidth={1.6} />
                          {item.label}
                        </a>
                      </LiquidGlass>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </LiquidGlass>
  )
}
