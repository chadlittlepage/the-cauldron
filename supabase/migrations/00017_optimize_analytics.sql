-- Optimize analytics RPCs for scalability
-- Adds composite indexes and date filters to prevent full table scans

-- Composite indexes for common query patterns
create index if not exists idx_reviews_curator_created
  on public.reviews (curator_id, created_at desc);

create index if not exists idx_payments_status_created
  on public.payments (status, created_at desc);

-- get_submissions_by_genre: add 12-month rolling window
create or replace function public.get_submissions_by_genre()
returns table(genre text, count bigint)
language sql
security definer set search_path = ''
as $$
  select s.genre::text, count(*)
  from public.submissions s
  where s.created_at >= now() - interval '12 months'
  group by s.genre
  order by count desc
  limit 10;
$$;

-- get_top_curators: add 6-month rolling window
create or replace function public.get_top_curators()
returns table(curator_id uuid, display_name text, review_count bigint, avg_rating numeric)
language sql
security definer set search_path = ''
as $$
  select
    r.curator_id,
    p.display_name,
    count(*) as review_count,
    round(avg(r.rating), 1) as avg_rating
  from public.reviews r
  join public.profiles p on p.id = r.curator_id
  where r.created_at >= now() - interval '6 months'
  group by r.curator_id, p.display_name
  order by review_count desc
  limit 10;
$$;
