"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, CheckCircle } from "lucide-react"
import { profileSchema, type ProfileInput } from "@/lib/validations"
import type { User } from "@prisma/client"

interface ProfileFormProps {
  user: User
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter()
  const [saved, setSaved] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name ?? "",
      company: user.company ?? "",
      jobTitle: user.jobTitle ?? "",
      linkedinUrl: user.linkedinUrl ?? "",
    },
  })

  const onSubmit = async (data: ProfileInput) => {
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      router.refresh()
    }
  }

  const fields = [
    { name: "name" as const, label: "Ad Soyad", placeholder: "Ayşe Yılmaz", required: true },
    { name: "company" as const, label: "Şirket", placeholder: "Örnek A.Ş." },
    { name: "jobTitle" as const, label: "Unvan", placeholder: "Ürün Direktörü" },
    { name: "linkedinUrl" as const, label: "LinkedIn URL", placeholder: "https://linkedin.com/in/..." },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email (read only) */}
      <div>
        <label className="block text-sm font-medium text-text-primary">E-posta</label>
        <input
          value={user.email ?? ""}
          disabled
          className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-muted"
        />
        <p className="mt-1 text-xs text-text-muted">E-posta adresi değiştirilemez.</p>
      </div>

      {fields.map(({ name, label, placeholder, required }) => (
        <div key={name}>
          <label className="block text-sm font-medium text-text-primary">
            {label} {required && <span className="text-error">*</span>}
          </label>
          <input
            {...register(name)}
            placeholder={placeholder}
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/10"
          />
          {errors[name] && (
            <p className="mt-1 text-xs text-error">{errors[name]?.message}</p>
          )}
        </div>
      ))}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-xl bg-text-primary px-6 py-2.5 text-sm font-semibold text-background transition-all hover:opacity-80 disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Kaydet
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-success">
            <CheckCircle className="h-4 w-4" />
            Kaydedildi!
          </span>
        )}
      </div>
    </form>
  )
}
