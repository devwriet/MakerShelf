// Shared SVG filter used by every `.liquid-glass` surface.
// Adapted from the reference lq.html / lq.css (feComponentTransfer + feGaussianBlur + feDisplacementMap).
export function GlassFilters() {
  return (
    <svg aria-hidden="true" style={{ position: "absolute", width: 0, height: 0 }}>
      <filter id="lensFilter" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
        <feComponentTransfer in="SourceAlpha" result="alpha">
          <feFuncA type="identity" />
        </feComponentTransfer>
        <feGaussianBlur in="alpha" stdDeviation="18" result="blur" />
        <feDisplacementMap in="SourceGraphic" in2="blur" scale="18" xChannelSelector="A" yChannelSelector="A" />
      </filter>
    </svg>
  )
}
