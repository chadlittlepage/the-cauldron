-- Admin policies — admins can read/write everything
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = ''
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Admin can update any submission (e.g. change status)
create policy "Admins can update any submission"
  on public.submissions for update
  using (public.is_admin());

-- Admin can delete any submission
create policy "Admins can delete any submission"
  on public.submissions for delete
  using (public.is_admin());

-- Admin can read all payments
create policy "Admins can read all payments"
  on public.payments for select
  using (public.is_admin());

-- Admin can read all curator payouts
create policy "Admins can read all curator payouts"
  on public.curator_payouts for select
  using (public.is_admin());

-- Admin can update profiles (e.g. change roles)
create policy "Admins can update any profile"
  on public.profiles for update
  using (public.is_admin());
