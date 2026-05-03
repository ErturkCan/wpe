import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
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
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role?: string }).role
      }
      return token
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        session.user.role = token.role as any
      }
      return session
    },
  },
}
