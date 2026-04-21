import type { Event, Speaker, AgendaItem, Registration, Role } from "@prisma/client"

export type EventWithRelations = Event & {
  speakers: Speaker[]
  agenda: AgendaItem[]
  _count: { registrations: number }
}

export type EventWithSpeakers = Event & {
  speakers: Speaker[]
  _count: { registrations: number }
}

export type RegistrationWithEvent = Registration & {
  event: EventWithSpeakers
}

export type SessionUser = {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  role: Role
}

declare module "next-auth" {
  interface Session {
    user: SessionUser
  }
  interface User {
    role: Role
    company?: string | null
    jobTitle?: string | null
    linkedinUrl?: string | null
  }
}
