import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Pencil, Eye } from "lucide-react"
import { formatEventDateShort } from "@/lib/utils"

export const dynamic = 'force-dynamic'

export const metadata = { title: "Admin — Etkinlikler" }

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { registrations: true } } },
  })

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">Etkinlikler</h1>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-hover"
        >
          <Plus className="h-4 w-4" />
          Yeni Etkinlik
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Başlık</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary hidden md:table-cell">Tarih</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary hidden sm:table-cell">Kategori</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Durum</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary hidden sm:table-cell">Kayıt</th>
              <th className="px-4 py-3 text-right font-medium text-text-secondary">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b border-border last:border-0 hover:bg-surface">
                <td className="px-4 py-3">
                  <p className="font-medium text-text-primary">{event.title}</p>
                </td>
                <td className="px-4 py-3 text-text-secondary hidden md:table-cell">
                  {formatEventDateShort(event.startDate)}
                </td>
                <td className="px-4 py-3 text-text-secondary hidden sm:table-cell">{event.category}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    event.status === "PUBLISHED"
                      ? "bg-success/10 text-success"
                      : event.status === "DRAFT"
                      ? "bg-surface text-text-muted border border-border"
                      : event.status === "CANCELLED"
                      ? "bg-error/10 text-error"
                      : "bg-accent-light text-accent"
                  }`}>
                    {event.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-text-secondary hidden sm:table-cell">
                  {event._count.registrations}
                  {event.capacity ? ` / ${event.capacity}` : ""}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {event.status === "PUBLISHED" && (
                      <Link
                        href={`/events/${event.slug}`}
                        className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-surface hover:text-text-primary"
                        title="View"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                    )}
                    <Link
                      href={`/admin/events/${event.id}/edit`}
                      className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-surface hover:text-text-primary"
                      title="Edit"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {events.length === 0 && (
          <div className="py-12 text-center text-sm text-text-muted">
            Henüz etkinlik yok.{" "}
            <Link href="/admin/events/new" className="text-accent hover:text-accent-hover">
              İlk etkinliğinizi oluşturun.
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
