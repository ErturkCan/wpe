import Link from "next/link"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { EventCard } from "./EventCard"
import { EmptyState } from "@/components/common/EmptyState"
import type { EventWithSpeakers } from "@/types"
import { cn } from "@/lib/utils"

interface EventGridProps {
  events: EventWithSpeakers[]
  total: number
  page: number
  perPage: number
  basePath?: string
}

export function EventGrid({ events, total, page, perPage, basePath = "/events" }: EventGridProps) {
  const totalPages = Math.ceil(total / perPage)

  if (events.length === 0) {
    return (
      <EmptyState
        icon={<Calendar className="h-6 w-6" />}
        title="Etkinlik bulunamadı"
        description="Filtrelerinizi ayarlamayı deneyin veya yeni etkinlikler için daha sonra tekrar bakın."
        action={
          <Link
            href={basePath}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface"
          >
            Filtreleri temizle
          </Link>
        }
      />
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
          <p className="text-sm text-text-secondary">
            <strong>{(page - 1) * perPage + 1}–{Math.min(page * perPage, total)}</strong> / <strong>{total}</strong> etkinlik gösteriliyor
          </p>
          <div className="flex items-center gap-1">
            <PaginationLink
              href={`${basePath}?page=${page - 1}`}
              disabled={page <= 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </PaginationLink>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const pageNum = i + 1
              return (
                <PaginationLink
                  key={pageNum}
                  href={`${basePath}?page=${pageNum}`}
                  active={pageNum === page}
                >
                  {pageNum}
                </PaginationLink>
              )
            })}

            <PaginationLink
              href={`${basePath}?page=${page + 1}`}
              disabled={page >= totalPages}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </PaginationLink>
          </div>
        </div>
      )}
    </div>
  )
}

function PaginationLink({
  href,
  children,
  disabled,
  active,
  "aria-label": ariaLabel,
}: {
  href: string
  children: React.ReactNode
  disabled?: boolean
  active?: boolean
  "aria-label"?: string
}) {
  if (disabled) {
    return (
      <span
        className="flex h-8 w-8 items-center justify-center rounded-lg text-sm text-text-muted opacity-40"
        aria-label={ariaLabel}
      >
        {children}
      </span>
    )
  }
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors",
        active
          ? "bg-text-primary text-background font-semibold"
          : "text-text-secondary hover:bg-surface hover:text-text-primary"
      )}
    >
      {children}
    </Link>
  )
}
