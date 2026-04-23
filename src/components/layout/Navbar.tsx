"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, User, Shield } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

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
    <header
      className="sticky top-0 z-50"
      style={{ backgroundColor: "#0F1E3C", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between">

          {/* Logo wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2"
            style={{
              fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
              fontSize: "20px",
              fontWeight: 600,
              color: "#F8F5EF",
              letterSpacing: "0.05em",
            }}
          >
            <span style={{ color: "#B8960C" }}>[</span>
            EWP
            <span style={{ color: "#B8960C" }}>]</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs font-medium uppercase tracking-widest transition-colors duration-150",
                  pathname === link.href
                    ? "text-white"
                    : "text-white/50 hover:text-white"
                )}
                style={{ letterSpacing: "0.12em" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop auth */}
          <div className="hidden items-center gap-4 md:flex">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-sm font-medium transition-colors"
                  style={{ color: "rgba(248,245,239,0.6)" }}
                >
                  <div
                    className="flex h-7 w-7 items-center justify-center text-xs font-bold"
                    style={{ background: "#B8960C", color: "#0F1E3C", borderRadius: "50%" }}
                  >
                    {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                  </div>
                  <span className="max-w-[100px] truncate">{session.user?.name ?? session.user?.email}</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden"
                        style={{ background: "#162240", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px" }}
                      >
                        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm transition-colors" style={{ color: "rgba(248,245,239,0.7)" }} onClick={() => setUserMenuOpen(false)}>
                          <LayoutDashboard className="h-4 w-4" /> Panel
                        </Link>
                        <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 text-sm transition-colors" style={{ color: "rgba(248,245,239,0.7)" }} onClick={() => setUserMenuOpen(false)}>
                          <User className="h-4 w-4" /> Profil
                        </Link>
                        {isAdmin && (
                          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm transition-colors" style={{ color: "rgba(248,245,239,0.7)" }} onClick={() => setUserMenuOpen(false)}>
                            <Shield className="h-4 w-4" /> Admin
                          </Link>
                        )}
                        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                          <button onClick={() => signOut({ callbackUrl: "/" })} className="flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors" style={{ color: "rgba(248,245,239,0.5)" }}>
                            <LogOut className="h-4 w-4" /> Çıkış Yap
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs font-medium uppercase tracking-widest transition-colors"
                  style={{ color: "rgba(248,245,239,0.5)", letterSpacing: "0.12em" }}
                >
                  Giriş
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-all hover:opacity-90"
                  style={{
                    background: "#B8960C",
                    color: "#0F1E3C",
                    padding: "10px 22px",
                    borderRadius: "9999px",
                    letterSpacing: "0.1em",
                  }}
                >
                  → Başvur
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="flex h-9 w-9 items-center justify-center md:hidden"
            style={{ color: "rgba(248,245,239,0.7)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "#0F1E3C" }}
            className="md:hidden overflow-hidden"
          >
            <div className="container-wide py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "rgba(248,245,239,0.6)", letterSpacing: "0.12em" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1rem" }}>
                {session ? (
                  <button onClick={() => signOut({ callbackUrl: "/" })} className="text-xs uppercase tracking-widest" style={{ color: "rgba(248,245,239,0.5)" }}>
                    Çıkış Yap
                  </button>
                ) : (
                  <Link href="/login" className="inline-flex items-center gap-2 text-xs font-semibold uppercase" style={{ background: "#B8960C", color: "#0F1E3C", padding: "10px 22px", borderRadius: "9999px", letterSpacing: "0.1em" }} onClick={() => setMobileOpen(false)}>
                    → Başvur
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
