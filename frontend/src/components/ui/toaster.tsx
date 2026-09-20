import { CheckCircle2, XCircle, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  toastIconStyles,
} from "@/components/ui/toast"

const VARIANT_ICONS = {
  default: Info,
  destructive: XCircle,
  success: CheckCircle2,
} as const

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        const variantKey = (variant ?? "default") as keyof typeof VARIANT_ICONS
        const Icon = VARIANT_ICONS[variantKey] ?? Info
        return (
          <Toast key={id} variant={variant} {...props}>
            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${toastIconStyles[variantKey] ?? toastIconStyles.default}`} />
            <div className="grid flex-1 gap-1">
              {title && <ToastTitle data-toast-title>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
