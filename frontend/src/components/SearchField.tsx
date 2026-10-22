import { Search, X } from "lucide-react"
import { useRef } from "react"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/i18n/LanguageContext"
import { cn } from "@/lib/utils"

interface SearchFieldProps {
  value: string
  onValueChange: (value: string) => void
  autoFocus?: boolean
  /** extra classes for the <form> wrapper (sizing / flex) */
  className?: string
  /** extra classes for the input itself (background tint) */
  inputClassName?: string
}

// Pill search field shared by the navbar and the side menu. Once there's a
// query, a clear (X) and a submit button slide in at the right edge.
export function SearchField({ value, onValueChange, autoFocus, className, inputClassName }: SearchFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { t } = useLanguage()
  const hasQuery = value.length > 0

  return (
    <form onSubmit={(e) => e.preventDefault()} className={cn("relative min-w-0", className)}>
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        aria-label={t.nav.searchButton}
        placeholder={t.nav.searchPlaceholder}
        autoFocus={autoFocus}
        className={cn(
          "h-11 rounded-full border-white/40 pl-4 placeholder:text-ink-soft/60 transition-[padding] duration-300 focus-visible:border-white/40 focus-visible:ring-0",
          hasQuery ? "pr-[76px]" : "pr-4",
          inputClassName,
        )}
      />
      <button
        type="button"
        aria-label={t.nav.clearSearch}
        tabIndex={hasQuery ? 0 : -1}
        onClick={() => {
          onValueChange("")
          inputRef.current?.focus()
        }}
        className={cn(
          "absolute right-10 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-ink-soft transition-all duration-300 ease-out hover:bg-black/5 hover:text-ink active:scale-95",
          hasQuery ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0",
        )}
      >
        <X className="size-4" strokeWidth={2} />
      </button>
      <button
        type="submit"
        aria-label={t.nav.searchButton}
        tabIndex={hasQuery ? 0 : -1}
        className={cn(
          "absolute right-1.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white transition-all duration-300 ease-out hover:scale-[1.08] active:scale-95",
          hasQuery ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0",
        )}
      >
        <Search className="size-3.5" strokeWidth={2} />
      </button>
    </form>
  )
}
