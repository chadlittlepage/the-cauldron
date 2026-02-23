-- Helper function: get submission with vote and review counts
create or replace function public.get_submission_details(p_submission_id uuid)
returns table (
  id uuid,
  artist_id uuid,
  artist_name text,
  track_title text,
  track_url text,
  platform public.music_platform,
  genre text,
  description text,
  status public.submission_status,
  vote_count bigint,
  review_count bigint,
  avg_rating numeric,
  created_at timestamptz
)
language sql
stable
as $$
  select
    s.id,
    s.artist_id,
    p.display_name as artist_name,
    s.track_title,
    s.track_url,
    s.platform,
    s.genre,
    s.description,
    s.status,
    s.vote_count::bigint,
    count(distinct r.id) as review_count,
    round(avg(r.rating), 1) as avg_rating,
    s.created_at
  from public.submissions s
  join public.profiles p on p.id = s.artist_id
  left join public.reviews r on r.submission_id = s.id
  where s.id = p_submission_id
  group by s.id, p.display_name;
$$;

-- Helper function: get curator stats
create or replace function public.get_curator_stats(p_curator_id uuid)
returns table (
  total_reviews bigint,
  avg_rating numeric,
  total_earnings_cents bigint
)
language sql
stable
as $$
  select
    count(r.id) as total_reviews,
    round(avg(r.rating), 1) as avg_rating,
    coalesce(sum(cp.amount_cents), 0) as total_earnings_cents
  from public.profiles p
  left join public.reviews r on r.curator_id = p.id
  left join public.curator_payouts cp on cp.curator_id = p.id
  where p.id = p_curator_id;
$$;

-- Helper function: check if user has voted on submission
create or replace function public.has_voted(p_submission_id uuid, p_user_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.votes
    where submission_id = p_submission_id and voter_id = p_user_id
  );
$$;
