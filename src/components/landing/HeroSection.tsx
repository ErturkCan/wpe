"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/motion"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#0F1E3C" }}>
      {/* Subtle texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #B8960C 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Gradient overlay bottom */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{ background: "linear-gradient(to bottom, transparent, #0F1E3C)" }}
      />
      {/* Gold accent line top */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, transparent, #B8960C 30%, #B8960C 70%, transparent)" }} />

      <div className="container-wide relative py-32 md:py-48">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-5xl text-center"
        >
          {/* Academy label */}
          <motion.div variants={fadeInUp} className="mb-8 flex items-center justify-center">
            <span
              className="inline-flex items-center gap-3 px-5 py-2 text-xs tracking-[0.2em] uppercase"
              style={{
                color: "#B8960C",
                border: "1px solid rgba(184,150,12,0.3)",
                borderRadius: "2px",
                fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                fontWeight: 500,
                fontSize: "11px",
                letterSpacing: "0.25em",
              }}
            >
              <span className="h-px w-5" style={{ background: "#B8960C" }} />
              Next Generation Leadership Academy
              <span className="h-px w-5" style={{ background: "#B8960C" }} />
            </span>
          </motion.div>

          {/* Main headline — serif */}
          <motion.h1
            variants={fadeInUp}
            style={{
              fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(3rem, 8vw, 6rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "#F8F5EF",
            }}
          >
            Liderliği
            <br />
            <em style={{ fontStyle: "italic", color: "#B8960C" }}>Yeniden Tanımla</em>
          </motion.h1>

          {/* Gold rule */}
          <motion.div variants={fadeInUp} className="my-8 flex justify-center">
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #B8960C, transparent)" }} />
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="mx-auto max-w-2xl text-base md:text-lg"
            style={{ color: "rgba(248,245,239,0.65)", lineHeight: 1.8, letterSpacing: "0.01em" }}
          >
            EWP, üst düzey yöneticiler ve geleceğin liderlerini bir araya getiren, stratejik düşünce,
            etki ve dönüşüm odaklı özel atölye programları sunan seçkin bir liderlik akademisidir.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/events"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 text-sm font-semibold transition-all duration-200"
              style={{
                background: "#B8960C",
                color: "#F8F5EF",
                borderRadius: "2px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontSize: "12px",
              }}
            >
              Programları Keşfet
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium transition-all duration-200"
              style={{
                color: "rgba(248,245,239,0.7)",
                border: "1px solid rgba(248,245,239,0.2)",
                borderRadius: "2px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontSize: "12px",
              }}
            >
              Akademi Hakkında
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeInUp}
            className="mt-20 flex flex-col items-center justify-center gap-0 sm:flex-row"
          >
            {[
              { value: "500+", label: "Mezun Lider" },
              { value: "48", label: "Program" },
              { value: "12", label: "Yıllık Deneyim" },
              { value: "4.9", label: "Memnuniyet" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                <div className="px-8 py-4 text-center">
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                      fontSize: "2rem",
                      fontWeight: 600,
                      color: "#B8960C",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="mt-1 text-xs uppercase tracking-widest"
                    style={{ color: "rgba(248,245,239,0.45)", letterSpacing: "0.15em" }}
                  >
                    {stat.label}
                  </p>
                </div>
                {i < 3 && (
                  <div className="hidden h-8 w-px sm:block" style={{ background: "rgba(184,150,12,0.25)" }} />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
