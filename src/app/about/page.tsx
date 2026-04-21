import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export const metadata = {
  title: "Hakkımızda",
  description: "EWP — Next Generation Leadership Academy misyonu ve değerleri hakkında bilgi edinin.",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="section-padding border-b border-border" style={{ backgroundColor: "#F8F5EF" }}>
          <div className="container-wide">
            <div className="mx-auto max-w-3xl">
              <p
                className="text-xs uppercase tracking-[0.2em]"
                style={{ color: "#B8960C", fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif", letterSpacing: "0.2em" }}
              >
                EWP Hakkında
              </p>
              <h1
                className="mt-4 text-5xl font-light md:text-6xl"
                style={{ fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif", color: "#0F1E3C", lineHeight: 1.1 }}
              >
                Liderlik bir <em style={{ fontStyle: "italic", color: "#B8960C" }}>yolculuktur</em>,
                <br />varış noktası değil
              </h1>
              <div className="my-6 w-12 h-px" style={{ background: "linear-gradient(90deg, #B8960C, transparent)" }} />
              <p className="mt-4 text-lg leading-relaxed" style={{ color: "#4D5F7A" }}>
                EWP (Executive Workshop Programs), üst düzey yöneticilerin ve geleceğin liderlerinin stratejik yetkinliklerini
                geliştirdiği, küresel düşünce liderleriyle bir araya geldiği seçkin bir liderlik akademisidir.
              </p>
              <p className="mt-4 text-lg leading-relaxed" style={{ color: "#4D5F7A" }}>
                Her programımız yalnızca davetliye özel ya da titizlikle incelenerek kabul edilen katılımcılarla gerçekleşir.
                Amacımız tek: doğru insanları, doğru içerikle, doğru ortamda buluşturmak.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ backgroundColor: "#F8F5EF" }}>
          <div className="container-wide">
            <div className="mx-auto max-w-3xl">
              <h2
                className="text-3xl font-light"
                style={{ fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif", color: "#0F1E3C" }}
              >
                Temel İlkelerimiz
              </h2>
              <div className="mt-8 space-y-6">
                {[
                  {
                    title: "Kalite, nicelikten önce gelir",
                    body: "Katılımı kasıtlı olarak sınırlıyoruz. Daha küçük gruplar, daha derin dönüşümler yaratır.",
                  },
                  {
                    title: "Zamanınıza saygı",
                    body: "Her program oturumu bir amaca hizmet eder. Zamanında başlarız, zamanında biteriz.",
                  },
                  {
                    title: "Çeşitli perspektifler",
                    body: "En değerli liderlik dersleri, sektörler ve geçmişler arasındaki diyalogdan doğar.",
                  },
                  {
                    title: "Kalıcı etki",
                    body: "Program sonrasında da mezunlarımızla bağlantıda kalarak öğrenmeyi ve büyümeyi sürdürürüz.",
                  },
                ].map((v) => (
                  <div key={v.title} className="border-l-2 pl-5" style={{ borderColor: "#B8960C" }}>
                    <h3 className="font-semibold" style={{ color: "#0F1E3C" }}>{v.title}</h3>
                    <p className="mt-1" style={{ color: "#4D5F7A" }}>{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
