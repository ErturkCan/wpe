"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Globe, Users } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/motion"

const values = [
  {
    icon: Users,
    title: "Seçkin Katılımcılar",
    description:
      "Her etkinlik yalnızca davetlilere açık veya titizlikle denetlenmektedir. Her zaman doğru insanlarla aynı ortamdasınız.",
  },
  {
    icon: Zap,
    title: "Kolay Erişim",
    description:
      "Saniyeler içinde kayıt olun, anında onay alın ve ihtiyacınız olan her şeye tek bir yerden ulaşın.",
  },
  {
    icon: Shield,
    title: "Premium Deneyim",
    description:
      "Mekândan formata kadar her detay, anlamlı bağlantıları ve değeri en üst düzeye çıkarmak için tasarlanmıştır.",
  },
  {
    icon: Globe,
    title: "Online ve Yüz Yüze",
    description:
      "Her yerden katılın ya da yüz yüze buluşun. Programınıza ve konumunuza uygun etkinlikler düzenliyoruz.",
  },
]

export function ValueProposition() {
  return (
    <section className="section-padding border-t border-border bg-surface">
      <div className="container-wide">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-accent">
            Neden WPE
          </motion.p>
          <motion.h2 variants={fadeInUp} className="mt-3 text-3xl font-bold text-text-primary md:text-4xl">
            Zamanına değer veren profesyoneller için
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-base text-text-secondary">
            Detaylara biz takılırız; siz önemli olana odaklanın — kalıcı ilişkiler kurmaya.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={fadeInUp}
              className="group rounded-2xl border border-border bg-background p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light">
                <value.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-text-primary">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
