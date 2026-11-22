export function Footer() {
  return (
    <footer className="bg-[#121417] text-[#CBD2D9]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-lg font-bold tracking-tight text-white">
              Bismillah Steel Fabrication
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#9AA5B1]">
              Custom architectural and structural steelwork serving architects, commercial builders, and residential homeowners across Pakistan with continuous 24-hour workshop operations.
            </p>
            <p className="mt-4 font-mono text-xs text-[#E38849] tabular-nums">
              Operating 24 Hours · Lahore · Islamabad · Karachi · Nationwide
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-white">
              Sections
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="#capabilities"
                  className="text-[#9AA5B1] transition-colors duration-150 hover:text-white"
                >
                  Who We Serve &amp; Scope
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-[#9AA5B1] transition-colors duration-150 hover:text-white"
                >
                  Sample Project Archetypes
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  className="text-[#9AA5B1] transition-colors duration-150 hover:text-white"
                >
                  4-Step Process
                </a>
              </li>
              <li>
                <a
                  href="#quote"
                  className="text-[#9AA5B1] transition-colors duration-150 hover:text-white"
                >
                  Request Custom Quote
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-white">
              24-Hour Desk (Demo)
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#9AA5B1]">
              <li className="font-mono text-xs tabular-nums">
                Phone / WhatsApp: +92 300 000 2470
              </li>
              <li>Estimation: 24/7 Shift Coverage</li>
              <li>Workshop: Industrial Area, Lahore</li>
              <li>Site Dispatch: All Major Cities</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[#7B8794] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Bismillah Steel Fabrication. Demonstration website.</p>
          <p className="font-mono tabular-nums">
            Custom Steel Fabrication · Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
