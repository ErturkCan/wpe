"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Calendar, Users, ClipboardList, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/admin", label: "Genel Bakış", icon: LayoutDashboard, exact: true },
  { href: "/admin/events", label: "Etkinlikler", icon: Calendar },
  { href: "/admin/registrations", label: "Kayıtlar", icon: ClipboardList },
  { href: "/admin/users", label: "Kullanıcılar", icon: Users },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-surface">
      <div className="p-5">
        <Link href="/" className="text-lg font-bold tracking-tight text-text-primary">
          WPE
        </Link>
        <span className="mt-0.5 block text-xs font-semibold uppercase tracking-widest text-accent">
          Admin
        </span>
      </div>

      <nav className="flex-1 space-y-0.5 px-3">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-background text-text-primary shadow-card"
                  : "text-text-secondary hover:bg-background hover:text-text-primary"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-background hover:text-text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Panele Dön
        </Link>
      </div>
    </aside>
  )
}
