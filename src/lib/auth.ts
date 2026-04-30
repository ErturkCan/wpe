import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { authConfig } from "@/lib/auth.config"
import Resend from "next-auth/providers/resend"
import type { Role } from "@prisma/client"

const baseUrl = process.env.AUTH_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "https://ewpfuture.com"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Resend({
      apiKey: process.env.RESEND_API_KEY ?? "re_placeholder",
      from: process.env.RESEND_FROM_EMAIL ?? "EWP Events <onboarding@resend.dev>",
      // Override sendVerificationRequest to use confirm page (prevents Gmail scanner from consuming token)
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        // Swap the direct callback URL for our confirm page
        const urlObj = new URL(url)
        const token = urlObj.searchParams.get("token")
        const callbackUrl = urlObj.searchParams.get("callbackUrl") ?? `${baseUrl}/dashboard`
        const confirmUrl = `${baseUrl}/auth/confirm?token=${encodeURIComponent(token ?? "")}&callbackUrl=${encodeURIComponent(callbackUrl)}`

        const { Resend: ResendClient } = await import("resend")
        const client = new ResendClient(provider.apiKey)

        await client.emails.send({
          from: provider.from as string,
          to: identifier,
          subject: "EWP — Giriş Linkiniz",
          html: `
            <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
              <p style="font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; color: #B8960C; margin-bottom: 24px;">
                — EWP · Executive Workshop Programs
              </p>
              <h1 style="font-size: 28px; font-weight: 300; color: #0F1E3C; margin-bottom: 16px; line-height: 1.2;">
                Giriş Linkiniz Hazır
              </h1>
              <p style="color: #4D5F7A; font-size: 15px; line-height: 1.7; margin-bottom: 32px;">
                Aşağıdaki butona tıklayarak EWP hesabınıza giriş yapabilirsiniz.
                Bu link 24 saat geçerlidir.
              </p>
              <a href="${confirmUrl}" style="display: inline-block; background: #0F1E3C; color: #F8F5EF; text-decoration: none; padding: 16px 40px; border-radius: 9999px; font-size: 14px; font-weight: 600; letter-spacing: 0.05em;">
                → EWP'ye Giriş Yap
              </a>
              <p style="color: #8A96A8; font-size: 12px; margin-top: 32px; line-height: 1.7;">
                Bu emaili siz talep etmediyseniz güvenle görmezden gelebilirsiniz.<br/>
                ewpfuture.com
              </p>
            </div>
          `,
        })
      },
    }),
  ],
  adapter: {
    ...PrismaAdapter(prisma),
    // Gracefully handle already-used tokens (e.g., consumed by Gmail scanner)
    async useVerificationToken({ identifier, token }: { identifier: string; token: string }) {
      try {
        return await prisma.verificationToken.delete({
          where: { identifier_token: { identifier, token } },
        })
      } catch {
        return null
      }
    },
  },
  callbacks: {
    ...authConfig.callbacks,
    session({ session, user }) {
      session.user.id = user.id
      session.user.role = (user as { role: Role }).role
      return session
    },
  },
})
