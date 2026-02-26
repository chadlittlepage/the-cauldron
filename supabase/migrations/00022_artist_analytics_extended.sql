-- Artist analytics: ratings distribution (1-5 stars received on submissions)
create or replace function public.get_artist_ratings_distribution(p_artist_id uuid)
returns table(rating int, count bigint)
language sql
security definer set search_path = ''
as $$
  select r.rating::int, count(*)
  from public.reviews r
  join public.submissions s on s.id = r.submission_id
  where s.artist_id = p_artist_id
  group by r.rating
  order by r.rating asc;
$$;

-- Artist analytics: daily vote trend (last 14 days)
create or replace function public.get_artist_vote_trend(p_artist_id uuid)
returns table(day text, upvotes bigint)
language sql
security definer set search_path = ''
as $$
  select to_char(v.created_at, 'Mon DD') as day, count(*) as upvotes
  from public.votes v
  join public.submissions s on s.id = v.submission_id
  where s.artist_id = p_artist_id
    and v.created_at >= now() - interval '14 days'
  group by to_char(v.created_at, 'Mon DD'), date(v.created_at)
  order by date(v.created_at) asc;
$$;

-- Artist analytics: total spent on submissions
create or replace function public.get_artist_total_spent(p_artist_id uuid)
returns table(total_cents bigint)
language sql
security definer set search_path = ''
as $$
  select coalesce(sum(p.amount_cents), 0)::bigint as total_cents
  from public.payments p
  where p.user_id = p_artist_id
    and p.status = 'succeeded';
$$;

-- Artist analytics: chart placements count
create or replace function public.get_artist_placements(p_artist_id uuid)
returns table(count bigint)
language sql
security definer set search_path = ''
as $$
  select count(distinct c.id)
  from public.charts c
  join public.submissions s on s.id = c.submission_id
  where s.artist_id = p_artist_id;
$$;
