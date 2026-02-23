-- Submissions table — tracks submitted by artists
create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.profiles(id) on delete cascade,
  track_title text not null check (char_length(track_title) between 1 and 200),
  track_url text not null,
  platform public.music_platform not null default 'other',
  genre text not null,
  description text check (char_length(description) <= 1000),
  status public.submission_status not null default 'pending',
  payment_id text,
  paid_at timestamptz,
  vote_count integer not null default 0 check (vote_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_submissions_artist on public.submissions(artist_id);
create index idx_submissions_status on public.submissions(status);
create index idx_submissions_genre on public.submissions(genre);
create index idx_submissions_created on public.submissions(created_at desc);
create index idx_submissions_vote_count on public.submissions(vote_count desc);

create trigger submissions_updated_at
  before update on public.submissions
  for each row execute procedure public.update_updated_at();
