"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/motion"

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0F1E3C", minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Background abstract grid */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gold grid lines */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(184,150,12,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,150,12,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
        {/* Spotlight glow left */}
        <div style={{
          position: "absolute", width: "700px", height: "700px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(184,150,12,0.07) 0%, transparent 65%)",
          top: "30%", left: "25%", transform: "translate(-50%,-50%)",
        }} />
        {/* Accent glow right */}
        <div style={{
          position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(184,150,12,0.05) 0%, transparent 65%)",
          top: "60%", right: "5%",
        }} />
      </div>

      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #B8960C 30%, #B8960C 70%, transparent)" }} />

      {/* Main two-column layout */}
      <div className="container-wide relative flex flex-1 items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full min-h-screen items-center">

          {/* LEFT — text content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center py-32 lg:py-0 pr-0 lg:pr-16"
          >
            {/* Label */}
            <motion.div variants={fadeInUp} className="mb-10">
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                color: "#B8960C",
                fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                fontSize: "11px", fontWeight: 500,
                letterSpacing: "0.28em", textTransform: "uppercase",
              }}>
                <span style={{ display: "block", width: "24px", height: "1px", background: "#B8960C" }} />
                Executive Workshop Programs
              </span>
            </motion.div>

            {/* Display heading */}
            <motion.h1
              variants={fadeInUp}
              style={{
                fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
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

            {/* Sub */}
            <motion.p
              variants={fadeInUp}
              className="mt-8 max-w-md"
              style={{ color: "rgba(248,245,239,0.55)", fontSize: "15px", lineHeight: 1.8, letterSpacing: "0.02em" }}
            >
              Geleceğin liderlerini bugünden şekillendiren, seçkin yöneticiler için
              tasarlanmış dönüştürücü atölye programları.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/events"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  background: "#B8960C", color: "#0F1E3C",
                  padding: "18px 40px", borderRadius: "9999px",
                  fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                }}
              >
                → Programları Keşfet
              </Link>
              <Link
                href="/about"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  color: "rgba(248,245,239,0.55)",
                  padding: "18px 24px",
                  fontSize: "13px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: "9999px",
                }}
              >
                Hakkımızda
              </Link>
            </motion.div>

            {/* Inline stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 flex items-center gap-10"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "2rem" }}
            >
              {[
                { value: "500+", label: "Mezun Yönetici" },
                { value: "48", label: "Program" },
                { value: "12 Yıl", label: "Deneyim" },
              ].map((s) => (
                <div key={s.label}>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                    fontSize: "28px", fontWeight: 600, color: "#B8960C", lineHeight: 1,
                  }}>{s.value}</p>
                  <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(248,245,239,0.35)", marginTop: "4px" }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — abstract visual panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex items-center justify-center relative"
            style={{ minHeight: "100vh" }}
          >
            {/* Geometric panel */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Outer frame */}
              <div style={{
                position: "absolute", inset: "80px 40px",
                border: "1px solid rgba(184,150,12,0.15)",
                borderRadius: "4px",
              }} />
              {/* Inner accent rect */}
              <div style={{
                position: "absolute", inset: "120px 80px",
                border: "1px solid rgba(184,150,12,0.08)",
                borderRadius: "4px",
              }} />

              {/* Center label */}
              <div className="relative flex flex-col items-center gap-4">
                <p style={{
                  fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                  fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase",
                  color: "rgba(184,150,12,0.4)",
                }}>
                  İstanbul · 2025
                </p>
                <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #B8960C, transparent)" }} />
              </div>

              {/* Decorative dots */}
              {[
                { top: "80px", left: "40px" },
                { top: "80px", right: "40px" },
                { bottom: "80px", left: "40px" },
                { bottom: "80px", right: "40px" },
              ].map((pos, i) => (
                <div key={i} style={{
                  position: "absolute", width: "6px", height: "6px", borderRadius: "50%",
                  background: "#B8960C", opacity: 0.4, ...pos,
                }} />
              ))}

              {/* Floating quote */}
              <div style={{
                position: "absolute", bottom: "140px", left: "60px", right: "60px",
                padding: "24px 28px",
                background: "rgba(184,150,12,0.06)",
                border: "1px solid rgba(184,150,12,0.12)",
                borderRadius: "4px",
              }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                  fontSize: "15px", fontStyle: "italic", color: "rgba(248,245,239,0.5)", lineHeight: 1.6,
                }}>
                  "Liderlik, bir pozisyon değil —<br />bir sorumluluk bilincidir."
                </p>
                <p style={{ fontSize: "11px", letterSpacing: "0.1em", color: "rgba(184,150,12,0.5)", marginTop: "12px", textTransform: "uppercase" }}>
                  EWP · Executive Workshop Programs
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
