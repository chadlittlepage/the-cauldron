import { assertEquals } from 'https://deno.land/std@0.177.0/testing/asserts.ts';
import { validateCheckoutBody, validatePayoutBody, validateChartsBody } from './validate.ts';

// --- validateCheckoutBody ---

Deno.test('checkout: accepts valid UUID submission_id', () => {
  const result = validateCheckoutBody({ submission_id: '550e8400-e29b-41d4-a716-446655440000' });
  assertEquals(result.ok, true);
  if (result.ok) assertEquals(result.data.submission_id, '550e8400-e29b-41d4-a716-446655440000');
});

Deno.test('checkout: rejects missing submission_id', () => {
  const result = validateCheckoutBody({});
  assertEquals(result.ok, false);
  if (!result.ok) assertEquals(result.error, 'submission_id is required');
});

Deno.test('checkout: rejects non-string submission_id', () => {
  const result = validateCheckoutBody({ submission_id: 12345 });
  assertEquals(result.ok, false);
});

Deno.test('checkout: rejects invalid UUID format', () => {
  const result = validateCheckoutBody({ submission_id: 'not-a-valid-uuid' });
  assertEquals(result.ok, false);
  if (!result.ok) assertEquals(result.error, 'Invalid submission_id format');
});

Deno.test('checkout: rejects null body', () => {
  const result = validateCheckoutBody(null);
  assertEquals(result.ok, false);
});

Deno.test('checkout: rejects non-object body', () => {
  const result = validateCheckoutBody('string');
  assertEquals(result.ok, false);
});

// --- validatePayoutBody ---

Deno.test('payout: accepts valid input', () => {
  const result = validatePayoutBody({
    curator_id: '550e8400-e29b-41d4-a716-446655440000',
    amount_cents: 5000,
    period: '2024-06',
  });
  assertEquals(result.ok, true);
  if (result.ok) {
    assertEquals(result.data.curator_id, '550e8400-e29b-41d4-a716-446655440000');
    assertEquals(result.data.amount_cents, 5000);
    assertEquals(result.data.period, '2024-06');
  }
});

Deno.test('payout: rejects missing curator_id', () => {
  const result = validatePayoutBody({ amount_cents: 5000, period: '2024-06' });
  assertEquals(result.ok, false);
});

Deno.test('payout: rejects invalid curator_id format', () => {
  const result = validatePayoutBody({ curator_id: 'bad', amount_cents: 5000, period: '2024-06' });
  assertEquals(result.ok, false);
  if (!result.ok) assertEquals(result.error, 'Invalid curator_id format');
});

Deno.test('payout: rejects negative amount', () => {
  const result = validatePayoutBody({
    curator_id: '550e8400-e29b-41d4-a716-446655440000',
    amount_cents: -100,
    period: '2024-06',
  });
  assertEquals(result.ok, false);
});

Deno.test('payout: rejects zero amount', () => {
  const result = validatePayoutBody({
    curator_id: '550e8400-e29b-41d4-a716-446655440000',
    amount_cents: 0,
    period: '2024-06',
  });
  assertEquals(result.ok, false);
});

Deno.test('payout: rejects amount over 100000', () => {
  const result = validatePayoutBody({
    curator_id: '550e8400-e29b-41d4-a716-446655440000',
    amount_cents: 100_001,
    period: '2024-06',
  });
  assertEquals(result.ok, false);
});

Deno.test('payout: rejects float amount', () => {
  const result = validatePayoutBody({
    curator_id: '550e8400-e29b-41d4-a716-446655440000',
    amount_cents: 50.5,
    period: '2024-06',
  });
  assertEquals(result.ok, false);
  if (!result.ok) assertEquals(result.error, 'amount_cents must be an integer');
});

Deno.test('payout: rejects invalid period format', () => {
  const result = validatePayoutBody({
    curator_id: '550e8400-e29b-41d4-a716-446655440000',
    amount_cents: 5000,
    period: '2024-13',
  });
  assertEquals(result.ok, false);
});

Deno.test('payout: rejects period with wrong separator', () => {
  const result = validatePayoutBody({
    curator_id: '550e8400-e29b-41d4-a716-446655440000',
    amount_cents: 5000,
    period: '2024/06',
  });
  assertEquals(result.ok, false);
});

Deno.test('payout: rejects missing period', () => {
  const result = validatePayoutBody({
    curator_id: '550e8400-e29b-41d4-a716-446655440000',
    amount_cents: 5000,
  });
  assertEquals(result.ok, false);
});

// --- validateChartsBody ---

Deno.test('charts: accepts empty object (auto-generate)', () => {
  const result = validateChartsBody({});
  assertEquals(result.ok, true);
});

Deno.test('charts: accepts monthly with valid period', () => {
  const result = validateChartsBody({ type: 'monthly', period: '2024-06' });
  assertEquals(result.ok, true);
  if (result.ok) {
    assertEquals(result.data.type, 'monthly');
    assertEquals(result.data.period, '2024-06');
  }
});

Deno.test('charts: accepts yearly with valid period', () => {
  const result = validateChartsBody({ type: 'yearly', period: '2024' });
  assertEquals(result.ok, true);
});

Deno.test('charts: rejects invalid type', () => {
  const result = validateChartsBody({ type: 'weekly' });
  assertEquals(result.ok, false);
  if (!result.ok) assertEquals(result.error, 'type must be "monthly" or "yearly"');
});

Deno.test('charts: rejects monthly with yearly period format', () => {
  const result = validateChartsBody({ type: 'monthly', period: '2024' });
  assertEquals(result.ok, false);
});

Deno.test('charts: rejects yearly with monthly period format', () => {
  const result = validateChartsBody({ type: 'yearly', period: '2024-06' });
  assertEquals(result.ok, false);
});

Deno.test('charts: rejects non-string period', () => {
  const result = validateChartsBody({ type: 'monthly', period: 2024 });
  assertEquals(result.ok, false);
});

Deno.test('charts: rejects null body', () => {
  const result = validateChartsBody(null);
  assertEquals(result.ok, false);
});
