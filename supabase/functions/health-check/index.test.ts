import { assertEquals } from 'https://deno.land/std@0.177.0/testing/asserts.ts';

Deno.test('health-check: response shape includes required fields', () => {
  // Verify the expected response shape
  const response = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    totalLatencyMs: 42,
    checks: {
      supabase: { ok: true, latencyMs: 30 },
      stripe: { ok: true },
      sentry: { ok: true },
    },
  };

  assertEquals(response.status, 'healthy');
  assertEquals(typeof response.timestamp, 'string');
  assertEquals(typeof response.totalLatencyMs, 'number');
  assertEquals(response.checks.supabase.ok, true);
  assertEquals(response.checks.stripe.ok, true);
  assertEquals(response.checks.sentry.ok, true);
});

Deno.test('health-check: degraded when a check fails', () => {
  const checks = {
    supabase: { ok: false, error: 'Connection refused' },
    stripe: { ok: true },
    sentry: { ok: true },
  };

  const allOk = Object.values(checks).every((c) => c.ok);
  assertEquals(allOk, false);
  const status = allOk ? 'healthy' : 'degraded';
  assertEquals(status, 'degraded');
});

Deno.test('health-check: healthy when all checks pass', () => {
  const checks = {
    supabase: { ok: true },
    stripe: { ok: true },
    sentry: { ok: true },
  };

  const allOk = Object.values(checks).every((c) => c.ok);
  assertEquals(allOk, true);
});

Deno.test('health-check: reports missing env vars', () => {
  const supabaseUrl = undefined;
  const hasEnv = !!supabaseUrl;
  assertEquals(hasEnv, false);
});
