import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { eventSchema } from "@/lib/validations"
import slugify from "slugify"
import type { EventFormat } from "@prisma/client"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category")
  const format = searchParams.get("format")
  const page = Math.max(1, Number(searchParams.get("page") ?? 1))
  const perPage = Math.min(50, Number(searchParams.get("perPage") ?? 9))
  const all = searchParams.get("all") === "true"

  try {
    const where = {
      ...(all ? {} : { status: "PUBLISHED" as const, startDate: { gte: new Date() } }),
      ...(category ? { category } : {}),
      ...(format ? { format: format as EventFormat } : {}),
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy: { startDate: "asc" },
        skip: (page - 1) * perPage,
        take: perPage,
        include: {
          speakers: { orderBy: { order: "asc" } },
          _count: { select: { registrations: true } },
        },
      }),
      prisma.event.count({ where }),
    ])

    return NextResponse.json({ events, total, page, perPage })
  } catch (error) {
    console.error("GET /api/events:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = await req.json()
  const parsed = eventSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const data = parsed.data
  const slug = slugify(data.title, { lower: true, strict: true })

  try {
    const event = await prisma.event.create({
      data: {
        ...data,
        slug,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        registrationDeadline: data.registrationDeadline
          ? new Date(data.registrationDeadline)
          : null,
        coverImage: data.coverImage || null,
        virtualUrl: data.virtualUrl || null,
        publishedAt: data.status === "PUBLISHED" ? new Date() : null,
      },
    })
    return NextResponse.json(event, { status: 201 })
  } catch (error: unknown) {
    if ((error as { code?: string })?.code === "P2002") {
      return NextResponse.json({ error: "An event with this title already exists" }, { status: 409 })
    }
    console.error("POST /api/events:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
