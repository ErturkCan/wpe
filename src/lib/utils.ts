import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNow } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEventDate(date: Date | string) {
  return format(new Date(date), "EEEE, MMMM d, yyyy")
}

export function formatEventTime(date: Date | string) {
  return format(new Date(date), "h:mm a")
}

export function formatEventDateShort(date: Date | string) {
  return format(new Date(date), "MMM d, yyyy")
}

export function formatTimeRange(start: Date | string, end: Date | string) {
  return `${formatEventTime(start)} – ${formatEventTime(end)}`
}

export function formatRelativeDate(date: Date | string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function getCapacityLabel(registered: number, capacity: number | null) {
  if (!capacity) return null
  const remaining = capacity - registered
  if (remaining <= 0) return "Sold out"
  if (remaining <= 5) return `${remaining} spots left`
  return `${registered} / ${capacity} registered`
}

export function getCapacityPercent(registered: number, capacity: number | null) {
  if (!capacity) return 0
  return Math.min(100, Math.round((registered / capacity) * 100))
}

export function formatEventFormat(format: string) {
  const map: Record<string, string> = {
    IN_PERSON: "In Person",
    VIRTUAL: "Virtual",
    HYBRID: "Hybrid",
  }
  return map[format] ?? format
}

export function getCategoryColor(category: string) {
  const map: Record<string, string> = {
    Technology: "bg-blue-50 text-blue-700",
    Finance: "bg-green-50 text-green-700",
    Leadership: "bg-purple-50 text-purple-700",
    Marketing: "bg-orange-50 text-orange-700",
    Healthcare: "bg-red-50 text-red-700",
    Legal: "bg-gray-100 text-gray-700",
    Other: "bg-gray-50 text-gray-600",
  }
  return map[category] ?? "bg-accent-light text-accent"
}
