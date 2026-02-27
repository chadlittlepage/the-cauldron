import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@14?target=deno';
import { captureException } from '../_shared/sentry.ts';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2024-04-10' });
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req: Request) => {
  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return new Response('Missing stripe-signature header', { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    return new Response('Webhook verification failed', { status: 400 });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const submissionId = session.metadata?.submission_id;
      const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : null;

      if (!submissionId) {
        return new Response('Missing submission_id in metadata', { status: 400 });
      }

      // Idempotency: skip if payment already succeeded
      const { data: existing } = await supabase
        .from('payments')
        .select('status')
        .eq('stripe_session_id', session.id)
        .single();

      if (existing?.status === 'succeeded') {
        return new Response(JSON.stringify({ received: true, skipped: 'already_processed' }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Update payment record
      await supabase
        .from('payments')
        .update({
          status: 'succeeded',
          stripe_payment_intent_id: paymentIntentId,
        })
        .eq('stripe_session_id', session.id);

      // Update submission: mark as paid and move to in_review
      await supabase
        .from('submissions')
        .update({
          payment_id: session.id,
          paid_at: new Date().toISOString(),
          status: 'in_review',
        })
        .eq('id', submissionId);
    }

    if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;

      await supabase
        .from('payments')
        .update({ status: 'failed' })
        .eq('stripe_session_id', session.id);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    await captureException(err, { function: 'stripe-webhook', eventType: event.type });
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
