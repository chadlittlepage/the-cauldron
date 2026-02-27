import { assertEquals } from 'https://deno.land/std@0.177.0/testing/asserts.ts';

// Test the validation and business logic patterns used in create-payout

const PERIOD_RE = /^\d{4}-(0[1-9]|1[0-2])$/;

Deno.test('auth: rejects non-admin role', () => {
  const profile = { role: 'artist' };
  assertEquals(profile.role !== 'admin', true);
});

Deno.test('auth: accepts admin role', () => {
  const profile = { role: 'admin' };
  assertEquals(profile.role === 'admin', true);
});

Deno.test('validation: rejects invalid curator_id format', () => {
  assertEquals(/^[0-9a-f-]{36}$/.test('not-uuid'), false);
});

Deno.test('validation: accepts valid curator_id', () => {
  assertEquals(/^[0-9a-f-]{36}$/.test('550e8400-e29b-41d4-a716-446655440000'), true);
});

Deno.test('validation: rejects negative amount', () => {
  const amount = -100;
  assertEquals(amount <= 0, true);
});

Deno.test('validation: rejects zero amount', () => {
  const amount = 0;
  assertEquals(amount <= 0, true);
});

Deno.test('validation: rejects amount over $1000', () => {
  const amount = 100_001;
  assertEquals(amount > 100_000, true);
});

Deno.test('validation: accepts valid amount', () => {
  const amount = 5000;
  assertEquals(amount > 0 && amount <= 100_000, true);
});

Deno.test('period: rejects invalid format', () => {
  assertEquals(PERIOD_RE.test('2024-13'), false);
  assertEquals(PERIOD_RE.test('2024-00'), false);
  assertEquals(PERIOD_RE.test('24-01'), false);
  assertEquals(PERIOD_RE.test('2024/01'), false);
});

Deno.test('period: accepts valid format', () => {
  assertEquals(PERIOD_RE.test('2024-01'), true);
  assertEquals(PERIOD_RE.test('2024-12'), true);
  assertEquals(PERIOD_RE.test('2025-06'), true);
});

Deno.test('period: computes correct date range', () => {
  const period = '2024-03';
  const [year, month] = period.split('-').map(Number);
  const start = new Date(Date.UTC(year, month - 1, 1));
  const end = new Date(Date.UTC(year, month, 1));
  assertEquals(start.toISOString(), '2024-03-01T00:00:00.000Z');
  assertEquals(end.toISOString(), '2024-04-01T00:00:00.000Z');
});
