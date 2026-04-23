"use client"

import { motion } from "framer-motion"
import { staggerContainer, fadeInUp } from "@/lib/motion"

const testimonials = [
  {
    quote: "EWP programı, liderlik anlayışımı kökten değiştirdi. Üç günlük yoğun atölye sonrasında hem stratejik bakış açım hem de ekip dinamiklerim belirgin biçimde güçlendi.",
    name: "Selin Çelik",
    title: "CEO",
    company: "Meridian Capital",
    initial: "S",
  },
  {
    quote: "Yıllar içinde onlarca liderlik eğitimine katıldım. EWP, gerçek bir dönüşüm vadeden ve veren tek program. Kürasyon ve katılımcı kalitesi eşsiz.",
    name: "Mert Yılmaz",
    title: "Genel Müdür",
    company: "Apex Ventures",
    initial: "M",
  },
  {
    quote: "Teorik değil, pratik ve dönüştürücü. EWP'den mezun olan yöneticilerim, organizasyonumuza geri döndüklerinde farklı bir netlik ve özgüvenle liderlik ediyor.",
    name: "Elif Kaya",
    title: "İK Direktörü",
    company: "NovaTech Group",
    initial: "E",
  },
]

export function Testimonials() {
  return (
    <section style={{ backgroundColor: "#F8F5EF" }}>
      <div className="container-wide">
        {/* Section header */}
        <div className="flex items-center gap-4 py-10" style={{ borderBottom: "1px solid #D9D2C5" }}>
          <span style={{ color: "#B8960C", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif" }}>
            — Mezunlarımızdan
          </span>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-0 lg:grid-cols-2"
        >
          {/* Left: big heading */}
          <motion.div variants={fadeInUp} className="py-16 pr-0 lg:pr-20 lg:py-20">
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                lineHeight: 1.05,
                color: "#0F1E3C",
              }}
            >
              Gerçek liderler,
              <br />
              <em style={{ fontStyle: "italic", color: "#B8960C" }}>gerçek dönüşüm</em>
            </h2>
            <p className="mt-6" style={{ color: "#4D5F7A", fontSize: "15px", lineHeight: 1.7, maxWidth: "360px" }}>
              500'den fazla mezunumuz, EWP deneyimini kariyerlerindeki en dönüştürücü yatırım olarak tanımlıyor.
            </p>
          </motion.div>

          {/* Right: testimonial cards */}
          <motion.div variants={staggerContainer} className="flex flex-col gap-0 lg:pl-0">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeInUp}
                className="py-8"
                style={{
                  borderTop: i === 0 ? "1px solid #D9D2C5" : "1px solid #D9D2C5",
                }}
              >
                {/* Quote mark */}
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                    fontSize: "16px",
                    fontStyle: "italic",
                    color: "#4D5F7A",
                    lineHeight: 1.7,
                  }}
                >
                  "{t.quote}"
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "2px",
                      background: "#0F1E3C",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#B8960C",
                    }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#0F1E3C" }}>{t.name}</p>
                    <p style={{ fontSize: "11px", color: "#8A96A8", letterSpacing: "0.05em" }}>
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
