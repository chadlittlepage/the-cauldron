-- Requires pg_cron extension (enabled by default on Supabase)
-- Run this via Supabase SQL Editor if pg_cron is not available in migrations

-- Generate monthly chart on the 1st of each month at midnight UTC
select cron.schedule(
  'generate-monthly-chart',
  '0 0 1 * *',
  $$SELECT public.generate_monthly_chart(to_char(now(), 'YYYY-MM'))$$
);

-- Generate yearly chart on Jan 1 at midnight UTC
select cron.schedule(
  'generate-yearly-chart',
  '0 0 1 1 *',
  $$SELECT public.generate_yearly_chart(extract(year from now())::text)$$
);
