import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@14?target=deno';
import { captureException } from '../_shared/sentry.ts';
import { createRateLimiter, rateLimitResponse } from '../_shared/rate-limit.ts';
import { validateCheckoutBody } from '../_shared/validate.ts';
import { log } from '../_shared/middleware.ts';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2024-04-10' });
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const corsOrigin = Deno.env.get('APP_URL') || 'https://hexwave.io';

// 5 checkout sessions per user per minute
const checkoutLimiter = createRateLimiter(60_000, 5);

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Headers': 'authorization, content-type',
        'Access-Control-Allow-Methods': 'POST',
      },
    });
  }

  let userId: string | undefined;
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
    userId = user.id;

    // Rate limit: 5 checkout sessions per user per minute
    if (!(await checkoutLimiter.check(`checkout:${user.id}`))) {
      return rateLimitResponse(corsOrigin);
    }

    const parsed = validateCheckoutBody(await req.json());
    if (!parsed.ok) {
      return new Response(JSON.stringify({ error: parsed.error }), { status: 400 });
    }
    const { submission_id } = parsed.data;

    // Verify submission exists and belongs to user
    const { data: submission, error: subError } = await supabase
      .from('submissions')
      .select('id, track_title, artist_id, payment_id')
      .eq('id', submission_id)
      .single();

    if (subError || !submission) {
      return new Response(JSON.stringify({ error: 'Submission not found' }), { status: 404 });
    }

    if (submission.artist_id !== user.id) {
      return new Response(JSON.stringify({ error: 'Not your submission' }), { status: 403 });
    }

    if (submission.payment_id) {
      return new Response(JSON.stringify({ error: 'Already paid' }), { status: 400 });
    }

    const appUrl = Deno.env.get('APP_URL') || 'http://localhost:5173';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Track Submission: ${submission.track_title}`,
              description: 'hexwave track submission fee',
            },
            unit_amount: 200, // $2.00 — server-enforced
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/payment/cancel`,
      metadata: {
        submission_id: submission.id,
        user_id: user.id,
      },
    });

    // Record pending payment
    await supabase.from('payments').insert({
      submission_id: submission.id,
      user_id: user.id,
      stripe_session_id: session.id,
      amount_cents: 200,
      currency: 'usd',
      stripe_payment_intent_id: null,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': corsOrigin },
    });
  } catch (err) {
    log('error', 'create-checkout', (err as Error).message);
    await captureException(err, { function: 'create-checkout', userId });
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': corsOrigin },
    });
  }
});
