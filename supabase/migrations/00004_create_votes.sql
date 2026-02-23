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
