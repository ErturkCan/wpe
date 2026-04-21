import { formatEventTime } from "@/lib/utils"
import { cn } from "@/lib/utils"
import type { AgendaItem, Speaker } from "@prisma/client"

type AgendaItemWithSpeaker = AgendaItem & { speaker: Speaker | null }

interface AgendaTimelineProps {
  items: AgendaItemWithSpeaker[]
}

const typeColors: Record<string, string> = {
  keynote: "bg-accent-light text-accent",
  panel: "bg-blue-50 text-blue-700",
  workshop: "bg-purple-50 text-purple-700",
  networking: "bg-green-50 text-green-700",
  break: "bg-surface text-text-muted",
}

export function AgendaTimeline({ items }: AgendaTimelineProps) {
  if (items.length === 0) return null

  const sorted = [...items].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())

  return (
    <div className="space-y-0">
      {sorted.map((item, i) => (
        <div key={item.id} className="flex gap-4">
          {/* Time column */}
          <div className="flex w-20 shrink-0 flex-col items-end pt-4">
            <span className="text-xs font-medium text-text-secondary">
              {formatEventTime(item.startTime)}
            </span>
          </div>

          {/* Timeline line + dot */}
          <div className="flex flex-col items-center">
            <div className="mt-5 h-2 w-2 shrink-0 rounded-full bg-accent" />
            {i < sorted.length - 1 && <div className="w-px flex-1 bg-border" />}
          </div>

          {/* Content */}
          <div className={cn("flex-1 pb-6", i === 0 && "pt-2")}>
            <div className="flex flex-wrap items-start gap-2">
              <h4 className="text-sm font-semibold text-text-primary">{item.title}</h4>
              <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium capitalize", typeColors[item.type] ?? "bg-surface text-text-muted")}>
                {item.type}
              </span>
            </div>
            {item.description && (
              <p className="mt-1 text-sm text-text-secondary">{item.description}</p>
            )}
            {item.speaker && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                  {item.speaker.name[0]}
                </div>
                <span className="text-xs text-text-secondary">
                  {item.speaker.name}, {item.speaker.title} · {item.speaker.company}
                </span>
              </div>
            )}
            <p className="mt-1 text-xs text-text-muted">
              {formatEventTime(item.startTime)} – {formatEventTime(item.endTime)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
