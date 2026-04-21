import { Suspense } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { EventGrid } from "@/components/events/EventGrid"
import { EventFilters } from "@/components/events/EventFilters"
import { prisma } from "@/lib/prisma"
import type { EventFormat } from "@prisma/client"

export const revalidate = 3600

interface EventsPageProps {
  searchParams: Promise<{
    category?: string
    format?: string
    page?: string
  }>
}

export const metadata = {
  title: "Yaklaşan Etkinlikler",
  description: "EWP iş dünyası networking etkinliklerini keşfedin ve kayıt olun.",
}

async function EventsContent({ searchParams }: EventsPageProps) {
  const params = await searchParams
  const page = Math.max(1, Number(params.page ?? 1))
  const perPage = 9

  const where = {
    status: "PUBLISHED" as const,
    startDate: { gte: new Date() },
    ...(params.category ? { category: params.category } : {}),
    ...(params.format ? { format: params.format as EventFormat } : {}),
  }

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,
      orderBy: { startDate: "asc" },
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        speakers: { orderBy: { order: "asc" } },
        _count: { select: { registrations: true } },
      },
    }),
    prisma.event.count({ where }),
  ])

  return <EventGrid events={events} total={total} page={page} perPage={perPage} />
}

export default function EventsPage(props: EventsPageProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="border-b border-border bg-surface">
          <div className="container-wide py-14 md:py-20">
            <h1 className="text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
              Yaklaşan Etkinlikler
            </h1>
            <p className="mt-3 text-lg text-text-secondary">
              Sektörünüzü şekillendiren insanlarla bağlantı kurun.
            </p>
          </div>
        </div>

        <div className="container-wide py-10">
          <Suspense fallback={null}>
            <EventFilters />
          </Suspense>
          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-80 animate-pulse rounded-2xl bg-surface" />
                ))}
              </div>
            }
          >
            <EventsContent searchParams={props.searchParams} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
