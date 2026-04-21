import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/landing/HeroSection"
import { ValueProposition } from "@/components/landing/ValueProposition"
import { FeaturedEvents } from "@/components/landing/FeaturedEvents"
import { Testimonials } from "@/components/landing/Testimonials"
import { TrustSignals } from "@/components/landing/TrustSignals"
import { prisma } from "@/lib/prisma"
import type { EventWithSpeakers } from "@/types"

export const dynamic = 'force-dynamic'

export default async function LandingPage() {
  let featuredEvents: EventWithSpeakers[] = []
  try {
    featuredEvents = await prisma.event.findMany({
      where: { status: "PUBLISHED", startDate: { gte: new Date() } },
      orderBy: { startDate: "asc" },
      take: 3,
      include: {
        speakers: { orderBy: { order: "asc" } },
        _count: { select: { registrations: true } },
      },
    })
  } catch {
    // DB not connected yet — show empty state
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ValueProposition />
        <FeaturedEvents events={featuredEvents} />
        <Testimonials />
        <TrustSignals />
      </main>
      <Footer />
    </>
  )
}
