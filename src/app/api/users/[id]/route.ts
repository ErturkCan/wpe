import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { profileSchema } from "@/lib/validations"

interface Params {
  params: Promise<{ id: string }>
}

export async function PATCH(req: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  if (id !== session.user.id && (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = await req.json()
  const parsed = profileSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const user = await prisma.user.update({
    where: { id },
    data: {
      name: parsed.data.name,
      company: parsed.data.company || null,
      jobTitle: parsed.data.jobTitle || null,
      linkedinUrl: parsed.data.linkedinUrl || null,
    },
  })

  return NextResponse.json(user)
}
