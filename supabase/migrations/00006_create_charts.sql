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
