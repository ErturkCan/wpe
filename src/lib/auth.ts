import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { prisma } from "@/lib/prisma"
import type { Role } from "@prisma/client"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY ?? "re_placeholder",
      from: process.env.RESEND_FROM_EMAIL ?? "WPE Events <onboarding@resend.dev>",
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      session.user.role = (user as { role: Role }).role
      return session
    },
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/verify-request",
    error: "/login",
  },
})
