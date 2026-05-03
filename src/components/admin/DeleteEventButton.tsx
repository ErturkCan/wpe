"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2, Loader2 } from "lucide-react"

interface Props {
  eventId: string
  eventTitle: string
  variant?: "icon" | "button"
}

export function DeleteEventButton({ eventId, eventTitle, variant = "icon" }: Props) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState("")

  const handleDelete = async () => {
    setDeleting(true)
    setError("")
    try {
      const res = await fetch(`/api/events/${eventId}`, { method: "DELETE" })
      if (res.ok) {
        router.push("/admin/events")
        router.refresh()
      } else {
        const body = await res.json()
        setError(body.error ?? "Silme işlemi başarısız")
        setConfirming(false)
      }
    } catch {
      setError("Bir hata oluştu")
      setConfirming(false)
    } finally {
      setDeleting(false)
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        {error && <span className="text-xs text-red-600">{error}</span>}
        <span className="text-xs text-text-secondary">
          &ldquo;{eventTitle.slice(0, 30)}{eventTitle.length > 30 ? "…" : ""}&rdquo; silinsin mi?
        </span>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
        >
          {deleting ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
          Evet, Sil
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={deleting}
          className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-surface"
        >
          İptal
        </button>
      </div>
    )
  }

  if (variant === "button") {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="flex items-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
        Etkinliği Sil
      </button>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-red-50 hover:text-red-600"
      title="Sil"
    >
      <Trash2 className="h-3.5 w-3.5" />
    </button>
  )
}
