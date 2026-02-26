-- Add curator-specific profile fields
alter table public.profiles
  add column if not exists genres text[] default '{}',
  add column if not exists accepting_submissions boolean default true,
  add column if not exists looking_for text,
  add column if not exists website_url text,
  add column if not exists instagram_handle text,
  add column if not exists tiktok_handle text,
  add column if not exists contact_email text;

-- Allow curators to update their own curator fields
-- (existing RLS policy already allows users to update their own profile row)
