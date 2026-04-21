"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { eventSchema, type EventInput } from "@/lib/validations"
import { cn } from "@/lib/utils"
import type { Event, Speaker } from "@prisma/client"

interface EventFormProps {
  event?: Event & { speakers: Speaker[] }
}

const CATEGORIES = ["Teknoloji", "Finans", "Liderlik", "Pazarlama", "Sağlık", "Hukuk", "Diğer"]

export function EventForm({ event }: EventFormProps) {
  const router = useRouter()
  const isEdit = !!event

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventInput>({
    resolver: zodResolver(eventSchema),
    defaultValues: event
      ? {
          title: event.title,
          shortDescription: event.shortDescription,
          description: event.description,
          format: event.format,
          category: event.category,
          coverImage: event.coverImage ?? "",
          venueName: event.venueName ?? "",
          venueAddress: event.venueAddress ?? "",
          city: event.city ?? "",
          virtualUrl: event.virtualUrl ?? "",
          startDate: new Date(event.startDate).toISOString().slice(0, 16),
          endDate: new Date(event.endDate).toISOString().slice(0, 16),
          timezone: event.timezone,
          registrationDeadline: event.registrationDeadline
            ? new Date(event.registrationDeadline).toISOString().slice(0, 16)
            : "",
          capacity: event.capacity ?? undefined,
          waitlistEnabled: event.waitlistEnabled,
          status: event.status,
        }
      : { status: "DRAFT", waitlistEnabled: true, timezone: "America/New_York" },
  })

  const [error, setError] = useState("")

  const onSubmit = async (data: EventInput) => {
    setError("")
    const url = isEdit ? `/api/events/${event!.id}` : "/api/events"
    const method = isEdit ? "PATCH" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      router.push("/admin/events")
      router.refresh()
    } else {
      const body = await res.json()
      setError(body.error ?? "Bir şeyler ters gitti")
    }
  }

  const field = (
    name: keyof EventInput,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> & { as?: "textarea" | "select" } = {}
  ) => {
    const { as, ...inputProps } = props
    const baseClass =
      "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/10"

    return (
      <div>
        <label className="block text-sm font-medium text-text-primary">{label}</label>
        {as === "textarea" ? (
          <textarea
            {...register(name as never)}
            rows={4}
            placeholder={(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>).placeholder}
            className={cn(baseClass, "resize-y")}
          />
        ) : (
          <input
            {...register(name as never)}
            {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
            className={baseClass}
          />
        )}
        {errors[name] && (
          <p className="mt-1 text-xs text-error">{(errors[name] as { message?: string })?.message}</p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basics */}
      <section className="rounded-xl border border-border p-6 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-text-muted">Temel Bilgiler</h3>
        {field("title", "Başlık *", { placeholder: "Kurumsal Yapay Zekanın Geleceği" })}
        {field("shortDescription", "Kısa Açıklama * (maks. 300 karakter)", {
          placeholder: "Etkinlik kartlarında gösterilecek tek paragraflık tanıtım...",
          as: "textarea",
        })}
        {field("description", "Tam Açıklama *", { as: "textarea", placeholder: "Detaylı etkinlik açıklaması..." })}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary">Kategori *</label>
            <select
              {...register("category")}
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/10"
            >
              <option value="">Seçin…</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary">Format *</label>
            <select
              {...register("format")}
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/10"
            >
              <option value="">Seçin…</option>
              <option value="IN_PERSON">Yüz Yüze</option>
              <option value="VIRTUAL">Online</option>
              <option value="HYBRID">Hibrit</option>
            </select>
          </div>
        </div>

        {field("coverImage", "Kapak Görseli URL", { type: "url", placeholder: "https://..." })}
      </section>

      {/* Location */}
      <section className="rounded-xl border border-border p-6 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-text-muted">Konum</h3>
        <div className="grid grid-cols-2 gap-4">
          {field("venueName", "Mekan Adı", { placeholder: "The Standard, High Line" })}
          {field("city", "Şehir", { placeholder: "İstanbul" })}
        </div>
        {field("venueAddress", "Mekan Adresi", { placeholder: "Levent Mah. Büyükdere Cad. No:1" })}
        {field("virtualUrl", "Online Bağlantı (Zoom, Meet…)", { type: "url", placeholder: "https://zoom.us/j/..." })}
      </section>

      {/* Timing */}
      <section className="rounded-xl border border-border p-6 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-text-muted">Zamanlama</h3>
        <div className="grid grid-cols-2 gap-4">
          {field("startDate", "Başlangıç Tarihi ve Saati *", { type: "datetime-local" })}
          {field("endDate", "Bitiş Tarihi ve Saati *", { type: "datetime-local" })}
        </div>
        {field("registrationDeadline", "Kayıt Son Tarihi", { type: "datetime-local" })}
      </section>

      {/* Capacity */}
      <section className="rounded-xl border border-border p-6 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-text-muted">Kapasite</h3>
        {field("capacity", "Kapasite (sınırsız için boş bırakın)", { type: "number", placeholder: "200", min: 1 })}
        <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
          <input type="checkbox" {...register("waitlistEnabled")} className="rounded" />
          Dolu olduğunda bekleme listesini etkinleştir
        </label>
      </section>

      {/* Status */}
      <section className="rounded-xl border border-border p-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-text-muted">Yayın Durumu</h3>
        <div>
          <label className="block text-sm font-medium text-text-primary">Durum</label>
          <select
            {...register("status")}
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/10"
          >
            <option value="DRAFT">Taslak</option>
            <option value="PUBLISHED">Yayında</option>
            <option value="CANCELLED">İptal Edildi</option>
            <option value="COMPLETED">Tamamlandı</option>
          </select>
        </div>
      </section>

      {error && (
        <p className="rounded-xl bg-error/10 px-4 py-3 text-sm text-error">{error}</p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-hover disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEdit ? "Kaydet" : "Etkinlik Oluştur"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-border px-6 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface"
        >
          İptal
        </button>
      </div>
    </form>
  )
}
