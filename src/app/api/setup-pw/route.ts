import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const s = new URL(req.url).searchParams.get("s")
  if (s !== "ewp-pw-25") return NextResponse.json({ error: "no" }, { status: 401 })

  try {
    // Add password column to users table
    await prisma.$executeRawUnsafe(`ALTER TABLE users ADD COLUMN IF NOT EXISTS password TEXT`)

    // Set password for admin
    await prisma.$executeRawUnsafe(
      `UPDATE users SET password = $1 WHERE email = $2`,
      "$2b$12$uCbRD3r.Hbz8RQlqMfcnFuVdd0kjOV/hd9yEZvMJJwmlxHf6B1tCy",
      "canerturk333@gmail.com"
    )

    const user = await prisma.user.findUnique({
      where: { email: "canerturk333@gmail.com" },
      select: { email: true, role: true, password: true },
    })

    return NextResponse.json({ ok: true, email: user?.email, role: user?.role, pw: user?.password ? "set" : "missing" })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
