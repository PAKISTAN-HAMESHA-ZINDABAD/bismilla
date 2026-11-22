import { PROCESS_STEPS } from '../data/fabricationData';

export function ProcessSection() {
  return (
    <section
      id="process"
      className="border-b border-white/10 bg-[#1B1F24] py-16 text-white lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium tracking-wide text-[#E38849]">
              How We Work · 4-Step Fabrication Workflow
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white [text-wrap:balance] sm:text-4xl">
              From CAD sheet or site measurement to anchored installation.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#CBD2D9]">
            Our estimation desk and shop floor operate across three shifts, 24 hours a day, to keep urgent commercial pours and residential handovers on track.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <li
              key={step.number}
              className="flex flex-col justify-between border border-white/15 bg-[#121417] p-6"
            >
              <div>
                <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                  <span className="font-mono text-2xl font-medium text-[#E38849] tabular-nums">
                    {step.number}
                  </span>
                  <span className="font-mono text-xs text-[#9AA5B1] tabular-nums">
                    {step.timing}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#CBD2D9]">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
