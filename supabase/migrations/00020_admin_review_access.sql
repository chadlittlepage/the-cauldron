-- Allow admins to insert reviews (in addition to qualified curators)
drop policy if exists "Curators can insert own reviews" on public.reviews;

create policy "Curators and admins can insert reviews"
  on public.reviews for insert
  with check (
    auth.uid() = curator_id
    and exists (
      select 1 from public.profiles
      where id = auth.uid()
        and (
          (role = 'curator' and listener_count >= 1000)
          or role = 'admin'
        )
    )
  );
