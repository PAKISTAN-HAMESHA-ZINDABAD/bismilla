import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildQuoteSummary,
  isValidPakistanPhone,
  validateQuoteForm,
  type QuoteFormValues,
} from './quoteValidation';

test('isValidPakistanPhone accepts standard Pakistani mobile and landline formats', () => {
  assert.equal(isValidPakistanPhone('+92 300 4128890'), true);
  assert.equal(isValidPakistanPhone('0321-5544332'), true);
  assert.equal(isValidPakistanPhone('04235761234'), true);
  assert.equal(isValidPakistanPhone('12345'), false);
  assert.equal(isValidPakistanPhone('abc-300-1234567'), false);
});

test('validateQuoteForm catches all missing or invalid required fields', () => {
  const empty: QuoteFormValues = {
    name: '',
    phone: '99',
    role: '',
    projectType: '',
    city: '',
    details: 'short',
  };
  const errors = validateQuoteForm(empty);
  assert.ok(errors.name);
  assert.ok(errors.phone);
  assert.ok(errors.role);
  assert.ok(errors.projectType);
  assert.ok(errors.city);
  assert.ok(errors.details);
});

test('validateQuoteForm passes on valid complete quote input', () => {
  const valid: QuoteFormValues = {
    name: 'Studio Khawaja Architects',
    phone: '+92 300 8451209',
    role: 'Architect',
    projectType: 'Commercial Facade & Canopy',
    city: 'Lahore',
    details: 'Need shop drawing review and quote for a 14m perforated canopy in Gulberg III.',
  };
  const errors = validateQuoteForm(valid);
  assert.deepEqual(errors, {});

  const summary = buildQuoteSummary(valid, new Date('2026-11-21T23:30:00Z'));
  assert.match(summary.referenceCode, /^BSF-2026-\d{4}$/);
  assert.equal(summary.role, 'Architect');
  assert.equal(summary.city, 'Lahore');
});
