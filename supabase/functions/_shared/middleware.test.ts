import { assertEquals, assertStringIncludes } from 'https://deno.land/std@0.177.0/testing/asserts.ts';
import { corsHeaders, jsonResponse, log } from './middleware.ts';

Deno.test('corsHeaders: returns default origin when APP_URL not set', () => {
  const headers = corsHeaders();
  assertEquals(typeof headers['Access-Control-Allow-Origin'], 'string');
  assertEquals(headers['Access-Control-Allow-Methods'], 'POST, OPTIONS');
  assertEquals(headers['Access-Control-Allow-Headers'], 'authorization, content-type');
});

Deno.test('corsHeaders: merges extra headers', () => {
  const headers = corsHeaders({ 'X-Custom': 'value' });
  assertEquals(headers['X-Custom'], 'value');
  assertEquals(headers['Access-Control-Allow-Methods'], 'POST, OPTIONS');
});

Deno.test('jsonResponse: returns 200 with JSON body', async () => {
  const res = jsonResponse({ message: 'ok' });
  assertEquals(res.status, 200);
  assertEquals(res.headers.get('Content-Type'), 'application/json');
  const body = await res.json();
  assertEquals(body.message, 'ok');
});

Deno.test('jsonResponse: returns custom status code', async () => {
  const res = jsonResponse({ error: 'Not found' }, 404);
  assertEquals(res.status, 404);
  const body = await res.json();
  assertEquals(body.error, 'Not found');
});

Deno.test('jsonResponse: returns 400 with error', async () => {
  const res = jsonResponse({ error: 'Bad request' }, 400);
  assertEquals(res.status, 400);
  const body = await res.json();
  assertEquals(body.error, 'Bad request');
});

Deno.test('jsonResponse: returns 500 with error', async () => {
  const res = jsonResponse({ error: 'Internal server error' }, 500);
  assertEquals(res.status, 500);
});

Deno.test('log: outputs structured JSON with required fields', () => {
  const logs: string[] = [];
  const origLog = console.log;
  console.log = (msg: string) => logs.push(msg);

  log('info', 'test-function', 'Test message', { key: 'value' });

  console.log = origLog;

  assertEquals(logs.length, 1);
  const parsed = JSON.parse(logs[0]);
  assertEquals(parsed.level, 'info');
  assertEquals(parsed.function, 'test-function');
  assertEquals(parsed.message, 'Test message');
  assertEquals(parsed.key, 'value');
  assertEquals(typeof parsed.timestamp, 'string');
});

Deno.test('log: error level uses console.error', () => {
  const errors: string[] = [];
  const origError = console.error;
  console.error = (msg: string) => errors.push(msg);

  log('error', 'test-fn', 'Error occurred');

  console.error = origError;

  assertEquals(errors.length, 1);
  const parsed = JSON.parse(errors[0]);
  assertEquals(parsed.level, 'error');
  assertEquals(parsed.message, 'Error occurred');
});

Deno.test('log: warn level uses console.warn', () => {
  const warns: string[] = [];
  const origWarn = console.warn;
  console.warn = (msg: string) => warns.push(msg);

  log('warn', 'test-fn', 'Warning');

  console.warn = origWarn;

  assertEquals(warns.length, 1);
  const parsed = JSON.parse(warns[0]);
  assertEquals(parsed.level, 'warn');
});

Deno.test('requireAuth: is exported as a function', async () => {
  // We cannot fully test requireAuth without mocking Supabase, but verify it exists and is callable
  const mod = await import('./middleware.ts');
  assertEquals(typeof mod.requireAuth, 'function');
  assertEquals(typeof mod.requireAdmin, 'function');
});

Deno.test('corsHeaders: includes CORS allow-origin header', () => {
  const headers = corsHeaders();
  assertStringIncludes(headers['Access-Control-Allow-Origin'], '.');
});
