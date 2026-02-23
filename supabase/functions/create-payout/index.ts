import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, content-type',
        'Access-Control-Allow-Methods': 'POST',
      },
    });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing auth token' }), { status: 401 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid auth token' }), { status: 401 });
    }

    // Verify admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Admin only' }), { status: 403 });
    }

    const { curator_id, amount_cents, period } = await req.json();

    if (!curator_id || !amount_cents || !period) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Get curator's review count for the period
    const { count: reviewCount } = await supabase
      .from('reviews')
      .select('id', { count: 'exact', head: true })
      .eq('curator_id', curator_id);

    // Create Stripe transfer (if curator has connected account)
    // For now, record the payout
    const { data: payout, error: payoutError } = await supabase
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
      return new Response(JSON.stringify({ error: payoutError.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ payout }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
});
