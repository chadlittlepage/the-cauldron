-- Admin analytics: submissions by genre (top 10)
create or replace function public.get_submissions_by_genre()
returns table(genre text, count bigint)
language sql
security definer set search_path = ''
as $$
  select s.genre::text, count(*)
  from public.submissions s
  group by s.genre
  order by count desc
  limit 10;
$$;

-- Admin analytics: submissions by month (last 6 months)
create or replace function public.get_submissions_by_month()
returns table(month text, count bigint)
language sql
security definer set search_path = ''
as $$
  select to_char(s.created_at, 'YYYY-MM') as month, count(*)
  from public.submissions s
  where s.created_at >= now() - interval '6 months'
  group by month
  order by month asc;
$$;

-- Admin analytics: top curators by review count
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
  group by r.curator_id, p.display_name
  order by review_count desc
  limit 10;
$$;

-- Admin analytics: revenue by month (last 6 months)
create or replace function public.get_revenue_by_month()
returns table(month text, revenue_cents bigint)
language sql
security definer set search_path = ''
as $$
  select to_char(p.created_at, 'YYYY-MM') as month, sum(p.amount_cents)::bigint as revenue_cents
  from public.payments p
  where p.status = 'succeeded'
    and p.created_at >= now() - interval '6 months'
  group by month
  order by month asc;
$$;
