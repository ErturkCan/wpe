import { prisma } from "@/lib/prisma"
import { formatEventDateShort } from "@/lib/utils"

export const dynamic = 'force-dynamic'

export const metadata = { title: "Admin — Kayıtlar" }

export default async function AdminRegistrationsPage() {
  const registrations = await prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      user: true,
      event: true,
    },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-text-primary">Kayıtlar</h1>
      <p className="mt-1 text-sm text-text-secondary">
        {registrations.length} toplam kayıt
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Attendee</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary hidden md:table-cell">Event</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary hidden sm:table-cell">Date</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Status</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary hidden lg:table-cell">Ref</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id} className="border-b border-border last:border-0 hover:bg-surface">
                <td className="px-4 py-3">
                  <p className="font-medium text-text-primary">{reg.user.name ?? "—"}</p>
                  <p className="text-xs text-text-secondary">{reg.user.email}</p>
                </td>
                <td className="px-4 py-3 text-text-secondary hidden md:table-cell">
                  <span className="line-clamp-1">{reg.event.title}</span>
                </td>
                <td className="px-4 py-3 text-text-secondary hidden sm:table-cell">
                  {formatEventDateShort(reg.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    reg.status === "CONFIRMED"
                      ? "bg-success/10 text-success"
                      : reg.status === "WAITLISTED"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-error/10 text-error"
                  }`}>
                    {reg.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-text-muted hidden lg:table-cell">
                  {reg.ticketRef.slice(0, 12)}…
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {registrations.length === 0 && (
          <div className="py-12 text-center text-sm text-text-muted">No registrations yet.</div>
        )}
      </div>
    </div>
  )
}
