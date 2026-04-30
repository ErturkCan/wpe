"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function ConfirmContent() {
  const params = useSearchParams()
  const token = params.get("token")
  const callbackUrl = params.get("callbackUrl") ?? "/dashboard"

  return (
    <div style={{ minHeight: "100vh", background: "#F8F5EF", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        background: "#fff", border: "1px solid #D9D2C5", borderRadius: "8px",
        padding: "3rem", maxWidth: "420px", width: "100%", textAlign: "center",
      }}>
        <div style={{ marginBottom: "1.5rem", fontSize: "2rem" }}>✉️</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 600, color: "#0F1E3C", marginBottom: "12px" }}>
          Girişi Onayla
        </h1>
        <p style={{ color: "#4D5F7A", fontSize: "14px", lineHeight: 1.7, marginBottom: "2rem" }}>
          EWP hesabınıza giriş yapmak için aşağıdaki butona tıklayın.
        </p>
        <form method="POST" action={`/api/auth/callback/resend`}>
          <input type="hidden" name="token" value={token ?? ""} />
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
          <button
            type="submit"
            style={{
              width: "100%", background: "#0F1E3C", color: "#F8F5EF",
              border: "none", borderRadius: "9999px", padding: "16px 32px",
              fontSize: "14px", fontWeight: 600, letterSpacing: "0.05em",
              cursor: "pointer",
            }}
          >
            → EWP'ye Giriş Yap
          </button>
        </form>
        <p style={{ color: "#8A96A8", fontSize: "12px", marginTop: "1.5rem" }}>
          Bu butonu siz tıklamadıysanız linki görmezden gelin.
        </p>
      </div>
    </div>
  )
}

export default function ConfirmPage() {
  return (
    <Suspense>
      <ConfirmContent />
    </Suspense>
  )
}
