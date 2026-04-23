"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/motion"

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0F1E3C", minHeight: "92vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
    >
      {/* Spotlight glow effects */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute"
          style={{
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(184,150,12,0.08) 0%, transparent 70%)",
            top: "10%",
            left: "20%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(184,150,12,0.05) 0%, transparent 70%)",
            top: "60%",
            right: "10%",
          }}
        />
      </div>

      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #B8960C 30%, #B8960C 70%, transparent)" }} />

      {/* Main content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container-wide relative flex flex-1 flex-col items-center justify-center py-24 text-center"
      >
        {/* Label */}
        <motion.div variants={fadeInUp} className="mb-10">
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              color: "#B8960C",
              fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ display: "block", width: "24px", height: "1px", background: "#B8960C" }} />
            Executive Workshop Programs
            <span style={{ display: "block", width: "24px", height: "1px", background: "#B8960C" }} />
          </span>
        </motion.div>

        {/* MASSIVE display heading */}
        <motion.h1
          variants={fadeInUp}
          style={{
            fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
            fontWeight: 300,
            fontSize: "clamp(4rem, 12vw, 9rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            color: "#F8F5EF",
          }}
        >
          Next
          <br />
          <em style={{ fontStyle: "italic", color: "#B8960C" }}>Generation</em>
          <br />
          Leadership
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-8 max-w-lg"
          style={{
            color: "rgba(248,245,239,0.5)",
            fontSize: "15px",
            lineHeight: 1.8,
            letterSpacing: "0.02em",
          }}
        >
          Geleceğin liderlerini bugünden şekillendiren, seçkin yöneticiler için
          tasarlanmış dönüştürücü atölye programları.
        </motion.p>

        {/* Pill CTA */}
        <motion.div variants={fadeInUp} className="mt-12">
          <Link
            href="/events"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "#B8960C",
              color: "#0F1E3C",
              padding: "18px 40px",
              borderRadius: "9999px",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "all 0.2s",
            }}
          >
            → Programları Keşfet
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom bar — date left, location right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="container-wide relative flex items-center justify-between pb-8"
      >
        <span
          style={{
            color: "rgba(248,245,239,0.35)",
            fontSize: "12px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
          }}
        >
          İstanbul · 2025
        </span>
        <div className="flex items-center gap-6">
          {[
            { value: "500+", label: "Mezun" },
            { value: "48", label: "Program" },
            { value: "12 Yıl", label: "Deneyim" },
          ].map((s, i) => (
            <span key={i} style={{ color: "rgba(248,245,239,0.35)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <strong style={{ color: "#B8960C", fontWeight: 600 }}>{s.value}</strong>{" "}{s.label}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
