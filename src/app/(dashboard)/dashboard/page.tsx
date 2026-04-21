import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Calendar, ArrowRight, CheckCircle } from "lucide-react"
import { formatEventDate, formatEventTime } from "@/lib/utils"

export const dynamic = 'force-dynamic'

export const metadata = { title: "Panel" }

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) return null

  const registrations = await prisma.registration.findMany({
    where: { userId: session.user.id, status: "CONFIRMED" },
    include: {
      event: {
        include: { speakers: true, _count: { select: { registrations: true } } },
      },
    },
    orderBy: { event: { startDate: "asc" } },
  })

  const upcomingRegistrations = registrations.filter(
    (r) => new Date(r.event.startDate) >= new Date()
  )
  const pastRegistrations = registrations.filter(
    (r) => new Date(r.event.startDate) < new Date()
  )
  const nextEvent = upcomingRegistrations[0]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          Tekrar hoş geldiniz{session.user.name ? `, ${session.user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          {upcomingRegistrations.length} yaklaşan etkinliğiniz var.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {[
          { label: "Yaklaşan Etkinlikler", value: upcomingRegistrations.length },
          { label: "Katılınan Etkinlikler", value: pastRegistrations.length },
          { label: "Toplam Kayıt", value: registrations.length },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-surface p-4">
            <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
            <p className="mt-0.5 text-sm text-text-secondary">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Next event */}
      {nextEvent && (
        <div className="mt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-text-muted">
            Sonraki Etkinlik
          </h2>
          <Link
            href={`/events/${nextEvent.event.slug}`}
            className="group block rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-card-hover"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-xs font-medium text-success">Kayıtlı</span>
                </div>
                <h3 className="mt-1.5 text-lg font-semibold text-text-primary group-hover:text-accent">
                  {nextEvent.event.title}
                </h3>
                <div className="mt-2 flex items-center gap-2 text-sm text-text-secondary">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatEventDate(nextEvent.event.startDate)} · {formatEventTime(nextEvent.event.startDate)}
                </div>
              </div>
              <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-text-muted opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <div className="mt-3 border-t border-border pt-3">
              <p className="text-xs font-mono text-text-muted">
                Bilet: {nextEvent.ticketRef}
              </p>
            </div>
          </Link>
        </div>
      )}

      {/* Quick links */}
      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-text-muted">
          Hızlı İşlemler
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            href="/events"
            className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-shadow hover:shadow-card-hover"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-light">
              <Calendar className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Etkinlikleri Keşfet</p>
              <p className="text-xs text-text-secondary">Yaklaşan etkinlikleri inceleyin</p>
            </div>
          </Link>
          <Link
            href="/dashboard/registrations"
            className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-shadow hover:shadow-card-hover"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-light">
              <CheckCircle className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Kayıtlarım</p>
              <p className="text-xs text-text-secondary">Tüm etkinliklerinizi görüntüleyin</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
