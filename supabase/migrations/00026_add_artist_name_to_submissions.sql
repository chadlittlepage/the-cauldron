alter table public.submissions add column artist_name text;

-- Update get_submission_details to prefer submissions.artist_name over profile display_name
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
    coalesce(s.artist_name, p.display_name) as artist_name,
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
