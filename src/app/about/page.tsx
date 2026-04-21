import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export const metadata = {
  title: "Hakkında",
  description: "WPE hakkında ve anlamlı profesyonel bağlantılar kurma misyonumuz hakkında bilgi edinin.",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="section-padding border-b border-border">
          <div className="container-wide">
            <div className="mx-auto max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">WPE Hakkında</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
                Doğru ortamın her şeyi değiştirdiğine inanıyoruz
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-text-secondary">
                WPE, basit bir öncülden yola çıkarak kuruldu: networking etkinliklerinin çoğu zaman kaybından başka bir şey değil.
                Çok fazla insan, bağlam yok, yapı yok — sadece garip küçük sohbetler ve tekrarlanan kartvizitler.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                Bunu değiştirmeye çıktık. Her WPE etkinliği özenle seçilir — katılımcılar, mekan, format,
                sohbetler. Etkinliklerimiz networking kokteyllerinden çok özel akşam yemeklerine benziyor,
                çünkü en iyi bağlantılar ortam derinlik için tasarlandığında gerçekleşir.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight text-text-primary">Değerlerimiz</h2>
              <div className="mt-8 space-y-6">
                {[
                  {
                    title: "Kalite, nicelikten önemlidir",
                    body: "Katılımı kasıtlı olarak sınırlıyoruz. Küçük odalar daha iyi sohbetler yaratır.",
                  },
                  {
                    title: "Zamanınıza saygı",
                    body: "Her program maddesi bir amaca hizmet eder. Zamanında başlarız, zamanında biteriz ve tek bir dakikayı boşa harcamayız.",
                  },
                  {
                    title: "Farklı perspektifler",
                    body: "En değerli bağlantılar sektörler ve geçmişler arasında gerçekleşir. Uyum için değil, çeşitlilik için seçim yaparız.",
                  },
                  {
                    title: "Takip ve süreklilik",
                    body: "Etkinlikler sadece bir başlangıçtır. Oda boşaldıktan sonra da bağlantıda kalmanıza ve ivmeyi korumanıza yardımcı oluruz.",
                  },
                ].map((v) => (
                  <div key={v.title} className="border-l-2 border-accent pl-5">
                    <h3 className="font-semibold text-text-primary">{v.title}</h3>
                    <p className="mt-1 text-text-secondary">{v.body}</p>
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
