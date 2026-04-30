import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret")
  if (secret !== "ewp-seed-2025") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.upsert({
    where: { email: "canerturk333@gmail.com" },
    update: { role: "ADMIN" },
    create: {
      email: "canerturk333@gmail.com",
      role: "ADMIN",
    },
  })

  return NextResponse.json({ success: true, user: { email: user.email, role: user.role } })
}
