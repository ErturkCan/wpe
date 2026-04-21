"use client"

import { motion } from "framer-motion"
import { staggerContainer, fadeInUp } from "@/lib/motion"

const testimonials = [
  {
    quote:
      "WPE etkinlikleri başka bir ligde. Katılımcılar üst düzey, katılımcı ve işbirliğine gerçekten açık. Buradaki bağlantılarımdan iki anlaşma kapattım ve bir Başkan Yardımcısı işe aldım.",
    name: "Selin Çelik",
    title: "Gelir Direktörü",
    company: "Meridian Capital",
    initial: "S",
  },
  {
    quote:
      "Yıllar içinde onlarca networking etkinliğine katıldım. WPE, her seferinde anlamlı bağlantılarla ayrıldığım tek platform. Kürasyon mükemmel.",
    name: "Mert Yılmaz",
    title: "Genel Müdür",
    company: "Apex Ventures",
    initial: "M",
  },
  {
    quote:
      "Format mükemmel. Garip tanışma anları yok, boşa harcanan zaman yok — sadece doğru insanlarla yapılandırılmış sohbetler. Ekibim artık şehrimizdeki her WPE etkinliğine katılıyor.",
    name: "Elif Kaya",
    title: "Strateji Direktörü",
    company: "NovaTech Group",
    initial: "E",
  },
]

export function Testimonials() {
  return (
    <section className="section-padding border-y border-border bg-text-primary">
      <div className="container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Görüşler
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Üst düzey profesyonellerin tercihi
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeInUp}
                className="rounded-2xl border border-white/10 bg-white/5 p-7"
              >
                <p className="text-base leading-relaxed text-white/80">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/50">
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
