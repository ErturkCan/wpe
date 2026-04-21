import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendEventReminder } from "@/lib/resend"
import { addHours } from "date-fns"

export const runtime = "nodejs"

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const now = new Date()
  const in24Hours = addHours(now, 24)
  const in25Hours = addHours(now, 25)

  const events = await prisma.event.findMany({
    where: {
      status: "PUBLISHED",
      startDate: { gte: in24Hours, lte: in25Hours },
    },
    include: {
      registrations: {
        where: { status: "CONFIRMED" },
        include: { user: true },
      },
    },
  })

  const tasks = events.flatMap((event) =>
    event.registrations
      .filter((reg) => reg.user.email)
      .map((reg) =>
        sendEventReminder({
          to: reg.user.email!,
          userName: reg.user.name ?? "there",
          event: {
            title: event.title,
            startDate: event.startDate,
            slug: event.slug,
            venueName: event.venueName ?? undefined,
            city: event.city ?? undefined,
            virtualUrl: event.virtualUrl ?? undefined,
          },
        }).catch(console.error)
      )
  )

  await Promise.all(tasks)

  return NextResponse.json({ sent: tasks.length, events: events.length })
}
