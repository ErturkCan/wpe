"use client"

import { motion } from "framer-motion"
import { Target, BookOpen, Network, Award } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/motion"

const pillars = [
  {
    icon: BookOpen,
    title: "Etki Odaklı Müfredat",
    description:
      "Global düşünce liderleri ve üst düzey yöneticiler tarafından tasarlanmış, gerçek iş dünyası zorluklarına yönelik pratik liderlik çerçeveleri.",
  },
  {
    icon: Network,
    title: "Seçkin Katılımcı Profili",
    description:
      "Her program yalnızca davetliye açık veya özenle incelenerek kabul edilmiş profesyonellerle gerçekleşir. Doğru insanlarla aynı masadasınız.",
  },
  {
    icon: Target,
    title: "Stratejik Dönüşüm",
    description:
      "Teoriden eyleme: her atölye, kariyer ve organizasyonunuzda ölçülebilir bir değişim yaratmak üzere kurgulanmıştır.",
  },
  {
    icon: Award,
    title: "Uluslararası Akreditasyon",
    description:
      "EWP programları, küresel standartlarda tanınan sertifikalar ve dünyaca saygın kurumlarla ortak içerik sunar.",
  },
]

export function ValueProposition() {
  return (
    <section className="section-padding border-t border-border" style={{ backgroundColor: "#F8F5EF" }}>
      <div className="container-wide">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={fadeInUp}
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: "#B8960C", fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif", fontSize: "12px", letterSpacing: "0.2em" }}
          >
            Neden EWP
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="mt-4 text-4xl font-light md:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif", color: "#0F1E3C", lineHeight: 1.1 }}
          >
            Liderlik bir <em style={{ fontStyle: "italic", color: "#B8960C" }}>pozisyon</em> değil,
            <br />bir sorumluluktur
          </motion.h2>
          <motion.div variants={fadeInUp} className="my-6 flex justify-center">
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, #B8960C, transparent)" }} />
          </motion.div>
          <motion.p variants={fadeInUp} className="text-base leading-relaxed" style={{ color: "#4D5F7A" }}>
            EWP'de her program, katılımcıların hem kendileri hem de örgütleri için kalıcı bir dönüşüm yaşamalarını sağlamak üzere tasarlanır.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-none border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              style={{ borderColor: "#D9D2C5", backgroundColor: "#FDFBF7", borderRadius: "4px" }}
            >
              {/* Gold top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "#B8960C" }}
              />
              <div
                className="flex h-10 w-10 items-center justify-center"
                style={{ border: "1px solid rgba(184,150,12,0.3)", borderRadius: "2px" }}
              >
                <pillar.icon className="h-4.5 w-4.5" style={{ color: "#B8960C" }} />
              </div>
              <h3
                className="mt-5 text-base font-semibold"
                style={{ color: "#0F1E3C", fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif", fontSize: "17px" }}
              >
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#4D5F7A" }}>
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
