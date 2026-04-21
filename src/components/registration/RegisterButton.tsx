"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface RegisterButtonProps {
  eventId: string
  eventSlug: string
  isRegistered: boolean
  isFull: boolean
  isDeadlinePassed: boolean
  className?: string
}

export function RegisterButton({
  eventId,
  eventSlug,
  isRegistered,
  isFull,
  isDeadlinePassed,
  className,
}: RegisterButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [registered, setRegistered] = useState(isRegistered)
  const [error, setError] = useState("")

  const handleRegister = async () => {
    if (!session) {
      router.push(`/login?callbackUrl=/events/${eventSlug}`)
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? "Registration failed")
      }

      setRegistered(true)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (registered) {
    return (
      <div className={cn("rounded-xl border border-success/20 bg-success/5 p-4 text-center", className)}>
        <div className="flex items-center justify-center gap-2 text-success">
          <CheckCircle className="h-5 w-5" />
          <span className="font-semibold">Kaydınız alındı!</span>
        </div>
        <p className="mt-1 text-sm text-text-secondary">Onay detayları için e-postanızı kontrol edin.</p>
      </div>
    )
  }

  const disabled = isFull || isDeadlinePassed || loading

  return (
    <div className={cn("space-y-2", className)}>
      <button
        onClick={handleRegister}
        disabled={disabled}
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold transition-all",
          disabled
            ? "cursor-not-allowed bg-border text-text-muted"
            : "bg-accent text-white hover:bg-accent-hover hover:shadow-card-hover"
        )}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Yeriniz rezerve ediliyor...
          </>
        ) : isFull ? (
          "Etkinlik Dolu"
        ) : isDeadlinePassed ? (
          "Kayıt Kapalı"
        ) : (
          <>
            Hemen Kayıt Ol
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      {error && <p className="text-center text-sm text-error">{error}</p>}
      {!session && !disabled && (
        <p className="text-center text-xs text-text-muted">Önce giriş yapmanız istenecektir.</p>
      )}
    </div>
  )
}
