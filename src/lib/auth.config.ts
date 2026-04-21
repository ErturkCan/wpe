import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"

export const authConfig: NextAuthConfig = {
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
  pages: {
    signIn: "/login",
    verifyRequest: "/verify-request",
    error: "/login",
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth
    },
  },
}
