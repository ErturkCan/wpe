import { z } from "zod"

export const registerForEventSchema = z.object({
  eventId: z.string().min(1),
  notes: z.string().max(500).optional(),
})

export const eventSchema = z.object({
  title: z.string().min(3).max(200),
  shortDescription: z.string().min(10).max(300),
  description: z.string().min(20),
  format: z.enum(["IN_PERSON", "VIRTUAL", "HYBRID"]),
  category: z.string().min(1),
  tags: z.array(z.string()).optional(),
  coverImage: z.string().url().optional().or(z.literal("")),
  venueName: z.string().optional(),
  venueAddress: z.string().optional(),
  city: z.string().optional(),
  virtualUrl: z.string().url().optional().or(z.literal("")),
  startDate: z.string(),
  endDate: z.string(),
  timezone: z.string().default("America/New_York"),
  registrationDeadline: z.string().optional(),
  capacity: z.coerce.number().int().positive().optional().nullable(),
  waitlistEnabled: z.boolean().default(true),
  status: z.enum(["DRAFT", "PUBLISHED", "CANCELLED", "COMPLETED"]).default("DRAFT"),
})

export const speakerSchema = z.object({
  name: z.string().min(2),
  title: z.string().min(2),
  company: z.string().min(2),
  bio: z.string().min(10),
  photo: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  twitterUrl: z.string().url().optional().or(z.literal("")),
  order: z.coerce.number().int().default(0),
})

export const profileSchema = z.object({
  name: z.string().min(2).max(100),
  company: z.string().max(100).optional(),
  jobTitle: z.string().max(100).optional(),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
})

export type RegisterForEventInput = z.infer<typeof registerForEventSchema>
export type EventInput = z.infer<typeof eventSchema>
export type SpeakerInput = z.infer<typeof speakerSchema>
export type ProfileInput = z.infer<typeof profileSchema>
