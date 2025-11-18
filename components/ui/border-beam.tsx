import { cn } from "@/lib/utils"

interface BorderBeamProps {
  size?: number
  duration?: number
  anchor?: number
  borderWidth?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
  className?: string
}

export function BorderBeam({
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#60a5fa",
  colorTo = "#3b82f6",
  delay = 0,
  className,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--border-width": `${borderWidth}px`,
          "--size": `${size}px`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `${delay}s`,
          "--anchor": `${anchor}%`,
          "--duration": `${duration}s`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width))_solid_transparent]",
        // mask styles
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        // pseudo styles
        "after:absolute after:aspect-square after:w-[calc(var(--size))] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor))_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)))]",
        className
      )}
    />
  )
}
