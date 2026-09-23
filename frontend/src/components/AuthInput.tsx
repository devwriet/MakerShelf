import { Eye, EyeOff } from "lucide-react"
import { useId, useState } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface AuthInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  type?: "text" | "email" | "tel" | "password"
}

// pill-shaped inputs matching the Figma login/signup cards - password
// fields get a built-in show/hide toggle (also per Figma).
export function AuthInput({ type = "text", className, ...props }: AuthInputProps) {
  const [visible, setVisible] = useState(false)
  const id = useId()
  const isPassword = type === "password"
  const resolvedType = isPassword ? (visible ? "text" : "password") : type

  return (
    <div className="relative">
      <Input
        id={id}
        type={resolvedType}
        className={cn(
          "h-[50px] rounded-full border-black/10 bg-white/50 px-6 text-base placeholder:text-ink-soft/60 focus-visible:ring-accent/40",
          isPassword && "pr-12",
          className,
        )}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft/60 transition-colors hover:text-ink"
        >
          {visible ? <EyeOff className="size-[18px]" strokeWidth={1.6} /> : <Eye className="size-[18px]" strokeWidth={1.6} />}
        </button>
      )}
    </div>
  )
}
