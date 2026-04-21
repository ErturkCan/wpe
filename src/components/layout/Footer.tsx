import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-wide py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight text-text-primary">
              WPE
            </Link>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              Fark yaratan profesyoneller için premium iş dünyası networking etkinlikleri.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Platform
            </h4>
            <ul className="mt-4 space-y-3">
              {[
                { href: "/events", label: "Etkinlikleri Keşfet" },
                { href: "/about", label: "WPE Hakkında" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Hesap
            </h4>
            <ul className="mt-4 space-y-3">
              {[
                { href: "/login", label: "Giriş Yap" },
                { href: "/dashboard", label: "Panel" },
                { href: "/dashboard/registrations", label: "Etkinliklerim" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Yasal
            </h4>
            <ul className="mt-4 space-y-3">
              {[
                { href: "#", label: "Gizlilik Politikası" },
                { href: "#", label: "Kullanım Şartları" },
                { href: "#", label: "Çerez Politikası" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} WPE. Tüm hakları saklıdır.
          </p>
          <p className="text-sm text-text-muted">
            Profesyoneller tarafından profesyoneller için.
          </p>
        </div>
      </div>
    </footer>
  )
}
