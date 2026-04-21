"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { motion } from "framer-motion"
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, User, Shield } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { EWPLogo } from "@/components/layout/EWPLogo"

const navLinks = [
  { href: "/events", label: "Programlar" },
  { href: "/about", label: "Hakkımızda" },
]

export function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const isAdmin = session?.user?.role === "ADMIN"

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/98 backdrop-blur-md" style={{ boxShadow: "0 1px 0 0 rgb(15 30 60 / 0.08)" }}>
      <div className="container-wide">
        <div className="flex h-18 items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <EWPLogo size="sm" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors duration-150",
                  pathname === link.href
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop auth */}
          <div className="hidden items-center gap-3 md:flex">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-xs font-bold text-background">
                    {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                  </div>
                  <span className="max-w-[120px] truncate">{session.user?.name ?? session.user?.email}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full z-50 mt-1 w-52 overflow-hidden rounded-xl border border-border bg-background shadow-modal">
                      <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary transition-colors hover:bg-surface hover:text-text-primary" onClick={() => setUserMenuOpen(false)}>
                        <LayoutDashboard className="h-4 w-4" /> Panel
                      </Link>
                      <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary transition-colors hover:bg-surface hover:text-text-primary" onClick={() => setUserMenuOpen(false)}>
                        <User className="h-4 w-4" /> Profil
                      </Link>
                      {isAdmin && (
                        <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary transition-colors hover:bg-surface hover:text-text-primary" onClick={() => setUserMenuOpen(false)}>
                          <Shield className="h-4 w-4" /> Admin Paneli
                        </Link>
                      )}
                      <div className="border-t border-border">
                        <button onClick={() => signOut({ callbackUrl: "/" })} className="flex w-full items-center gap-3 px-4 py-3 text-sm text-text-secondary transition-colors hover:bg-surface hover:text-error">
                          <LogOut className="h-4 w-4" /> Çıkış Yap
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
                  Giriş Yap
                </Link>
                <Link
                  href="/login"
                  className="rounded-lg border border-navy bg-navy px-5 py-2 text-sm font-semibold text-background transition-all hover:bg-navy-light"
                >
                  Başvur
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border bg-background md:hidden"
        >
          <div className="container-wide py-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    pathname === link.href ? "bg-surface text-text-primary" : "text-text-secondary hover:bg-surface hover:text-text-primary"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 border-t border-border pt-4">
              {session ? (
                <div className="space-y-1">
                  <Link href="/dashboard" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface" onClick={() => setMobileOpen(false)}>
                    <LayoutDashboard className="h-4 w-4" /> Panel
                  </Link>
                  {isAdmin && (
                    <Link href="/admin" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface" onClick={() => setMobileOpen(false)}>
                      <Shield className="h-4 w-4" /> Admin
                    </Link>
                  )}
                  <button onClick={() => signOut({ callbackUrl: "/" })} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-error hover:bg-surface">
                    <LogOut className="h-4 w-4" /> Çıkış Yap
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/login" className="rounded-lg px-3 py-2.5 text-center text-sm font-medium text-text-secondary hover:bg-surface" onClick={() => setMobileOpen(false)}>
                    Giriş Yap
                  </Link>
                  <Link href="/login" className="rounded-lg bg-navy px-3 py-2.5 text-center text-sm font-semibold text-background" onClick={() => setMobileOpen(false)}>
                    Başvur
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}
