"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <p className="text-2xl font-bold tracking-tight text-text-primary">Bir hata oluştu</p>
      <p className="text-sm text-text-secondary">Beklenmedik bir sorunla karşılaşıldı.</p>
      <button
        onClick={reset}
        className="mt-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover"
      >
        Tekrar Dene
      </button>
    </div>
  )
}
