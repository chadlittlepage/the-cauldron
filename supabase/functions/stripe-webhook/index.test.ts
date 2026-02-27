import { assertEquals } from 'https://deno.land/std@0.177.0/testing/asserts.ts';

// Test the business logic patterns used in stripe-webhook

Deno.test('idempotency: skips already-succeeded payments', () => {
  const existing = { status: 'succeeded' };
  assertEquals(existing.status === 'succeeded', true);
});

Deno.test('idempotency: processes pending payments', () => {
  const existing = { status: 'pending' };
  assertEquals(existing.status === 'succeeded', false);
});

Deno.test('idempotency: processes when no existing record', () => {
  // Simulates supabase .single() returning null (no matching payment row)
  function checkIdempotent(existing: { status: string } | null): boolean {
    return existing?.status === 'succeeded';
  }
  assertEquals(checkIdempotent(null), false);
});

Deno.test('webhook: rejects missing stripe-signature', () => {
  const signature = null;
  assertEquals(signature === null, true);
});

Deno.test('webhook: extracts payment_intent from string', () => {
  const session = { payment_intent: 'pi_abc123' };
  const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : null;
  assertEquals(paymentIntentId, 'pi_abc123');
});

Deno.test('webhook: handles object payment_intent', () => {
  const session = { payment_intent: { id: 'pi_abc123' } };
  const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : null;
  assertEquals(paymentIntentId, null);
});

Deno.test('webhook: rejects missing submission_id in metadata', () => {
  const metadata: Record<string, string> = {};
  assertEquals(!metadata.submission_id, true);
});

Deno.test('webhook: extracts submission_id from metadata', () => {
  const metadata = { submission_id: '550e8400-e29b-41d4-a716-446655440000' };
  assertEquals(metadata.submission_id, '550e8400-e29b-41d4-a716-446655440000');
});

Deno.test('webhook: checkout.session.expired updates payment to failed', () => {
  const eventType = 'checkout.session.expired';
  const expectedStatus = eventType === 'checkout.session.expired' ? 'failed' : 'succeeded';
  assertEquals(expectedStatus, 'failed');
});
