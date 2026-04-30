"use client"

import { motion } from "framer-motion"
import { staggerContainer, fadeInUp } from "@/lib/motion"

const stats = [
  {
    value: "500+",
    label: "Mezun Yönetici",
    desc: "C-suite ve üst düzey direktör profilinde mezunlarımız",
    accent: false,
  },
  {
    value: "48",
    label: "Tamamlanan Program",
    desc: "Yüz yüze ve hibrit formatlarda gerçekleştirilen atölyeler",
    accent: true,
  },
  {
    value: "30+",
    label: "Global Konuşmacı",
    desc: "Dünya genelinden düşünce liderleri ve üst düzey uzmanlar",
    accent: false,
  },
]

export function StatsSection() {
  return (
    <section style={{ backgroundColor: "#F8F5EF" }}>
      <div className="container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-0"
          style={{ borderBottom: "1px solid #D9D2C5" }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeInUp}
              className="flex flex-col justify-between py-12 px-0"
              style={{
                borderRight: i < 2 ? "1px solid #D9D2C5" : "none",
                paddingLeft: i === 0 ? 0 : "2.5rem",
                paddingRight: i === 2 ? 0 : "2.5rem",
                background: s.accent ? "rgba(184,150,12,0.04)" : "transparent",
              }}
            >
              {/* Big number */}
              <div>
                <p style={{
                  fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  fontWeight: 300,
                  color: s.accent ? "#B8960C" : "#0F1E3C",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}>
                  {s.value}
                </p>
                <p style={{
                  fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                  fontSize: "16px", fontWeight: 600,
                  color: "#0F1E3C",
                  marginTop: "12px",
                  letterSpacing: "0.01em",
                }}>
                  {s.label}
                </p>
              </div>
              <p style={{
                fontSize: "13px", lineHeight: 1.7,
                color: "#4D5F7A",
                marginTop: "16px",
                maxWidth: "220px",
              }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
