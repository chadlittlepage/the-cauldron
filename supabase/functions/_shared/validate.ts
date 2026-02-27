const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PERIOD_RE = /^\d{4}-(0[1-9]|1[0-2])$/;
const YEAR_RE = /^\d{4}$/;

export type ValidationResult<T> = { ok: true; data: T } | { ok: false; error: string };

export function validateCheckoutBody(body: unknown): ValidationResult<{ submission_id: string }> {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid request body' };
  const { submission_id } = body as Record<string, unknown>;
  if (!submission_id || typeof submission_id !== 'string') return { ok: false, error: 'submission_id is required' };
  if (!UUID_RE.test(submission_id)) return { ok: false, error: 'Invalid submission_id format' };
  return { ok: true, data: { submission_id } };
}

export function validatePayoutBody(
  body: unknown,
): ValidationResult<{ curator_id: string; amount_cents: number; period: string }> {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid request body' };
  const { curator_id, amount_cents, period } = body as Record<string, unknown>;
  if (!curator_id || typeof curator_id !== 'string') return { ok: false, error: 'curator_id is required' };
  if (!UUID_RE.test(curator_id)) return { ok: false, error: 'Invalid curator_id format' };
  if (typeof amount_cents !== 'number' || !Number.isInteger(amount_cents)) return { ok: false, error: 'amount_cents must be an integer' };
  if (amount_cents <= 0 || amount_cents > 100_000) return { ok: false, error: 'amount_cents must be between 1 and 100000' };
  if (!period || typeof period !== 'string') return { ok: false, error: 'period is required' };
  if (!PERIOD_RE.test(period)) return { ok: false, error: 'Invalid period format (expected YYYY-MM)' };
  return { ok: true, data: { curator_id, amount_cents, period } };
}

export function validateChartsBody(
  body: unknown,
): ValidationResult<{ type?: string; period?: string }> {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid request body' };
  const { type, period } = body as Record<string, unknown>;

  if (type !== undefined && type !== 'monthly' && type !== 'yearly') {
    return { ok: false, error: 'type must be "monthly" or "yearly"' };
  }

  if (period !== undefined && typeof period !== 'string') {
    return { ok: false, error: 'period must be a string' };
  }

  if (type === 'monthly' && period && !PERIOD_RE.test(period)) {
    return { ok: false, error: 'Invalid period format for monthly (expected YYYY-MM)' };
  }

  if (type === 'yearly' && period && !YEAR_RE.test(period)) {
    return { ok: false, error: 'Invalid period format for yearly (expected YYYY)' };
  }

  return { ok: true, data: { type: type as string | undefined, period: period as string | undefined } };
}
