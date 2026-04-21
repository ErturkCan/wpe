import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Calendar, MapPin, CheckCircle, Clock, X } from "lucide-react"
import { formatEventDate, formatEventTime } from "@/lib/utils"
import { CancelRegistrationButton } from "@/components/registration/CancelRegistrationButton"
import { EmptyState } from "@/components/common/EmptyState"

export const dynamic = 'force-dynamic'

export const metadata = { title: "Etkinliklerim" }

export default async function RegistrationsPage() {
  const session = await auth()
  if (!session?.user?.id) return null

  const registrations = await prisma.registration.findMany({
    where: { userId: session.user.id },
    include: {
      event: { include: { _count: { select: { registrations: true } } } },
    },
    orderBy: { event: { startDate: "asc" } },
  })

  const upcoming = registrations.filter(
    (r) => r.status === "CONFIRMED" && new Date(r.event.startDate) >= new Date()
  )
  const past = registrations.filter(
    (r) => r.status === "CONFIRMED" && new Date(r.event.startDate) < new Date()
  )

  const statusIcon = {
    CONFIRMED: <CheckCircle className="h-4 w-4 text-success" />,
    WAITLISTED: <Clock className="h-4 w-4 text-amber-500" />,
    CANCELLED: <X className="h-4 w-4 text-error" />,
  }

  const RegistrationRow = ({
    reg,
    showCancel,
  }: {
    reg: (typeof registrations)[0]
    showCancel?: boolean
  }) => (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-background p-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {statusIcon[reg.status]}
          <span className="text-xs font-medium capitalize text-text-secondary">{reg.status.toLowerCase()}</span>
          <span className="rounded-full bg-accent-light px-2 py-0.5 text-xs text-accent">
            {reg.event.category}
          </span>
        </div>
        <Link
          href={`/events/${reg.event.slug}`}
          className="mt-1.5 block text-base font-semibold text-text-primary hover:text-accent"
        >
          {reg.event.title}
        </Link>
        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
          <span className="flex items-center gap-1 text-xs text-text-secondary">
            <Calendar className="h-3 w-3" />
            {formatEventDate(reg.event.startDate)} · {formatEventTime(reg.event.startDate)}
          </span>
          {reg.event.city && (
            <span className="flex items-center gap-1 text-xs text-text-secondary">
              <MapPin className="h-3 w-3" />
              {reg.event.city}
            </span>
          )}
        </div>
        <p className="mt-1.5 font-mono text-xs text-text-muted">
          Bilet Ref: {reg.ticketRef}
        </p>
      </div>
      {showCancel && reg.status === "CONFIRMED" && (
        <CancelRegistrationButton registrationId={reg.id} />
      )}
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-text-primary">Etkinliklerim</h1>

      {upcoming.length === 0 && past.length === 0 ? (
        <EmptyState
          icon={<Calendar className="h-6 w-6" />}
          title="Henüz kayıt yok"
          description="Yaklaşan etkinliklere göz atın ve burada görmek için kayıt olun."
          action={
            <Link
              href="/events"
              className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover"
            >
              Etkinlikleri Keşfet
            </Link>
          }
          className="mt-8"
        />
      ) : (
        <div className="mt-6 space-y-8">
          {upcoming.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-text-muted">
                Yaklaşan ({upcoming.length})
              </h2>
              <div className="space-y-3">
                {upcoming.map((reg) => (
                  <RegistrationRow key={reg.id} reg={reg} showCancel />
                ))}
              </div>
            </div>
          )}

          {past.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-text-muted">
                Geçmiş Etkinlikler ({past.length})
              </h2>
              <div className="space-y-3 opacity-60">
                {past.map((reg) => (
                  <RegistrationRow key={reg.id} reg={reg} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
