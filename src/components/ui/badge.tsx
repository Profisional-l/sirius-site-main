import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 rounded-full",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 rounded-full",
        outline: "text-foreground rounded-full",
        // The container is now just for layout, no appearance
        blue: "relative group p-0 border-transparent justify-center items-center",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, children, ...props }: BadgeProps) {
  if (variant === "blue") {
    return (
      <div className={cn(badgeVariants({ variant }), className)} {...props}>
        {/* The line in the background */}
        <span 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-[250%] bg-gradient-to-r from-transparent via-[#0075EB] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out z-0"
        ></span>
        
        {/* The visible badge part with background and text, on top of the line */}
        <div className={cn("relative z-10 flex h-[55px] items-center justify-center rounded-[9px] border border-[#2B95FF] bg-[#101823] px-5 py-2.5 font-headline font-normal leading-[1.47] tracking-[-0.02em] transition-shadow duration-300 group-hover:shadow-[inset_0_0_10px_rgba(25,171,255,0.7)]", className)}>
          <span className="bg-gradient-to-r from-[#19ABFF] to-[#2B95FF] bg-clip-text text-transparent">
            {children}
          </span>
        </div>
      </div>
    )
  }

  // Default rendering for other variants
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
