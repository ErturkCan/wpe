import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const HASH = "$2b$12$8KFx.UjPuCvkCJECufj7Ee8pD1PQ9g83tkSqWbcTRv5pidndulNyu" // Lotus123

const USERS = [
  { email: "hulya.yalcin@ewpfuture.com", name: "Hülya Yalçın" },
  { email: "tanju.ozkonuk@ewpfuture.com", name: "Tanju Özkonuk" },
  { email: "servet.korkmaz@ewpfuture.com", name: "Servet Korkmaz" },
  { email: "kurumsal@ewpfuture.com", name: "EWP Kurumsal" },
]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get("secret") !== "ewp-setup-2026") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const results = []

  for (const u of USERS) {
    try {
      const existing = await prisma.user.findUnique({ where: { email: u.email } })
      if (existing) {
        // Update password and role
        await prisma.user.update({
          where: { email: u.email },
          data: { password: HASH, role: "ADMIN", name: u.name },
        })
        results.push({ email: u.email, status: "updated" })
      } else {
        // Create new
        await prisma.user.create({
          data: { email: u.email, name: u.name, password: HASH, role: "ADMIN" },
        })
        results.push({ email: u.email, status: "created" })
      }
    } catch (e) {
      results.push({ email: u.email, status: "error", error: String(e) })
    }
  }

  return NextResponse.json({ ok: true, results })
}
