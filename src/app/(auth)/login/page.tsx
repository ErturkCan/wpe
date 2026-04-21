import { Suspense } from "react"
import { LoginForm } from "./LoginForm"

export const metadata = { title: "Sign In" }

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-surface" />}>
      <LoginForm />
    </Suspense>
  )
}
