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
