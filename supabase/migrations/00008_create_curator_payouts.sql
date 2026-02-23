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
