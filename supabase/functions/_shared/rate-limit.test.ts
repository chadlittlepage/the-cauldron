import { assertEquals } from 'https://deno.land/std@0.177.0/testing/asserts.ts';
import { createRateLimiter, rateLimitResponse } from './rate-limit.ts';

// Without SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY env vars, the limiter
// fails open (returns true), which is correct for unit tests.
// These tests verify the fail-open behavior and response format.

Deno.test('rate limiter: allows requests when DB unavailable (fail-open)', async () => {
  const limiter = createRateLimiter(60_000, 3);
  assertEquals(await limiter.check('user-1'), true);
  assertEquals(await limiter.check('user-1'), true);
  assertEquals(await limiter.check('user-1'), true);
});

Deno.test('rate limiter: allows different users independently (fail-open)', async () => {
  const limiter = createRateLimiter(60_000, 1);
  assertEquals(await limiter.check('user-1'), true);
  assertEquals(await limiter.check('user-2'), true);
});

Deno.test('rate limiter: check returns a promise', () => {
  const limiter = createRateLimiter(60_000, 1);
  const result = limiter.check('user-1');
  assertEquals(result instanceof Promise, true);
});

Deno.test('rateLimitResponse: returns 429 with correct headers', () => {
  const res = rateLimitResponse('https://hexwave.io');
  assertEquals(res.status, 429);
  assertEquals(res.headers.get('Retry-After'), '60');
  assertEquals(res.headers.get('Access-Control-Allow-Origin'), 'https://hexwave.io');
  assertEquals(res.headers.get('Content-Type'), 'application/json');
});

Deno.test('rateLimitResponse: body contains error message', async () => {
  const res = rateLimitResponse('https://hexwave.io');
  const body = await res.json();
  assertEquals(body.error, 'Too many requests. Please try again later.');
});
