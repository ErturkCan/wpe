import Image from "next/image"
import { Linkedin, Twitter } from "lucide-react"
import type { Speaker } from "@prisma/client"

interface SpeakerCardProps {
  speaker: Speaker
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-background p-4">
      {speaker.photo ? (
        <Image
          src={speaker.photo}
          alt={speaker.name}
          width={64}
          height={64}
          unoptimized
          className="h-16 w-16 shrink-0 rounded-xl object-cover"
        />
      ) : (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-accent text-2xl font-bold text-white">
          {speaker.name[0]}
        </div>
      )}
      <div className="min-w-0">
        <h4 className="font-semibold text-text-primary">{speaker.name}</h4>
        <p className="text-sm text-text-secondary">{speaker.title}</p>
        <p className="text-sm font-medium text-accent">{speaker.company}</p>
        <p className="mt-2 text-sm text-text-secondary line-clamp-3">{speaker.bio}</p>
        <div className="mt-2 flex gap-2">
          {speaker.linkedinUrl && (
            <a
              href={speaker.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted transition-colors hover:text-text-primary"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {speaker.twitterUrl && (
            <a
              href={speaker.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted transition-colors hover:text-text-primary"
            >
              <Twitter className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
