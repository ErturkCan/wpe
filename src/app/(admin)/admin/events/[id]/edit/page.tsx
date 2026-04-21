import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { EventForm } from "@/components/admin/EventForm"

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata = { title: "Admin — Edit Event" }

export default async function EditEventPage({ params }: Props) {
  const { id } = await params
  const event = await prisma.event.findUnique({
    where: { id },
    include: { speakers: { orderBy: { order: "asc" } } },
  })
  if (!event) notFound()

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-text-primary">Edit Event</h1>
      <EventForm event={event} />
    </div>
  )
}
