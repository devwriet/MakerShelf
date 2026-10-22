import type { CSSProperties, ReactNode, ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

interface LiquidGlassProps extends Omit<ComponentPropsWithoutRef<"div">, "className" | "style" | "children"> {
  children: ReactNode
  /** sizing / shape classes for the glass panel itself (w-, h-, max-w-, mx-auto...) */
  className?: string
  /** layout classes for the content sitting on top of the glass (flex, items-center, gap, padding...) */
  contentClassName?: string
  contentStyle?: CSSProperties
  radius?: string
  style?: CSSProperties
}

// Layered glass surface: filter (blur + SVG lens distortion) -> tint overlay -> specular highlight -> content.
// Structure mirrors the reference lq.html/lq.css (.glass-filter / .glass-overlay / .glass-specular / .glass-content).
export function LiquidGlass({
  children,
  className,
  contentClassName,
  contentStyle,
  radius,
  style,
  ...rest
}: LiquidGlassProps) {
  return (
    <div
      className={cn("liquid-glass", className)}
      style={{ ...(radius ? ({ "--lg-radius": radius } as CSSProperties) : {}), ...style }}
      {...rest}
    >
      <div className="liquid-glass__filter" />
      <div className="liquid-glass__overlay" />
      <div className="liquid-glass__specular" />
      <div className={cn("liquid-glass__content", contentClassName)} style={contentStyle}>
        {children}
      </div>
    </div>
  )
}
