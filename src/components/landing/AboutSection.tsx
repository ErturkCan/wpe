"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { staggerContainer, fadeInUp } from "@/lib/motion"

export function AboutSection() {
  return (
    <section style={{ backgroundColor: "#0F1E3C" }}>
      {/* Subtle glow */}
      <div className="pointer-events-none absolute" style={{
        width: "600px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(184,150,12,0.05) 0%, transparent 70%)",
        top: "50%", left: "40%", transform: "translate(-50%,-50%)",
      }} />

      <div className="container-wide relative">
        {/* Section header */}
        <div className="flex items-center justify-between py-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <span style={{
            color: "#B8960C", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
            fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
          }}>
            — EWP Hakkında
          </span>
          <Link href="/about" style={{ color: "rgba(248,245,239,0.35)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Daha Fazla →
          </Link>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 py-20"
        >
          {/* LEFT — text */}
          <motion.div variants={fadeInUp} className="pr-0 lg:pr-20 flex flex-col justify-center">
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              lineHeight: 1.05,
              color: "#F8F5EF",
            }}>
              Liderlik bir yolculuktur,
              <br />
              <em style={{ fontStyle: "italic", color: "#B8960C" }}>varış noktası değil</em>
            </h2>

            <p className="mt-8" style={{ color: "rgba(248,245,239,0.55)", fontSize: "15px", lineHeight: 1.9, maxWidth: "440px" }}>
              EWP — Executive Workshop Programs, Türkiye'nin en seçkin yönetici geliştirme platformudur.
              Her programımız; stratejik liderlik, örgütsel dönüşüm ve kişisel etki alanlarında
              kalıcı değişim yaratmak üzere kurgulanmıştır.
            </p>

            <p className="mt-6" style={{ color: "rgba(248,245,239,0.4)", fontSize: "15px", lineHeight: 1.9, maxWidth: "440px" }}>
              Katılımcılarımız yalnızca kavram ve çerçeve öğrenmez — gerçek iş dünyasının dinamikleri
              içinde, küresel düşünce liderleriyle birebir etkileşim kurarak dönüşür.
            </p>

            <div className="mt-10">
              <Link
                href="/events"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  color: "#B8960C",
                  fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                  borderBottom: "1px solid rgba(184,150,12,0.3)",
                  paddingBottom: "4px",
                }}
              >
                Programlara Göz At →
              </Link>
            </div>
          </motion.div>

          {/* RIGHT — visual cards */}
          <motion.div
            variants={staggerContainer}
            className="pl-0 lg:pl-10 flex flex-col gap-4 justify-center mt-16 lg:mt-0"
          >
            {[
              {
                num: "01",
                title: "Etki Odaklı Müfredat",
                desc: "Global düşünce liderleri tarafından tasarlanmış, gerçek iş dünyası zorluklarına yönelik pratik çerçeveler.",
              },
              {
                num: "02",
                title: "Seçkin Katılımcı Profili",
                desc: "Her program yalnızca davetliye açık veya özenle incelenerek kabul edilmiş C-suite profesyonellerle gerçekleşir.",
              },
              {
                num: "03",
                title: "Stratejik Dönüşüm",
                desc: "Teoriden eyleme: her atölye, organizasyonunuzda ölçülebilir değişim yaratmak üzere kurgulanmıştır.",
              },
            ].map((item) => (
              <motion.div
                key={item.num}
                variants={fadeInUp}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "4px",
                  padding: "1.75rem 2rem",
                  display: "flex",
                  gap: "1.25rem",
                  alignItems: "flex-start",
                }}
              >
                <span style={{
                  fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                  fontSize: "13px", color: "#B8960C", letterSpacing: "0.1em",
                  minWidth: "28px", paddingTop: "3px",
                }}>
                  {item.num}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                    fontSize: "18px", fontWeight: 600, color: "#F8F5EF", lineHeight: 1.2,
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "13px", lineHeight: 1.7, color: "rgba(248,245,239,0.45)", marginTop: "8px" }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
