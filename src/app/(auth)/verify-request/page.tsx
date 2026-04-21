import Link from "next/link"
import { Mail } from "lucide-react"

export default function VerifyRequestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm text-center">
        <Link href="/" className="text-2xl font-bold tracking-tight text-text-primary">
          EWP
        </Link>

        <div className="mt-8 rounded-2xl border border-border bg-background p-8 shadow-card">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-light">
            <Mail className="h-7 w-7 text-accent" />
          </div>
          <h1 className="mt-5 text-xl font-bold text-text-primary">E-postanı Kontrol Et</h1>
          <p className="mt-3 text-sm text-text-secondary leading-relaxed">
            E-posta adresinize bir giriş linki gönderildi. Girişi tamamlamak için linke tıklayın.
          </p>
          <p className="mt-2 text-xs text-text-muted">
            E-postayı göremiyorsanız spam klasörünüzü kontrol edin.
          </p>
          <Link
            href="/login"
            className="mt-6 block text-sm font-medium text-accent hover:text-accent-hover"
          >
            ← Girişe geri dön
          </Link>
        </div>
      </div>
    </div>
  )
}
