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
