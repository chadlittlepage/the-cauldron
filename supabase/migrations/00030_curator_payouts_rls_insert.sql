-- Lock down curator_payouts INSERT to prevent client-side inserts.
-- Only service_role (used by Edge Functions) can insert payouts.
-- Regular users (even admins via client) cannot insert directly.

CREATE POLICY "No direct inserts via client"
  ON public.curator_payouts FOR INSERT
  WITH CHECK (false);

-- Note: Edge Functions use the service_role key which bypasses RLS,
-- so create-payout Edge Function can still insert.
-- This policy blocks any attempt to insert via the anon/authenticated client.
