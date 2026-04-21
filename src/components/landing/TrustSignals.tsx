"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { staggerContainer, fadeInUp } from "@/lib/motion"

const partners = [
  "Boğaziçi Üniversitesi",
  "INSEAD Alumni",
  "Harvard Business Network",
  "McKinsey Alumni Club",
  "Endeavor Türkiye",
  "TÜSİAD",
]

export function TrustSignals() {
  return (
    <section className="section-padding" style={{ backgroundColor: "#F8F5EF" }}>
      <div className="container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.p
            variants={fadeInUp}
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: "#8A96A8", letterSpacing: "0.18em" }}
          >
            İşbirliği Yapılan Kurumlar
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-5"
          >
            {partners.map((name, i) => (
              <motion.span
                key={name}
                variants={fadeInUp}
                className="text-sm font-medium tracking-wide"
                style={{
                  color: "#8A96A8",
                  fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                  fontSize: "15px",
                  letterSpacing: "0.03em",
                }}
              >
                {i > 0 && <span className="mr-12 opacity-0 absolute">/</span>}
                {name}
              </motion.span>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeInUp} className="my-16 flex justify-center">
            <div className="h-px w-24" style={{ background: "linear-gradient(90deg, transparent, #D9D2C5, transparent)" }} />
          </motion.div>

          {/* CTA block */}
          <motion.div variants={fadeInUp}>
            <div
              className="relative mx-auto max-w-3xl overflow-hidden px-10 py-16"
              style={{
                background: "#0F1E3C",
                borderRadius: "4px",
              }}
            >
              {/* Gold top border */}
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, transparent, #B8960C 30%, #B8960C 70%, transparent)" }} />

              <p
                className="text-xs uppercase tracking-[0.2em] mb-5"
                style={{ color: "#B8960C", fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif", letterSpacing: "0.2em" }}
              >
                Bir sonraki adım
              </p>
              <h2
                className="text-4xl font-light md:text-5xl"
                style={{ fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif", color: "#F8F5EF", lineHeight: 1.1 }}
              >
                Liderlik yolculuğunuza
                <br />
                <em style={{ fontStyle: "italic", color: "#B8960C" }}>bugün başlayın</em>
              </h2>
              <div className="my-6 flex justify-center">
                <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, #B8960C, transparent)" }} />
              </div>
              <p className="mx-auto max-w-md text-base" style={{ color: "rgba(248,245,239,0.6)" }}>
                EWP programlarına başvurun, geleceğin liderlik ekosisteminin parçası olun.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 text-sm font-semibold transition-all duration-200 hover:opacity-90"
                  style={{
                    background: "#B8960C",
                    color: "#F8F5EF",
                    borderRadius: "2px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    fontSize: "12px",
                  }}
                >
                  Programları Görüntüle <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium transition-all duration-200"
                  style={{
                    color: "rgba(248,245,239,0.6)",
                    border: "1px solid rgba(248,245,239,0.15)",
                    borderRadius: "2px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    fontSize: "12px",
                  }}
                >
                  Daha Fazla Bilgi
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
