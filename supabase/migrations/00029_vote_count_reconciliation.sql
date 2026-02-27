-- Vote count reconciliation: sync denormalized vote_count with actual votes
-- Run periodically to fix any drift between votes table and submissions.vote_count

create or replace function reconcile_vote_counts()
returns void
language sql
security definer
as $$
  update submissions s
  set vote_count = coalesce(v.cnt, 0)
  from (
    select submission_id, count(*) as cnt
    from votes
    group by submission_id
  ) v
  where s.id = v.submission_id
    and s.vote_count is distinct from v.cnt;
$$;

-- If pg_cron is available, schedule daily at 3am UTC:
-- select cron.schedule('reconcile-votes', '0 3 * * *', 'select reconcile_vote_counts()');
