"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { staggerContainer, fadeInUp } from "@/lib/motion"

const partners = [
  "Meridian Capital",
  "NovaTech Group",
  "Apex Ventures",
  "Blue Horizon",
  "Citadel Partners",
  "Summit Advisory",
]

export function TrustSignals() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-text-muted">
            Önde gelen kuruluşların güvendiği platform
          </motion.p>

          {/* Partner logos — text-based since we don't have real logos */}
          <motion.div
            variants={staggerContainer}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          >
            {partners.map((name) => (
              <motion.span
                key={name}
                variants={fadeInUp}
                className="text-sm font-semibold tracking-tight text-text-muted"
              >
                {name}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="mt-20">
            <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-background px-8 py-12">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                Ağınızı genişletmeye hazır mısınız?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base text-text-secondary">
                Önemli bağlantılar kurmak için WPE kullanan binlerce profesyonele katılın.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-accent-hover"
                >
                  Yaklaşan Etkinlikleri Keşfet <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
