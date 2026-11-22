import { useState } from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import {
  HERO_SPEC_HIGHLIGHTS,
  HERO_WORKSHOP_IMAGE,
} from '../data/fabricationData';

interface HeroSectionProps {
  onRequestQuote: () => void;
}

export function HeroSection({ onRequestQuote }: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="top"
      className="bg-[#121417] text-white border-b border-white/10"
    >
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-12 sm:px-6 lg:px-8 lg:pt-14 lg:pb-16">
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="font-mono text-xs tracking-wide text-[#E38849] [text-wrap:balance] tabular-nums">
                24-Hour Steel Fabrication · Across Pakistan
              </p>

              <h1 className="mt-4 max-w-xl font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.08] font-bold tracking-tight text-white [text-wrap:balance]">
                Architectural and structural steelwork built to drawing and site schedule.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#CBD2D9] sm:text-lg">
                Serving architects, builders, and homeowners across Pakistan with precision gates, cantilevered stairs, commercial facades, and structural steel—backed by round-the-clock workshop shifts.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onRequestQuote}
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-sm bg-[#C86D2D] px-6 py-3 text-sm font-semibold text-[#121417] transition-colors duration-150 hover:bg-[#DC7C38] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Request Custom Quote</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <a
                  href="#capabilities"
                  className="inline-flex min-h-[46px] items-center justify-center rounded-sm border border-white/20 bg-[#1B1F24] px-5 py-3 text-sm font-medium text-white transition-colors duration-150 hover:border-white/40 hover:bg-[#23282F] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E38849]"
                >
                  View Fabrication Scope
                </a>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-5">
              <p className="text-xs leading-relaxed text-[#9AA5B1]">
                Direct shop-floor fabrication for residential plots, commercial plazas, and industrial spans · CAD/DXF review and site measurement available 24 hours.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-72 w-full overflow-hidden rounded-sm border border-white/15 bg-[#1B1F24] sm:h-96 lg:h-full lg:min-h-[420px]">
              {!imageError ? (
                <img
                  src={HERO_WORKSHOP_IMAGE}
                  alt="Precision structural I-beams and CNC laser-cut architectural steel louvers inside Bismillah Steel Fabrication workshop"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#1B1F24] to-[#121417] p-6 text-center">
                  <Layers className="h-10 w-10 text-[#E38849]" aria-hidden="true" />
                  <p className="mt-3 font-display text-base font-semibold text-white">
                    Bismillah Steel Fabrication Workshop Bay
                  </p>
                  <p className="mt-1 text-xs text-[#9AA5B1]">
                    CNC Laser Cutting · Heavy Structural Welding · Powder Coating
                  </p>
                </div>
              )}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121417]/85 via-[#121417]/20 to-transparent"
              />

              <div className="absolute right-0 bottom-0 left-0 border-t border-white/15 bg-[#121417]/85 px-5 py-3.5 backdrop-blur-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#E4E7EB]">
                  <span className="font-medium text-white">
                    Workshop Floor &amp; Heavy Assembly Bay
                  </span>
                  <span className="font-mono text-[#E38849] tabular-nums">
                    Open 24 Hours · Day &amp; Night Shifts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          aria-label="Fabrication specification highlights"
          className="mt-10 grid grid-cols-1 divide-y divide-white/10 border border-white/15 bg-[#1B1F24] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x"
        >
          {HERO_SPEC_HIGHLIGHTS.map((item, idx) => (
            <div
              key={item.label}
              className={`p-5 ${
                idx < 2 ? 'sm:border-b sm:border-white/10 lg:border-b-0' : ''
              } ${idx % 2 === 0 ? 'sm:border-r sm:border-white/10 lg:border-r-0' : ''}`}
            >
              <div className="text-xs font-medium text-[#9AA5B1]">
                {item.label}
              </div>
              <div className="mt-1.5 font-mono text-sm font-medium text-white tabular-nums">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
