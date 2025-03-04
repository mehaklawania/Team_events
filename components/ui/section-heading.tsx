import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  description?: string
  className?: string
  descriptionClassName?: string
  centered?: boolean
  gradient?: boolean
}

export function SectionHeading({
  title,
  description,
  className,
  descriptionClassName,
  centered = false,
  gradient = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-2", centered && "text-center", className)}>
      <h2 className={cn("text-3xl font-bold tracking-tight", gradient && "gradient-heading")}>{title}</h2>
      {description && <p className={cn("text-muted-foreground", descriptionClassName)}>{description}</p>}
    </div>
  )
}

