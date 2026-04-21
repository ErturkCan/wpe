"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Users } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/motion"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#0a0a0a 1px, transparent 1px), linear-gradient(90deg, #0a0a0a 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="container-wide relative py-28 md:py-40">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeInUp} className="mb-6 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Özel iş dünyası networking etkinlikleri
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl font-bold tracking-tight text-text-primary md:text-7xl"
          >
            Hırsın
            <br />
            <span className="text-accent">fırsatla buluştuğu yer</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary md:text-xl"
          >
            Üst düzey profesyoneller için tasarlanmış özenle seçilmiş networking etkinliklerine katılın.
            Çevrenizi genişletin, fikirlerinizi paylaşın ve etkiniziartırın.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-white transition-all duration-150 hover:bg-accent-hover hover:shadow-card-hover"
            >
              Etkinlikleri Keşfet
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-base font-semibold text-text-primary transition-all duration-150 hover:bg-surface"
            >
              Daha Fazla Bilgi
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={fadeInUp}
            className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Users className="h-4 w-4 text-accent" />
              <span><strong className="font-semibold text-text-primary">2.400+</strong> profesyonel</span>
            </div>
            <div className="hidden h-4 w-px bg-border sm:block" />
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Calendar className="h-4 w-4 text-accent" />
              <span><strong className="font-semibold text-text-primary">48</strong> etkinlik düzenlendi</span>
            </div>
            <div className="hidden h-4 w-px bg-border sm:block" />
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <span className="text-base">⭐</span>
              <span><strong className="font-semibold text-text-primary">4.9/5</strong> memnuniyet</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
