import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Styling variants for Alert
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 text-sm shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-white text-black border-gray-200",
        destructive: "bg-red-50 text-red-800 border-red-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Root Alert component
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

// Alert title
const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold text-base", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

// Alert description
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-gray-600 leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
