import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import {
  AUDIENCE_PROFILES,
  FABRICATION_CAPABILITIES,
  type AudienceKey,
  type QuoteRole,
} from '../data/fabricationData';

interface CapabilitiesSectionProps {
  onSelectAudienceForQuote: (role: QuoteRole) => void;
}

const ROLE_MAP: Record<AudienceKey, QuoteRole> = {
  architects: 'Architect',
  builders: 'Builder',
  homeowners: 'Homeowner',
};

export function CapabilitiesSection({
  onSelectAudienceForQuote,
}: CapabilitiesSectionProps) {
  const [selectedAudience, setSelectedAudience] =
    useState<AudienceKey>('architects');

  const activeProfile =
    AUDIENCE_PROFILES.find((profile) => profile.key === selectedAudience) ??
    AUDIENCE_PROFILES[0];

  return (
    <section
      id="capabilities"
      className="border-b border-[#D8DEE4] bg-[#F6F7F8] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-medium tracking-wide text-[#9E4C14]">
            Who We Serve &amp; Fabrication Scope
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#121417] [text-wrap:balance] sm:text-4xl">
            Built for architectural detail, contractor timelines, and residential longevity.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#4A5562]">
            Select your role below to review how our 24-hour workshop integrates with drawings, site schedules, and residential measurements.
          </p>
        </div>

        <div className="mt-10 border border-[#D5DCE2] bg-white">
          <div
            role="tablist"
            aria-label="Client discipline selector"
            className="grid grid-cols-1 border-b border-[#D5DCE2] bg-[#EDF0F3] sm:grid-cols-3"
          >
            {AUDIENCE_PROFILES.map((profile) => {
              const isActive = profile.key === selectedAudience;
              return (
                <button
                  key={profile.key}
                  role="tab"
                  type="button"
                  id={`audience-tab-${profile.key}`}
                  aria-selected={isActive}
                  aria-controls={`audience-panel-${profile.key}`}
                  onClick={() => setSelectedAudience(profile.key)}
                  className={`flex min-h-[48px] items-center justify-between border-b border-[#D5DCE2] px-5 py-3.5 text-left text-sm font-semibold transition-colors duration-150 whitespace-nowrap sm:border-r sm:border-b-0 last:border-b-0 last:sm:border-r-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#121417] ${
                    isActive
                      ? 'bg-white text-[#121417] shadow-[inset_0_-2px_0_0_#C86D2D]'
                      : 'text-[#4A5562] hover:bg-white/60 hover:text-[#121417]'
                  }`}
                >
                  <span>{profile.label}</span>
                  <span
                    className={`font-mono text-xs tabular-nums ${
                      isActive ? 'text-[#9E4C14]' : 'text-[#6B7785]'
                    }`}
                  >
                    {profile.key === 'architects'
                      ? '01'
                      : profile.key === 'builders'
                        ? '02'
                        : '03'}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`audience-panel-${activeProfile.key}`}
            aria-labelledby={`audience-tab-${activeProfile.key}`}
            className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:items-start"
          >
            <div className="lg:col-span-6">
              <h3 className="font-display text-2xl font-bold tracking-tight text-[#121417] [text-wrap:balance]">
                {activeProfile.headline}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#4A5562]">
                {activeProfile.summary}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    onSelectAudienceForQuote(ROLE_MAP[activeProfile.key])
                  }
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-sm bg-[#121417] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#23282F] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C86D2D]"
                >
                  <span>Request Quote as {ROLE_MAP[activeProfile.key]}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="font-mono text-xs text-[#9E4C14]">
                  {activeProfile.coordinationNote}
                </span>
              </div>
            </div>

            <div className="border-t border-[#E2E7EC] pt-6 lg:col-span-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <div className="text-xs font-semibold tracking-wide text-[#52606D]">
                Standard Deliverables
              </div>
              <ul className="mt-4 space-y-3.5">
                {activeProfile.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[#1F2933]">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#9E4C14]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#D5DCE2] pb-4">
            <h3 className="font-display text-2xl font-bold tracking-tight text-[#121417]">
              Core Fabrication Capabilities
            </h3>
            <p className="font-mono text-xs text-[#52606D] tabular-nums">
              04 Workshop Disciplines · 24-Hour Continuous Operation
            </p>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {FABRICATION_CAPABILITIES.map((cap) => (
              <article
                key={cap.index}
                className="flex flex-col justify-between border border-[#D5DCE2] bg-white p-6 transition-colors duration-150 hover:border-[#9AA5B1] sm:p-7"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="font-display text-xl font-bold tracking-tight text-[#121417]">
                      {cap.index}. {cap.title}
                    </h4>
                    <span className="font-mono text-xs font-medium text-[#9E4C14] whitespace-nowrap shrink-0 tabular-nums">
                      {cap.turnaround}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#4A5562] sm:text-base">
                    {cap.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#E6EAEF] pt-3.5 font-mono text-xs text-[#52606D] tabular-nums">
                  {cap.specs}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
