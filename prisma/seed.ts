import { PrismaClient } from "@prisma/client"
import slugify from "slugify"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create admin user
  await prisma.user.upsert({
    where: { email: "admin@wpe.com" },
    update: { role: "ADMIN" },
    create: {
      email: "admin@wpe.com",
      name: "WPE Admin",
      role: "ADMIN",
    },
  })

  const now = new Date()
  const events = [
    {
      title: "The Future of AI in Enterprise",
      category: "Technology",
      format: "IN_PERSON" as const,
      shortDescription:
        "Join 150 senior technology leaders to explore how generative AI is reshaping enterprise operations, strategy, and competitive advantage.",
      description: `This is a curated half-day forum for C-suite and senior technology executives who are actively navigating the AI transformation. Unlike general AI conferences, this event is deliberately small — 150 attendees maximum — to ensure every conversation is substantive.

We'll cover practical deployment strategies, governance frameworks, and the human side of AI adoption. Expect rigorous discussion, not keynote theater.

Attendance is by registration only and subject to host approval. We prioritize diversity of industry and seniority.`,
      venueName: "The Standard, High Line",
      venueAddress: "848 Washington St, New York, NY 10014",
      city: "New York",
      startDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000),
      capacity: 150,
      speakers: [
        {
          name: "Sarah Chen",
          title: "Chief AI Officer",
          company: "Meridian Capital",
          bio: "Sarah leads AI strategy and deployment across Meridian's investment and operations teams. Previously led ML infrastructure at two Fortune 500 companies.",
          order: 0,
        },
        {
          name: "Marcus Webb",
          title: "VP of Engineering",
          company: "NovaTech Group",
          bio: "Marcus has spent the last decade building enterprise AI products. Author of 'Practical AI for Executives' and frequent keynote speaker.",
          order: 1,
        },
      ],
    },
    {
      title: "Women in Finance Leadership Forum",
      category: "Finance",
      format: "HYBRID" as const,
      shortDescription:
        "A half-day summit connecting senior women in financial services — from asset management to fintech — to share perspectives and accelerate career growth.",
      description: `The Women in Finance Leadership Forum brings together senior professionals across asset management, investment banking, fintech, and corporate finance for an afternoon of real conversation.

This is not a panel with rehearsed answers. We use a structured dialogue format that ensures every voice in the room contributes. Virtual attendees participate through live Q&A and breakout sessions.

Topics include navigating board-level advancement, leading through market volatility, and building sponsorship networks that actually work.`,
      venueName: "Bloomberg HQ",
      city: "New York",
      virtualUrl: "https://zoom.us/j/example",
      startDate: new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000 + 3.5 * 60 * 60 * 1000),
      capacity: 80,
      speakers: [
        {
          name: "Elena Rodriguez",
          title: "Managing Director",
          company: "Apex Global Investments",
          bio: "Elena leads a $4B alternatives portfolio and serves on three public company boards. Named to Forbes Most Powerful Women in Finance 2024.",
          order: 0,
        },
      ],
    },
    {
      title: "Founders & Investors Roundtable — Q3 2026",
      category: "Technology",
      format: "VIRTUAL" as const,
      shortDescription:
        "An intimate virtual roundtable connecting 40 pre-Series B founders with 20 active investors for unscripted conversation about what's actually working in 2026.",
      description: `This quarterly roundtable is designed for honest conversation between founders and investors — not pitches, not panels, but real dialogue about what's working, what's failing, and what the landscape looks like from both sides.

Format: 60-minute moderated roundtable followed by 30 minutes of open breakouts. Founders and investors are matched in advance based on sector and stage alignment.

No slides. No pitch decks. Just people who've done the work, talking candidly about it.`,
      virtualUrl: "https://zoom.us/j/example",
      startDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000),
      capacity: 60,
      speakers: [],
    },
  ]

  for (const eventData of events) {
    const { speakers, ...data } = eventData
    const slug = slugify(data.title, { lower: true, strict: true })

    const existing = await prisma.event.findUnique({ where: { slug } })
    if (existing) {
      console.log(`  ↳ Skipping "${data.title}" (already exists)`)
      continue
    }

    await prisma.event.create({
      data: {
        ...data,
        slug,
        status: "PUBLISHED",
        publishedAt: new Date(),
        tags: [],
        speakers: speakers.length > 0 ? { create: speakers } : undefined,
      },
    })
    console.log(`  ✓ Created "${data.title}"`)
  }

  console.log("Seed complete.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
