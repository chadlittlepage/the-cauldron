-- ============================================================================
-- hexwave.io — Remove All Demo Data
-- ============================================================================
-- All demo UUIDs start with 'aaaaaaaa-' — this deletes them all.
-- Deleting auth.users cascades to profiles → submissions/votes/reviews/payments
-- ============================================================================

BEGIN;

-- Cascade from auth.users → profiles → submissions/votes/reviews/payments/payouts
DELETE FROM auth.users WHERE id::text LIKE 'aaaaaaaa-%';

-- Safety: clean up chart entries (FK is on submissions, but just in case)
DELETE FROM public.charts WHERE id::text LIKE 'aaaaaaaa-%';

-- Safety: clean up any curator payouts that survived
DELETE FROM public.curator_payouts WHERE id::text LIKE 'aaaaaaaa-%';

COMMIT;

-- Done! All demo data removed.
