import { prisma } from "@/lib/prisma"
import { formatEventDateShort } from "@/lib/utils"
import { PromoteUserButton } from "@/components/admin/PromoteUserButton"

export const dynamic = 'force-dynamic'

export const metadata = { title: "Admin — Users" }

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { registrations: true } } },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-text-primary">Users</h1>
      <p className="mt-1 text-sm text-text-secondary">{users.length} registered users</p>

      <div className="mt-6 overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-4 py-3 text-left font-medium text-text-secondary">User</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary hidden md:table-cell">Company</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Role</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary hidden sm:table-cell">Events</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary hidden lg:table-cell">Joined</th>
              <th className="px-4 py-3 text-right font-medium text-text-secondary">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border last:border-0 hover:bg-surface">
                <td className="px-4 py-3">
                  <p className="font-medium text-text-primary">{user.name ?? "—"}</p>
                  <p className="text-xs text-text-secondary">{user.email}</p>
                </td>
                <td className="px-4 py-3 text-text-secondary hidden md:table-cell">
                  {user.company ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    user.role === "ADMIN"
                      ? "bg-accent-light text-accent"
                      : "bg-surface text-text-muted border border-border"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-text-secondary hidden sm:table-cell">
                  {user._count.registrations}
                </td>
                <td className="px-4 py-3 text-text-secondary hidden lg:table-cell">
                  {formatEventDateShort(user.createdAt)}
                </td>
                <td className="px-4 py-3 text-right">
                  {user.role !== "ADMIN" && (
                    <PromoteUserButton userId={user.id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
