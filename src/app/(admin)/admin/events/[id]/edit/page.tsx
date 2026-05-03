import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { EventForm } from "@/components/admin/EventForm"
import { DeleteEventButton } from "@/components/admin/DeleteEventButton"

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata = { title: "Admin — Etkinlik Düzenle" }

export default async function EditEventPage({ params }: Props) {
  const { id } = await params
  const event = await prisma.event.findUnique({
    where: { id },
    include: { speakers: { orderBy: { order: "asc" } } },
  })
  if (!event) notFound()

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">Etkinliği Düzenle</h1>
        <DeleteEventButton eventId={event.id} eventTitle={event.title} variant="button" />
      </div>
      <EventForm event={event} />
    </div>
  )
}
