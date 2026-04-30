"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { staggerContainer, fadeInUp } from "@/lib/motion"

const speakers = [
  {
    initial: "AK",
    name: "Prof. Dr. Ahmet Keskin",
    title: "Stratejik Liderlik",
    org: "INSEAD",
    expertise: "Örgütsel Dönüşüm · Karar Teorisi",
  },
  {
    initial: "LM",
    name: "Dr. Leyla Müftüoğlu",
    title: "İnovasyon & Strateji",
    org: "Harvard Business School",
    expertise: "Kurumsal İnovasyon · Ekosistem Tasarımı",
  },
  {
    initial: "CA",
    name: "Cem Arıoğlu",
    title: "Yönetici Koçluğu",
    org: "McKinsey & Co.",
    expertise: "Liderlik Psikolojisi · Performans",
  },
  {
    initial: "SE",
    name: "Selin Erdoğan",
    title: "Küresel Finans",
    org: "Goldman Sachs",
    expertise: "Finansal Strateji · Risk Yönetimi",
  },
]

export function SpeakersSection() {
  return (
    <section style={{ backgroundColor: "#F8F5EF" }}>
      <div className="container-wide">
        {/* Section header */}
        <div className="flex items-center justify-between py-10" style={{ borderBottom: "1px solid #D9D2C5" }}>
          <span style={{
            color: "#B8960C", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
            fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
          }}>
            — Konuşmacılarımız
          </span>
          <Link href="/events" style={{ color: "#4D5F7A", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Tüm Programlar →
          </Link>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-0 lg:grid-cols-2"
        >
          {/* LEFT — heading */}
          <motion.div variants={fadeInUp} className="py-16 pr-0 lg:pr-20 lg:py-20">
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              lineHeight: 1.05,
              color: "#0F1E3C",
            }}>
              Global uzmanlar,
              <br />
              <em style={{ fontStyle: "italic", color: "#B8960C" }}>derin içgörüler</em>
            </h2>
            <p className="mt-6" style={{ color: "#4D5F7A", fontSize: "15px", lineHeight: 1.7, maxWidth: "360px" }}>
              EWP programlarında dünyanın önde gelen iş okulları ve danışmanlık firmalarından
              isimler ile birebir etkileşim kurarsınız.
            </p>
          </motion.div>

          {/* RIGHT — speaker cards */}
          <motion.div variants={staggerContainer} className="flex flex-col lg:pl-0 pb-4">
            {speakers.map((s, i) => (
              <motion.div
                key={s.name}
                variants={fadeInUp}
                className="flex items-center gap-5 py-6"
                style={{ borderTop: "1px solid #D9D2C5" }}
              >
                {/* Avatar */}
                <div style={{
                  width: "52px", height: "52px", borderRadius: "4px",
                  background: "#0F1E3C",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                  fontSize: "16px", fontWeight: 600, color: "#B8960C",
                }}>
                  {s.initial}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "15px", fontWeight: 600, color: "#0F1E3C", fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif" }}>
                    {s.name}
                  </p>
                  <p style={{ fontSize: "12px", color: "#B8960C", letterSpacing: "0.03em", marginTop: "2px" }}>
                    {s.title} · <span style={{ color: "#4D5F7A" }}>{s.org}</span>
                  </p>
                  <p style={{ fontSize: "11px", color: "#8A96A8", letterSpacing: "0.05em", marginTop: "4px" }}>
                    {s.expertise}
                  </p>
                </div>

                {/* Index */}
                <span style={{
                  fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                  fontSize: "32px", fontWeight: 300, color: "rgba(15,30,60,0.08)",
                  lineHeight: 1,
                }}>
                  0{i + 1}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
