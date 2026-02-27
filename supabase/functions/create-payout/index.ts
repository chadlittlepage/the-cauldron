import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { captureException } from '../_shared/sentry.ts';
import { createRateLimiter, rateLimitResponse } from '../_shared/rate-limit.ts';
import { validatePayoutBody } from '../_shared/validate.ts';
import { requireAdmin, corsResponse, jsonResponse, log } from '../_shared/middleware.ts';

// 10 payouts per admin per minute
const payoutLimiter = createRateLimiter(60_000, 10);

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return corsResponse();

  let userId: string | undefined;
  try {
    const auth = await requireAdmin(req);
    if (!auth.ok) return auth.response;
    userId = auth.user.id;

    if (!(await payoutLimiter.check(`payout:${auth.user.id}`))) {
      return rateLimitResponse(Deno.env.get('APP_URL') || 'https://hexwave.io');
    }

    const parsed = validatePayoutBody(await req.json());
    if (!parsed.ok) return jsonResponse({ error: parsed.error }, 400);
    const { curator_id, amount_cents, period } = parsed.data;

    const [periodYear, periodMonth] = period.split('-').map(Number);
    const periodStart = new Date(Date.UTC(periodYear, periodMonth - 1, 1)).toISOString();
    const periodEnd = new Date(Date.UTC(periodYear, periodMonth, 1)).toISOString();

    const { count: reviewCount } = await auth.supabase
      .from('reviews')
      .select('id', { count: 'exact', head: true })
      .eq('curator_id', curator_id)
      .gte('created_at', periodStart)
      .lt('created_at', periodEnd);

    const { data: payout, error: payoutError } = await auth.supabase
      .from('curator_payouts')
      .insert({
        curator_id,
        amount_cents,
        period,
        review_count: reviewCount ?? 0,
        paid_at: new Date().toISOString(),
        currency: 'usd',
        stripe_transfer_id: null,
      })
      .select()
      .single();

    if (payoutError) {
      await captureException(payoutError, { function: 'create-payout', userId: auth.user.id, curator_id });
      return jsonResponse({ error: 'Failed to create payout' }, 500);
    }

    log('info', 'create-payout', 'Payout created', { curator_id, amount_cents, period });
    return jsonResponse({ payout });
  } catch (err) {
    log('error', 'create-payout', (err as Error).message);
    await captureException(err, { function: 'create-payout', userId });
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
});
