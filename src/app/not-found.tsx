import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <p className="text-6xl font-bold tracking-tight text-text-primary">404</p>
      <p className="text-lg text-text-secondary">Aradığınız sayfa bulunamadı.</p>
      <Link
        href="/"
        className="mt-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  )
}
