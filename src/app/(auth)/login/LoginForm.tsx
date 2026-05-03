"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Loader2, Eye, EyeOff } from "lucide-react"
import { EWPLogo } from "@/components/layout/EWPLogo"

export function LoginForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      if (result?.error) {
        setError("Email veya şifre hatalı.")
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4" style={{ backgroundColor: "#F8F5EF" }}>
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex justify-center">
            <EWPLogo size="md" />
          </Link>
          <p className="mt-4 text-sm" style={{ color: "#4D5F7A" }}>
            Liderlik yolculuğuna devam et
          </p>
        </div>

        <div className="rounded-sm border p-8 shadow-card" style={{ backgroundColor: "#FDFBF7", borderColor: "#D9D2C5" }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium" style={{ color: "#0F1E3C" }}>
                E-posta
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="siz@sirket.com"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/10"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium" style={{ color: "#0F1E3C" }}>
                Şifre
              </label>
              <div className="relative mt-1.5">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 pr-10 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "#0F1E3C", color: "#F8F5EF", borderRadius: "9999px", letterSpacing: "0.05em" }}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>Giriş Yap <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-text-muted">
          Giriş yaparak{" "}
          <Link href="#" className="text-text-secondary hover:text-text-primary">Kullanım Şartlarını</Link>
          {" "}ve{" "}
          <Link href="#" className="text-text-secondary hover:text-text-primary">Gizlilik Politikasını</Link>{" "}
          kabul etmiş olursunuz.
        </p>
      </div>
    </div>
  )
}
