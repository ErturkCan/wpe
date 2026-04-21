import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Calendar, Users, ClipboardList, Plus } from "lucide-react"

export const dynamic = 'force-dynamic'

export const metadata = { title: "Admin — Genel Bakış" }

export default async function AdminPage() {
  const [totalEvents, totalUsers, totalRegistrations, upcomingEvents] = await Promise.all([
    prisma.event.count(),
    prisma.user.count(),
    prisma.registration.count({ where: { status: "CONFIRMED" } }),
    prisma.event.count({ where: { status: "PUBLISHED", startDate: { gte: new Date() } } }),
  ])

  const recentEvents = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { _count: { select: { registrations: true } } },
  })

  const stats = [
    { label: "Toplam Etkinlik", value: totalEvents, icon: Calendar, href: "/admin/events" },
    { label: "Yaklaşan Etkinlikler", value: upcomingEvents, icon: Calendar, href: "/admin/events" },
    { label: "Kayıtlı Kullanıcılar", value: totalUsers, icon: Users, href: "/admin/users" },
    { label: "Onaylı Kayıtlar", value: totalRegistrations, icon: ClipboardList, href: "/admin/registrations" },
  ]

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Admin Genel Bakış</h1>
          <p className="mt-1 text-sm text-text-secondary">Etkinliklerinizi ve platformu yönetin.</p>
        </div>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-hover"
        >
          <Plus className="h-4 w-4" />
          Yeni Etkinlik
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-xl border border-border bg-surface p-4 transition-shadow hover:shadow-card-hover"
          >
            <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
            <p className="mt-0.5 text-sm text-text-secondary">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent events */}
      <div className="mt-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-text-muted">
          Son Etkinlikler
        </h2>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Başlık</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Durum</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Kayıtlar</th>
                <th className="px-4 py-3 text-right font-medium text-text-secondary">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {recentEvents.map((event) => (
                <tr key={event.id} className="border-b border-border last:border-0 hover:bg-surface">
                  <td className="px-4 py-3 font-medium text-text-primary">{event.title}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      event.status === "PUBLISHED"
                        ? "bg-success/10 text-success"
                        : event.status === "DRAFT"
                        ? "bg-surface text-text-muted"
                        : "bg-error/10 text-error"
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{event._count.registrations}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/events/${event.id}/edit`}
                      className="text-accent hover:text-accent-hover"
                    >
                      Düzenle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
