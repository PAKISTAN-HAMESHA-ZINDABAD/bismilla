import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onQuoteClick: () => void;
}

const NAV_LINKS = [
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#projects', label: 'Projects' },
  { href: '#process', label: 'Process' },
  { href: '#quote', label: 'Request Quote' },
] as const;

export function Navbar({ onQuoteClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  const handleMobileQuote = () => {
    setMobileOpen(false);
    onQuoteClick();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#121417]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="font-display text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E38849] sm:text-lg"
        >
          Bismillah Steel Fabrication
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#CBD2D9] underline-offset-8 transition-colors duration-150 hover:text-white hover:underline whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E38849]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onQuoteClick}
            className="hidden min-h-[40px] items-center justify-center rounded-sm bg-[#C86D2D] px-4 py-2 text-sm font-semibold text-[#121417] transition-colors duration-150 hover:bg-[#DC7C38] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:inline-flex"
          >
            Get a Quote
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-white/15 bg-[#1B1F24] text-white transition-colors duration-150 hover:border-[#C86D2D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E38849] md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="border-t border-white/10 bg-[#1B1F24] px-4 py-4 md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="flex min-h-[44px] items-center border-b border-white/10 px-2 text-base font-medium text-[#E4E7EB] transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-[#E38849]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <button
                type="button"
                onClick={handleMobileQuote}
                className="flex min-h-[44px] w-full items-center justify-center rounded-sm bg-[#C86D2D] px-4 py-2.5 text-sm font-semibold text-[#121417] transition-colors duration-150 hover:bg-[#DC7C38] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get a Quote
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
