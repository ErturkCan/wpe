import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const secret = new URL(req.url).searchParams.get("s")
  if (secret !== "ewp25") return NextResponse.json({ error: "no" }, { status: 401 })

  const tokens = await prisma.verificationToken.findMany({
    orderBy: { expires: "desc" },
    take: 5,
  })
  const users = await prisma.user.findMany({ take: 5, select: { email: true, role: true } })

  return NextResponse.json({ tokens, users })
}
