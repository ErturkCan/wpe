"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export function CancelRegistrationButton({ registrationId }: { registrationId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const handleCancel = async () => {
    if (!confirmed) {
      setConfirmed(true)
      return
    }
    setLoading(true)
    try {
      await fetch(`/api/registrations/${registrationId}`, { method: "DELETE" })
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCancel}
      disabled={loading}
      className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-error hover:text-error disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : confirmed ? (
        "İptal Et"
      ) : (
        "İptal"
      )}
    </button>
  )
}
