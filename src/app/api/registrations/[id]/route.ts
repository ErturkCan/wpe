import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

interface Params {
  params: Promise<{ id: string }>
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const isAdmin = (session.user as { role?: string }).role === "ADMIN"

  const registration = await prisma.registration.findUnique({ where: { id } })
  if (!registration) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  if (!isAdmin && registration.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  await prisma.registration.update({
    where: { id },
    data: { status: "CANCELLED" },
  })

  return NextResponse.json({ success: true })
}
