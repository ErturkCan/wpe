"use client"

import { motion } from "framer-motion"
import { staggerContainer, fadeInUp } from "@/lib/motion"

const testimonials = [
  {
    quote:
      "EWP programı, liderlik anlayışımı kökten değiştirdi. Üç günlük yoğun atölye sonrasında hem stratejik bakış açım hem de ekip dinamiklerim belirgin biçimde güçlendi.",
    name: "Selin Çelik",
    title: "CEO",
    company: "Meridian Capital",
    initial: "S",
  },
  {
    quote:
      "Yıllar içinde onlarca liderlik eğitimine katıldım. EWP, gerçek bir dönüşüm vadeden ve veren tek program. Kürasyon ve katılımcı kalitesi eşsiz.",
    name: "Mert Yılmaz",
    title: "Genel Müdür",
    company: "Apex Ventures",
    initial: "M",
  },
  {
    quote:
      "Teorik değil, pratik ve dönüştürücü. EWP'den mezun olan yöneticilerim, organizasyonumuza geri döndüklerinde farklı bir netlik ve özgüvenle liderlik ediyor.",
    name: "Elif Kaya",
    title: "İnsan Kaynakları Direktörü",
    company: "NovaTech Group",
    initial: "E",
  },
]

export function Testimonials() {
  return (
    <section className="section-padding" style={{ backgroundColor: "#0F1E3C" }}>
      {/* Subtle texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #B8960C 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="container-wide relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mx-auto max-w-2xl text-center">
            <p
              className="text-xs uppercase tracking-[0.2em]"
              style={{ color: "#B8960C", fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif", letterSpacing: "0.2em" }}
            >
              Mezunlarımızdan
            </p>
            <h2
              className="mt-4 text-4xl font-light md:text-5xl"
              style={{ fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif", color: "#F8F5EF", lineHeight: 1.1 }}
            >
              Gerçek liderler,
              <br />
              <em style={{ fontStyle: "italic", color: "#B8960C" }}>gerçek dönüşüm</em>
            </h2>
            <div className="my-6 flex justify-center">
              <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, #B8960C, transparent)" }} />
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeInUp}
                className="relative p-8"
                style={{
                  border: "1px solid rgba(184,150,12,0.2)",
                  borderRadius: "4px",
                  backgroundColor: "rgba(255,255,255,0.03)",
                }}
              >
                {/* Opening quote mark */}
                <div
                  className="absolute -top-4 left-6 text-6xl leading-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                    color: "rgba(184,150,12,0.3)",
                    lineHeight: 1,
                  }}
                >
                  "
                </div>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "rgba(248,245,239,0.75)", fontStyle: "italic", fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif", fontSize: "17px" }}
                >
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t pt-5" style={{ borderColor: "rgba(184,150,12,0.15)" }}>
                  <div
                    className="flex h-10 w-10 items-center justify-center text-sm font-bold"
                    style={{
                      background: "rgba(184,150,12,0.15)",
                      border: "1px solid rgba(184,150,12,0.3)",
                      color: "#B8960C",
                      borderRadius: "2px",
                      fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                      fontSize: "18px",
                    }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#F8F5EF" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "rgba(248,245,239,0.45)" }}>
                      {t.title} · {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
