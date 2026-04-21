"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { staggerContainer, fadeInUp } from "@/lib/motion"
import { EventCard } from "@/components/events/EventCard"
import type { EventWithSpeakers } from "@/types"

interface FeaturedEventsProps {
  events: EventWithSpeakers[]
}

export function FeaturedEvents({ events }: FeaturedEventsProps) {
  if (events.length === 0) return null

  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <div className="flex items-end justify-between">
            <div>
              <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-accent">
                Yaklaşan
              </motion.p>
              <motion.h2 variants={fadeInUp} className="mt-2 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                Öne Çıkan Etkinlikler
              </motion.h2>
            </div>
            <motion.div variants={fadeInUp}>
              <Link
                href="/events"
                className="hidden items-center gap-1 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary sm:flex"
              >
                Tüm etkinlikler <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            variants={staggerContainer}
            className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {events.map((event) => (
              <motion.div key={event.id} variants={fadeInUp}>
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8 flex justify-center sm:hidden">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover"
            >
              Tüm etkinlikler <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
