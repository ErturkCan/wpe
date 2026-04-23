"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { staggerContainer, fadeInUp } from "@/lib/motion"

const partners = [
  "Boğaziçi Üniversitesi",
  "INSEAD Alumni",
  "Harvard Business Network",
  "McKinsey Alumni",
  "Endeavor Türkiye",
  "TÜSİAD",
  "Sabancı Üniversitesi",
  "TEPAV",
]

const faqs = [
  {
    q: "EWP programlarına kimler başvurabilir?",
    a: "EWP programları C-suite yöneticiler, üst düzey direktörler ve liderlik yolculuğunda kritik bir dönüm noktasında olan profesyoneller için tasarlanmıştır.",
  },
  {
    q: "Başvuru süreci nasıl işliyor?",
    a: "Online başvuru formunu doldurmanızın ardından ekibimiz 48 saat içinde sizinle iletişime geçer. Kabul, katılımcı profili ve program uyumuna göre değerlendirilir.",
  },
  {
    q: "Programlar nerede düzenleniyor?",
    a: "Programlarımız İstanbul'daki seçkin mekânlarda yüz yüze; bazı Masterclass formatlarında ise hibrit olarak gerçekleştirilmektedir.",
  },
  {
    q: "Sertifika veriliyor mu?",
    a: "Evet. Tüm EWP programları uluslararası geçerliliğe sahip tamamlama sertifikası ile sonuçlanır.",
  },
]

export function TrustSignals() {
  return (
    <>
      {/* Partners section — cream */}
      <section style={{ backgroundColor: "#F8F5EF" }}>
        <div className="container-wide">
          <div className="flex items-center gap-4 py-10" style={{ borderBottom: "1px solid #D9D2C5" }}>
            <span style={{ color: "#B8960C", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif" }}>
              — İşbirliği Yapılan Kurumlar
            </span>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap items-center gap-x-10 gap-y-4 py-12"
          >
            {partners.map((p) => (
              <motion.span
                key={p}
                variants={fadeInUp}
                style={{
                  fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                  fontSize: "15px",
                  color: "#8A96A8",
                  letterSpacing: "0.03em",
                }}
              >
                {p}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ section — cream */}
      <section style={{ backgroundColor: "#F8F5EF", borderTop: "1px solid #D9D2C5" }}>
        <div className="container-wide">
          <div className="flex items-center justify-between py-10" style={{ borderBottom: "1px solid #D9D2C5" }}>
            <span style={{ color: "#B8960C", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif" }}>
              — Sık Sorulan Sorular
            </span>
            <Link href="/about" style={{ color: "#4D5F7A", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              → Bize Yazın
            </Link>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-0 lg:grid-cols-2"
          >
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
                Aklınızdaki
                <br />
                <em style={{ fontStyle: "italic", color: "#B8960C" }}>sorular</em>
              </h2>
            </motion.div>

            <motion.div variants={staggerContainer} className="flex flex-col lg:pl-0">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="py-7"
                  style={{ borderTop: "1px solid #D9D2C5" }}
                >
                  <p style={{ fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif", fontSize: "18px", fontWeight: 600, color: "#0F1E3C", marginBottom: "10px" }}>
                    {faq.q}
                  </p>
                  <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#4D5F7A" }}>{faq.a}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA — navy with spotlight */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#091528" }}>
        {/* Spotlight glows */}
        <div className="pointer-events-none absolute inset-0">
          <div style={{ position: "absolute", width: "700px", height: "400px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)", top: "50%", left: "30%", transform: "translate(-50%,-50%)" }} />
          <div style={{ position: "absolute", width: "500px", height: "300px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(184,150,12,0.06) 0%, transparent 70%)", top: "40%", right: "15%" }} />
        </div>

        <div className="container-wide relative">
          {/* Top bar */}
          <div className="flex items-center justify-between py-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif", fontSize: "16px", fontWeight: 600, color: "rgba(248,245,239,0.9)", letterSpacing: "0.05em" }}>
              <span style={{ color: "#B8960C" }}>[</span>EWP<span style={{ color: "#B8960C" }}>]</span>
            </span>
            <span style={{ color: "rgba(184,150,12,0.5)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>ewpfuture.com</span>
          </div>

          {/* Big CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="py-28 text-center"
          >
            <motion.h2
              variants={fadeInUp}
              style={{
                fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(3rem, 9vw, 7rem)",
                lineHeight: 1.0,
                color: "#F8F5EF",
                marginBottom: "2rem",
              }}
            >
              Liderlik yolculuğuna
              <br />
              <em style={{ fontStyle: "italic", color: "#B8960C" }}>bugün başla.</em>
            </motion.h2>
            <motion.p variants={fadeInUp} style={{ color: "rgba(248,245,239,0.45)", fontSize: "15px", marginBottom: "2.5rem" }}>
              EWP programlarına başvurun, geleceğin liderlik ekosisteminin parçası olun.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                href="/events"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "#B8960C",
                  color: "#0F1E3C",
                  padding: "18px 48px",
                  borderRadius: "9999px",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                → Programa Başvur
              </Link>
            </motion.div>
          </motion.div>

          {/* Bottom nav */}
          <div
            className="flex flex-wrap items-center justify-center gap-8 py-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {["Programlar", "Hakkımızda", "Giriş Yap", "Şartlar", "Gizlilik"].map((item, i) => (
              <Link
                key={item}
                href={i === 0 ? "/events" : i === 1 ? "/about" : i === 2 ? "/login" : "#"}
                style={{ color: "rgba(248,245,239,0.3)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
