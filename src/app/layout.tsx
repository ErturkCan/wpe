import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Providers } from "@/components/layout/Providers"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "WPE — Professional Business Networking Events",
    template: "%s | WPE",
  },
  description:
    "Discover and join premium business networking events. Connect with industry leaders, expand your network, and accelerate your career.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  openGraph: {
    type: "website",
    siteName: "WPE",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
