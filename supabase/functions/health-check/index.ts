import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, jsonResponse } from '../_shared/middleware.ts';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders() });
  }

  const start = Date.now();
  const checks: Record<string, { ok: boolean; latencyMs?: number; error?: string }> = {};

  // Check Supabase connectivity
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !supabaseKey) {
      checks.supabase = { ok: false, error: 'Missing env vars' };
    } else {
      const dbStart = Date.now();
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase.from('profiles').select('id', { count: 'exact', head: true });
      checks.supabase = { ok: !error, latencyMs: Date.now() - dbStart, error: error?.message };
    }
  } catch (err) {
    checks.supabase = { ok: false, error: (err as Error).message };
  }

  // Check Stripe key presence
  checks.stripe = { ok: !!Deno.env.get('STRIPE_SECRET_KEY') };

  // Check Sentry DSN presence
  checks.sentry = { ok: !!Deno.env.get('SENTRY_DSN') };

  const allOk = Object.values(checks).every((c) => c.ok);

  return jsonResponse(
    {
      status: allOk ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      totalLatencyMs: Date.now() - start,
      checks,
    },
    allOk ? 200 : 503,
  );
});
