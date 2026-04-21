import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { registerForEventSchema } from "@/lib/validations"
import { sendRegistrationConfirmation } from "@/lib/resend"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const isAdmin = (session.user as { role?: string }).role === "ADMIN"

  const registrations = await prisma.registration.findMany({
    where: isAdmin ? {} : { userId: session.user.id },
    include: {
      event: {
        include: {
          speakers: { orderBy: { order: "asc" } },
          _count: { select: { registrations: true } },
        },
      },
      user: isAdmin ? true : false,
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(registrations)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const parsed = registerForEventSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { eventId, notes } = parsed.data
  const userId = session.user.id

  const event = await prisma.event.findUnique({
    where: { id: eventId, status: "PUBLISHED" },
  })

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 })
  }

  if (event.registrationDeadline && new Date() > event.registrationDeadline) {
    return NextResponse.json({ error: "Registration deadline has passed" }, { status: 409 })
  }

  if (event.capacity !== null) {
    const confirmedCount = await prisma.registration.count({
      where: { eventId, status: "CONFIRMED" },
    })
    if (confirmedCount >= event.capacity && !event.waitlistEnabled) {
      return NextResponse.json({ error: "Event is full" }, { status: 409 })
    }
  }

  try {
    const registration = await prisma.registration.create({
      data: { userId, eventId, notes },
      include: { user: true },
    })

    // Fire-and-forget confirmation email
    sendRegistrationConfirmation({
      to: registration.user.email!,
      userName: registration.user.name ?? "there",
      event: {
        title: event.title,
        startDate: event.startDate,
        endDate: event.endDate,
        venueName: event.venueName ?? undefined,
        city: event.city ?? undefined,
        virtualUrl: event.virtualUrl ?? undefined,
        slug: event.slug,
      },
      ticketRef: registration.ticketRef,
    }).catch(console.error)

    return NextResponse.json(registration, { status: 201 })
  } catch (error: unknown) {
    if ((error as { code?: string })?.code === "P2002") {
      return NextResponse.json({ error: "Already registered for this event" }, { status: 409 })
    }
    console.error("POST /api/registrations:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
