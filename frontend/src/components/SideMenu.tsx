import { ArrowRight, Code2, Gift, Headphones, PanelRightClose, Settings, Users } from "lucide-react"
import { useState } from "react"
import { LiquidGlass } from "@/components/LiquidGlass"
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
  const { t } = useLanguage()
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
        "shrink-0 overflow-hidden transition-all duration-500",
        // opening uses an ease-out curve (fast start, gentle settle) for a
        // springy pop; closing uses that same curve mirrored in time
        // (ease-in) so it reads as the reverse of the open animation
        // instead of feeling abrupt - same duration, matching smoothness.
        open ? "ease-[cubic-bezier(0.16,1,0.3,1)]" : "ease-[cubic-bezier(0.7,0,0.84,0)]",
        open ? "opacity-100" : "pointer-events-none w-0 opacity-0",
      )}
      style={{
        width: open ? PANEL_W : 0,
        height: open ? "calc(100vh - 5.5rem)" : 0,
        transform: open ? "scale(1)" : "scale(0.96)",
      }}
      contentClassName="overflow-hidden"
      contentStyle={{ padding: PANEL_PAD }}
    >
      <div className="flex h-full shrink-0 flex-col" style={{ width: ITEM_W }}>
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
          <span className="text-2xl leading-none font-light tracking-wide text-ink-soft">{t.sideMenu.menu}</span>
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
                aria-label="메뉴 닫기"
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
        <div className="mb-10 h-px shrink-0 bg-[#9D9D9D]/50" />

        <nav className="flex flex-1 flex-col">
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
          <div className="mb-6 h-px shrink-0 bg-[#9D9D9D]/50" />

          <div className="flex flex-1 flex-col justify-center" style={{ gap: ITEM_GAP }}>
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
        </nav>
      </div>
    </LiquidGlass>
  )
}
