export default function Footer() {
  const columns = [
    {
      title: "Explore",
      links: [
        { label: "Home", href: "/" },
        { label: "Showcase", href: "/showcase" },
        { label: "About", href: "/about" },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "Login", href: "/login" },
        { label: "Register", href: "/register" },
        { label: "Dashboard", href: "/dashboard" },
      ],
    },
  ];

  return (
    <footer className="mt-auto bg-pine-950 text-paper/70">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="stamp h-9 w-9 border-marigold/70 text-marigold" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none">
                  <path
                    d="M12 3 4 8v13h16V8l-8-5Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <path d="M9 21v-7h6v7" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-display text-lg text-paper">
                RuralStay<span className="font-mono text-marigold">.ai</span>
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              An AI-powered rural homestay platform connecting travelers with
              hand-verified village stays across India — supporting local
              hosts and sustainable tourism, one booking at a time.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-marigold">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="transition-colors hover:text-marigold">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-pine-800 pt-6 text-xs sm:flex-row">
          <p>© 2026 RuralStay AI — AI-Powered Rural Homestay Booking Platform</p>
          <p className="font-mono text-paper/50">Made for travelers who take the long way</p>
        </div>
      </div>
    </footer>
  );
}
