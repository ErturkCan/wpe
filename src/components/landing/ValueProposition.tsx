"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/motion"

const items = [
  {
    num: "01",
    title: "Etki Odaklı Müfredat",
    description:
      "Global düşünce liderleri ve üst düzey yöneticiler tarafından tasarlanmış, gerçek iş dünyası zorluklarına yönelik pratik liderlik çerçeveleri. Her oturum, ertesi gün uygulanabilir içgörüler sunar.",
  },
  {
    num: "02",
    title: "Seçkin Katılımcı Profili",
    description:
      "Her program yalnızca davetliye açık veya özenle incelenerek kabul edilmiş profesyonellerle gerçekleşir. Doğru insanlarla, doğru ortamda, doğru sohbetleri yaparsınız.",
  },
  {
    num: "03",
    title: "Stratejik Dönüşüm",
    description:
      "Teoriden eyleme: her atölye, kariyer ve organizasyonunuzda ölçülebilir bir değişim yaratmak üzere kurgulanmıştır. Mezunlarımız programdan farklı bir netlikle ayrılır.",
  },
]

export function ValueProposition() {
  return (
    <section style={{ backgroundColor: "#F8F5EF", borderTop: "1px solid #D9D2C5" }}>
      <div className="container-wide">
        {/* Section header */}
        <div className="flex items-center gap-4 py-10" style={{ borderBottom: "1px solid #D9D2C5" }}>
          <span style={{ color: "#B8960C", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif" }}>
            — Ne Sunuyoruz
          </span>
        </div>

        {/* Two-col layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-0 lg:grid-cols-2"
        >
          {/* Left: big heading */}
          <motion.div
            variants={fadeInUp}
            className="py-16 pr-0 lg:pr-20 lg:py-20"
            style={{ borderRight: "0px solid #D9D2C5" }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                lineHeight: 1.05,
                color: "#0F1E3C",
              }}
            >
              Liderlik bir yolculuktur,
              <br />
              <em style={{ fontStyle: "italic", color: "#B8960C" }}>varış noktası değil</em>
            </h2>
            <p className="mt-6 text-base leading-relaxed" style={{ color: "#4D5F7A", maxWidth: "380px" }}>
              EWP'de her program, katılımcıların hem kendileri hem de örgütleri için
              kalıcı bir dönüşüm yaşamalarını sağlamak üzere tasarlanır.
            </p>
          </motion.div>

          {/* Right: numbered items */}
          <motion.div variants={staggerContainer} className="lg:pl-16">
            {items.map((item, i) => (
              <motion.div
                key={item.num}
                variants={fadeInUp}
                className="py-10"
                style={{
                  borderBottom: i < items.length - 1 ? "1px solid #D9D2C5" : "none",
                }}
              >
                <div className="flex items-start gap-6">
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                      fontSize: "13px",
                      fontWeight: 400,
                      color: "#B8960C",
                      letterSpacing: "0.1em",
                      minWidth: "28px",
                      paddingTop: "4px",
                    }}
                  >
                    {item.num}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                        fontSize: "22px",
                        fontWeight: 600,
                        color: "#0F1E3C",
                        lineHeight: 1.2,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "#4D5F7A" }}>
                      {item.description}
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
