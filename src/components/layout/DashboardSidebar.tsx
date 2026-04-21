"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Calendar, User, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import { EWPLogo } from "@/components/layout/EWPLogo"

const links = [
  { href: "/dashboard", label: "Genel Bakış", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/registrations", label: "Etkinliklerim", icon: Calendar },
  { href: "/dashboard/profile", label: "Profil", icon: User },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-surface">
      <div className="p-5">
        <Link href="/"><EWPLogo size="sm" /></Link>
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
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-background hover:text-error"
        >
          <LogOut className="h-4 w-4" />
          Çıkış Yap
        </button>
      </div>
    </aside>
  )
}
