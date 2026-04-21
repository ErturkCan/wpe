import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/layout/AdminSidebar"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect("/login")
  if ((session.user as { role?: string }).role !== "ADMIN") redirect("/dashboard")

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-5xl px-6 py-10">{children}</div>
      </main>
    </div>
  )
}
