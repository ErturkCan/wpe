import { EventForm } from "@/components/admin/EventForm"

export const metadata = { title: "Admin — Yeni Etkinlik" }

export default function NewEventPage() {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-text-primary">Yeni Etkinlik Oluştur</h1>
      <EventForm />
    </div>
  )
}
