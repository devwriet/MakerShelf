import { useEffect, useRef, useState } from "react"

const SLIDE_MS = 900
const PROGRESS_DIVISOR = 680
// after the hero->roles auto-slide lands, leftover momentum from that same
// gesture (trackpad inertia especially) must not bleed into the card
// reveal - ignore scrub input for a beat so revealing always takes a
// distinct, deliberate follow-up scroll.
const REVEAL_COOLDOWN_MS = 400
// the reverse-crossing snap (see pastRolesRef below) only fires once
// scrollY is back within this many pixels of rolesTop. Gating on the whole
// Features section let the catch-up slide cover a huge distance (up to a
// full section height), which reads as a teleport even though it's eased -
// keeping this small means native scroll carries almost the entire trip
// back up, and the snap only does a short, barely-noticeable last stretch.
const SNAP_CATCH_RANGE = 240

/**
 * Only sections 1 (hero) and 2 (roles) are scroll-jacked:
 *  - Hero: any scroll input is blocked and instantly slides you to Roles.
 *  - Roles: while its cards aren't fully revealed (or fully retracted),
 *    scrollY stays pinned at exactly the section's top and scroll input
 *    instead scrubs `progress` 0->1 - both revealing the cards on the way
 *    down from Hero, and retracting them one at a time on the way back up
 *    from Features. Once progress hits an edge, the next gesture releases
 *    you to the neighboring section (Hero above, Features below).
 * From Features onward it's plain native document scroll - no interception,
 * until scrolling up carries Roles fully back into view.
 */
export function usePresentationController() {
  const [progress, setProgress] = useState(0)
  const progressRef = useRef(0)
  const animatingRef = useRef(false)
  const rolesTopRef = useRef(0)
  // true once a gesture has actually scrolled past Roles into native
  // (Features+) territory - cleared as soon as we're back at/above Roles.
  // Driving the reverse-crossing snap off this flag instead of a pixel
  // threshold means it still fires correctly even when a single native
  // scroll tick overshoots rolesTop by a lot in one go.
  const pastRolesRef = useRef(false)
  const revealCooldownUntilRef = useRef(0)

  useEffect(() => {
    // browsers restore the previous scroll position on reload by default,
    // which fights this whole controller's assumptions (it expects to
    // start at Hero) - always land at the top on a fresh load instead.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual"
    window.scrollTo(0, 0)

    const getRolesTop = () => document.getElementById("section-2")?.offsetTop ?? window.innerHeight
    rolesTopRef.current = getRolesTop()
    const onResize = () => {
      rolesTopRef.current = getRolesTop()
    }
    window.addEventListener("resize", onResize)

    // Manual eased scroll instead of native `behavior: "smooth"` - the native
    // one is too fast/inconsistent across browsers to read as a deliberate
    // slide transition.
    const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t))
    const slideTo = (top: number) => {
      animatingRef.current = true
      const start = window.scrollY
      const distance = top - start
      const startTime = performance.now()

      const step = (now: number) => {
        const elapsed = now - startTime
        const t = Math.min(1, elapsed / SLIDE_MS)
        const y = start + distance * easeOutExpo(t)
        window.scrollTo(0, y)
        if (t < 1) {
          requestAnimationFrame(step)
        } else {
          animatingRef.current = false
          if (top === rolesTopRef.current) {
            revealCooldownUntilRef.current = performance.now() + REVEAL_COOLDOWN_MS
          }
        }
      }
      requestAnimationFrame(step)
    }

    const handleDelta = (deltaY: number, preventDefault: () => void) => {
      if (Math.abs(deltaY) < 1) return

      // a slide (to Hero or to Roles) is already committed and mid-flight -
      // block every kind of scroll input, native included, so nothing can
      // fight the eased animation or leak state changes in before it lands.
      if (animatingRef.current) {
        preventDefault()
        return
      }

      const rolesTop = rolesTopRef.current
      const y = window.scrollY
      const dir = deltaY > 0 ? 1 : -1

      // Roles only ever sits at one scroll position while its cards are
      // being scrubbed: scrollY === rolesTop (that's the only position where
      // it's fully in view). Everything past that, through Features and
      // beyond, is native document territory.
      const pinned = y <= rolesTop + 1

      // a real user gesture is scrolling back up, we were previously past
      // Roles, AND scrollY has already naturally made its own way back to
      // within SNAP_CATCH_RANGE of rolesTop - ease the rest of the way to
      // the fully visible resting position. Below that range, this branch
      // doesn't fire at all and native scroll carries the user the whole
      // distance from Features/CTA/Footer on its own; only the short final
      // stretch is an assisted slide, so it never feels like a jump.
      if (dir === -1 && pastRolesRef.current && y <= rolesTop + SNAP_CATCH_RANGE) {
        preventDefault()
        pastRolesRef.current = false
        slideTo(rolesTop)
        return
      }

      if (y < rolesTop - 1) {
        // still inside the hero: fully lock native scroll, jump straight to roles.
        // Being here means progress must be 0, no matter what sequence of
        // events got us here - guarantees the cards always start hidden the
        // next time Roles is entered.
        preventDefault()
        if (progressRef.current !== 0) {
          progressRef.current = 0
          setProgress(0)
        }
        if (dir === 1) slideTo(rolesTop)
        return
      }

      if (pinned) {
        pastRolesRef.current = false
        const p = progressRef.current
        if (dir === 1 && p >= 1) {
          // all 3 cards are already showing - let scroll continue into
          // Features on its own, no forced auto-slide
          return
        }
        // inside roles: scrub progress instead of scrolling
        preventDefault()
        if (dir === 1 && p <= 0 && performance.now() < revealCooldownUntilRef.current) {
          // still inside the cooldown right after the hero->roles slide -
          // swallow leftover momentum from that same gesture instead of
          // letting it reveal the cards on arrival
          return
        }
        if (dir === -1 && p <= 0) {
          slideTo(0)
          return
        }
        const next = Math.min(1, Math.max(0, p + deltaY / PROGRESS_DIVISOR))
        progressRef.current = next
        setProgress(next)
        return
      }

      // native document territory (rest of Features onward): scroll freely.
      // Keep progress pinned at 1 so re-entering from below starts fully revealed.
      pastRolesRef.current = true
      if (progressRef.current !== 1) {
        progressRef.current = 1
        setProgress(1)
      }
    }

    const onWheel = (e: WheelEvent) => handleDelta(e.deltaY, () => e.preventDefault())

    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY
      const delta = touchStartY - y
      touchStartY = y
      handleDelta(delta * 2.2, () => e.preventDefault())
    }

    const KEY_DELTA: Record<string, number> = {
      ArrowDown: 120,
      PageDown: 120,
      ArrowUp: -120,
      PageUp: -120,
    }
    const onKeyDown = (e: KeyboardEvent) => {
      const d = KEY_DELTA[e.key]
      if (d === undefined) return
      handleDelta(d, () => e.preventDefault())
    }

    // middle-click-drag autoscroll would let the user bypass the
    // scroll-jacking above entirely - suppress the OS autoscroll cursor by
    // blocking the middle button's default mousedown action.
    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 1) e.preventDefault()
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("mousedown", onMouseDown)

    return () => {
      window.removeEventListener("resize", onResize)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("mousedown", onMouseDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { progress }
}
