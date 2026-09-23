import { Check, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/i18n/LanguageContext"
import { LOCALE_LABEL, LOCALES } from "@/i18n/translations"
import { cn } from "@/lib/utils"

interface LanguageToggleProps {
  className?: string
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { locale, setLocale } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex w-11 items-center gap-1 text-sm font-medium text-ink-soft outline-none transition-colors hover:text-ink data-open:text-ink",
          className,
        )}
      >
        {LOCALE_LABEL[locale]}
        <ChevronDown className="size-3.5" strokeWidth={2} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-28 rounded-xl border border-black/5 bg-white/95 p-1.5 shadow-lg backdrop-blur-sm">
        {LOCALES.map((code) => (
          <DropdownMenuItem
            key={code}
            onSelect={() => setLocale(code)}
            className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-sm text-ink-soft data-highlighted:bg-black/5 data-highlighted:text-ink"
          >
            {LOCALE_LABEL[code]}
            {locale === code && <Check className="size-3.5 text-accent" strokeWidth={2.5} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
