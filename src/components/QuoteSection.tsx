import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Clock, Loader2, MapPin, Phone } from 'lucide-react';
import {
  PAKISTAN_CITIES,
  PROJECT_TYPES,
  type QuoteRole,
} from '../data/fabricationData';
import {
  buildQuoteSummary,
  validateQuoteForm,
  type QuoteFormErrors,
  type QuoteFormValues,
  type QuoteSubmissionSummary,
} from '../utils/quoteValidation';

interface QuoteSectionProps {
  prefillRole?: QuoteRole | '';
  prefillProjectType?: string;
  prefillVersion: number;
}

const ROLES: QuoteRole[] = ['Architect', 'Builder', 'Homeowner'];

const INITIAL_VALUES: QuoteFormValues = {
  name: '',
  phone: '',
  role: '',
  projectType: '',
  city: '',
  details: '',
};

export function QuoteSection({
  prefillRole,
  prefillProjectType,
  prefillVersion,
}: QuoteSectionProps) {
  const [values, setValues] = useState<QuoteFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSummary, setSubmittedSummary] =
    useState<QuoteSubmissionSummary | null>(null);

  useEffect(() => {
    if (prefillVersion === 0) return;

    setSubmittedSummary(null);
    setValues((prev) => ({
      ...prev,
      role: prefillRole || prev.role,
      projectType: prefillProjectType || prev.projectType,
    }));
    setErrors((prev) => ({
      ...prev,
      ...(prefillRole ? { role: undefined } : {}),
      ...(prefillProjectType ? { projectType: undefined } : {}),
    }));
  }, [prefillRole, prefillProjectType, prefillVersion]);

  const updateField = <K extends keyof QuoteFormValues>(
    field: K,
    nextValue: QuoteFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [field]: nextValue }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateQuoteForm(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorField = Object.keys(validationErrors)[0];
      const fieldIdMap: Record<string, string> = {
        name: 'quote-name',
        phone: 'quote-phone',
        role: 'quote-role-architect',
        projectType: 'quote-project-type',
        city: 'quote-city',
        details: 'quote-details',
      };
      const targetId = fieldIdMap[firstErrorField];
      if (targetId) {
        document.getElementById(targetId)?.focus();
      }
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    window.setTimeout(() => {
      const summary = buildQuoteSummary(values);
      setSubmittedSummary(summary);
      setIsSubmitting(false);
    }, 450);
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setSubmittedSummary(null);
  };

  return (
    <section
      id="quote"
      className="border-b border-[#D8DEE4] bg-[#F6F7F8] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs font-medium tracking-wide text-[#9E4C14]">
              Quote &amp; Consultation Desk
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#121417] [text-wrap:balance] sm:text-4xl">
              Request a fabrication estimate or site measurement.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#4A5562]">
              Submit your project scope below. Our 24-hour estimation desk reviews BOQs, elevation drawings, and residential plot sizes to issue structured rate and turnaround feedback.
            </p>

            <div className="mt-8 border border-[#D5DCE2] bg-white p-6">
              <h3 className="font-display text-base font-bold text-[#121417]">
                24-Hour Dispatch &amp; Workshop Desk
              </h3>

              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex items-start gap-3 border-b border-[#E6EAEF] pb-4">
                  <Clock
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#9E4C14]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-medium text-[#121417]">
                      Operating Hours
                    </dt>
                    <dd className="mt-0.5 font-mono text-xs text-[#4A5562] tabular-nums">
                      Open 24 Hours · 7 Days a Week (3 Workshop Shifts)
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-b border-[#E6EAEF] pb-4">
                  <Phone
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#9E4C14]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-medium text-[#121417]">
                      Phone &amp; WhatsApp Estimation Line
                    </dt>
                    <dd className="mt-0.5 font-mono text-xs text-[#4A5562] tabular-nums">
                      +92 300 000 2470 · Demo Inquiry Desk
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#9E4C14]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-medium text-[#121417]">
                      Fabrication &amp; Erection Corridor
                    </dt>
                    <dd className="mt-0.5 text-xs leading-relaxed text-[#4A5562]">
                      Lahore · Islamabad / Rawalpindi · Karachi · Faisalabad · Multan · Nationwide Freight &amp; Site Teams
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-[#D5DCE2] bg-white p-6 sm:p-8">
              {submittedSummary ? (
                <div
                  data-testid="quote-confirmation"
                  aria-live="polite"
                  className="space-y-6"
                >
                  <div className="flex items-start gap-3 border-b border-[#E6EAEF] pb-5">
                    <CheckCircle2
                      className="mt-0.5 h-6 w-6 shrink-0 text-[#1F6F43]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-mono text-xs font-medium text-[#1F6F43] tabular-nums">
                        {submittedSummary.referenceCode} ·{' '}
                        {submittedSummary.submittedAtLabel}
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-bold text-[#121417]">
                        Quote Request Received
                      </h3>
                      <p className="mt-1.5 text-sm text-[#4A5562]">
                        Demo inquiry logged for our 24-hour estimation team. An engineer will follow up via phone or WhatsApp to confirm drawings or site timing.
                      </p>
                    </div>
                  </div>

                  <dl className="grid gap-4 border border-[#E2E7EC] bg-[#F6F7F8] p-5 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-xs font-medium text-[#52606D]">
                        Contact Name
                      </dt>
                      <dd className="mt-1 font-semibold text-[#121417]">
                        {submittedSummary.name}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-[#52606D]">
                        Phone / WhatsApp
                      </dt>
                      <dd className="mt-1 font-mono font-medium text-[#121417] tabular-nums">
                        {submittedSummary.phone}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-[#52606D]">
                        Client Role
                      </dt>
                      <dd className="mt-1 font-semibold text-[#121417]">
                        {submittedSummary.role}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-[#52606D]">
                        City / Location
                      </dt>
                      <dd className="mt-1 font-semibold text-[#121417]">
                        {submittedSummary.city}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-xs font-medium text-[#52606D]">
                        Project Scope
                      </dt>
                      <dd className="mt-1 font-semibold text-[#121417]">
                        {submittedSummary.projectType}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-xs font-medium text-[#52606D]">
                        Submitted Brief
                      </dt>
                      <dd className="mt-1 leading-relaxed text-[#3E4C59]">
                        {submittedSummary.details}
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <p className="text-xs text-[#52606D]">
                      Note: This interactive demo validates and generates a confirmation summary locally.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex min-h-[42px] items-center justify-center rounded-sm border border-[#121417] bg-white px-5 py-2 text-sm font-semibold text-[#121417] transition-colors duration-150 hover:bg-[#121417] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C86D2D]"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="quote-name"
                        className="block text-sm font-medium text-[#121417]"
                      >
                        Full Name or Firm Name
                      </label>
                      <input
                        id="quote-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={values.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={
                          errors.name ? 'quote-name-error' : undefined
                        }
                        placeholder="e.g. Tariq Mehmood / Studio Line"
                        className={`mt-1.5 block min-h-[44px] w-full rounded-sm border bg-white px-3.5 py-2.5 text-sm text-[#121417] placeholder:text-[#7B8794] focus:outline-2 focus:outline-offset-0 focus:outline-[#121417] ${
                          errors.name ? 'border-[#B42318]' : 'border-[#CBD2D9]'
                        }`}
                      />
                      {errors.name && (
                        <p
                          id="quote-name-error"
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-[#B42318]"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="quote-phone"
                        className="block text-sm font-medium text-[#121417]"
                      >
                        Phone or WhatsApp Number
                      </label>
                      <input
                        id="quote-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={values.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={
                          errors.phone ? 'quote-phone-error' : undefined
                        }
                        placeholder="e.g. +92 300 1234567"
                        className={`mt-1.5 block min-h-[44px] w-full rounded-sm border bg-white px-3.5 py-2.5 font-mono text-sm text-[#121417] placeholder:font-sans placeholder:text-[#7B8794] focus:outline-2 focus:outline-offset-0 focus:outline-[#121417] ${
                          errors.phone ? 'border-[#B42318]' : 'border-[#CBD2D9]'
                        }`}
                      />
                      {errors.phone && (
                        <p
                          id="quote-phone-error"
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-[#B42318]"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <fieldset>
                    <legend className="text-sm font-medium text-[#121417]">
                      Your Role
                    </legend>
                    <div className="mt-2 grid grid-cols-3 gap-3">
                      {ROLES.map((roleOption) => {
                        const checked = values.role === roleOption;
                        return (
                          <label
                            key={roleOption}
                            className={`flex min-h-[44px] cursor-pointer items-center justify-center rounded-sm border px-3 py-2 text-sm font-medium transition-colors duration-150 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#121417] ${
                              checked
                                ? 'border-[#121417] bg-[#121417] text-white'
                                : 'border-[#CBD2D9] bg-[#F6F7F8] text-[#3E4C59] hover:border-[#9AA5B1] hover:text-[#121417]'
                            }`}
                          >
                            <input
                              id={`quote-role-${roleOption.toLowerCase()}`}
                              type="radio"
                              name="role"
                              value={roleOption}
                              checked={checked}
                              onChange={() => updateField('role', roleOption)}
                              className="sr-only"
                            />
                            <span>{roleOption}</span>
                          </label>
                        );
                      })}
                    </div>
                    {errors.role && (
                      <p
                        id="quote-role-error"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-[#B42318]"
                      >
                        {errors.role}
                      </p>
                    )}
                  </fieldset>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="quote-project-type"
                        className="block text-sm font-medium text-[#121417]"
                      >
                        Project Type
                      </label>
                      <select
                        id="quote-project-type"
                        name="projectType"
                        value={values.projectType}
                        onChange={(e) =>
                          updateField('projectType', e.target.value)
                        }
                        aria-invalid={Boolean(errors.projectType)}
                        aria-describedby={
                          errors.projectType
                            ? 'quote-project-type-error'
                            : undefined
                        }
                        className={`mt-1.5 block min-h-[44px] w-full rounded-sm border bg-white px-3.5 py-2.5 text-sm text-[#121417] focus:outline-2 focus:outline-offset-0 focus:outline-[#121417] ${
                          errors.projectType
                            ? 'border-[#B42318]'
                            : 'border-[#CBD2D9]'
                        }`}
                      >
                        <option value="">Select scope category</option>
                        {PROJECT_TYPES.map((typeOption) => (
                          <option key={typeOption} value={typeOption}>
                            {typeOption}
                          </option>
                        ))}
                      </select>
                      {errors.projectType && (
                        <p
                          id="quote-project-type-error"
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-[#B42318]"
                        >
                          {errors.projectType}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="quote-city"
                        className="block text-sm font-medium text-[#121417]"
                      >
                        Location / City in Pakistan
                      </label>
                      <select
                        id="quote-city"
                        name="city"
                        value={values.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        aria-invalid={Boolean(errors.city)}
                        aria-describedby={
                          errors.city ? 'quote-city-error' : undefined
                        }
                        className={`mt-1.5 block min-h-[44px] w-full rounded-sm border bg-white px-3.5 py-2.5 text-sm text-[#121417] focus:outline-2 focus:outline-offset-0 focus:outline-[#121417] ${
                          errors.city ? 'border-[#B42318]' : 'border-[#CBD2D9]'
                        }`}
                      >
                        <option value="">Select city</option>
                        {PAKISTAN_CITIES.map((cityOption) => (
                          <option key={cityOption} value={cityOption}>
                            {cityOption}
                          </option>
                        ))}
                      </select>
                      {errors.city && (
                        <p
                          id="quote-city-error"
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-[#B42318]"
                        >
                          {errors.city}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="quote-details"
                      className="block text-sm font-medium text-[#121417]"
                    >
                      Brief Project Details
                    </label>
                    <textarea
                      id="quote-details"
                      name="details"
                      rows={4}
                      value={values.details}
                      onChange={(e) => updateField('details', e.target.value)}
                      aria-invalid={Boolean(errors.details)}
                      aria-describedby={
                        errors.details ? 'quote-details-error' : undefined
                      }
                      placeholder="Include approximate width/height, number of openings, preferred finish, or target site installation date."
                      className={`mt-1.5 block w-full rounded-sm border bg-white px-3.5 py-2.5 text-sm text-[#121417] placeholder:text-[#7B8794] focus:outline-2 focus:outline-offset-0 focus:outline-[#121417] ${
                        errors.details ? 'border-[#B42318]' : 'border-[#CBD2D9]'
                      }`}
                    />
                    {errors.details && (
                      <p
                        id="quote-details-error"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-[#B42318]"
                      >
                        {errors.details}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 border-t border-[#E6EAEF] pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-mono text-xs text-[#52606D] tabular-nums">
                      24-Hour Estimation Desk · CAD &amp; Site Visits
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-sm bg-[#C86D2D] px-6 py-3 text-sm font-semibold text-[#121417] transition-colors duration-150 hover:bg-[#DC7C38] disabled:cursor-not-allowed disabled:opacity-70 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#121417]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2
                            className="h-4 w-4 animate-spin"
                            aria-hidden="true"
                          />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <span>Submit Quote Request</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
