import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * Database-backed rate limiter using the `check_rate_limit` RPC.
 * Works across multiple Edge Function isolates because state is in Postgres.
 * Falls back to allowing the request if the DB call fails (fail-open).
 */
export function createRateLimiter(windowMs: number, maxRequests: number) {
  return {
    async check(key: string): Promise<boolean> {
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        if (!supabaseUrl || !serviceKey) return true; // fail-open in tests

        const supabase = createClient(supabaseUrl, serviceKey);
        const { data, error } = await supabase.rpc('check_rate_limit', {
          p_key: key,
          p_window_ms: windowMs,
          p_max_requests: maxRequests,
        });

        if (error) return true; // fail-open on DB errors
        return data as boolean;
      } catch {
        return true; // fail-open
      }
    },
  };
}

export function rateLimitResponse(appUrl: string): Response {
  return new Response(
    JSON.stringify({ error: 'Too many requests. Please try again later.' }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': appUrl,
        'Retry-After': '60',
      },
    },
  );
}
