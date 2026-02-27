-- Server-side vote rate limiting: prevent rapid vote toggling
-- Allows max 10 vote operations per user per minute via a check function

create or replace function public.check_vote_rate_limit(p_voter_id uuid)
returns boolean
language sql
stable
security definer set search_path = ''
as $$
  -- Count votes created by this user in the last 60 seconds
  -- A count >= 10 means they're rate-limited
  select count(*) < 10
  from public.votes
  where voter_id = p_voter_id
    and created_at > now() - interval '60 seconds';
$$;

-- Add rate limit check to the insert policy
drop policy if exists "Authenticated users can vote" on public.votes;

create policy "Authenticated users can vote (rate limited)"
  on public.votes for insert
  with check (
    auth.uid() = voter_id
    and public.check_vote_rate_limit(auth.uid())
  );
