-- Enum types for hexwave
create type public.user_role as enum ('artist', 'curator', 'admin');
create type public.submission_status as enum ('pending', 'in_review', 'accepted', 'rejected');
create type public.music_platform as enum ('spotify', 'soundcloud', 'bandcamp', 'other');
create type public.chart_type as enum ('monthly', 'yearly');
create type public.payment_status as enum ('pending', 'succeeded', 'failed', 'refunded');
