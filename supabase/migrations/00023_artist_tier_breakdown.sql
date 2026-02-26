-- Artist analytics: spending breakdown by curator payout tier
create or replace function public.get_artist_tier_breakdown(p_artist_id uuid)
returns table(tier text, count bigint, total_cents bigint)
language sql
security definer set search_path = ''
as $$
  select
    case
      when p.amount_cents <= 200 then 'T1'
      when p.amount_cents <= 333 then 'T2'
      else 'T3'
    end as tier,
    count(*) as count,
    sum(p.amount_cents)::bigint as total_cents
  from public.payments p
  where p.user_id = p_artist_id
    and p.status = 'succeeded'
  group by tier
  order by tier asc;
$$;
