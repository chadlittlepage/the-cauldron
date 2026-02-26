-- Artist analytics: submissions by month (last 6 months)
create or replace function public.get_artist_submissions_by_month(p_artist_id uuid)
returns table(month text, count bigint)
language sql
security definer set search_path = ''
as $$
  select to_char(s.created_at, 'YYYY-MM') as month, count(*)
  from public.submissions s
  where s.artist_id = p_artist_id
    and s.created_at >= now() - interval '6 months'
  group by month
  order by month asc;
$$;

-- Artist analytics: curator decisions by month (last 6 months)
create or replace function public.get_artist_curator_decisions(p_artist_id uuid)
returns table(month text, accepted bigint, rejected bigint, pending bigint)
language sql
security definer set search_path = ''
as $$
  select
    to_char(s.created_at, 'YYYY-MM') as month,
    count(*) filter (where s.status = 'accepted') as accepted,
    count(*) filter (where s.status = 'rejected') as rejected,
    count(*) filter (where s.status in ('pending', 'in_review')) as pending
  from public.submissions s
  where s.artist_id = p_artist_id
    and s.created_at >= now() - interval '6 months'
  group by month
  order by month asc;
$$;

-- Artist analytics: genre distribution
create or replace function public.get_artist_genre_distribution(p_artist_id uuid)
returns table(genre text, count bigint)
language sql
security definer set search_path = ''
as $$
  select s.genre::text, count(*)
  from public.submissions s
  where s.artist_id = p_artist_id
  group by s.genre
  order by count desc
  limit 10;
$$;

-- Artist analytics: vote history (tracks the artist voted on)
create or replace function public.get_artist_vote_history(p_artist_id uuid)
returns table(submission_id uuid, track_title text, artist_name text, genre text, created_at timestamptz)
language sql
security definer set search_path = ''
as $$
  select
    s.id as submission_id,
    s.track_title,
    p.display_name as artist_name,
    s.genre::text,
    v.created_at
  from public.votes v
  join public.submissions s on s.id = v.submission_id
  join public.profiles p on p.id = s.artist_id
  where v.voter_id = p_artist_id
  order by v.created_at desc;
$$;
