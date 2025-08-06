import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <nav className="w-full" aria-label="breadcrumb">
    <ol
      ref={ref}
      className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}
      {...props}
    />
  </nav>
))
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("flex items-center space-x-1", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn("transition-colors hover:text-foreground", className)}
    {...props}
  />
))
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbSeparator = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    role="presentation"
    className={cn("select-none text-muted-foreground", className)}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
  </span>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator
}
