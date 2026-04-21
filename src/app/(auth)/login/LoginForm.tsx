"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Mail, ArrowRight, Loader2 } from "lucide-react"

export function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard"
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState<"email" | "google" | null>(null)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading("email")
    setError("")
    try {
      const result = await signIn("resend", { email, callbackUrl, redirect: false })
      if (result?.error) {
        setError("Bir hata oluştu. Lütfen tekrar deneyin.")
      } else {
        setSent(true)
      }
    } catch {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setLoading(null)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading("google")
    await signIn("google", { callbackUrl })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold tracking-tight text-text-primary">
            WPE
          </Link>
          <p className="mt-2 text-sm text-text-secondary">
            {sent ? "E-postanı Kontrol Et" : "Hesabına giriş yap"}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-background p-8 shadow-card">
          {sent ? (
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-light">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-text-primary">Gelen kutunu kontrol et</h2>
              <p className="mt-2 text-sm text-text-secondary">
                <strong>{email}</strong> adresine bir giriş linki gönderdik. Giriş yapmak için tıklayın.
              </p>
              <button
                onClick={() => { setSent(false); setEmail("") }}
                className="mt-6 text-sm text-accent hover:text-accent-hover"
              >
                Farklı bir e-posta kullan
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={handleGoogleSignIn}
                disabled={loading !== null}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-border py-3 text-sm font-medium text-text-primary transition-colors hover:bg-surface disabled:opacity-50"
              >
                {loading === "google" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                )}
                Google ile Devam Et
              </button>

              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-text-muted">or</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <form onSubmit={handleEmailSignIn} className="space-y-3">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary">
                    E-posta adresi
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
                {error && <p className="text-sm text-error">{error}</p>}
                <button
                  type="submit"
                  disabled={loading !== null}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-text-primary py-3 text-sm font-semibold text-background transition-all hover:opacity-80 disabled:opacity-50"
                >
                  {loading === "email" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>E-posta ile Devam Et <ArrowRight className="h-4 w-4" /></>
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-text-muted">
          Giriş yaparak{" "}
          <Link href="#" className="text-text-secondary hover:text-text-primary">Kullanım Şartlarını</Link>
          {" "}ve{" "}
          <Link href="#" className="text-text-secondary hover:text-text-primary">Gizlilik Politikasını</Link> kabul etmiş olursunuz.
        </p>
      </div>
    </div>
  )
}
