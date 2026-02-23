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
