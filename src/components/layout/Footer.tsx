import Link from "next/link"
import { EWPLogo } from "@/components/layout/EWPLogo"

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #D9D2C5", backgroundColor: "#0F1E3C" }}>
      <div className="container-wide py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <EWPLogo variant="light" size="sm" />
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(248,245,239,0.5)" }}>
              Geleceğin liderlerini bugünden şekillendiren,
              seçkin yöneticiler için liderlik akademisi.
            </p>
            <p
              className="mt-3 text-xs uppercase tracking-widest"
              style={{ color: "rgba(184,150,12,0.6)", letterSpacing: "0.15em" }}
            >
              ewpfuture.com
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(248,245,239,0.3)", letterSpacing: "0.15em" }}>
              Akademi
            </h4>
            <ul className="mt-4 space-y-3">
              {[
                { href: "/events", label: "Programlar" },
                { href: "/about", label: "EWP Hakkında" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors" style={{ color: "rgba(248,245,239,0.5)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(248,245,239,0.3)", letterSpacing: "0.15em" }}>
              Hesap
            </h4>
            <ul className="mt-4 space-y-3">
              {[
                { href: "/login", label: "Giriş Yap" },
                { href: "/dashboard", label: "Panel" },
                { href: "/dashboard/registrations", label: "Programlarım" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors" style={{ color: "rgba(248,245,239,0.5)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(248,245,239,0.3)", letterSpacing: "0.15em" }}>
              Yasal
            </h4>
            <ul className="mt-4 space-y-3">
              {[
                { href: "#", label: "Gizlilik Politikası" },
                { href: "#", label: "Kullanım Şartları" },
                { href: "#", label: "Çerez Politikası" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors" style={{ color: "rgba(248,245,239,0.5)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-10 flex flex-col items-start justify-between gap-4 pt-8 sm:flex-row sm:items-center"
          style={{ borderTop: "1px solid rgba(248,245,239,0.08)" }}
        >
          <p className="text-sm" style={{ color: "rgba(248,245,239,0.3)" }}>
            © {new Date().getFullYear()} EWP — Executive Workshop Programs. Tüm hakları saklıdır.
          </p>
          <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(184,150,12,0.4)", letterSpacing: "0.12em" }}>
            Next Generation Leadership Academy
          </p>
        </div>
      </div>
    </footer>
  )
}
