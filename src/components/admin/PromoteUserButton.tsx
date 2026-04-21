"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function PromoteUserButton({ userId }: { userId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handlePromote = async () => {
    if (!confirm("Bu kullanıcıyı Admin yapmak istediğinize emin misiniz?")) return
    setLoading(true)
    await fetch(`/api/admin/users/${userId}/promote`, { method: "POST" })
    setLoading(false)
    router.refresh()
  }

  return (
    <button
      onClick={handlePromote}
      disabled={loading}
      className="text-xs font-medium text-accent hover:text-accent-hover disabled:opacity-50"
    >
      Admin Yap
    </button>
  )
}
