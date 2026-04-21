"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin, Monitor, ArrowRight } from "lucide-react"
import { formatEventDateShort, formatEventTime, formatEventFormat, cn } from "@/lib/utils"
import type { EventWithSpeakers } from "@/types"

interface EventCardProps {
  event: EventWithSpeakers
  className?: string
}

const formatIcon = {
  IN_PERSON: MapPin,
  VIRTUAL: Monitor,
  HYBRID: Globe,
}

function Globe({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  )
}

export function EventCard({ event, className }: EventCardProps) {
  const FormatIcon = formatIcon[event.format] ?? MapPin
  const registered = event._count.registrations
  const isFull = event.capacity !== null && registered >= event.capacity

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Link
        href={`/events/${event.slug}`}
        className={cn(
          "group flex h-full flex-col rounded-2xl border border-border bg-background transition-shadow duration-200 hover:shadow-card-hover",
          className
        )}
      >
        {/* Cover image or placeholder */}
        <div className="relative overflow-hidden rounded-t-2xl">
          {event.coverImage ? (
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              unoptimized
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-44 w-full items-center justify-center bg-gradient-to-br from-surface to-border">
              <span className="text-4xl font-bold tracking-tight text-border">
                {event.category[0]}
              </span>
            </div>
          )}

          {/* Date badge */}
          <div className="absolute left-3 top-3 flex flex-col items-center rounded-lg bg-white/95 px-2.5 py-1.5 shadow-card backdrop-blur-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">
              {new Date(event.startDate).toLocaleString("en", { month: "short" })}
            </span>
            <span className="text-xl font-bold leading-none text-text-primary">
              {new Date(event.startDate).getDate()}
            </span>
          </div>

          {/* Status badge */}
          {isFull && (
            <div className="absolute right-3 top-3 rounded-full bg-error/10 px-2.5 py-1 text-xs font-semibold text-error">
              Tükenmiş
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          {/* Category + format */}
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-medium text-accent">
              {event.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-text-muted">
              <FormatIcon className="h-3 w-3" />
              {formatEventFormat(event.format)}
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-3 text-base font-semibold leading-snug text-text-primary transition-colors group-hover:text-accent">
            {event.title}
          </h3>

          {/* Short description */}
          <p className="mt-1.5 line-clamp-2 text-sm text-text-secondary">{event.shortDescription}</p>

          {/* Meta */}
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>
                {formatEventDateShort(event.startDate)} · {formatEventTime(event.startDate)}
              </span>
            </div>
            {event.city && (
              <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>{event.city}</span>
              </div>
            )}
          </div>

          {/* Speakers + CTA */}
          <div className="mt-auto flex items-center justify-between pt-4">
            {event.speakers.length > 0 && (
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1.5">
                  {event.speakers.slice(0, 3).map((speaker) => (
                    <div
                      key={speaker.id}
                      className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-accent text-xs font-bold text-white"
                    >
                      {speaker.name[0]}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-text-muted">
                  {event.speakers.length} konuşmacı
                </span>
              </div>
            )}

            <span className="ml-auto flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
              Kayıt Ol <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
