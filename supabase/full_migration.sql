-- Enum types for hexwave
create type public.user_role as enum ('artist', 'curator', 'admin');
create type public.submission_status as enum ('pending', 'in_review', 'accepted', 'rejected');
create type public.music_platform as enum ('spotify', 'soundcloud', 'bandcamp', 'other');
create type public.chart_type as enum ('monthly', 'yearly');
create type public.payment_status as enum ('pending', 'succeeded', 'failed', 'refunded');
-- Profiles table — extends Supabase auth.users
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text not null check (char_length(display_name) between 2 and 50),
  role public.user_role not null default 'artist',
  avatar_url text,
  bio text check (char_length(bio) <= 500),
  listener_count integer not null default 0 check (listener_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_profiles_role on public.profiles(role);
create index idx_profiles_display_name on public.profiles(display_name);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at
create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at();
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
-- Votes table — one vote per user per submission
create table public.votes (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  voter_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(submission_id, voter_id)
);

create index idx_votes_submission on public.votes(submission_id);
create index idx_votes_voter on public.votes(voter_id);

-- Increment/decrement vote_count on submissions
create or replace function public.increment_vote_count()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  update public.submissions
  set vote_count = vote_count + 1
  where id = new.submission_id;
  return new;
end;
$$;

create or replace function public.decrement_vote_count()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  update public.submissions
  set vote_count = vote_count - 1
  where id = old.submission_id;
  return old;
end;
$$;

create trigger on_vote_insert
  after insert on public.votes
  for each row execute procedure public.increment_vote_count();

create trigger on_vote_delete
  after delete on public.votes
  for each row execute procedure public.decrement_vote_count();
-- Reviews table — one review per curator per submission
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  curator_id uuid not null references public.profiles(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  feedback text not null check (char_length(feedback) between 20 and 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(submission_id, curator_id)
);

create index idx_reviews_submission on public.reviews(submission_id);
create index idx_reviews_curator on public.reviews(curator_id);
create index idx_reviews_rating on public.reviews(rating);

create trigger reviews_updated_at
  before update on public.reviews
  for each row execute procedure public.update_updated_at();
-- Charts table — monthly/yearly rankings
create table public.charts (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  chart_type public.chart_type not null,
  period text not null, -- e.g. '2026-02' or '2026'
  rank integer not null check (rank > 0),
  vote_count integer not null default 0,
  created_at timestamptz not null default now(),
  unique(chart_type, period, rank)
);

create index idx_charts_period on public.charts(chart_type, period);
create index idx_charts_submission on public.charts(submission_id);
-- Payments table — tracks Stripe payment events
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  stripe_session_id text not null unique,
  stripe_payment_intent_id text unique,
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'usd',
  status public.payment_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_payments_submission on public.payments(submission_id);
create index idx_payments_user on public.payments(user_id);
create index idx_payments_stripe_session on public.payments(stripe_session_id);
create index idx_payments_status on public.payments(status);

create trigger payments_updated_at
  before update on public.payments
  for each row execute procedure public.update_updated_at();
-- Curator payouts table — tracks payments to curators
create table public.curator_payouts (
  id uuid primary key default gen_random_uuid(),
  curator_id uuid not null references public.profiles(id) on delete cascade,
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'usd',
  stripe_transfer_id text unique,
  review_count integer not null default 0,
  period text not null, -- e.g. '2026-02'
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create index idx_curator_payouts_curator on public.curator_payouts(curator_id);
create index idx_curator_payouts_period on public.curator_payouts(period);
-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.submissions enable row level security;
alter table public.votes enable row level security;
alter table public.reviews enable row level security;
alter table public.charts enable row level security;
alter table public.payments enable row level security;
alter table public.curator_payouts enable row level security;

-- PROFILES
create policy "Profiles are publicly readable"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- SUBMISSIONS
create policy "Submissions are publicly readable"
  on public.submissions for select
  using (true);

create policy "Artists can insert own submissions"
  on public.submissions for insert
  with check (auth.uid() = artist_id);

create policy "Artists can update own submissions"
  on public.submissions for update
  using (auth.uid() = artist_id)
  with check (auth.uid() = artist_id);

-- VOTES
create policy "Votes are publicly readable"
  on public.votes for select
  using (true);

create policy "Authenticated users can vote"
  on public.votes for insert
  with check (auth.uid() = voter_id);

create policy "Users can delete own votes"
  on public.votes for delete
  using (auth.uid() = voter_id);

-- REVIEWS
create policy "Reviews are publicly readable"
  on public.reviews for select
  using (true);

create policy "Curators can insert own reviews"
  on public.reviews for insert
  with check (
    auth.uid() = curator_id
    and exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'curator'
    )
  );

create policy "Curators can update own reviews"
  on public.reviews for update
  using (auth.uid() = curator_id)
  with check (auth.uid() = curator_id);

-- CHARTS
create policy "Charts are publicly readable"
  on public.charts for select
  using (true);

-- PAYMENTS (service_role only for insert/update)
create policy "Users can read own payments"
  on public.payments for select
  using (auth.uid() = user_id);

-- CURATOR PAYOUTS (service_role only for insert)
create policy "Curators can read own payouts"
  on public.curator_payouts for select
  using (auth.uid() = curator_id);
-- Admin policies — admins can read/write everything
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = ''
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Admin can update any submission (e.g. change status)
create policy "Admins can update any submission"
  on public.submissions for update
  using (public.is_admin());

-- Admin can delete any submission
create policy "Admins can delete any submission"
  on public.submissions for delete
  using (public.is_admin());

-- Admin can read all payments
create policy "Admins can read all payments"
  on public.payments for select
  using (public.is_admin());

-- Admin can read all curator payouts
create policy "Admins can read all curator payouts"
  on public.curator_payouts for select
  using (public.is_admin());

-- Admin can update profiles (e.g. change roles)
create policy "Admins can update any profile"
  on public.profiles for update
  using (public.is_admin());
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
-- Generate monthly chart: top tracks by vote count for a given month
create or replace function public.generate_monthly_chart(p_period text)
returns void
language plpgsql
security definer set search_path = ''
as $$
declare
  v_start_date timestamptz;
  v_end_date timestamptz;
begin
  -- Parse period (e.g. '2026-02') into date range
  v_start_date := (p_period || '-01')::timestamptz;
  v_end_date := v_start_date + interval '1 month';

  -- Delete existing chart for this period
  delete from public.charts
  where chart_type = 'monthly' and period = p_period;

  -- Insert top tracks ranked by vote count
  insert into public.charts (submission_id, chart_type, period, rank, vote_count)
  select
    s.id,
    'monthly'::public.chart_type,
    p_period,
    row_number() over (order by s.vote_count desc, s.created_at asc),
    s.vote_count
  from public.submissions s
  where s.status in ('accepted', 'in_review')
    and s.created_at >= v_start_date
    and s.created_at < v_end_date
    and s.vote_count > 0
  order by s.vote_count desc, s.created_at asc
  limit 100;
end;
$$;

-- Generate yearly chart: top tracks by vote count for a given year
create or replace function public.generate_yearly_chart(p_year text)
returns void
language plpgsql
security definer set search_path = ''
as $$
declare
  v_start_date timestamptz;
  v_end_date timestamptz;
begin
  v_start_date := (p_year || '-01-01')::timestamptz;
  v_end_date := v_start_date + interval '1 year';

  delete from public.charts
  where chart_type = 'yearly' and period = p_year;

  insert into public.charts (submission_id, chart_type, period, rank, vote_count)
  select
    s.id,
    'yearly'::public.chart_type,
    p_year,
    row_number() over (order by s.vote_count desc, s.created_at asc),
    s.vote_count
  from public.submissions s
  where s.status in ('accepted', 'in_review')
    and s.created_at >= v_start_date
    and s.created_at < v_end_date
    and s.vote_count > 0
  order by s.vote_count desc, s.created_at asc
  limit 100;
end;
$$;
