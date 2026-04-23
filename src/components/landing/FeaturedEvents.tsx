"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { staggerContainer, fadeInUp } from "@/lib/motion"
import type { EventWithSpeakers } from "@/types"
import { formatEventDateShort } from "@/lib/utils"

interface FeaturedEventsProps {
  events: EventWithSpeakers[]
}

const programTypes = [
  {
    tier: "Foundation",
    label: "Başlangıç",
    desc: "Liderlik temellerini pekiştirmek ve stratejik düşünce altyapısı kurmak isteyen orta-üst düzey yöneticiler için.",
    duration: "2 Gün",
    format: "Yüz Yüze",
    spots: "20 Katılımcı",
    featured: false,
  },
  {
    tier: "Executive",
    label: "Üst Düzey",
    desc: "Köklü değişim ve dönüşüm liderliği üzerine yoğunlaşan, deneyimli C-suite yöneticileri için tasarlanmış immersive program.",
    duration: "3 Gün",
    format: "Yüz Yüze",
    spots: "12 Katılımcı",
    featured: true,
  },
  {
    tier: "Masterclass",
    label: "Uzman",
    desc: "Belirli bir liderlik konusunda derinlemesine, küresel uzmanlarla etkileşimli oturumlar içeren özel formatlar.",
    duration: "1 Gün",
    format: "Hibrit",
    spots: "30 Katılımcı",
    featured: false,
  },
]

export function FeaturedEvents({ events }: FeaturedEventsProps) {
  return (
    <section style={{ backgroundColor: "#0F1E3C" }}>
      {/* Subtle glow */}
      <div className="pointer-events-none absolute" style={{ width: "800px", height: "400px", background: "radial-gradient(ellipse, rgba(184,150,12,0.06) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", borderRadius: "50%" }} />

      <div className="container-wide relative">
        {/* Section header */}
        <div className="flex items-center justify-between py-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <span style={{ color: "#B8960C", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif" }}>
            — Program Türleri
          </span>
          <Link
            href="/events"
            style={{ color: "rgba(248,245,239,0.4)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            Tüm Programlar →
          </Link>
        </div>

        {/* Big heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-16"
        >
          <motion.h2
            variants={fadeInUp}
            style={{
              fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              lineHeight: 1.05,
              color: "#F8F5EF",
              marginBottom: "3rem",
            }}
          >
            Size uygun
            <br />
            <em style={{ fontStyle: "italic", color: "#B8960C" }}>programı seçin</em>
          </motion.h2>

          {/* Program cards */}
          <motion.div variants={staggerContainer} className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {programTypes.map((p) => (
              <motion.div
                key={p.tier}
                variants={fadeInUp}
                className="relative flex flex-col justify-between overflow-hidden"
                style={{
                  background: p.featured ? "rgba(184,150,12,0.08)" : "rgba(255,255,255,0.03)",
                  border: p.featured ? "1px solid rgba(184,150,12,0.35)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "4px",
                  padding: "2.5rem",
                  minHeight: "380px",
                }}
              >
                {/* Featured tag */}
                {p.featured && (
                  <div
                    className="absolute top-0 left-0 right-0 flex justify-center py-2"
                    style={{ background: "rgba(184,150,12,0.15)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#B8960C" }}
                  >
                    Önerilen
                  </div>
                )}

                <div className={p.featured ? "mt-6" : ""}>
                  <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(248,245,239,0.35)", marginBottom: "8px" }}>
                    {p.label}
                  </p>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                      fontSize: "28px",
                      fontWeight: 600,
                      color: "#F8F5EF",
                      lineHeight: 1.1,
                    }}
                  >
                    {p.tier}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(248,245,239,0.55)" }}>
                    {p.desc}
                  </p>
                </div>

                <div className="mt-8">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[p.duration, p.format, p.spots].map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.08em",
                          color: "rgba(248,245,239,0.4)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          padding: "4px 10px",
                          borderRadius: "9999px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/events"
                    className="flex w-full items-center justify-center gap-2 transition-all hover:opacity-90"
                    style={{
                      background: p.featured ? "#B8960C" : "rgba(255,255,255,0.06)",
                      color: p.featured ? "#0F1E3C" : "rgba(248,245,239,0.7)",
                      padding: "14px",
                      borderRadius: "9999px",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      border: p.featured ? "none" : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    → Başvur
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Live events if any */}
          {events.length > 0 && (
            <motion.div variants={fadeInUp} className="mt-16">
              <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(248,245,239,0.35)", marginBottom: "1.5rem" }}>
                — Yaklaşan Programlar
              </p>
              <div className="flex flex-col gap-3">
                {events.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="flex items-center justify-between py-4 transition-colors"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div>
                      <p style={{ color: "#F8F5EF", fontSize: "16px", fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif" }}>{event.title}</p>
                      <p style={{ color: "rgba(248,245,239,0.4)", fontSize: "12px", marginTop: "2px" }}>{formatEventDateShort(event.startDate)} · {event.city ?? event.format}</p>
                    </div>
                    <span style={{ color: "#B8960C", fontSize: "18px" }}>→</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
