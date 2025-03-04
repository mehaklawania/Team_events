"use client"

import type React from "react"

import { type ButtonHTMLAttributes, forwardRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  asChild?: boolean
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, variant = "default", size = "default", className, ...props }, ref) => {
    const isGradient = variant === "gradient"

    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
        {isGradient ? (
          <button
            ref={ref}
            className={cn(
              "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
              "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90",
              size === "default" && "h-10 py-2 px-4",
              size === "sm" && "h-9 px-3 rounded-md",
              size === "lg" && "h-11 px-8 rounded-md",
              size === "icon" && "h-10 w-10",
              className,
            )}
            {...props}
          >
            {children}
          </button>
        ) : (
          <Button ref={ref} variant={variant} size={size} className={className} {...props}>
            {children}
          </Button>
        )}
      </motion.div>
    )
  },
)

AnimatedButton.displayName = "AnimatedButton"

