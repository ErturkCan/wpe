import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Cormorant_Garamond } from "next/font/google"
import { Providers } from "@/components/layout/Providers"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "EWP — Next Generation Leadership Academy",
    template: "%s | EWP",
  },
  description:
    "Executive Workshop Programs — Geleceğin liderlerini bugünden şekillendiren, seçkin iş dünyası profesyonelleri için tasarlanmış liderlik akademisi.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  openGraph: {
    type: "website",
    siteName: "EWP Next Generation Leadership Academy",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      className={`${GeistSans.variable} ${GeistMono.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
