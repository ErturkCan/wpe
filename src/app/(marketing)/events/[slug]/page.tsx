import { notFound } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SpeakerCard } from "@/components/events/SpeakerCard"
import { AgendaTimeline } from "@/components/events/AgendaTimeline"
import { CapacityBadge } from "@/components/events/CapacityBadge"
import { RegisterButton } from "@/components/registration/RegisterButton"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { formatEventDate, formatTimeRange, formatEventFormat } from "@/lib/utils"
import { Calendar, Clock, MapPin, Monitor, Globe, Share2 } from "lucide-react"

interface EventPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: EventPageProps) {
  const { slug } = await params
  const event = await prisma.event.findUnique({ where: { slug } })
  if (!event) return {}
  return {
    title: event.title,
    description: event.shortDescription,
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params

  const [event, session] = await Promise.all([
    prisma.event.findUnique({
      where: { slug, status: "PUBLISHED" },
      include: {
        speakers: { orderBy: { order: "asc" } },
        agenda: { include: { speaker: true }, orderBy: { order: "asc" } },
        _count: { select: { registrations: true } },
      },
    }),
    auth(),
  ])

  if (!event) notFound()

  const isRegistered = session?.user?.id
    ? (await prisma.registration.findUnique({
        where: { userId_eventId: { userId: session.user.id, eventId: event.id } },
      })) !== null
    : false

  const registered = event._count.registrations
  const isFull = event.capacity !== null && registered >= event.capacity
  const isDeadlinePassed = event.registrationDeadline
    ? new Date() > new Date(event.registrationDeadline)
    : false

  const FormatIcon =
    event.format === "VIRTUAL" ? Monitor : event.format === "HYBRID" ? Globe : MapPin

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <div className="relative border-b border-border">
          {event.coverImage && (
            <div className="relative h-64 overflow-hidden md:h-80">
              <Image
                src={event.coverImage}
                alt={event.title}
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>
          )}
          <div className="container-wide py-10 md:py-14">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
                {event.category}
              </span>
              <span className="flex items-center gap-1.5 text-text-secondary">
                <FormatIcon className="h-3.5 w-3.5" />
                {formatEventFormat(event.format)}
              </span>
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
              {event.title}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-text-secondary">{event.shortDescription}</p>

            {/* Event meta */}
            <div className="mt-6 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Calendar className="h-4 w-4 text-accent" />
                {formatEventDate(event.startDate)}
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Clock className="h-4 w-4 text-accent" />
                {formatTimeRange(event.startDate, event.endDate)}
              </div>
              {event.city && (
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <MapPin className="h-4 w-4 text-accent" />
                  {event.venueName ? `${event.venueName}, ${event.city}` : event.city}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container-wide py-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <section>
                <h2 className="text-xl font-bold text-text-primary">Bu etkinlik hakkında</h2>
                <div className="mt-4 whitespace-pre-line text-base leading-relaxed text-text-secondary">
                  {event.description}
                </div>
              </section>

              {/* Speakers */}
              {event.speakers.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-text-primary">Konuşmacılar</h2>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {event.speakers.map((speaker) => (
                      <SpeakerCard key={speaker.id} speaker={speaker} />
                    ))}
                  </div>
                </section>
              )}

              {/* Agenda */}
              {event.agenda.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-text-primary">Program</h2>
                  <div className="mt-6">
                    <AgendaTimeline items={event.agenda} />
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h3 className="font-semibold text-text-primary">Kayıt</h3>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-text-muted" />
                      <span className="text-text-secondary">{formatEventDate(event.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-text-muted" />
                      <span className="text-text-secondary">
                        {formatTimeRange(event.startDate, event.endDate)}
                      </span>
                    </div>
                    {event.city && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-text-muted" />
                        <span className="text-text-secondary">{event.city}</span>
                      </div>
                    )}
                  </div>

                  {event.capacity !== null && (
                    <div className="mt-4 border-t border-border pt-4">
                      <CapacityBadge
                        registered={registered}
                        capacity={event.capacity}
                      />
                    </div>
                  )}

                  <div className="mt-5">
                    <RegisterButton
                      eventId={event.id}
                      eventSlug={event.slug}
                      isRegistered={isRegistered}
                      isFull={isFull}
                      isDeadlinePassed={isDeadlinePassed}
                    />
                  </div>

                  {event.registrationDeadline && !isDeadlinePassed && (
                    <p className="mt-3 text-center text-xs text-text-muted">
                      Kayıt son tarihi:{" "}
                      {formatEventDate(event.registrationDeadline)}
                    </p>
                  )}
                </div>

                {/* Share */}
                <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface">
                  <Share2 className="h-4 w-4" />
                  Etkinliği Paylaş
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
