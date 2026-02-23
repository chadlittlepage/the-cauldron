-- Reviews table — one review per curator per submission
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  curator_id uuid not null references public.profiles(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  feedback text not null check (char_length(feedback) between 20 and 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(submission_id, curator_id)
);

create index idx_reviews_submission on public.reviews(submission_id);
create index idx_reviews_curator on public.reviews(curator_id);
create index idx_reviews_rating on public.reviews(rating);

create trigger reviews_updated_at
  before update on public.reviews
  for each row execute procedure public.update_updated_at();
