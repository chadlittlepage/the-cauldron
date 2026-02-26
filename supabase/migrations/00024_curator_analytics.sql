-- Curator analytics RPC functions

-- Reviews by month (last 6 months)
create or replace function get_curator_reviews_by_month(p_curator_id uuid)
returns table(month text, count bigint)
language sql stable
as $$
  select to_char(date_trunc('month', r.created_at), 'YYYY-MM') as month,
         count(*)::bigint as count
  from public.reviews r
  where r.curator_id = p_curator_id
    and r.created_at >= date_trunc('month', now()) - interval '5 months'
  group by 1
  order by 1;
$$;

-- Genre performance (review count + avg rating per genre)
create or replace function get_curator_genre_performance(p_curator_id uuid)
returns table(genre text, reviews bigint, avg_rating numeric)
language sql stable
as $$
  select s.genre,
         count(*)::bigint as reviews,
         round(avg(r.rating), 1) as avg_rating
  from public.reviews r
  join public.submissions s on s.id = r.submission_id
  where r.curator_id = p_curator_id
  group by s.genre
  order by reviews desc;
$$;

-- Earnings by month (from curator_payouts)
create or replace function get_curator_earnings_by_month(p_curator_id uuid)
returns table(month text, earnings_cents bigint)
language sql stable
as $$
  select cp.period as month,
         sum(cp.amount_cents)::bigint as earnings_cents
  from public.curator_payouts cp
  where cp.curator_id = p_curator_id
    and cp.paid_at is not null
  group by cp.period
  order by cp.period;
$$;
