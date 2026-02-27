-- Persistent rate limiting table for Edge Functions
-- Works across multiple isolates unlike in-memory Maps

create table if not exists public.rate_limits (
  key text not null,
  window_start timestamptz not null default now(),
  request_count int not null default 1,
  primary key (key)
);

-- Atomic check-and-increment: returns true if allowed, false if rate-limited
create or replace function public.check_rate_limit(
  p_key text,
  p_window_ms int,
  p_max_requests int
)
returns boolean
language plpgsql
security definer set search_path = ''
as $$
declare
  v_now timestamptz := now();
  v_window interval := (p_window_ms || ' milliseconds')::interval;
  v_count int;
begin
  -- Upsert: reset window if expired, otherwise increment
  insert into public.rate_limits (key, window_start, request_count)
  values (p_key, v_now, 1)
  on conflict (key) do update
  set
    request_count = case
      when public.rate_limits.window_start + v_window < v_now then 1
      else public.rate_limits.request_count + 1
    end,
    window_start = case
      when public.rate_limits.window_start + v_window < v_now then v_now
      else public.rate_limits.window_start
    end
  returning request_count into v_count;

  return v_count <= p_max_requests;
end;
$$;

-- Cleanup old entries (run via cron or manually)
create or replace function public.cleanup_rate_limits()
returns void
language sql
security definer set search_path = ''
as $$
  delete from public.rate_limits
  where window_start < now() - interval '10 minutes';
$$;

-- RLS: only service role can access rate_limits
alter table public.rate_limits enable row level security;
-- No policies = no access from anon/authenticated, only service role
