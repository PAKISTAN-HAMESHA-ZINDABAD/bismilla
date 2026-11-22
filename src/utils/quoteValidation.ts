import type { QuoteRole } from '../data/fabricationData';

export interface QuoteFormValues {
  name: string;
  phone: string;
  role: QuoteRole | '';
  projectType: string;
  city: string;
  details: string;
}

export type QuoteFormErrors = Partial<Record<keyof QuoteFormValues, string>>;

export interface QuoteSubmissionSummary {
  referenceCode: string;
  submittedAtLabel: string;
  name: string;
  phone: string;
  role: QuoteRole;
  projectType: string;
  city: string;
  details: string;
}

const PHONE_DIGIT_MIN = 10;
const PHONE_DIGIT_MAX = 15;

export function normalizePhoneDigits(raw: string): string {
  return raw.replace(/\D/g, '');
}

export function isValidPakistanPhone(raw: string): boolean {
  const trimmed = raw.trim();
  if (!trimmed) return false;
  if (/[^0-9+\-\s()]/.test(trimmed)) return false;

  const digits = normalizePhoneDigits(trimmed);
  if (digits.length < PHONE_DIGIT_MIN || digits.length > PHONE_DIGIT_MAX) {
    return false;
  }

  // Accept local 03xx / 042xx, 92xxx, or international +92 format
  return digits.startsWith('0') || digits.startsWith('92') || digits.length >= 10;
}

export function validateQuoteForm(values: QuoteFormValues): QuoteFormErrors {
  const errors: QuoteFormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Enter your full name or firm name (minimum 2 characters).';
  }

  if (!isValidPakistanPhone(values.phone)) {
    errors.phone =
      'Enter a valid phone or WhatsApp number (e.g. +92 300 1234567 or 0300 1234567).';
  }

  if (!values.role) {
    errors.role = 'Select whether you are an Architect, Builder, or Homeowner.';
  }

  if (!values.projectType.trim()) {
    errors.projectType = 'Select a fabrication project category.';
  }

  if (values.city.trim().length < 2) {
    errors.city = 'Select or specify your project city in Pakistan.';
  }

  if (values.details.trim().length < 15) {
    errors.details =
      'Provide brief dimensions, quantity, or timeline notes (at least 15 characters).';
  }

  return errors;
}

export function buildQuoteSummary(
  values: QuoteFormValues,
  now: Date = new Date()
): QuoteSubmissionSummary {
  const cleanRole: QuoteRole = values.role || 'Homeowner';
  const year = now.getFullYear();
  const suffix = String(
    Math.abs(
      Array.from(values.name.trim() + values.phone.trim()).reduce(
        (acc, ch) => (acc * 31 + ch.charCodeAt(0)) % 9000,
        1000
      )
    )
  ).padStart(4, '0');

  const formattedTime = now.toLocaleTimeString('en-PK', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return {
    referenceCode: `BSF-${year}-${suffix}`,
    submittedAtLabel: `Logged ${formattedTime} · 24-Hour Desk`,
    name: values.name.trim(),
    phone: values.phone.trim(),
    role: cleanRole,
    projectType: values.projectType.trim(),
    city: values.city.trim(),
    details: values.details.trim(),
  };
}
