import { Users } from "lucide-react"
import { getCapacityLabel, getCapacityPercent, cn } from "@/lib/utils"

interface CapacityBadgeProps {
  registered: number
  capacity: number | null
  className?: string
}

export function CapacityBadge({ registered, capacity, className }: CapacityBadgeProps) {
  const label = getCapacityLabel(registered, capacity)
  const percent = getCapacityPercent(registered, capacity)
  const isFull = capacity !== null && registered >= capacity
  const isAlmostFull = capacity !== null && percent >= 80 && !isFull

  if (!label) {
    return (
      <div className={cn("flex items-center gap-1.5 text-sm text-text-secondary", className)}>
        <Users className="h-4 w-4" />
        <span>{registered} kayıtlı</span>
      </div>
    )
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 text-text-secondary">
          <Users className="h-4 w-4" />
          <span>
            {registered} / {capacity}
          </span>
        </span>
        <span
          className={cn(
            "font-medium",
            isFull ? "text-error" : isAlmostFull ? "text-amber-600" : "text-text-secondary"
          )}
        >
          {label}
        </span>
      </div>
      {capacity && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              isFull ? "bg-error" : isAlmostFull ? "bg-amber-500" : "bg-accent"
            )}
            style={{ width: `${percent}%` }}
          />
        </div>
      )}
    </div>
  )
}
