-- ============================================================================
-- hexwave.io — Demo Seed Data
-- ============================================================================
-- Run in Supabase SQL Editor (Role: postgres)
-- Remove with: supabase/unseed-demo.sql
-- All demo UUIDs start with 'aaaaaaaa-' for easy identification and cleanup
-- ============================================================================

BEGIN;

-- ──────────────────────────────────────────────
-- 1. Auth trigger stays enabled — profiles auto-created on user insert
-- ──────────────────────────────────────────────

-- ──────────────────────────────────────────────
-- 2. Insert 50 auth.users records
-- ──────────────────────────────────────────────
-- Shared password: DemoPass123!
-- bcrypt hash for DemoPass123!
-- created_at staggered across last 90 days

INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, aud, role)
VALUES
  -- 35 Artists
  ('aaaaaaaa-0001-4000-a000-000000000001', '00000000-0000-0000-0000-000000000000', 'demo-artist-01@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '88 days', now() - interval '88 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000002', '00000000-0000-0000-0000-000000000000', 'demo-artist-02@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '86 days', now() - interval '86 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000003', '00000000-0000-0000-0000-000000000000', 'demo-artist-03@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '84 days', now() - interval '84 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000004', '00000000-0000-0000-0000-000000000000', 'demo-artist-04@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '82 days', now() - interval '82 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000005', '00000000-0000-0000-0000-000000000000', 'demo-artist-05@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '80 days', now() - interval '80 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000006', '00000000-0000-0000-0000-000000000000', 'demo-artist-06@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '78 days', now() - interval '78 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000007', '00000000-0000-0000-0000-000000000000', 'demo-artist-07@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '76 days', now() - interval '76 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000008', '00000000-0000-0000-0000-000000000000', 'demo-artist-08@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '74 days', now() - interval '74 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000009', '00000000-0000-0000-0000-000000000000', 'demo-artist-09@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '72 days', now() - interval '72 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000010', '00000000-0000-0000-0000-000000000000', 'demo-artist-10@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '70 days', now() - interval '70 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000011', '00000000-0000-0000-0000-000000000000', 'demo-artist-11@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '68 days', now() - interval '68 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000012', '00000000-0000-0000-0000-000000000000', 'demo-artist-12@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '66 days', now() - interval '66 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000013', '00000000-0000-0000-0000-000000000000', 'demo-artist-13@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '64 days', now() - interval '64 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000014', '00000000-0000-0000-0000-000000000000', 'demo-artist-14@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '62 days', now() - interval '62 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000015', '00000000-0000-0000-0000-000000000000', 'demo-artist-15@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '60 days', now() - interval '60 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000016', '00000000-0000-0000-0000-000000000000', 'demo-artist-16@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '58 days', now() - interval '58 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000017', '00000000-0000-0000-0000-000000000000', 'demo-artist-17@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '56 days', now() - interval '56 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000018', '00000000-0000-0000-0000-000000000000', 'demo-artist-18@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '54 days', now() - interval '54 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000019', '00000000-0000-0000-0000-000000000000', 'demo-artist-19@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '52 days', now() - interval '52 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000020', '00000000-0000-0000-0000-000000000000', 'demo-artist-20@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '50 days', now() - interval '50 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000021', '00000000-0000-0000-0000-000000000000', 'demo-artist-21@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '48 days', now() - interval '48 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000022', '00000000-0000-0000-0000-000000000000', 'demo-artist-22@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '46 days', now() - interval '46 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000023', '00000000-0000-0000-0000-000000000000', 'demo-artist-23@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '44 days', now() - interval '44 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000024', '00000000-0000-0000-0000-000000000000', 'demo-artist-24@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '42 days', now() - interval '42 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000025', '00000000-0000-0000-0000-000000000000', 'demo-artist-25@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '40 days', now() - interval '40 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000026', '00000000-0000-0000-0000-000000000000', 'demo-artist-26@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '38 days', now() - interval '38 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000027', '00000000-0000-0000-0000-000000000000', 'demo-artist-27@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '36 days', now() - interval '36 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000028', '00000000-0000-0000-0000-000000000000', 'demo-artist-28@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '34 days', now() - interval '34 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000029', '00000000-0000-0000-0000-000000000000', 'demo-artist-29@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '32 days', now() - interval '32 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000030', '00000000-0000-0000-0000-000000000000', 'demo-artist-30@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '30 days', now() - interval '30 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000031', '00000000-0000-0000-0000-000000000000', 'demo-artist-31@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '28 days', now() - interval '28 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000032', '00000000-0000-0000-0000-000000000000', 'demo-artist-32@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '26 days', now() - interval '26 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000033', '00000000-0000-0000-0000-000000000000', 'demo-artist-33@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '24 days', now() - interval '24 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000034', '00000000-0000-0000-0000-000000000000', 'demo-artist-34@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '22 days', now() - interval '22 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0001-4000-a000-000000000035', '00000000-0000-0000-0000-000000000000', 'demo-artist-35@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '20 days', now() - interval '20 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  -- 12 Curators
  ('aaaaaaaa-0002-4000-a000-000000000001', '00000000-0000-0000-0000-000000000000', 'demo-curator-01@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '90 days', now() - interval '90 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0002-4000-a000-000000000002', '00000000-0000-0000-0000-000000000000', 'demo-curator-02@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '89 days', now() - interval '89 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0002-4000-a000-000000000003', '00000000-0000-0000-0000-000000000000', 'demo-curator-03@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '87 days', now() - interval '87 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0002-4000-a000-000000000004', '00000000-0000-0000-0000-000000000000', 'demo-curator-04@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '85 days', now() - interval '85 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0002-4000-a000-000000000005', '00000000-0000-0000-0000-000000000000', 'demo-curator-05@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '83 days', now() - interval '83 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0002-4000-a000-000000000006', '00000000-0000-0000-0000-000000000000', 'demo-curator-06@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '81 days', now() - interval '81 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0002-4000-a000-000000000007', '00000000-0000-0000-0000-000000000000', 'demo-curator-07@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '79 days', now() - interval '79 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0002-4000-a000-000000000008', '00000000-0000-0000-0000-000000000000', 'demo-curator-08@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '77 days', now() - interval '77 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0002-4000-a000-000000000009', '00000000-0000-0000-0000-000000000000', 'demo-curator-09@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '75 days', now() - interval '75 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0002-4000-a000-000000000010', '00000000-0000-0000-0000-000000000000', 'demo-curator-10@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '73 days', now() - interval '73 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0002-4000-a000-000000000011', '00000000-0000-0000-0000-000000000000', 'demo-curator-11@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '71 days', now() - interval '71 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0002-4000-a000-000000000012', '00000000-0000-0000-0000-000000000000', 'demo-curator-12@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '69 days', now() - interval '69 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  -- 3 Admins
  ('aaaaaaaa-0003-4000-a000-000000000001', '00000000-0000-0000-0000-000000000000', 'demo-admin-01@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '90 days', now() - interval '90 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0003-4000-a000-000000000002', '00000000-0000-0000-0000-000000000000', 'demo-admin-02@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '90 days', now() - interval '90 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('aaaaaaaa-0003-4000-a000-000000000003', '00000000-0000-0000-0000-000000000000', 'demo-admin-03@hexwave.demo', '$2a$10$PwJKQ1GwZCjXvBwVOyKEmuMfjLkNjRo3yCnQSRKyrODOGXPKqPCra', now() - interval '90 days', now() - interval '90 days', now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated');

-- ──────────────────────────────────────────────
-- 3. Update 50 profiles (auto-created by trigger with minimal data)
-- ──────────────────────────────────────────────

UPDATE public.profiles SET display_name = 'Luna Waves', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=LunaWaves', bio = 'Dream pop artist blending ambient textures with celestial melodies.', listener_count = 320, created_at = now() - interval '88 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000001';
UPDATE public.profiles SET display_name = 'Neon Drifter', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=NeonDrifter', bio = 'Synthwave producer from the neon-lit streets of the future.', listener_count = 180, created_at = now() - interval '86 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000002';
UPDATE public.profiles SET display_name = 'Echo Veil', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=EchoVeil', bio = 'Layering reverb-soaked guitars over whispered confessions.', listener_count = 95, created_at = now() - interval '84 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000003';
UPDATE public.profiles SET display_name = 'Moss Garden', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=MossGarden', bio = 'Folk-inspired songwriter exploring quiet, overgrown places.', listener_count = 410, created_at = now() - interval '82 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000004';
UPDATE public.profiles SET display_name = 'Velvet Haze', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=VelvetHaze', bio = 'Psych-soul artist painting in rich, warm frequencies.', listener_count = 275, created_at = now() - interval '80 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000005';
UPDATE public.profiles SET display_name = 'Circuit Bloom', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=CircuitBloom', bio = 'Electronic producer growing organic sounds from digital seeds.', listener_count = 150, created_at = now() - interval '78 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000006';
UPDATE public.profiles SET display_name = 'Pale Honey', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=PaleHoney', bio = 'Indie rock duo with a taste for bittersweet harmonies.', listener_count = 500, created_at = now() - interval '76 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000007';
UPDATE public.profiles SET display_name = 'Tidal Murmur', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=TidalMurmur', bio = 'Coastal ambient project recording the language of the sea.', listener_count = 60, created_at = now() - interval '74 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000008';
UPDATE public.profiles SET display_name = 'Rust & Ribbon', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=RustRibbon', bio = 'Americana singer-songwriter with stories of open roads.', listener_count = 340, created_at = now() - interval '72 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000009';
UPDATE public.profiles SET display_name = 'Glass Fauna', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=GlassFauna', bio = 'Art pop creator sculpting fragile, translucent soundscapes.', listener_count = 215, created_at = now() - interval '70 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000010';
UPDATE public.profiles SET display_name = 'Phantom Choir', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=PhantomChoir', bio = 'Spectral vocal arrangements from a one-person choir.', listener_count = 130, created_at = now() - interval '68 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000011';
UPDATE public.profiles SET display_name = 'Solstice Kid', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=SolsticeKid', bio = 'Bedroom pop made during the longest days of the year.', listener_count = 85, created_at = now() - interval '66 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000012';
UPDATE public.profiles SET display_name = 'Iron Petal', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=IronPetal', bio = 'Heavy riffs wrapped in delicate melodic petals.', listener_count = 390, created_at = now() - interval '64 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000013';
UPDATE public.profiles SET display_name = 'Soft Vandal', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=SoftVandal', bio = 'Lo-fi hip-hop with spraypaint-can percussion.', listener_count = 200, created_at = now() - interval '62 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000014';
UPDATE public.profiles SET display_name = 'Dawnbreak', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dawnbreak', bio = 'Uplifting indie folk for early morning drives.', listener_count = 445, created_at = now() - interval '60 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000015';
UPDATE public.profiles SET display_name = 'Copper Thread', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=CopperThread', bio = 'Weaving analog warmth through every mix.', listener_count = 110, created_at = now() - interval '58 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000016';
UPDATE public.profiles SET display_name = 'Violet Wreck', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=VioletWreck', bio = 'Shoegaze meets noise pop in a purple haze.', listener_count = 265, created_at = now() - interval '56 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000017';
UPDATE public.profiles SET display_name = 'River Clerk', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=RiverClerk', bio = 'Jazz-inflected R&B from a bedroom studio by the river.', listener_count = 175, created_at = now() - interval '54 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000018';
UPDATE public.profiles SET display_name = 'Sage Phantom', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=SagePhantom', bio = 'Minimalist electronic artist channeling desert silence.', listener_count = 50, created_at = now() - interval '52 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000019';
UPDATE public.profiles SET display_name = 'Halo Static', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=HaloStatic', bio = 'Post-punk revivalist with a love for angular guitars.', listener_count = 310, created_at = now() - interval '50 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000020';
UPDATE public.profiles SET display_name = 'Fern & Flicker', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=FernFlicker', bio = 'Acoustic duo finding magic in candlelit sessions.', listener_count = 420, created_at = now() - interval '48 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000021';
UPDATE public.profiles SET display_name = 'Midnight Cartographer', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=MidnightCartographer', bio = 'Mapping uncharted sonic territories after dark.', listener_count = 75, created_at = now() - interval '46 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000022';
UPDATE public.profiles SET display_name = 'Pollen Drift', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=PollenDrift', bio = 'Dreamy indie pop that floats on a spring breeze.', listener_count = 290, created_at = now() - interval '44 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000023';
UPDATE public.profiles SET display_name = 'Chrome Pastoral', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=ChromePastoral', bio = 'Where futuristic synths meet rural tranquility.', listener_count = 155, created_at = now() - interval '42 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000024';
UPDATE public.profiles SET display_name = 'Opal Engine', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=OpalEngine', bio = 'Iridescent beats powered by analog machines.', listener_count = 365, created_at = now() - interval '40 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000025';
UPDATE public.profiles SET display_name = 'Wren Silence', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=WrenSilence', bio = 'Finding the notes between the notes.', listener_count = 40, created_at = now() - interval '38 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000026';
UPDATE public.profiles SET display_name = 'Gilt Frequency', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=GiltFrequency', bio = 'Gold-plated funk with electronic undertones.', listener_count = 480, created_at = now() - interval '36 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000027';
UPDATE public.profiles SET display_name = 'Spectral Orchard', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=SpectralOrchard', bio = 'Harvesting sounds from the spaces between genres.', listener_count = 120, created_at = now() - interval '34 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000028';
UPDATE public.profiles SET display_name = 'Tender Voltage', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=TenderVoltage', bio = 'Electrifying softness, where power meets vulnerability.', listener_count = 230, created_at = now() - interval '32 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000029';
UPDATE public.profiles SET display_name = 'Amber Flux', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=AmberFlux', bio = 'Warm analog waves caught in constant transformation.', listener_count = 190, created_at = now() - interval '30 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000030';
UPDATE public.profiles SET display_name = 'Hollow Pine', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=HollowPine', bio = 'Woodland folk songs echoing through empty forests.', listener_count = 350, created_at = now() - interval '28 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000031';
UPDATE public.profiles SET display_name = 'Noma Tides', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=NomaTides', bio = 'Nomadic beats flowing with oceanic rhythms.', listener_count = 145, created_at = now() - interval '26 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000032';
UPDATE public.profiles SET display_name = 'Sable Moth', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=SableMoth', bio = 'Dark, fluttering electronica drawn to the light.', listener_count = 255, created_at = now() - interval '24 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000033';
UPDATE public.profiles SET display_name = 'Quarry Echo', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=QuarryEcho', bio = 'Cavernous post-rock reverberating through stone.', listener_count = 100, created_at = now() - interval '22 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000034';
UPDATE public.profiles SET display_name = 'Thistle Crown', role = 'artist', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=ThistleCrown', bio = 'Regal indie folk with thorns of punk energy.', listener_count = 470, created_at = now() - interval '20 days', updated_at = now() WHERE id = 'aaaaaaaa-0001-4000-a000-000000000035';
UPDATE public.profiles SET display_name = 'The Sound Sage', role = 'curator', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=SoundSage', bio = 'Veteran music journalist with an ear for the extraordinary.', listener_count = 42000, created_at = now() - interval '90 days', updated_at = now() WHERE id = 'aaaaaaaa-0002-4000-a000-000000000001';
UPDATE public.profiles SET display_name = 'Vinyl Verdict', role = 'curator', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=VinylVerdict', bio = 'Former record store owner who has heard everything.', listener_count = 28000, created_at = now() - interval '89 days', updated_at = now() WHERE id = 'aaaaaaaa-0002-4000-a000-000000000002';
UPDATE public.profiles SET display_name = 'Frequency Maven', role = 'curator', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=FrequencyMaven', bio = 'Electronic music specialist and festival curator.', listener_count = 35000, created_at = now() - interval '87 days', updated_at = now() WHERE id = 'aaaaaaaa-0002-4000-a000-000000000003';
UPDATE public.profiles SET display_name = 'The Wax Critic', role = 'curator', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=WaxCritic', bio = 'Sharp takes, honest reviews, no fluff.', listener_count = 18500, created_at = now() - interval '85 days', updated_at = now() WHERE id = 'aaaaaaaa-0002-4000-a000-000000000004';
UPDATE public.profiles SET display_name = 'Groove Architect', role = 'curator', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=GrooveArchitect', bio = 'Building playlists that move bodies and minds.', listener_count = 50000, created_at = now() - interval '83 days', updated_at = now() WHERE id = 'aaaaaaaa-0002-4000-a000-000000000005';
UPDATE public.profiles SET display_name = 'Sonic Compass', role = 'curator', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=SonicCompass', bio = 'Pointing listeners toward hidden musical gems.', listener_count = 22000, created_at = now() - interval '81 days', updated_at = now() WHERE id = 'aaaaaaaa-0002-4000-a000-000000000006';
UPDATE public.profiles SET display_name = 'Decibel Scout', role = 'curator', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=DecibelScout', bio = 'Scouring the underground for tomorrow''s hits.', listener_count = 15000, created_at = now() - interval '79 days', updated_at = now() WHERE id = 'aaaaaaaa-0002-4000-a000-000000000007';
UPDATE public.profiles SET display_name = 'Harmonic Judge', role = 'curator', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=HarmonicJudge', bio = 'Classical training meets modern indie sensibility.', listener_count = 31000, created_at = now() - interval '77 days', updated_at = now() WHERE id = 'aaaaaaaa-0002-4000-a000-000000000008';
UPDATE public.profiles SET display_name = 'Bass Oracle', role = 'curator', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=BassOracle', bio = 'Low-end specialist who feels music in the bones.', listener_count = 12000, created_at = now() - interval '75 days', updated_at = now() WHERE id = 'aaaaaaaa-0002-4000-a000-000000000009';
UPDATE public.profiles SET display_name = 'Treble Alchemist', role = 'curator', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=TrebleAlchemist', bio = 'Turning raw demos into golden recommendations.', listener_count = 26000, created_at = now() - interval '73 days', updated_at = now() WHERE id = 'aaaaaaaa-0002-4000-a000-000000000010';
UPDATE public.profiles SET display_name = 'Pulse Keeper', role = 'curator', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=PulseKeeper', bio = 'Has a sixth sense for rhythm and momentum.', listener_count = 8500, created_at = now() - interval '71 days', updated_at = now() WHERE id = 'aaaaaaaa-0002-4000-a000-000000000011';
UPDATE public.profiles SET display_name = 'Tone Shepherd', role = 'curator', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=ToneShepherd', bio = 'Guiding new artists through the landscape of sound.', listener_count = 1200, created_at = now() - interval '69 days', updated_at = now() WHERE id = 'aaaaaaaa-0002-4000-a000-000000000012';
UPDATE public.profiles SET display_name = 'HexAdmin Prime', role = 'admin', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=HexAdminPrime', bio = 'Platform founder and chief hexagonal officer.', listener_count = 0, created_at = now() - interval '90 days', updated_at = now() WHERE id = 'aaaaaaaa-0003-4000-a000-000000000001';
UPDATE public.profiles SET display_name = 'HexOps Manager', role = 'admin', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=HexOpsManager', bio = 'Keeping the gears turning behind the scenes.', listener_count = 0, created_at = now() - interval '90 days', updated_at = now() WHERE id = 'aaaaaaaa-0003-4000-a000-000000000002';
UPDATE public.profiles SET display_name = 'HexMod Lead', role = 'admin', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=HexModLead', bio = 'Community moderator and quality gatekeeper.', listener_count = 0, created_at = now() - interval '90 days', updated_at = now() WHERE id = 'aaaaaaaa-0003-4000-a000-000000000003';

-- ──────────────────────────────────────────────
-- 4. Insert 50 submissions (real Spotify tracks)
-- ──────────────────────────────────────────────
-- Disable vote trigger temporarily so we can insert votes in bulk later
-- and then fix vote_count with a single UPDATE
ALTER TABLE public.votes DISABLE TRIGGER on_vote_insert;

INSERT INTO public.submissions (id, artist_id, track_title, track_url, platform, genre, description, status, payment_id, paid_at, created_at, updated_at)
VALUES
  -- Top tier (high votes expected) — accepted
  ('aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000001', 'Sailor Song', 'https://open.spotify.com/track/0UYnhUfnUj5adChuAXvLUB', 'spotify', 'Indie Pop', 'A dreamy ode to the pull of the open water and the people we leave behind.', 'accepted', 'demo_pi_001', now() - interval '85 days', now() - interval '85 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0001-4000-a000-000000000002', 'Pink Pony Club', 'https://open.spotify.com/track/1k2pQc5i348DCHwbn5KTdc', 'spotify', 'Pop', 'Chasing neon lights and big dreams far from home.', 'accepted', 'demo_pi_002', now() - interval '83 days', now() - interval '83 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0001-4000-a000-000000000003', 'we fell in love in october', 'https://open.spotify.com/track/6IPwKM3fUUzlElbvKw2sKl', 'spotify', 'Indie Pop', 'Autumn romance distilled into two minutes of pure warmth.', 'accepted', 'demo_pi_003', now() - interval '81 days', now() - interval '81 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0001-4000-a000-000000000004', 'Do I Wanna Know?', 'https://open.spotify.com/track/5FVd6KXrgO9B3JPmC8OPst', 'spotify', 'Indie Rock', 'Late-night longing wrapped in a hypnotic riff.', 'accepted', 'demo_pi_004', now() - interval '80 days', now() - interval '80 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0001-4000-a000-000000000005', 'Space Song', 'https://open.spotify.com/track/7H0ya83CMmgFcOhw0UB6ow', 'spotify', 'Dream Pop', 'Floating through the cosmos on a bed of reverb and longing.', 'accepted', 'demo_pi_005', now() - interval '78 days', now() - interval '78 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0001-4000-a000-000000000006', 'Sweater Weather', 'https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6', 'spotify', 'Alternative', 'The definitive song for cold nights and close company.', 'accepted', 'demo_pi_006', now() - interval '77 days', now() - interval '77 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0001-4000-a000-000000000007', 'Feel Good Inc.', 'https://open.spotify.com/track/0d28khcov6AiegSCpG5TuT', 'spotify', 'Hip-Hop', 'A satirical groove about captivity in the machine of happiness.', 'accepted', 'demo_pi_007', now() - interval '75 days', now() - interval '75 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0001-4000-a000-000000000008', 'Bad Habit', 'https://open.spotify.com/track/4k6Uh1HXdhtusDW5y8Gbvy', 'spotify', 'R&B', 'Missed connections turned into an irresistible earworm.', 'accepted', 'demo_pi_008', now() - interval '74 days', now() - interval '74 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000009', 'Nights', 'https://open.spotify.com/track/7eqoqGkKwgOaWNNHx90uEZ', 'spotify', 'R&B', 'A masterclass in duality — the beat switch that changed everything.', 'accepted', 'demo_pi_009', now() - interval '72 days', now() - interval '72 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0001-4000-a000-000000000010', 'Pumped Up Kicks', 'https://open.spotify.com/track/6xyWmzLDVSJcYBWidQ38Fi', 'spotify', 'Indie Rock', 'Dark lyrics hidden beneath an impossibly catchy whistle.', 'accepted', 'demo_pi_010', now() - interval '70 days', now() - interval '70 days', now()),
  -- Mid tier — accepted
  ('aaaaaaaa-1000-4000-a000-000000000011', 'aaaaaaaa-0001-4000-a000-000000000011', 'EARFQUAKE', 'https://open.spotify.com/track/5hVghJ4KaYES3BFUATCYn0', 'spotify', 'Hip-Hop', 'Vulnerability meets maximalist production in the best way.', 'accepted', 'demo_pi_011', now() - interval '68 days', now() - interval '68 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000012', 'aaaaaaaa-0001-4000-a000-000000000012', 'Midnight City', 'https://open.spotify.com/track/1eyzqe2QqGZUmfcPZtrIyt', 'spotify', 'Synth Pop', 'Neon skylines and saxophone solos that define a generation.', 'accepted', 'demo_pi_012', now() - interval '66 days', now() - interval '66 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000013', 'aaaaaaaa-0001-4000-a000-000000000013', 'Dreams', 'https://open.spotify.com/track/0ofHAoxe9vBkTCp2UQIavz', 'spotify', 'Soft Rock', 'Timeless and effortless — a song that never ages.', 'accepted', 'demo_pi_013', now() - interval '65 days', now() - interval '65 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000014', 'aaaaaaaa-0001-4000-a000-000000000014', 'Redbone', 'https://open.spotify.com/track/0wXuerDYiBnERgIpbb3JBR', 'spotify', 'Funk', 'A psychedelic soul groove urging you to stay woke.', 'accepted', 'demo_pi_014', now() - interval '63 days', now() - interval '63 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000015', 'aaaaaaaa-0001-4000-a000-000000000015', 'Karma Police', 'https://open.spotify.com/track/07DvRMhMBY2ue8gMoWZdRP', 'spotify', 'Alternative', 'Paranoia and justice dissolving into a drone of static.', 'accepted', 'demo_pi_015', now() - interval '62 days', now() - interval '62 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000016', 'aaaaaaaa-0001-4000-a000-000000000016', 'The Less I Know The Better', 'https://open.spotify.com/track/6K4t31amVTZDgR3sKmwUJJ', 'spotify', 'Psychedelic Pop', 'Jealousy never sounded so groovy.', 'accepted', 'demo_pi_016', now() - interval '60 days', now() - interval '60 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000017', 'aaaaaaaa-0001-4000-a000-000000000017', 'Best Part', 'https://open.spotify.com/track/1Q7EgiMOuwDcB0PJC6AzON', 'spotify', 'R&B', 'A duet so tender it makes the world feel gentler.', 'accepted', 'demo_pi_017', now() - interval '58 days', now() - interval '58 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000018', 'aaaaaaaa-0001-4000-a000-000000000018', 'Cherry Wine', 'https://open.spotify.com/track/1C042FLYy7rP3MfnkOcnha', 'spotify', 'Folk', 'Hauntingly beautiful — a love song that cuts deep.', 'accepted', 'demo_pi_018', now() - interval '56 days', now() - interval '56 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000019', 'aaaaaaaa-0001-4000-a000-000000000019', 'ocean eyes', 'https://open.spotify.com/track/7hDVYcQq6MxkdJGweuCtl9', 'spotify', 'Indie Pop', 'The song that launched a generation of bedroom pop dreamers.', 'accepted', 'demo_pi_019', now() - interval '55 days', now() - interval '55 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000020', 'aaaaaaaa-0001-4000-a000-000000000020', 'Electric Feel', 'https://open.spotify.com/track/3FtYbEfBqAlGO46NUDQSAt', 'spotify', 'Synth Pop', 'Pure electrified bliss — a dancefloor essential.', 'accepted', 'demo_pi_020', now() - interval '53 days', now() - interval '53 days', now()),
  -- Mid-lower tier — accepted
  ('aaaaaaaa-1000-4000-a000-000000000021', 'aaaaaaaa-0001-4000-a000-000000000021', 'Not Strong Enough', 'https://open.spotify.com/track/09DR0sHnQUhHOiSNttc1mv', 'spotify', 'Indie Rock', 'Three voices converging into one devastating admission.', 'accepted', 'demo_pi_021', now() - interval '51 days', now() - interval '51 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000022', 'aaaaaaaa-0001-4000-a000-000000000022', 'Motion Sickness', 'https://open.spotify.com/track/5xo8RrjJ9CVNrtRg2S3B1R', 'spotify', 'Indie Rock', 'Heartbreak delivered with a wry smile and perfect guitar tone.', 'accepted', 'demo_pi_022', now() - interval '49 days', now() - interval '49 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000023', 'aaaaaaaa-0001-4000-a000-000000000023', 'See You Again', 'https://open.spotify.com/track/7KA4W4McWYRpgf0fWsJZWB', 'spotify', 'Hip-Hop', 'A breezy love letter delivered over vintage keys and warm bass.', 'accepted', 'demo_pi_023', now() - interval '47 days', now() - interval '47 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000024', 'aaaaaaaa-0001-4000-a000-000000000024', 'Chicago', 'https://open.spotify.com/track/1yupbrI7ROhigIHpQBevPh', 'spotify', 'Indie Folk', 'An epic journey compressed into orchestral folk perfection.', 'accepted', 'demo_pi_024', now() - interval '45 days', now() - interval '45 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000025', 'aaaaaaaa-0001-4000-a000-000000000025', 'SUGAR', 'https://open.spotify.com/track/6U0FIYXCQ3TGrk4tFpLrEA', 'spotify', 'Hip-Hop', 'Sweet and addictive — pop-rap at its most irresistible.', 'accepted', 'demo_pi_025', now() - interval '43 days', now() - interval '43 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000026', 'aaaaaaaa-0001-4000-a000-000000000026', 'Let It Happen', 'https://open.spotify.com/track/2X485T9Z5Ly0xyaghN73ed', 'spotify', 'Psychedelic', 'Seven minutes of surrender to the cosmic groove.', 'accepted', 'demo_pi_026', now() - interval '41 days', now() - interval '41 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000027', 'aaaaaaaa-0001-4000-a000-000000000027', 'In the Aeroplane Over the Sea', 'https://open.spotify.com/track/1NiAMp0CzUdG6e97VYRB1a', 'spotify', 'Indie Rock', 'Raw, urgent, and unforgettable — lo-fi at its most transcendent.', 'accepted', 'demo_pi_027', now() - interval '39 days', now() - interval '39 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000028', 'aaaaaaaa-0001-4000-a000-000000000028', 'Between the Bars', 'https://open.spotify.com/track/52Bg6oaos7twR7IUtEpqcE', 'spotify', 'Folk', 'Whispered fragility that somehow holds enormous weight.', 'accepted', 'demo_pi_028', now() - interval '37 days', now() - interval '37 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000029', 'aaaaaaaa-0001-4000-a000-000000000029', 'Somebody Else', 'https://open.spotify.com/track/5hc71nKsUgtwQ3z52KEKQk', 'spotify', 'Synth Pop', 'The ache of seeing your ex move on, rendered in synths.', 'accepted', 'demo_pi_029', now() - interval '35 days', now() - interval '35 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000030', 'aaaaaaaa-0001-4000-a000-000000000030', 'This Must Be the Place', 'https://open.spotify.com/track/6aBUnkXuCEQQHAlTokv9or', 'spotify', 'New Wave', 'Home is wherever I''m with you — the original version.', 'accepted', 'demo_pi_030', now() - interval '33 days', now() - interval '33 days', now()),
  -- Lower tier — accepted
  ('aaaaaaaa-1000-4000-a000-000000000031', 'aaaaaaaa-0001-4000-a000-000000000031', 'Holocene', 'https://open.spotify.com/track/4fbvXwMTXPWaFyaMWUm9CR', 'spotify', 'Indie Folk', 'Finding insignificance and beauty in the same breath.', 'accepted', 'demo_pi_031', now() - interval '31 days', now() - interval '31 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000032', 'aaaaaaaa-0001-4000-a000-000000000032', 'Cigarette Daydreams', 'https://open.spotify.com/track/3FTCocdobxNcXlabhqkSyW', 'spotify', 'Indie Rock', 'Nostalgic haze and restless youth in three chords.', 'accepted', 'demo_pi_032', now() - interval '29 days', now() - interval '29 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000033', 'aaaaaaaa-0001-4000-a000-000000000033', 'Ribs', 'https://open.spotify.com/track/2MvvoeRt8NcOXWESkxWn3g', 'spotify', 'Art Pop', 'Growing up terrified, dancing anyway — Lorde at her most human.', 'accepted', 'demo_pi_033', now() - interval '27 days', now() - interval '27 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000034', 'aaaaaaaa-0001-4000-a000-000000000034', 'Dreams Tonite', 'https://open.spotify.com/track/3xiMFRYBQL1zxdxbgUmBKI', 'spotify', 'Dream Pop', 'Shimmering dream pop that dissolves like morning mist.', 'accepted', 'demo_pi_034', now() - interval '25 days', now() - interval '25 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000035', 'aaaaaaaa-0001-4000-a000-000000000035', 'Skinny Love', 'https://open.spotify.com/track/3B3eOgLJSqPEA0RfboIQVM', 'spotify', 'Indie Folk', 'Heartbreak stripped to its barest, most trembling core.', 'accepted', 'demo_pi_035', now() - interval '23 days', now() - interval '23 days', now()),
  -- In review (10)
  ('aaaaaaaa-1000-4000-a000-000000000036', 'aaaaaaaa-0001-4000-a000-000000000001', 'Glimpse of Us', 'https://open.spotify.com/track/6xGruZOHLs39ZbVccQTuPZ', 'spotify', 'R&B', 'Searching for something lost in everyone new.', 'in_review', 'demo_pi_036', now() - interval '20 days', now() - interval '20 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000037', 'aaaaaaaa-0001-4000-a000-000000000002', 'Loving Is Easy', 'https://open.spotify.com/track/7ASFZh1D0DPZro7UXUKGmd', 'spotify', 'Indie Pop', 'A declaration of love so simple it becomes profound.', 'in_review', 'demo_pi_037', now() - interval '19 days', now() - interval '19 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000038', 'aaaaaaaa-0001-4000-a000-000000000003', '505', 'https://open.spotify.com/track/58ge6dfP91o9oXMzq3XkIS', 'spotify', 'Indie Rock', 'Desperate urgency building to an explosive crescendo.', 'in_review', 'demo_pi_038', now() - interval '18 days', now() - interval '18 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000039', 'aaaaaaaa-0001-4000-a000-000000000004', 'Just Like Heaven', 'https://open.spotify.com/track/76GlO5H5RT6g7y0gev86Nk', 'spotify', 'Alternative', 'Jangly perfection from the kings of melancholic pop.', 'in_review', 'demo_pi_039', now() - interval '17 days', now() - interval '17 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000040', 'aaaaaaaa-0001-4000-a000-000000000005', 'Green Light', 'https://open.spotify.com/track/6ie2Bw3xLj2JcGowOlcMhb', 'spotify', 'Electropop', 'Freedom after heartbreak, expressed as a euphoric rush.', 'in_review', 'demo_pi_040', now() - interval '15 days', now() - interval '15 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000041', 'aaaaaaaa-0001-4000-a000-000000000006', 'All My Friends', 'https://open.spotify.com/track/2Ud3deeqLAG988pfW0Kwcl', 'spotify', 'Electronic', 'An epic meditation on aging and friendship over relentless piano.', 'in_review', 'demo_pi_041', now() - interval '14 days', now() - interval '14 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000042', 'aaaaaaaa-0001-4000-a000-000000000007', 'Cranes in the Sky', 'https://open.spotify.com/track/48EjSdYh8wz2gBxxqzrsLe', 'spotify', 'R&B', 'Trying everything to escape pain and finding nothing works.', 'in_review', 'demo_pi_042', now() - interval '12 days', now() - interval '12 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000043', 'aaaaaaaa-0001-4000-a000-000000000008', 'Wake Up', 'https://open.spotify.com/track/6Hmj7SrLRbreLVfVS7mV1S', 'spotify', 'Indie Rock', 'A battle cry for the restless and the hopeful.', 'in_review', 'demo_pi_043', now() - interval '11 days', now() - interval '11 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000044', 'aaaaaaaa-0001-4000-a000-000000000009', 'Thinkin Bout You', 'https://open.spotify.com/track/7DfFc7a6Rwfi3YQMRbDMau', 'spotify', 'R&B', 'Falsetto confessions floating over minimal production.', 'in_review', 'demo_pi_044', now() - interval '10 days', now() - interval '10 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000045', 'aaaaaaaa-0001-4000-a000-000000000010', 'MYSTERY', 'https://open.spotify.com/track/1QlGmLx0IWNZq8Dm4N94xm', 'spotify', 'Alternative', 'Hardcore energy channeled into something unexpectedly melodic.', 'in_review', 'demo_pi_045', now() - interval '8 days', now() - interval '8 days', now()),
  -- Pending (5)
  ('aaaaaaaa-1000-4000-a000-000000000046', 'aaaaaaaa-0001-4000-a000-000000000011', 'Chamber of Reflection', 'https://open.spotify.com/track/2VfCH6BZ8cqDU1dBjjrxA5', 'spotify', 'Indie Rock', 'A lo-fi meditation on solitude and self-examination.', 'pending', 'demo_pi_046', now() - interval '5 days', now() - interval '5 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000047', 'aaaaaaaa-0001-4000-a000-000000000012', 'Them Changes', 'https://open.spotify.com/track/7taHgaFioQRfTuJVqaj31b', 'spotify', 'Funk', 'Thundercat shredding bass over a heartbreak funk groove.', 'pending', 'demo_pi_047', now() - interval '4 days', now() - interval '4 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000048', 'aaaaaaaa-0001-4000-a000-000000000013', 'Slow Show', 'https://open.spotify.com/track/3jJhAd1RoImIx5KJRfh6Rf', 'spotify', 'Indie Rock', 'Quiet devastation — Matt Berninger at his most vulnerable.', 'pending', 'demo_pi_048', now() - interval '3 days', now() - interval '3 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000049', 'aaaaaaaa-0001-4000-a000-000000000014', 'cellophane', 'https://open.spotify.com/track/3VwZqgfrM3xb1usuLprkTu', 'spotify', 'Art Pop', 'Transparency as art — raw and exposed and breathtaking.', 'pending', 'demo_pi_049', now() - interval '2 days', now() - interval '2 days', now()),
  ('aaaaaaaa-1000-4000-a000-000000000050', 'aaaaaaaa-0001-4000-a000-000000000015', 'Pristine', 'https://open.spotify.com/track/5JX6gZ5mOASumPrU1JbfbV', 'spotify', 'Indie Rock', 'Youthful frustration and longing delivered with punk clarity.', 'pending', 'demo_pi_050', now() - interval '1 day', now() - interval '1 day', now());
-- ──────────────────────────────────────────────
-- 5. Insert ~585 votes
-- ──────────────────────────────────────────────
-- Vote trigger is disabled; we'll manually set vote_count after

-- Total votes: 585

INSERT INTO public.votes (id, submission_id, voter_id, created_at)
VALUES
  ('aaaaaaaa-2000-4000-a000-000000000001', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000017', now() - interval '54 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000002', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000003', now() - interval '29 days 5 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000003', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0002-4000-a000-000000000012', now() - interval '48 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000004', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000030', now() - interval '29 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000005', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000035', now() - interval '49 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000006', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000008', now() - interval '54 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000007', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000025', now() - interval '18 days 16 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000008', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000006', now() - interval '32 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000009', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0002-4000-a000-000000000001', now() - interval '16 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000010', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000019', now() - interval '29 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000011', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0002-4000-a000-000000000005', now() - interval '46 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000012', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000024', now() - interval '16 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000013', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0002-4000-a000-000000000002', now() - interval '22 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000014', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000013', now() - interval '58 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000015', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000005', now() - interval '6 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000016', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0003-4000-a000-000000000002', now() - interval '10 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000017', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000015', now() - interval '25 days 22 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000018', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0002-4000-a000-000000000006', now() - interval '10 days 22 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000019', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0002-4000-a000-000000000008', now() - interval '14 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000020', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000028', now() - interval '27 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000021', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0002-4000-a000-000000000010', now() - interval '22 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000022', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000031', now() - interval '30 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000023', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000004', now() - interval '4 days 6 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000024', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0002-4000-a000-000000000003', now() - interval '54 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000025', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000009', now() - interval '25 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000026', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000034', now() - interval '45 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000027', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000021', now() - interval '55 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000028', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000012', now() - interval '25 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000029', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000032', now() - interval '1 days 11 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000030', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000023', now() - interval '20 days 12 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000031', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0001-4000-a000-000000000023', now() - interval '55 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000032', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0001-4000-a000-000000000014', now() - interval '35 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000033', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0002-4000-a000-000000000008', now() - interval '48 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000034', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0001-4000-a000-000000000018', now() - interval '52 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000035', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0002-4000-a000-000000000010', now() - interval '58 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000036', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0002-4000-a000-000000000009', now() - interval '32 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000037', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0002-4000-a000-000000000007', now() - interval '18 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000038', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0001-4000-a000-000000000005', now() - interval '32 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000039', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0002-4000-a000-000000000004', now() - interval '25 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000040', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0002-4000-a000-000000000006', now() - interval '43 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000041', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0001-4000-a000-000000000011', now() - interval '52 days 12 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000042', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0001-4000-a000-000000000035', now() - interval '47 days 5 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000043', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0001-4000-a000-000000000016', now() - interval '54 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000044', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0002-4000-a000-000000000005', now() - interval '59 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000045', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0001-4000-a000-000000000030', now() - interval '40 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000046', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0001-4000-a000-000000000025', now() - interval '2 days 12 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000047', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0002-4000-a000-000000000012', now() - interval '38 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000048', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0001-4000-a000-000000000015', now() - interval '43 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000049', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0001-4000-a000-000000000021', now() - interval '6 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000050', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0001-4000-a000-000000000027', now() - interval '28 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000051', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0002-4000-a000-000000000011', now() - interval '56 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000052', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '12 days 1 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000053', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0001-4000-a000-000000000004', now() - interval '17 days 12 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000054', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0001-4000-a000-000000000015', now() - interval '21 days 6 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000055', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '30 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000056', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0001-4000-a000-000000000021', now() - interval '22 days 12 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000057', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0001-4000-a000-000000000026', now() - interval '18 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000058', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0001-4000-a000-000000000018', now() - interval '17 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000059', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0001-4000-a000-000000000005', now() - interval '31 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000060', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0001-4000-a000-000000000014', now() - interval '48 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000061', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0002-4000-a000-000000000002', now() - interval '4 days 11 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000062', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0002-4000-a000-000000000011', now() - interval '15 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000063', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0002-4000-a000-000000000007', now() - interval '5 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000064', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0001-4000-a000-000000000032', now() - interval '3 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000065', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0002-4000-a000-000000000010', now() - interval '16 days 6 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000066', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0001-4000-a000-000000000030', now() - interval '54 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000067', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0001-4000-a000-000000000010', now() - interval '40 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000068', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0001-4000-a000-000000000017', now() - interval '16 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000069', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0001-4000-a000-000000000009', now() - interval '31 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000070', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0001-4000-a000-000000000016', now() - interval '8 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000071', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0001-4000-a000-000000000024', now() - interval '14 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000072', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0002-4000-a000-000000000001', now() - interval '45 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000073', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0001-4000-a000-000000000035', now() - interval '50 days 11 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000074', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0001-4000-a000-000000000017', now() - interval '11 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000075', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0002-4000-a000-000000000003', now() - interval '39 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000076', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0001-4000-a000-000000000028', now() - interval '46 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000077', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0002-4000-a000-000000000012', now() - interval '50 days 5 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000078', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0001-4000-a000-000000000026', now() - interval '20 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000079', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0001-4000-a000-000000000024', now() - interval '38 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000080', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0001-4000-a000-000000000015', now() - interval '60 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000081', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0001-4000-a000-000000000009', now() - interval '37 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000082', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0001-4000-a000-000000000033', now() - interval '59 days 12 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000083', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0001-4000-a000-000000000032', now() - interval '26 days 22 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000084', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0001-4000-a000-000000000006', now() - interval '13 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000085', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '38 days 22 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000086', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0001-4000-a000-000000000008', now() - interval '54 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000087', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0001-4000-a000-000000000010', now() - interval '16 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000088', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0001-4000-a000-000000000011', now() - interval '45 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000089', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0002-4000-a000-000000000011', now() - interval '55 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000090', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0001-4000-a000-000000000005', now() - interval '39 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000091', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0001-4000-a000-000000000013', now() - interval '51 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000092', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0001-4000-a000-000000000031', now() - interval '51 days 1 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000093', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0001-4000-a000-000000000020', now() - interval '23 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000094', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0002-4000-a000-000000000007', now() - interval '28 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000095', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0003-4000-a000-000000000001', now() - interval '24 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000096', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0001-4000-a000-000000000017', now() - interval '33 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000097', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0002-4000-a000-000000000001', now() - interval '22 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000098', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '55 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000099', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0002-4000-a000-000000000009', now() - interval '53 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000100', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0001-4000-a000-000000000008', now() - interval '7 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000101', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0002-4000-a000-000000000012', now() - interval '24 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000102', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0001-4000-a000-000000000035', now() - interval '58 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000103', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0001-4000-a000-000000000018', now() - interval '46 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000104', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0002-4000-a000-000000000007', now() - interval '28 days 5 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000105', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0001-4000-a000-000000000022', now() - interval '47 days 16 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000106', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0002-4000-a000-000000000011', now() - interval '42 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000107', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0001-4000-a000-000000000019', now() - interval '40 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000108', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0001-4000-a000-000000000028', now() - interval '50 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000109', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0001-4000-a000-000000000011', now() - interval '30 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000110', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0001-4000-a000-000000000030', now() - interval '53 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000111', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0003-4000-a000-000000000001', now() - interval '38 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000112', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '21 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000113', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0001-4000-a000-000000000033', now() - interval '54 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000114', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0001-4000-a000-000000000012', now() - interval '18 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000115', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0001-4000-a000-000000000034', now() - interval '16 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000116', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0003-4000-a000-000000000002', now() - interval '37 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000117', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0001-4000-a000-000000000004', now() - interval '43 days 12 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000118', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0002-4000-a000-000000000003', now() - interval '22 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000119', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0002-4000-a000-000000000006', now() - interval '32 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000120', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0001-4000-a000-000000000020', now() - interval '12 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000121', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '14 days 11 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000122', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0001-4000-a000-000000000033', now() - interval '52 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000123', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0002-4000-a000-000000000004', now() - interval '22 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000124', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0001-4000-a000-000000000013', now() - interval '57 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000125', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0001-4000-a000-000000000010', now() - interval '45 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000126', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0001-4000-a000-000000000024', now() - interval '36 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000127', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0001-4000-a000-000000000011', now() - interval '34 days 6 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000128', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0001-4000-a000-000000000035', now() - interval '6 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000129', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0001-4000-a000-000000000034', now() - interval '47 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000130', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '32 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000131', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0001-4000-a000-000000000021', now() - interval '49 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000132', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0001-4000-a000-000000000032', now() - interval '45 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000133', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0001-4000-a000-000000000002', now() - interval '42 days 22 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000134', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0001-4000-a000-000000000008', now() - interval '32 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000135', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0002-4000-a000-000000000008', now() - interval '51 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000136', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0003-4000-a000-000000000002', now() - interval '6 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000137', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0001-4000-a000-000000000016', now() - interval '15 days 12 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000138', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0002-4000-a000-000000000001', now() - interval '45 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000139', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0003-4000-a000-000000000001', now() - interval '20 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000140', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0001-4000-a000-000000000029', now() - interval '38 days 11 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000141', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0001-4000-a000-000000000019', now() - interval '31 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000142', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0001-4000-a000-000000000006', now() - interval '34 days 11 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000143', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '28 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000144', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0002-4000-a000-000000000012', now() - interval '36 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000145', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0001-4000-a000-000000000032', now() - interval '23 days 22 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000146', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0001-4000-a000-000000000005', now() - interval '30 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000147', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0001-4000-a000-000000000035', now() - interval '20 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000148', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0001-4000-a000-000000000009', now() - interval '15 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000149', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0002-4000-a000-000000000009', now() - interval '47 days 6 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000150', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0001-4000-a000-000000000031', now() - interval '21 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000151', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0002-4000-a000-000000000001', now() - interval '48 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000152', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0001-4000-a000-000000000011', now() - interval '49 days 22 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000153', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0001-4000-a000-000000000017', now() - interval '12 days 6 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000154', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0001-4000-a000-000000000034', now() - interval '14 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000155', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0001-4000-a000-000000000028', now() - interval '31 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000156', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0001-4000-a000-000000000014', now() - interval '47 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000157', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0002-4000-a000-000000000010', now() - interval '49 days 16 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000158', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0001-4000-a000-000000000013', now() - interval '39 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000159', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0001-4000-a000-000000000020', now() - interval '7 days 6 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000160', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0001-4000-a000-000000000026', now() - interval '19 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000161', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0001-4000-a000-000000000022', now() - interval '24 days 5 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000162', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0001-4000-a000-000000000021', now() - interval '20 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000163', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0001-4000-a000-000000000012', now() - interval '46 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000164', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0001-4000-a000-000000000029', now() - interval '9 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000165', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0001-4000-a000-000000000034', now() - interval '3 days 1 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000166', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '36 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000167', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0001-4000-a000-000000000003', now() - interval '45 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000168', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0001-4000-a000-000000000016', now() - interval '41 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000169', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0001-4000-a000-000000000015', now() - interval '7 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000170', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0001-4000-a000-000000000005', now() - interval '37 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000171', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0001-4000-a000-000000000022', now() - interval '31 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000172', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0001-4000-a000-000000000002', now() - interval '29 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000173', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0002-4000-a000-000000000003', now() - interval '12 days 1 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000174', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0002-4000-a000-000000000001', now() - interval '17 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000175', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0002-4000-a000-000000000010', now() - interval '8 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000176', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0002-4000-a000-000000000006', now() - interval '26 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000177', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0002-4000-a000-000000000004', now() - interval '5 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000178', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '41 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000179', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0002-4000-a000-000000000009', now() - interval '4 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000180', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0001-4000-a000-000000000004', now() - interval '10 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000181', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0002-4000-a000-000000000002', now() - interval '20 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000182', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0001-4000-a000-000000000035', now() - interval '16 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000183', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0003-4000-a000-000000000001', now() - interval '36 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000184', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0002-4000-a000-000000000007', now() - interval '39 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000185', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000022', now() - interval '51 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000186', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000005', now() - interval '15 days 16 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000187', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000033', now() - interval '25 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000188', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000016', now() - interval '59 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000189', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000018', now() - interval '20 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000190', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0002-4000-a000-000000000008', now() - interval '28 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000191', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000032', now() - interval '37 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000192', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000014', now() - interval '4 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000193', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000035', now() - interval '48 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000194', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '49 days 6 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000195', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0002-4000-a000-000000000002', now() - interval '41 days 6 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000196', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0002-4000-a000-000000000005', now() - interval '17 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000197', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000031', now() - interval '6 days 5 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000198', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0002-4000-a000-000000000012', now() - interval '16 days 5 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000199', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0002-4000-a000-000000000003', now() - interval '36 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000200', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000027', now() - interval '11 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000201', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000013', now() - interval '27 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000202', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000007', now() - interval '45 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000203', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0003-4000-a000-000000000001', now() - interval '31 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000204', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '3 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000205', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0002-4000-a000-000000000010', now() - interval '19 days 22 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000206', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000012', now() - interval '19 days 22 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000207', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000030', now() - interval '56 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000208', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000028', now() - interval '5 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000209', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000015', now() - interval '15 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000210', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000024', now() - interval '51 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000211', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000002', now() - interval '38 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000212', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0002-4000-a000-000000000001', now() - interval '52 days 6 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000213', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000021', now() - interval '28 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000214', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000023', now() - interval '35 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000215', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0001-4000-a000-000000000007', now() - interval '42 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000216', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0001-4000-a000-000000000004', now() - interval '59 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000217', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0001-4000-a000-000000000026', now() - interval '53 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000218', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0002-4000-a000-000000000012', now() - interval '5 days 1 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000219', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0001-4000-a000-000000000022', now() - interval '11 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000220', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '39 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000221', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0001-4000-a000-000000000016', now() - interval '53 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000222', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0001-4000-a000-000000000013', now() - interval '59 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000223', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0002-4000-a000-000000000008', now() - interval '29 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000224', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0001-4000-a000-000000000035', now() - interval '30 days 22 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000225', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0001-4000-a000-000000000029', now() - interval '20 days 22 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000226', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0001-4000-a000-000000000009', now() - interval '26 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000227', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0001-4000-a000-000000000028', now() - interval '33 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000228', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0001-4000-a000-000000000012', now() - interval '32 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000229', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0001-4000-a000-000000000018', now() - interval '6 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000230', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0001-4000-a000-000000000030', now() - interval '3 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000231', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0002-4000-a000-000000000009', now() - interval '48 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000232', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0001-4000-a000-000000000005', now() - interval '39 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000233', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0002-4000-a000-000000000005', now() - interval '2 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000234', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0003-4000-a000-000000000001', now() - interval '15 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000235', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0002-4000-a000-000000000003', now() - interval '54 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000236', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0002-4000-a000-000000000006', now() - interval '38 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000237', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0002-4000-a000-000000000001', now() - interval '49 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000238', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0003-4000-a000-000000000002', now() - interval '53 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000239', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0001-4000-a000-000000000002', now() - interval '37 days 1 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000240', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0001-4000-a000-000000000021', now() - interval '49 days 5 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000241', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0001-4000-a000-000000000032', now() - interval '31 days 16 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000242', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '42 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000243', 'aaaaaaaa-1000-4000-a000-000000000011', 'aaaaaaaa-0001-4000-a000-000000000006', now() - interval '59 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000244', 'aaaaaaaa-1000-4000-a000-000000000011', 'aaaaaaaa-0003-4000-a000-000000000002', now() - interval '12 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000245', 'aaaaaaaa-1000-4000-a000-000000000011', 'aaaaaaaa-0001-4000-a000-000000000016', now() - interval '28 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000246', 'aaaaaaaa-1000-4000-a000-000000000011', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '53 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000247', 'aaaaaaaa-1000-4000-a000-000000000011', 'aaaaaaaa-0001-4000-a000-000000000027', now() - interval '6 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000248', 'aaaaaaaa-1000-4000-a000-000000000011', 'aaaaaaaa-0001-4000-a000-000000000032', now() - interval '23 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000249', 'aaaaaaaa-1000-4000-a000-000000000011', 'aaaaaaaa-0001-4000-a000-000000000031', now() - interval '22 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000250', 'aaaaaaaa-1000-4000-a000-000000000011', 'aaaaaaaa-0001-4000-a000-000000000014', now() - interval '43 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000251', 'aaaaaaaa-1000-4000-a000-000000000011', 'aaaaaaaa-0001-4000-a000-000000000026', now() - interval '55 days 5 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000252', 'aaaaaaaa-1000-4000-a000-000000000011', 'aaaaaaaa-0001-4000-a000-000000000004', now() - interval '22 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000253', 'aaaaaaaa-1000-4000-a000-000000000011', 'aaaaaaaa-0002-4000-a000-000000000012', now() - interval '45 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000254', 'aaaaaaaa-1000-4000-a000-000000000011', 'aaaaaaaa-0001-4000-a000-000000000025', now() - interval '19 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000255', 'aaaaaaaa-1000-4000-a000-000000000012', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '26 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000256', 'aaaaaaaa-1000-4000-a000-000000000012', 'aaaaaaaa-0001-4000-a000-000000000025', now() - interval '3 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000257', 'aaaaaaaa-1000-4000-a000-000000000012', 'aaaaaaaa-0001-4000-a000-000000000017', now() - interval '6 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000258', 'aaaaaaaa-1000-4000-a000-000000000012', 'aaaaaaaa-0001-4000-a000-000000000030', now() - interval '17 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000259', 'aaaaaaaa-1000-4000-a000-000000000012', 'aaaaaaaa-0001-4000-a000-000000000019', now() - interval '8 days 12 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000260', 'aaaaaaaa-1000-4000-a000-000000000012', 'aaaaaaaa-0001-4000-a000-000000000028', now() - interval '56 days 16 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000261', 'aaaaaaaa-1000-4000-a000-000000000012', 'aaaaaaaa-0002-4000-a000-000000000001', now() - interval '53 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000262', 'aaaaaaaa-1000-4000-a000-000000000012', 'aaaaaaaa-0002-4000-a000-000000000008', now() - interval '43 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000263', 'aaaaaaaa-1000-4000-a000-000000000012', 'aaaaaaaa-0001-4000-a000-000000000032', now() - interval '30 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000264', 'aaaaaaaa-1000-4000-a000-000000000012', 'aaaaaaaa-0001-4000-a000-000000000010', now() - interval '4 days 6 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000265', 'aaaaaaaa-1000-4000-a000-000000000012', 'aaaaaaaa-0001-4000-a000-000000000013', now() - interval '34 days 11 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000266', 'aaaaaaaa-1000-4000-a000-000000000012', 'aaaaaaaa-0002-4000-a000-000000000011', now() - interval '40 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000267', 'aaaaaaaa-1000-4000-a000-000000000012', 'aaaaaaaa-0001-4000-a000-000000000014', now() - interval '41 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000268', 'aaaaaaaa-1000-4000-a000-000000000012', 'aaaaaaaa-0001-4000-a000-000000000004', now() - interval '49 days 1 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000269', 'aaaaaaaa-1000-4000-a000-000000000012', 'aaaaaaaa-0001-4000-a000-000000000035', now() - interval '14 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000270', 'aaaaaaaa-1000-4000-a000-000000000012', 'aaaaaaaa-0002-4000-a000-000000000002', now() - interval '36 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000271', 'aaaaaaaa-1000-4000-a000-000000000013', 'aaaaaaaa-0003-4000-a000-000000000001', now() - interval '60 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000272', 'aaaaaaaa-1000-4000-a000-000000000013', 'aaaaaaaa-0001-4000-a000-000000000021', now() - interval '29 days 22 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000273', 'aaaaaaaa-1000-4000-a000-000000000013', 'aaaaaaaa-0001-4000-a000-000000000004', now() - interval '32 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000274', 'aaaaaaaa-1000-4000-a000-000000000013', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '2 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000275', 'aaaaaaaa-1000-4000-a000-000000000013', 'aaaaaaaa-0002-4000-a000-000000000003', now() - interval '39 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000276', 'aaaaaaaa-1000-4000-a000-000000000013', 'aaaaaaaa-0001-4000-a000-000000000031', now() - interval '46 days 5 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000277', 'aaaaaaaa-1000-4000-a000-000000000013', 'aaaaaaaa-0001-4000-a000-000000000033', now() - interval '20 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000278', 'aaaaaaaa-1000-4000-a000-000000000013', 'aaaaaaaa-0001-4000-a000-000000000034', now() - interval '1 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000279', 'aaaaaaaa-1000-4000-a000-000000000013', 'aaaaaaaa-0001-4000-a000-000000000011', now() - interval '27 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000280', 'aaaaaaaa-1000-4000-a000-000000000013', 'aaaaaaaa-0002-4000-a000-000000000012', now() - interval '15 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000281', 'aaaaaaaa-1000-4000-a000-000000000013', 'aaaaaaaa-0002-4000-a000-000000000009', now() - interval '30 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000282', 'aaaaaaaa-1000-4000-a000-000000000013', 'aaaaaaaa-0001-4000-a000-000000000006', now() - interval '42 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000283', 'aaaaaaaa-1000-4000-a000-000000000013', 'aaaaaaaa-0001-4000-a000-000000000012', now() - interval '32 days 22 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000284', 'aaaaaaaa-1000-4000-a000-000000000013', 'aaaaaaaa-0001-4000-a000-000000000005', now() - interval '19 days 16 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000285', 'aaaaaaaa-1000-4000-a000-000000000013', 'aaaaaaaa-0002-4000-a000-000000000002', now() - interval '46 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000286', 'aaaaaaaa-1000-4000-a000-000000000014', 'aaaaaaaa-0002-4000-a000-000000000009', now() - interval '27 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000287', 'aaaaaaaa-1000-4000-a000-000000000014', 'aaaaaaaa-0001-4000-a000-000000000016', now() - interval '31 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000288', 'aaaaaaaa-1000-4000-a000-000000000014', 'aaaaaaaa-0001-4000-a000-000000000026', now() - interval '30 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000289', 'aaaaaaaa-1000-4000-a000-000000000014', 'aaaaaaaa-0001-4000-a000-000000000008', now() - interval '10 days 12 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000290', 'aaaaaaaa-1000-4000-a000-000000000014', 'aaaaaaaa-0002-4000-a000-000000000002', now() - interval '13 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000291', 'aaaaaaaa-1000-4000-a000-000000000014', 'aaaaaaaa-0003-4000-a000-000000000002', now() - interval '33 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000292', 'aaaaaaaa-1000-4000-a000-000000000014', 'aaaaaaaa-0002-4000-a000-000000000003', now() - interval '57 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000293', 'aaaaaaaa-1000-4000-a000-000000000014', 'aaaaaaaa-0002-4000-a000-000000000004', now() - interval '56 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000294', 'aaaaaaaa-1000-4000-a000-000000000014', 'aaaaaaaa-0001-4000-a000-000000000003', now() - interval '18 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000295', 'aaaaaaaa-1000-4000-a000-000000000014', 'aaaaaaaa-0002-4000-a000-000000000005', now() - interval '22 days 16 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000296', 'aaaaaaaa-1000-4000-a000-000000000014', 'aaaaaaaa-0001-4000-a000-000000000006', now() - interval '18 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000297', 'aaaaaaaa-1000-4000-a000-000000000014', 'aaaaaaaa-0001-4000-a000-000000000027', now() - interval '19 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000298', 'aaaaaaaa-1000-4000-a000-000000000015', 'aaaaaaaa-0002-4000-a000-000000000008', now() - interval '20 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000299', 'aaaaaaaa-1000-4000-a000-000000000015', 'aaaaaaaa-0002-4000-a000-000000000003', now() - interval '38 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000300', 'aaaaaaaa-1000-4000-a000-000000000015', 'aaaaaaaa-0002-4000-a000-000000000002', now() - interval '32 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000301', 'aaaaaaaa-1000-4000-a000-000000000015', 'aaaaaaaa-0001-4000-a000-000000000034', now() - interval '29 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000302', 'aaaaaaaa-1000-4000-a000-000000000015', 'aaaaaaaa-0001-4000-a000-000000000021', now() - interval '31 days 11 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000303', 'aaaaaaaa-1000-4000-a000-000000000015', 'aaaaaaaa-0001-4000-a000-000000000017', now() - interval '22 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000304', 'aaaaaaaa-1000-4000-a000-000000000015', 'aaaaaaaa-0001-4000-a000-000000000014', now() - interval '49 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000305', 'aaaaaaaa-1000-4000-a000-000000000015', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '25 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000306', 'aaaaaaaa-1000-4000-a000-000000000015', 'aaaaaaaa-0002-4000-a000-000000000011', now() - interval '60 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000307', 'aaaaaaaa-1000-4000-a000-000000000015', 'aaaaaaaa-0001-4000-a000-000000000016', now() - interval '56 days 6 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000308', 'aaaaaaaa-1000-4000-a000-000000000015', 'aaaaaaaa-0002-4000-a000-000000000010', now() - interval '45 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000309', 'aaaaaaaa-1000-4000-a000-000000000015', 'aaaaaaaa-0001-4000-a000-000000000026', now() - interval '37 days 12 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000310', 'aaaaaaaa-1000-4000-a000-000000000016', 'aaaaaaaa-0001-4000-a000-000000000009', now() - interval '15 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000311', 'aaaaaaaa-1000-4000-a000-000000000016', 'aaaaaaaa-0002-4000-a000-000000000008', now() - interval '3 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000312', 'aaaaaaaa-1000-4000-a000-000000000016', 'aaaaaaaa-0002-4000-a000-000000000007', now() - interval '48 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000313', 'aaaaaaaa-1000-4000-a000-000000000016', 'aaaaaaaa-0001-4000-a000-000000000020', now() - interval '46 days 12 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000314', 'aaaaaaaa-1000-4000-a000-000000000016', 'aaaaaaaa-0001-4000-a000-000000000030', now() - interval '25 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000315', 'aaaaaaaa-1000-4000-a000-000000000016', 'aaaaaaaa-0001-4000-a000-000000000021', now() - interval '51 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000316', 'aaaaaaaa-1000-4000-a000-000000000016', 'aaaaaaaa-0001-4000-a000-000000000005', now() - interval '10 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000317', 'aaaaaaaa-1000-4000-a000-000000000016', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '3 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000318', 'aaaaaaaa-1000-4000-a000-000000000016', 'aaaaaaaa-0002-4000-a000-000000000011', now() - interval '33 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000319', 'aaaaaaaa-1000-4000-a000-000000000016', 'aaaaaaaa-0002-4000-a000-000000000005', now() - interval '22 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000320', 'aaaaaaaa-1000-4000-a000-000000000016', 'aaaaaaaa-0002-4000-a000-000000000002', now() - interval '56 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000321', 'aaaaaaaa-1000-4000-a000-000000000016', 'aaaaaaaa-0001-4000-a000-000000000007', now() - interval '7 days 16 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000322', 'aaaaaaaa-1000-4000-a000-000000000017', 'aaaaaaaa-0001-4000-a000-000000000005', now() - interval '59 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000323', 'aaaaaaaa-1000-4000-a000-000000000017', 'aaaaaaaa-0001-4000-a000-000000000035', now() - interval '1 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000324', 'aaaaaaaa-1000-4000-a000-000000000017', 'aaaaaaaa-0001-4000-a000-000000000014', now() - interval '10 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000325', 'aaaaaaaa-1000-4000-a000-000000000017', 'aaaaaaaa-0001-4000-a000-000000000033', now() - interval '56 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000326', 'aaaaaaaa-1000-4000-a000-000000000017', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '10 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000327', 'aaaaaaaa-1000-4000-a000-000000000017', 'aaaaaaaa-0001-4000-a000-000000000009', now() - interval '31 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000328', 'aaaaaaaa-1000-4000-a000-000000000017', 'aaaaaaaa-0001-4000-a000-000000000023', now() - interval '22 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000329', 'aaaaaaaa-1000-4000-a000-000000000017', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '45 days 12 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000330', 'aaaaaaaa-1000-4000-a000-000000000017', 'aaaaaaaa-0001-4000-a000-000000000016', now() - interval '42 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000331', 'aaaaaaaa-1000-4000-a000-000000000017', 'aaaaaaaa-0001-4000-a000-000000000024', now() - interval '55 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000332', 'aaaaaaaa-1000-4000-a000-000000000017', 'aaaaaaaa-0001-4000-a000-000000000019', now() - interval '55 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000333', 'aaaaaaaa-1000-4000-a000-000000000017', 'aaaaaaaa-0001-4000-a000-000000000011', now() - interval '55 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000334', 'aaaaaaaa-1000-4000-a000-000000000017', 'aaaaaaaa-0001-4000-a000-000000000029', now() - interval '25 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000335', 'aaaaaaaa-1000-4000-a000-000000000018', 'aaaaaaaa-0001-4000-a000-000000000035', now() - interval '41 days 22 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000336', 'aaaaaaaa-1000-4000-a000-000000000018', 'aaaaaaaa-0002-4000-a000-000000000011', now() - interval '57 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000337', 'aaaaaaaa-1000-4000-a000-000000000018', 'aaaaaaaa-0001-4000-a000-000000000020', now() - interval '56 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000338', 'aaaaaaaa-1000-4000-a000-000000000018', 'aaaaaaaa-0002-4000-a000-000000000005', now() - interval '3 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000339', 'aaaaaaaa-1000-4000-a000-000000000018', 'aaaaaaaa-0002-4000-a000-000000000007', now() - interval '5 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000340', 'aaaaaaaa-1000-4000-a000-000000000018', 'aaaaaaaa-0001-4000-a000-000000000034', now() - interval '41 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000341', 'aaaaaaaa-1000-4000-a000-000000000018', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '59 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000342', 'aaaaaaaa-1000-4000-a000-000000000018', 'aaaaaaaa-0002-4000-a000-000000000008', now() - interval '15 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000343', 'aaaaaaaa-1000-4000-a000-000000000018', 'aaaaaaaa-0002-4000-a000-000000000001', now() - interval '6 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000344', 'aaaaaaaa-1000-4000-a000-000000000018', 'aaaaaaaa-0003-4000-a000-000000000001', now() - interval '7 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000345', 'aaaaaaaa-1000-4000-a000-000000000018', 'aaaaaaaa-0001-4000-a000-000000000007', now() - interval '46 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000346', 'aaaaaaaa-1000-4000-a000-000000000018', 'aaaaaaaa-0001-4000-a000-000000000009', now() - interval '29 days 5 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000347', 'aaaaaaaa-1000-4000-a000-000000000018', 'aaaaaaaa-0001-4000-a000-000000000017', now() - interval '45 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000348', 'aaaaaaaa-1000-4000-a000-000000000019', 'aaaaaaaa-0001-4000-a000-000000000008', now() - interval '58 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000349', 'aaaaaaaa-1000-4000-a000-000000000019', 'aaaaaaaa-0001-4000-a000-000000000007', now() - interval '3 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000350', 'aaaaaaaa-1000-4000-a000-000000000019', 'aaaaaaaa-0003-4000-a000-000000000001', now() - interval '51 days 1 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000351', 'aaaaaaaa-1000-4000-a000-000000000019', 'aaaaaaaa-0002-4000-a000-000000000001', now() - interval '19 days 11 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000352', 'aaaaaaaa-1000-4000-a000-000000000019', 'aaaaaaaa-0001-4000-a000-000000000010', now() - interval '24 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000353', 'aaaaaaaa-1000-4000-a000-000000000019', 'aaaaaaaa-0001-4000-a000-000000000018', now() - interval '10 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000354', 'aaaaaaaa-1000-4000-a000-000000000019', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '34 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000355', 'aaaaaaaa-1000-4000-a000-000000000019', 'aaaaaaaa-0002-4000-a000-000000000004', now() - interval '37 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000356', 'aaaaaaaa-1000-4000-a000-000000000019', 'aaaaaaaa-0001-4000-a000-000000000014', now() - interval '51 days 5 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000357', 'aaaaaaaa-1000-4000-a000-000000000019', 'aaaaaaaa-0001-4000-a000-000000000022', now() - interval '11 days 5 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000358', 'aaaaaaaa-1000-4000-a000-000000000019', 'aaaaaaaa-0002-4000-a000-000000000007', now() - interval '6 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000359', 'aaaaaaaa-1000-4000-a000-000000000019', 'aaaaaaaa-0001-4000-a000-000000000017', now() - interval '56 days 12 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000360', 'aaaaaaaa-1000-4000-a000-000000000019', 'aaaaaaaa-0001-4000-a000-000000000033', now() - interval '40 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000361', 'aaaaaaaa-1000-4000-a000-000000000019', 'aaaaaaaa-0001-4000-a000-000000000032', now() - interval '16 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000362', 'aaaaaaaa-1000-4000-a000-000000000019', 'aaaaaaaa-0002-4000-a000-000000000008', now() - interval '59 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000363', 'aaaaaaaa-1000-4000-a000-000000000019', 'aaaaaaaa-0001-4000-a000-000000000004', now() - interval '10 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000364', 'aaaaaaaa-1000-4000-a000-000000000020', 'aaaaaaaa-0001-4000-a000-000000000006', now() - interval '30 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000365', 'aaaaaaaa-1000-4000-a000-000000000020', 'aaaaaaaa-0002-4000-a000-000000000006', now() - interval '17 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000366', 'aaaaaaaa-1000-4000-a000-000000000020', 'aaaaaaaa-0001-4000-a000-000000000028', now() - interval '17 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000367', 'aaaaaaaa-1000-4000-a000-000000000020', 'aaaaaaaa-0001-4000-a000-000000000018', now() - interval '1 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000368', 'aaaaaaaa-1000-4000-a000-000000000020', 'aaaaaaaa-0001-4000-a000-000000000003', now() - interval '58 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000369', 'aaaaaaaa-1000-4000-a000-000000000020', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '44 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000370', 'aaaaaaaa-1000-4000-a000-000000000020', 'aaaaaaaa-0001-4000-a000-000000000022', now() - interval '11 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000371', 'aaaaaaaa-1000-4000-a000-000000000020', 'aaaaaaaa-0001-4000-a000-000000000009', now() - interval '29 days 11 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000372', 'aaaaaaaa-1000-4000-a000-000000000020', 'aaaaaaaa-0003-4000-a000-000000000002', now() - interval '38 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000373', 'aaaaaaaa-1000-4000-a000-000000000020', 'aaaaaaaa-0001-4000-a000-000000000017', now() - interval '41 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000374', 'aaaaaaaa-1000-4000-a000-000000000020', 'aaaaaaaa-0001-4000-a000-000000000011', now() - interval '45 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000375', 'aaaaaaaa-1000-4000-a000-000000000020', 'aaaaaaaa-0001-4000-a000-000000000029', now() - interval '30 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000376', 'aaaaaaaa-1000-4000-a000-000000000020', 'aaaaaaaa-0002-4000-a000-000000000001', now() - interval '13 days 12 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000377', 'aaaaaaaa-1000-4000-a000-000000000020', 'aaaaaaaa-0003-4000-a000-000000000001', now() - interval '55 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000378', 'aaaaaaaa-1000-4000-a000-000000000020', 'aaaaaaaa-0002-4000-a000-000000000003', now() - interval '7 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000379', 'aaaaaaaa-1000-4000-a000-000000000020', 'aaaaaaaa-0002-4000-a000-000000000010', now() - interval '25 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000380', 'aaaaaaaa-1000-4000-a000-000000000021', 'aaaaaaaa-0001-4000-a000-000000000008', now() - interval '23 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000381', 'aaaaaaaa-1000-4000-a000-000000000021', 'aaaaaaaa-0001-4000-a000-000000000005', now() - interval '19 days 22 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000382', 'aaaaaaaa-1000-4000-a000-000000000021', 'aaaaaaaa-0002-4000-a000-000000000010', now() - interval '19 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000383', 'aaaaaaaa-1000-4000-a000-000000000021', 'aaaaaaaa-0001-4000-a000-000000000010', now() - interval '54 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000384', 'aaaaaaaa-1000-4000-a000-000000000021', 'aaaaaaaa-0001-4000-a000-000000000035', now() - interval '26 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000385', 'aaaaaaaa-1000-4000-a000-000000000021', 'aaaaaaaa-0001-4000-a000-000000000003', now() - interval '1 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000386', 'aaaaaaaa-1000-4000-a000-000000000022', 'aaaaaaaa-0001-4000-a000-000000000024', now() - interval '56 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000387', 'aaaaaaaa-1000-4000-a000-000000000022', 'aaaaaaaa-0002-4000-a000-000000000003', now() - interval '50 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000388', 'aaaaaaaa-1000-4000-a000-000000000022', 'aaaaaaaa-0002-4000-a000-000000000001', now() - interval '4 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000389', 'aaaaaaaa-1000-4000-a000-000000000022', 'aaaaaaaa-0001-4000-a000-000000000010', now() - interval '48 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000390', 'aaaaaaaa-1000-4000-a000-000000000022', 'aaaaaaaa-0001-4000-a000-000000000028', now() - interval '54 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000391', 'aaaaaaaa-1000-4000-a000-000000000022', 'aaaaaaaa-0001-4000-a000-000000000009', now() - interval '50 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000392', 'aaaaaaaa-1000-4000-a000-000000000022', 'aaaaaaaa-0001-4000-a000-000000000003', now() - interval '39 days 11 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000393', 'aaaaaaaa-1000-4000-a000-000000000022', 'aaaaaaaa-0001-4000-a000-000000000020', now() - interval '15 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000394', 'aaaaaaaa-1000-4000-a000-000000000022', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '13 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000395', 'aaaaaaaa-1000-4000-a000-000000000022', 'aaaaaaaa-0002-4000-a000-000000000009', now() - interval '17 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000396', 'aaaaaaaa-1000-4000-a000-000000000023', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '49 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000397', 'aaaaaaaa-1000-4000-a000-000000000023', 'aaaaaaaa-0001-4000-a000-000000000014', now() - interval '50 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000398', 'aaaaaaaa-1000-4000-a000-000000000023', 'aaaaaaaa-0002-4000-a000-000000000009', now() - interval '44 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000399', 'aaaaaaaa-1000-4000-a000-000000000023', 'aaaaaaaa-0001-4000-a000-000000000016', now() - interval '41 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000400', 'aaaaaaaa-1000-4000-a000-000000000023', 'aaaaaaaa-0002-4000-a000-000000000008', now() - interval '58 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000401', 'aaaaaaaa-1000-4000-a000-000000000023', 'aaaaaaaa-0001-4000-a000-000000000007', now() - interval '42 days 1 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000402', 'aaaaaaaa-1000-4000-a000-000000000023', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '20 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000403', 'aaaaaaaa-1000-4000-a000-000000000024', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '3 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000404', 'aaaaaaaa-1000-4000-a000-000000000024', 'aaaaaaaa-0002-4000-a000-000000000001', now() - interval '24 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000405', 'aaaaaaaa-1000-4000-a000-000000000024', 'aaaaaaaa-0001-4000-a000-000000000027', now() - interval '9 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000406', 'aaaaaaaa-1000-4000-a000-000000000024', 'aaaaaaaa-0002-4000-a000-000000000005', now() - interval '59 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000407', 'aaaaaaaa-1000-4000-a000-000000000024', 'aaaaaaaa-0001-4000-a000-000000000010', now() - interval '21 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000408', 'aaaaaaaa-1000-4000-a000-000000000024', 'aaaaaaaa-0001-4000-a000-000000000016', now() - interval '27 days 5 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000409', 'aaaaaaaa-1000-4000-a000-000000000024', 'aaaaaaaa-0001-4000-a000-000000000011', now() - interval '13 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000410', 'aaaaaaaa-1000-4000-a000-000000000024', 'aaaaaaaa-0001-4000-a000-000000000012', now() - interval '51 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000411', 'aaaaaaaa-1000-4000-a000-000000000024', 'aaaaaaaa-0003-4000-a000-000000000001', now() - interval '57 days 11 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000412', 'aaaaaaaa-1000-4000-a000-000000000024', 'aaaaaaaa-0001-4000-a000-000000000002', now() - interval '34 days 16 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000413', 'aaaaaaaa-1000-4000-a000-000000000024', 'aaaaaaaa-0002-4000-a000-000000000008', now() - interval '59 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000414', 'aaaaaaaa-1000-4000-a000-000000000025', 'aaaaaaaa-0003-4000-a000-000000000001', now() - interval '54 days 5 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000415', 'aaaaaaaa-1000-4000-a000-000000000025', 'aaaaaaaa-0001-4000-a000-000000000022', now() - interval '17 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000416', 'aaaaaaaa-1000-4000-a000-000000000025', 'aaaaaaaa-0001-4000-a000-000000000027', now() - interval '52 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000417', 'aaaaaaaa-1000-4000-a000-000000000025', 'aaaaaaaa-0002-4000-a000-000000000008', now() - interval '48 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000418', 'aaaaaaaa-1000-4000-a000-000000000025', 'aaaaaaaa-0001-4000-a000-000000000016', now() - interval '52 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000419', 'aaaaaaaa-1000-4000-a000-000000000025', 'aaaaaaaa-0001-4000-a000-000000000018', now() - interval '30 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000420', 'aaaaaaaa-1000-4000-a000-000000000025', 'aaaaaaaa-0001-4000-a000-000000000011', now() - interval '10 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000421', 'aaaaaaaa-1000-4000-a000-000000000025', 'aaaaaaaa-0001-4000-a000-000000000007', now() - interval '56 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000422', 'aaaaaaaa-1000-4000-a000-000000000025', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '47 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000423', 'aaaaaaaa-1000-4000-a000-000000000025', 'aaaaaaaa-0001-4000-a000-000000000003', now() - interval '26 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000424', 'aaaaaaaa-1000-4000-a000-000000000025', 'aaaaaaaa-0001-4000-a000-000000000031', now() - interval '24 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000425', 'aaaaaaaa-1000-4000-a000-000000000026', 'aaaaaaaa-0001-4000-a000-000000000015', now() - interval '51 days 12 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000426', 'aaaaaaaa-1000-4000-a000-000000000026', 'aaaaaaaa-0001-4000-a000-000000000013', now() - interval '1 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000427', 'aaaaaaaa-1000-4000-a000-000000000026', 'aaaaaaaa-0001-4000-a000-000000000030', now() - interval '35 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000428', 'aaaaaaaa-1000-4000-a000-000000000026', 'aaaaaaaa-0001-4000-a000-000000000023', now() - interval '30 days 11 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000429', 'aaaaaaaa-1000-4000-a000-000000000026', 'aaaaaaaa-0001-4000-a000-000000000020', now() - interval '44 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000430', 'aaaaaaaa-1000-4000-a000-000000000026', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '44 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000431', 'aaaaaaaa-1000-4000-a000-000000000026', 'aaaaaaaa-0002-4000-a000-000000000010', now() - interval '38 days 12 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000432', 'aaaaaaaa-1000-4000-a000-000000000026', 'aaaaaaaa-0001-4000-a000-000000000002', now() - interval '53 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000433', 'aaaaaaaa-1000-4000-a000-000000000026', 'aaaaaaaa-0003-4000-a000-000000000002', now() - interval '24 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000434', 'aaaaaaaa-1000-4000-a000-000000000026', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '44 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000435', 'aaaaaaaa-1000-4000-a000-000000000026', 'aaaaaaaa-0001-4000-a000-000000000022', now() - interval '31 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000436', 'aaaaaaaa-1000-4000-a000-000000000027', 'aaaaaaaa-0001-4000-a000-000000000018', now() - interval '40 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000437', 'aaaaaaaa-1000-4000-a000-000000000027', 'aaaaaaaa-0001-4000-a000-000000000005', now() - interval '21 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000438', 'aaaaaaaa-1000-4000-a000-000000000027', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '15 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000439', 'aaaaaaaa-1000-4000-a000-000000000027', 'aaaaaaaa-0001-4000-a000-000000000023', now() - interval '5 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000440', 'aaaaaaaa-1000-4000-a000-000000000027', 'aaaaaaaa-0002-4000-a000-000000000007', now() - interval '53 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000441', 'aaaaaaaa-1000-4000-a000-000000000027', 'aaaaaaaa-0001-4000-a000-000000000033', now() - interval '59 days 22 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000442', 'aaaaaaaa-1000-4000-a000-000000000027', 'aaaaaaaa-0001-4000-a000-000000000026', now() - interval '20 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000443', 'aaaaaaaa-1000-4000-a000-000000000027', 'aaaaaaaa-0001-4000-a000-000000000035', now() - interval '27 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000444', 'aaaaaaaa-1000-4000-a000-000000000027', 'aaaaaaaa-0001-4000-a000-000000000022', now() - interval '9 days 1 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000445', 'aaaaaaaa-1000-4000-a000-000000000027', 'aaaaaaaa-0001-4000-a000-000000000002', now() - interval '3 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000446', 'aaaaaaaa-1000-4000-a000-000000000028', 'aaaaaaaa-0001-4000-a000-000000000008', now() - interval '32 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000447', 'aaaaaaaa-1000-4000-a000-000000000028', 'aaaaaaaa-0001-4000-a000-000000000017', now() - interval '7 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000448', 'aaaaaaaa-1000-4000-a000-000000000028', 'aaaaaaaa-0001-4000-a000-000000000012', now() - interval '57 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000449', 'aaaaaaaa-1000-4000-a000-000000000028', 'aaaaaaaa-0002-4000-a000-000000000003', now() - interval '9 days 12 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000450', 'aaaaaaaa-1000-4000-a000-000000000028', 'aaaaaaaa-0003-4000-a000-000000000002', now() - interval '30 days 11 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000451', 'aaaaaaaa-1000-4000-a000-000000000028', 'aaaaaaaa-0001-4000-a000-000000000003', now() - interval '43 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000452', 'aaaaaaaa-1000-4000-a000-000000000028', 'aaaaaaaa-0001-4000-a000-000000000007', now() - interval '45 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000453', 'aaaaaaaa-1000-4000-a000-000000000028', 'aaaaaaaa-0002-4000-a000-000000000004', now() - interval '27 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000454', 'aaaaaaaa-1000-4000-a000-000000000028', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '48 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000455', 'aaaaaaaa-1000-4000-a000-000000000029', 'aaaaaaaa-0001-4000-a000-000000000023', now() - interval '10 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000456', 'aaaaaaaa-1000-4000-a000-000000000029', 'aaaaaaaa-0002-4000-a000-000000000012', now() - interval '42 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000457', 'aaaaaaaa-1000-4000-a000-000000000029', 'aaaaaaaa-0001-4000-a000-000000000021', now() - interval '54 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000458', 'aaaaaaaa-1000-4000-a000-000000000029', 'aaaaaaaa-0001-4000-a000-000000000028', now() - interval '40 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000459', 'aaaaaaaa-1000-4000-a000-000000000029', 'aaaaaaaa-0002-4000-a000-000000000004', now() - interval '18 days 1 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000460', 'aaaaaaaa-1000-4000-a000-000000000029', 'aaaaaaaa-0001-4000-a000-000000000033', now() - interval '45 days 11 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000461', 'aaaaaaaa-1000-4000-a000-000000000029', 'aaaaaaaa-0001-4000-a000-000000000008', now() - interval '14 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000462', 'aaaaaaaa-1000-4000-a000-000000000030', 'aaaaaaaa-0001-4000-a000-000000000025', now() - interval '29 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000463', 'aaaaaaaa-1000-4000-a000-000000000030', 'aaaaaaaa-0002-4000-a000-000000000002', now() - interval '55 days 11 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000464', 'aaaaaaaa-1000-4000-a000-000000000030', 'aaaaaaaa-0001-4000-a000-000000000013', now() - interval '7 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000465', 'aaaaaaaa-1000-4000-a000-000000000030', 'aaaaaaaa-0001-4000-a000-000000000017', now() - interval '24 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000466', 'aaaaaaaa-1000-4000-a000-000000000030', 'aaaaaaaa-0001-4000-a000-000000000003', now() - interval '58 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000467', 'aaaaaaaa-1000-4000-a000-000000000030', 'aaaaaaaa-0001-4000-a000-000000000028', now() - interval '23 days 1 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000468', 'aaaaaaaa-1000-4000-a000-000000000030', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '26 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000469', 'aaaaaaaa-1000-4000-a000-000000000030', 'aaaaaaaa-0001-4000-a000-000000000034', now() - interval '13 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000470', 'aaaaaaaa-1000-4000-a000-000000000030', 'aaaaaaaa-0001-4000-a000-000000000035', now() - interval '55 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000471', 'aaaaaaaa-1000-4000-a000-000000000031', 'aaaaaaaa-0002-4000-a000-000000000009', now() - interval '6 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000472', 'aaaaaaaa-1000-4000-a000-000000000031', 'aaaaaaaa-0002-4000-a000-000000000012', now() - interval '14 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000473', 'aaaaaaaa-1000-4000-a000-000000000031', 'aaaaaaaa-0003-4000-a000-000000000001', now() - interval '41 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000474', 'aaaaaaaa-1000-4000-a000-000000000031', 'aaaaaaaa-0002-4000-a000-000000000008', now() - interval '2 days 1 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000475', 'aaaaaaaa-1000-4000-a000-000000000031', 'aaaaaaaa-0001-4000-a000-000000000013', now() - interval '51 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000476', 'aaaaaaaa-1000-4000-a000-000000000031', 'aaaaaaaa-0001-4000-a000-000000000024', now() - interval '16 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000477', 'aaaaaaaa-1000-4000-a000-000000000031', 'aaaaaaaa-0001-4000-a000-000000000028', now() - interval '51 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000478', 'aaaaaaaa-1000-4000-a000-000000000031', 'aaaaaaaa-0001-4000-a000-000000000005', now() - interval '14 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000479', 'aaaaaaaa-1000-4000-a000-000000000031', 'aaaaaaaa-0001-4000-a000-000000000022', now() - interval '54 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000480', 'aaaaaaaa-1000-4000-a000-000000000031', 'aaaaaaaa-0002-4000-a000-000000000005', now() - interval '14 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000481', 'aaaaaaaa-1000-4000-a000-000000000032', 'aaaaaaaa-0001-4000-a000-000000000021', now() - interval '14 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000482', 'aaaaaaaa-1000-4000-a000-000000000032', 'aaaaaaaa-0002-4000-a000-000000000008', now() - interval '22 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000483', 'aaaaaaaa-1000-4000-a000-000000000032', 'aaaaaaaa-0001-4000-a000-000000000008', now() - interval '51 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000484', 'aaaaaaaa-1000-4000-a000-000000000032', 'aaaaaaaa-0002-4000-a000-000000000012', now() - interval '1 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000485', 'aaaaaaaa-1000-4000-a000-000000000032', 'aaaaaaaa-0001-4000-a000-000000000020', now() - interval '55 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000486', 'aaaaaaaa-1000-4000-a000-000000000032', 'aaaaaaaa-0001-4000-a000-000000000033', now() - interval '9 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000487', 'aaaaaaaa-1000-4000-a000-000000000032', 'aaaaaaaa-0002-4000-a000-000000000011', now() - interval '17 days 5 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000488', 'aaaaaaaa-1000-4000-a000-000000000032', 'aaaaaaaa-0003-4000-a000-000000000002', now() - interval '8 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000489', 'aaaaaaaa-1000-4000-a000-000000000033', 'aaaaaaaa-0001-4000-a000-000000000027', now() - interval '56 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000490', 'aaaaaaaa-1000-4000-a000-000000000033', 'aaaaaaaa-0001-4000-a000-000000000021', now() - interval '9 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000491', 'aaaaaaaa-1000-4000-a000-000000000033', 'aaaaaaaa-0001-4000-a000-000000000026', now() - interval '23 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000492', 'aaaaaaaa-1000-4000-a000-000000000033', 'aaaaaaaa-0002-4000-a000-000000000010', now() - interval '38 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000493', 'aaaaaaaa-1000-4000-a000-000000000033', 'aaaaaaaa-0001-4000-a000-000000000019', now() - interval '2 days 5 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000494', 'aaaaaaaa-1000-4000-a000-000000000033', 'aaaaaaaa-0002-4000-a000-000000000001', now() - interval '17 days 1 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000495', 'aaaaaaaa-1000-4000-a000-000000000033', 'aaaaaaaa-0001-4000-a000-000000000009', now() - interval '9 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000496', 'aaaaaaaa-1000-4000-a000-000000000033', 'aaaaaaaa-0001-4000-a000-000000000013', now() - interval '27 days 16 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000497', 'aaaaaaaa-1000-4000-a000-000000000033', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '8 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000498', 'aaaaaaaa-1000-4000-a000-000000000033', 'aaaaaaaa-0001-4000-a000-000000000025', now() - interval '5 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000499', 'aaaaaaaa-1000-4000-a000-000000000033', 'aaaaaaaa-0001-4000-a000-000000000012', now() - interval '29 days 11 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000500', 'aaaaaaaa-1000-4000-a000-000000000033', 'aaaaaaaa-0002-4000-a000-000000000002', now() - interval '33 days 18 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000501', 'aaaaaaaa-1000-4000-a000-000000000034', 'aaaaaaaa-0001-4000-a000-000000000020', now() - interval '7 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000502', 'aaaaaaaa-1000-4000-a000-000000000034', 'aaaaaaaa-0001-4000-a000-000000000026', now() - interval '33 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000503', 'aaaaaaaa-1000-4000-a000-000000000034', 'aaaaaaaa-0002-4000-a000-000000000001', now() - interval '40 days 1 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000504', 'aaaaaaaa-1000-4000-a000-000000000034', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '47 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000505', 'aaaaaaaa-1000-4000-a000-000000000034', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '34 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000506', 'aaaaaaaa-1000-4000-a000-000000000034', 'aaaaaaaa-0001-4000-a000-000000000019', now() - interval '30 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000507', 'aaaaaaaa-1000-4000-a000-000000000034', 'aaaaaaaa-0001-4000-a000-000000000014', now() - interval '2 days 1 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000508', 'aaaaaaaa-1000-4000-a000-000000000034', 'aaaaaaaa-0001-4000-a000-000000000028', now() - interval '31 days 12 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000509', 'aaaaaaaa-1000-4000-a000-000000000034', 'aaaaaaaa-0002-4000-a000-000000000003', now() - interval '28 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000510', 'aaaaaaaa-1000-4000-a000-000000000034', 'aaaaaaaa-0002-4000-a000-000000000004', now() - interval '7 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000511', 'aaaaaaaa-1000-4000-a000-000000000034', 'aaaaaaaa-0001-4000-a000-000000000021', now() - interval '46 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000512', 'aaaaaaaa-1000-4000-a000-000000000034', 'aaaaaaaa-0001-4000-a000-000000000030', now() - interval '5 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000513', 'aaaaaaaa-1000-4000-a000-000000000035', 'aaaaaaaa-0001-4000-a000-000000000029', now() - interval '21 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000514', 'aaaaaaaa-1000-4000-a000-000000000035', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '10 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000515', 'aaaaaaaa-1000-4000-a000-000000000035', 'aaaaaaaa-0002-4000-a000-000000000009', now() - interval '9 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000516', 'aaaaaaaa-1000-4000-a000-000000000035', 'aaaaaaaa-0001-4000-a000-000000000014', now() - interval '40 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000517', 'aaaaaaaa-1000-4000-a000-000000000035', 'aaaaaaaa-0001-4000-a000-000000000033', now() - interval '38 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000518', 'aaaaaaaa-1000-4000-a000-000000000035', 'aaaaaaaa-0001-4000-a000-000000000031', now() - interval '46 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000519', 'aaaaaaaa-1000-4000-a000-000000000036', 'aaaaaaaa-0003-4000-a000-000000000001', now() - interval '25 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000520', 'aaaaaaaa-1000-4000-a000-000000000036', 'aaaaaaaa-0001-4000-a000-000000000011', now() - interval '34 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000521', 'aaaaaaaa-1000-4000-a000-000000000036', 'aaaaaaaa-0002-4000-a000-000000000008', now() - interval '30 days 16 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000522', 'aaaaaaaa-1000-4000-a000-000000000036', 'aaaaaaaa-0001-4000-a000-000000000006', now() - interval '39 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000523', 'aaaaaaaa-1000-4000-a000-000000000037', 'aaaaaaaa-0001-4000-a000-000000000019', now() - interval '7 days 22 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000524', 'aaaaaaaa-1000-4000-a000-000000000037', 'aaaaaaaa-0001-4000-a000-000000000033', now() - interval '8 days 20 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000525', 'aaaaaaaa-1000-4000-a000-000000000037', 'aaaaaaaa-0002-4000-a000-000000000008', now() - interval '42 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000526', 'aaaaaaaa-1000-4000-a000-000000000037', 'aaaaaaaa-0002-4000-a000-000000000006', now() - interval '47 days 6 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000527', 'aaaaaaaa-1000-4000-a000-000000000037', 'aaaaaaaa-0002-4000-a000-000000000005', now() - interval '28 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000528', 'aaaaaaaa-1000-4000-a000-000000000037', 'aaaaaaaa-0001-4000-a000-000000000022', now() - interval '57 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000529', 'aaaaaaaa-1000-4000-a000-000000000037', 'aaaaaaaa-0001-4000-a000-000000000006', now() - interval '27 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000530', 'aaaaaaaa-1000-4000-a000-000000000037', 'aaaaaaaa-0001-4000-a000-000000000016', now() - interval '53 days 14 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000531', 'aaaaaaaa-1000-4000-a000-000000000038', 'aaaaaaaa-0002-4000-a000-000000000009', now() - interval '26 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000532', 'aaaaaaaa-1000-4000-a000-000000000038', 'aaaaaaaa-0001-4000-a000-000000000020', now() - interval '47 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000533', 'aaaaaaaa-1000-4000-a000-000000000038', 'aaaaaaaa-0001-4000-a000-000000000015', now() - interval '21 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000534', 'aaaaaaaa-1000-4000-a000-000000000038', 'aaaaaaaa-0001-4000-a000-000000000013', now() - interval '21 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000535', 'aaaaaaaa-1000-4000-a000-000000000038', 'aaaaaaaa-0001-4000-a000-000000000010', now() - interval '17 days 11 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000536', 'aaaaaaaa-1000-4000-a000-000000000038', 'aaaaaaaa-0001-4000-a000-000000000002', now() - interval '10 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000537', 'aaaaaaaa-1000-4000-a000-000000000039', 'aaaaaaaa-0001-4000-a000-000000000003', now() - interval '60 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000538', 'aaaaaaaa-1000-4000-a000-000000000039', 'aaaaaaaa-0001-4000-a000-000000000016', now() - interval '5 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000539', 'aaaaaaaa-1000-4000-a000-000000000039', 'aaaaaaaa-0001-4000-a000-000000000031', now() - interval '54 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000540', 'aaaaaaaa-1000-4000-a000-000000000039', 'aaaaaaaa-0002-4000-a000-000000000005', now() - interval '6 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000541', 'aaaaaaaa-1000-4000-a000-000000000039', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '7 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000542', 'aaaaaaaa-1000-4000-a000-000000000040', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '48 days 11 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000543', 'aaaaaaaa-1000-4000-a000-000000000040', 'aaaaaaaa-0001-4000-a000-000000000030', now() - interval '52 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000544', 'aaaaaaaa-1000-4000-a000-000000000040', 'aaaaaaaa-0001-4000-a000-000000000027', now() - interval '36 days 1 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000545', 'aaaaaaaa-1000-4000-a000-000000000040', 'aaaaaaaa-0002-4000-a000-000000000006', now() - interval '38 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000546', 'aaaaaaaa-1000-4000-a000-000000000040', 'aaaaaaaa-0002-4000-a000-000000000002', now() - interval '36 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000547', 'aaaaaaaa-1000-4000-a000-000000000041', 'aaaaaaaa-0001-4000-a000-000000000013', now() - interval '43 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000548', 'aaaaaaaa-1000-4000-a000-000000000041', 'aaaaaaaa-0002-4000-a000-000000000011', now() - interval '27 days 11 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000549', 'aaaaaaaa-1000-4000-a000-000000000041', 'aaaaaaaa-0002-4000-a000-000000000010', now() - interval '56 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000550', 'aaaaaaaa-1000-4000-a000-000000000041', 'aaaaaaaa-0001-4000-a000-000000000025', now() - interval '49 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000551', 'aaaaaaaa-1000-4000-a000-000000000042', 'aaaaaaaa-0001-4000-a000-000000000032', now() - interval '56 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000552', 'aaaaaaaa-1000-4000-a000-000000000042', 'aaaaaaaa-0001-4000-a000-000000000026', now() - interval '4 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000553', 'aaaaaaaa-1000-4000-a000-000000000042', 'aaaaaaaa-0001-4000-a000-000000000016', now() - interval '39 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000554', 'aaaaaaaa-1000-4000-a000-000000000042', 'aaaaaaaa-0001-4000-a000-000000000010', now() - interval '23 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000555', 'aaaaaaaa-1000-4000-a000-000000000043', 'aaaaaaaa-0002-4000-a000-000000000007', now() - interval '37 days 16 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000556', 'aaaaaaaa-1000-4000-a000-000000000043', 'aaaaaaaa-0002-4000-a000-000000000010', now() - interval '14 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000557', 'aaaaaaaa-1000-4000-a000-000000000043', 'aaaaaaaa-0001-4000-a000-000000000001', now() - interval '43 days 15 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000558', 'aaaaaaaa-1000-4000-a000-000000000043', 'aaaaaaaa-0003-4000-a000-000000000002', now() - interval '15 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000559', 'aaaaaaaa-1000-4000-a000-000000000043', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '23 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000560', 'aaaaaaaa-1000-4000-a000-000000000044', 'aaaaaaaa-0001-4000-a000-000000000007', now() - interval '24 days 3 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000561', 'aaaaaaaa-1000-4000-a000-000000000044', 'aaaaaaaa-0003-4000-a000-000000000003', now() - interval '49 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000562', 'aaaaaaaa-1000-4000-a000-000000000044', 'aaaaaaaa-0001-4000-a000-000000000028', now() - interval '37 days 7 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000563', 'aaaaaaaa-1000-4000-a000-000000000045', 'aaaaaaaa-0001-4000-a000-000000000015', now() - interval '52 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000564', 'aaaaaaaa-1000-4000-a000-000000000045', 'aaaaaaaa-0001-4000-a000-000000000012', now() - interval '55 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000565', 'aaaaaaaa-1000-4000-a000-000000000045', 'aaaaaaaa-0002-4000-a000-000000000010', now() - interval '50 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000566', 'aaaaaaaa-1000-4000-a000-000000000046', 'aaaaaaaa-0001-4000-a000-000000000034', now() - interval '40 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000567', 'aaaaaaaa-1000-4000-a000-000000000046', 'aaaaaaaa-0001-4000-a000-000000000030', now() - interval '42 days 17 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000568', 'aaaaaaaa-1000-4000-a000-000000000046', 'aaaaaaaa-0001-4000-a000-000000000004', now() - interval '2 days 19 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000569', 'aaaaaaaa-1000-4000-a000-000000000046', 'aaaaaaaa-0002-4000-a000-000000000001', now() - interval '60 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000570', 'aaaaaaaa-1000-4000-a000-000000000047', 'aaaaaaaa-0001-4000-a000-000000000016', now() - interval '54 days 22 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000571', 'aaaaaaaa-1000-4000-a000-000000000047', 'aaaaaaaa-0001-4000-a000-000000000008', now() - interval '18 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000572', 'aaaaaaaa-1000-4000-a000-000000000047', 'aaaaaaaa-0001-4000-a000-000000000030', now() - interval '12 days 8 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000573', 'aaaaaaaa-1000-4000-a000-000000000048', 'aaaaaaaa-0001-4000-a000-000000000009', now() - interval '45 days 9 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000574', 'aaaaaaaa-1000-4000-a000-000000000048', 'aaaaaaaa-0001-4000-a000-000000000030', now() - interval '59 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000575', 'aaaaaaaa-1000-4000-a000-000000000048', 'aaaaaaaa-0002-4000-a000-000000000008', now() - interval '23 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000576', 'aaaaaaaa-1000-4000-a000-000000000048', 'aaaaaaaa-0001-4000-a000-000000000034', now() - interval '12 days 4 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000577', 'aaaaaaaa-1000-4000-a000-000000000049', 'aaaaaaaa-0002-4000-a000-000000000001', now() - interval '37 days 21 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000578', 'aaaaaaaa-1000-4000-a000-000000000049', 'aaaaaaaa-0002-4000-a000-000000000004', now() - interval '26 days 2 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000579', 'aaaaaaaa-1000-4000-a000-000000000049', 'aaaaaaaa-0001-4000-a000-000000000021', now() - interval '10 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000580', 'aaaaaaaa-1000-4000-a000-000000000049', 'aaaaaaaa-0003-4000-a000-000000000002', now() - interval '41 days 0 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000581', 'aaaaaaaa-1000-4000-a000-000000000050', 'aaaaaaaa-0001-4000-a000-000000000029', now() - interval '6 days 23 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000582', 'aaaaaaaa-1000-4000-a000-000000000050', 'aaaaaaaa-0002-4000-a000-000000000005', now() - interval '34 days 6 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000583', 'aaaaaaaa-1000-4000-a000-000000000050', 'aaaaaaaa-0002-4000-a000-000000000012', now() - interval '25 days 13 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000584', 'aaaaaaaa-1000-4000-a000-000000000050', 'aaaaaaaa-0001-4000-a000-000000000033', now() - interval '30 days 10 hours'),
  ('aaaaaaaa-2000-4000-a000-000000000585', 'aaaaaaaa-1000-4000-a000-000000000050', 'aaaaaaaa-0001-4000-a000-000000000028', now() - interval '11 days 11 hours');

-- Vote count summary for chart reference:
-- Submission 01: 30 votes
-- Submission 02: 21 votes
-- Submission 03: 20 votes
-- Submission 04: 24 votes
-- Submission 05: 23 votes
-- Submission 06: 23 votes
-- Submission 07: 22 votes
-- Submission 08: 21 votes
-- Submission 09: 30 votes
-- Submission 10: 28 votes
-- Submission 11: 12 votes
-- Submission 12: 16 votes
-- Submission 13: 15 votes
-- Submission 14: 12 votes
-- Submission 15: 12 votes
-- Submission 16: 12 votes
-- Submission 17: 13 votes
-- Submission 18: 13 votes
-- Submission 19: 16 votes
-- Submission 20: 16 votes
-- Submission 21: 6 votes
-- Submission 22: 10 votes
-- Submission 23: 7 votes
-- Submission 24: 11 votes
-- Submission 25: 11 votes
-- Submission 26: 11 votes
-- Submission 27: 10 votes
-- Submission 28: 9 votes
-- Submission 29: 7 votes
-- Submission 30: 9 votes
-- Submission 31: 10 votes
-- Submission 32: 8 votes
-- Submission 33: 12 votes
-- Submission 34: 12 votes
-- Submission 35: 6 votes
-- Submission 36: 4 votes
-- Submission 37: 8 votes
-- Submission 38: 6 votes
-- Submission 39: 5 votes
-- Submission 40: 5 votes
-- Submission 41: 4 votes
-- Submission 42: 4 votes
-- Submission 43: 5 votes
-- Submission 44: 3 votes
-- Submission 45: 3 votes
-- Submission 46: 4 votes
-- Submission 47: 3 votes
-- Submission 48: 4 votes
-- Submission 49: 4 votes
-- Submission 50: 5 votes

-- Manually set vote_count on submissions (trigger was disabled)
UPDATE public.submissions s
SET vote_count = (SELECT count(*) FROM public.votes v WHERE v.submission_id = s.id)
WHERE s.id::text LIKE 'aaaaaaaa-1000-%';

-- Re-enable vote trigger
ALTER TABLE public.votes ENABLE TRIGGER on_vote_insert;

-- ──────────────────────────────────────────────
-- 6. Insert ~80 reviews
-- ──────────────────────────────────────────────
-- 12 curators each review 5-8 accepted/in_review submissions
-- Bell curve ratings: mostly 3-4, some 2s and 5s, rare 1s

INSERT INTO public.reviews (id, submission_id, curator_id, rating, feedback, created_at, updated_at)
VALUES
  -- Curator 01 (The Sound Sage) — 8 reviews
  ('aaaaaaaa-3000-4000-a000-000000000001', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0002-4000-a000-000000000001', 4, 'Gorgeous production and an instantly memorable melody. This has real crossover potential.', now() - interval '70 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000002', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0002-4000-a000-000000000001', 5, 'Absolutely transcendent. The reverb work here is masterful and the emotional arc is perfect.', now() - interval '65 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000003', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0002-4000-a000-000000000001', 5, 'The beat switch alone makes this legendary. Flawless execution from start to finish.', now() - interval '60 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000004', 'aaaaaaaa-1000-4000-a000-000000000015', 'aaaaaaaa-0002-4000-a000-000000000001', 4, 'Timeless songwriting. The arrangement builds tension beautifully before dissolving into noise.', now() - interval '55 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000005', 'aaaaaaaa-1000-4000-a000-000000000020', 'aaaaaaaa-0002-4000-a000-000000000001', 3, 'Solid track with great energy but the mix could use more dynamics in the low end.', now() - interval '50 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000006', 'aaaaaaaa-1000-4000-a000-000000000025', 'aaaaaaaa-0002-4000-a000-000000000001', 4, 'Infectious energy and clever wordplay. The production is tight and polished.', now() - interval '45 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000007', 'aaaaaaaa-1000-4000-a000-000000000030', 'aaaaaaaa-0002-4000-a000-000000000001', 3, 'Classic track that holds up well. The groove is undeniable even decades later.', now() - interval '40 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000008', 'aaaaaaaa-1000-4000-a000-000000000036', 'aaaaaaaa-0002-4000-a000-000000000001', 4, 'Emotionally devastating in the best way. The vocal delivery carries immense weight.', now() - interval '18 days', now()),

  -- Curator 02 (Vinyl Verdict) — 7 reviews
  ('aaaaaaaa-3000-4000-a000-000000000009', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0002-4000-a000-000000000002', 4, 'A perfect pop anthem with surprising depth beneath the glitter.', now() - interval '68 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000010', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0002-4000-a000-000000000002', 5, 'Iconic and genre-defying. The bassline alone is worth the price of admission.', now() - interval '62 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000011', 'aaaaaaaa-1000-4000-a000-000000000012', 'aaaaaaaa-0002-4000-a000-000000000002', 3, 'Good production values but feels a bit derivative of the current synth wave.', now() - interval '56 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000012', 'aaaaaaaa-1000-4000-a000-000000000018', 'aaaaaaaa-0002-4000-a000-000000000002', 4, 'Raw and honest. The acoustic arrangement perfectly serves the emotional narrative.', now() - interval '50 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000013', 'aaaaaaaa-1000-4000-a000-000000000024', 'aaaaaaaa-0002-4000-a000-000000000002', 5, 'Epic in scope yet intimate in delivery. A modern folk masterpiece.', now() - interval '44 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000014', 'aaaaaaaa-1000-4000-a000-000000000029', 'aaaaaaaa-0002-4000-a000-000000000002', 3, 'Well-crafted synth pop but doesn''t quite distinguish itself from the genre''s best.', now() - interval '38 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000015', 'aaaaaaaa-1000-4000-a000-000000000037', 'aaaaaaaa-0002-4000-a000-000000000002', 4, 'Sweet and disarming. Has a timeless quality that''s rare in modern pop.', now() - interval '17 days', now()),

  -- Curator 03 (Frequency Maven) — 7 reviews
  ('aaaaaaaa-3000-4000-a000-000000000016', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0002-4000-a000-000000000003', 4, 'Beautifully understated. The simplicity is its greatest strength.', now() - interval '66 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000017', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0002-4000-a000-000000000003', 3, 'Catchy and well-produced but relies heavily on familiar alt-rock tropes.', now() - interval '60 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000018', 'aaaaaaaa-1000-4000-a000-000000000011', 'aaaaaaaa-0002-4000-a000-000000000003', 4, 'The vulnerability here is striking. Production choices feel intentional and expressive.', now() - interval '54 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000019', 'aaaaaaaa-1000-4000-a000-000000000016', 'aaaaaaaa-0002-4000-a000-000000000003', 5, 'Psychedelic perfection. The bassline is one of the most iconic in modern music.', now() - interval '48 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000020', 'aaaaaaaa-1000-4000-a000-000000000022', 'aaaaaaaa-0002-4000-a000-000000000003', 3, 'Good songwriting instincts but the mix needs more separation between instruments.', now() - interval '42 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000021', 'aaaaaaaa-1000-4000-a000-000000000028', 'aaaaaaaa-0002-4000-a000-000000000003', 4, 'Whisper-quiet and devastating. Less is absolutely more here.', now() - interval '36 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000022', 'aaaaaaaa-1000-4000-a000-000000000038', 'aaaaaaaa-0002-4000-a000-000000000003', 5, 'The build is extraordinary. Patience rewarded with a massive payoff.', now() - interval '16 days', now()),

  -- Curator 04 (The Wax Critic) — 6 reviews
  ('aaaaaaaa-3000-4000-a000-000000000023', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0002-4000-a000-000000000004', 3, 'Solid riff-driven rock. Not groundbreaking but executed with confidence.', now() - interval '64 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000024', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0002-4000-a000-000000000004', 2, 'Overplayed. The contrast between lyrics and melody is clever but feels gimmicky now.', now() - interval '58 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000025', 'aaaaaaaa-1000-4000-a000-000000000017', 'aaaaaaaa-0002-4000-a000-000000000004', 4, 'Silky smooth duet. Both vocalists complement each other perfectly.', now() - interval '52 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000026', 'aaaaaaaa-1000-4000-a000-000000000023', 'aaaaaaaa-0002-4000-a000-000000000004', 3, 'Breezy and fun but lacks the depth of the artist''s stronger work.', now() - interval '46 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000027', 'aaaaaaaa-1000-4000-a000-000000000031', 'aaaaaaaa-0002-4000-a000-000000000004', 5, 'One of the most beautiful songs ever written. Every note is essential.', now() - interval '30 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000028', 'aaaaaaaa-1000-4000-a000-000000000039', 'aaaaaaaa-0002-4000-a000-000000000004', 4, 'A timeless classic that sounds fresh every single listen.', now() - interval '15 days', now()),

  -- Curator 05 (Groove Architect) — 8 reviews
  ('aaaaaaaa-3000-4000-a000-000000000029', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0002-4000-a000-000000000005', 5, 'Instant classic material. Melody lodges in your brain and refuses to leave.', now() - interval '69 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000030', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0002-4000-a000-000000000005', 4, 'The hook is undeniable. Smart production choices throughout.', now() - interval '63 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000031', 'aaaaaaaa-1000-4000-a000-000000000013', 'aaaaaaaa-0002-4000-a000-000000000005', 4, 'A stone-cold classic. The vocal performance carries decades of wisdom.', now() - interval '57 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000032', 'aaaaaaaa-1000-4000-a000-000000000014', 'aaaaaaaa-0002-4000-a000-000000000005', 5, 'Funky, psychedelic, and deeply soulful. Production is immaculate.', now() - interval '51 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000033', 'aaaaaaaa-1000-4000-a000-000000000019', 'aaaaaaaa-0002-4000-a000-000000000005', 3, 'Sweet and atmospheric but feels like it resolves too quickly.', now() - interval '45 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000034', 'aaaaaaaa-1000-4000-a000-000000000026', 'aaaaaaaa-0002-4000-a000-000000000005', 5, 'Seven minutes of pure genius. The way it builds is absolutely masterful.', now() - interval '39 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000035', 'aaaaaaaa-1000-4000-a000-000000000033', 'aaaaaaaa-0002-4000-a000-000000000005', 4, 'Lorde captures youthful anxiety like no one else. Production is lush and expansive.', now() - interval '26 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000036', 'aaaaaaaa-1000-4000-a000-000000000040', 'aaaaaaaa-0002-4000-a000-000000000005', 3, 'Well-crafted electropop. Solid but not her strongest work.', now() - interval '13 days', now()),

  -- Curator 06 (Sonic Compass) — 7 reviews
  ('aaaaaaaa-3000-4000-a000-000000000037', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0002-4000-a000-000000000006', 5, 'Anthemic and fearless. This is the sound of someone chasing their wildest dream.', now() - interval '67 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000038', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0002-4000-a000-000000000006', 4, 'An emotional rollercoaster with impeccable production. The duality is stunning.', now() - interval '58 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000039', 'aaaaaaaa-1000-4000-a000-000000000014', 'aaaaaaaa-0002-4000-a000-000000000006', 4, 'Throwback soul done right. Groovy and hypnotic.', now() - interval '50 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000040', 'aaaaaaaa-1000-4000-a000-000000000021', 'aaaaaaaa-0002-4000-a000-000000000006', 3, 'Strong vocal harmonies but the arrangement could be tighter.', now() - interval '42 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000041', 'aaaaaaaa-1000-4000-a000-000000000027', 'aaaaaaaa-0002-4000-a000-000000000006', 4, 'Raw and unpolished in exactly the right ways. Authenticity radiates from every note.', now() - interval '35 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000042', 'aaaaaaaa-1000-4000-a000-000000000034', 'aaaaaaaa-0002-4000-a000-000000000006', 4, 'Shimmering and ethereal. Perfectly captures that half-asleep feeling.', now() - interval '24 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000043', 'aaaaaaaa-1000-4000-a000-000000000041', 'aaaaaaaa-0002-4000-a000-000000000006', 3, 'Ambitious scope but the piano repetition becomes wearing over eight minutes.', now() - interval '12 days', now()),

  -- Curator 07 (Decibel Scout) — 6 reviews
  ('aaaaaaaa-3000-4000-a000-000000000044', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0002-4000-a000-000000000007', 5, 'Pure magic captured in two minutes. Every word and note is exactly right.', now() - interval '64 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000045', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0002-4000-a000-000000000007', 3, 'Catchy but the song structure is fairly predictable.', now() - interval '55 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000046', 'aaaaaaaa-1000-4000-a000-000000000015', 'aaaaaaaa-0002-4000-a000-000000000007', 4, 'Dark and brooding with a satisfying descent into noise at the end.', now() - interval '48 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000047', 'aaaaaaaa-1000-4000-a000-000000000022', 'aaaaaaaa-0002-4000-a000-000000000007', 2, 'Lacks focus. The ideas are there but the execution needs refinement.', now() - interval '40 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000048', 'aaaaaaaa-1000-4000-a000-000000000032', 'aaaaaaaa-0002-4000-a000-000000000007', 3, 'Pleasant nostalgia trip with decent melodies but nothing surprising.', now() - interval '28 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000049', 'aaaaaaaa-1000-4000-a000-000000000042', 'aaaaaaaa-0002-4000-a000-000000000007', 4, 'Powerful statement on emotional exhaustion. The vocal restraint says everything.', now() - interval '10 days', now()),

  -- Curator 08 (Harmonic Judge) — 7 reviews
  ('aaaaaaaa-3000-4000-a000-000000000050', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0002-4000-a000-000000000008', 4, 'The riff is iconic and the vocals drip with cool detachment. Well done.', now() - interval '63 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000051', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0002-4000-a000-000000000008', 4, 'Brilliantly layered. The contrast between Damon''s rap and the melodic chorus is inspired.', now() - interval '56 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000052', 'aaaaaaaa-1000-4000-a000-000000000016', 'aaaaaaaa-0002-4000-a000-000000000008', 4, 'Groovy and psychedelic with a perfectly earworm bassline.', now() - interval '49 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000053', 'aaaaaaaa-1000-4000-a000-000000000020', 'aaaaaaaa-0002-4000-a000-000000000008', 4, 'Electric energy throughout. The synth textures are rich and rewarding.', now() - interval '42 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000054', 'aaaaaaaa-1000-4000-a000-000000000026', 'aaaaaaaa-0002-4000-a000-000000000008', 5, 'A journey. The gradual build and release is euphoric. Masterful.', now() - interval '35 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000055', 'aaaaaaaa-1000-4000-a000-000000000035', 'aaaaaaaa-0002-4000-a000-000000000008', 4, 'Raw emotion channeled through stripped-down folk. Timeless.', now() - interval '22 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000056', 'aaaaaaaa-1000-4000-a000-000000000043', 'aaaaaaaa-0002-4000-a000-000000000008', 3, 'Rousing anthem with soaring dynamics but lyrically a bit vague.', now() - interval '9 days', now()),

  -- Curator 09 (Bass Oracle) — 6 reviews
  ('aaaaaaaa-3000-4000-a000-000000000057', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0002-4000-a000-000000000009', 4, 'The bass sits perfectly in the mix. Dreamy without losing groove.', now() - interval '61 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000058', 'aaaaaaaa-1000-4000-a000-000000000011', 'aaaaaaaa-0002-4000-a000-000000000009', 3, 'Interesting experiment but the production occasionally overwhelms the vocal.', now() - interval '52 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000059', 'aaaaaaaa-1000-4000-a000-000000000017', 'aaaaaaaa-0002-4000-a000-000000000009', 4, 'Warm and inviting. The low-end support is gentle and effective.', now() - interval '44 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000060', 'aaaaaaaa-1000-4000-a000-000000000025', 'aaaaaaaa-0002-4000-a000-000000000009', 3, 'Fun but doesn''t hit as hard on repeated listens.', now() - interval '36 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000061', 'aaaaaaaa-1000-4000-a000-000000000030', 'aaaaaaaa-0002-4000-a000-000000000009', 5, 'Timeless groove and one of the great feel-good songs of all time.', now() - interval '28 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000062', 'aaaaaaaa-1000-4000-a000-000000000044', 'aaaaaaaa-0002-4000-a000-000000000009', 4, 'Stunning falsetto over minimal beats. Emotional and restrained perfectly.', now() - interval '8 days', now()),

  -- Curator 10 (Treble Alchemist) — 7 reviews
  ('aaaaaaaa-3000-4000-a000-000000000063', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0002-4000-a000-000000000010', 4, 'Bright and breezy with hidden emotional depth. The chorus soars.', now() - interval '66 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000064', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0002-4000-a000-000000000010', 4, 'Moody and atmospheric. Perfect soundtrack for rainy evenings.', now() - interval '58 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000065', 'aaaaaaaa-1000-4000-a000-000000000013', 'aaaaaaaa-0002-4000-a000-000000000010', 5, 'Fleetwood Mac at the peak of their powers. A masterwork.', now() - interval '50 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000066', 'aaaaaaaa-1000-4000-a000-000000000019', 'aaaaaaaa-0002-4000-a000-000000000010', 4, 'Debut-era magic. Simple yet captivating vocal processing.', now() - interval '42 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000067', 'aaaaaaaa-1000-4000-a000-000000000027', 'aaaaaaaa-0002-4000-a000-000000000010', 5, 'Lo-fi genius. The raw energy here is unmatched in indie rock history.', now() - interval '34 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000068', 'aaaaaaaa-1000-4000-a000-000000000033', 'aaaaaaaa-0002-4000-a000-000000000010', 3, 'Interesting concept but the pacing drags in the second half.', now() - interval '26 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000069', 'aaaaaaaa-1000-4000-a000-000000000045', 'aaaaaaaa-0002-4000-a000-000000000010', 2, 'The hardcore elements feel forced and the melodic sections lack conviction.', now() - interval '7 days', now()),

  -- Curator 11 (Pulse Keeper) — 5 reviews
  ('aaaaaaaa-3000-4000-a000-000000000070', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0002-4000-a000-000000000011', 5, 'That opening riff is one of the greatest hooks in rock history. Flawless.', now() - interval '60 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000071', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0002-4000-a000-000000000011', 3, 'Undeniably catchy but the dissonance between form and content wears thin.', now() - interval '48 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000072', 'aaaaaaaa-1000-4000-a000-000000000018', 'aaaaaaaa-0002-4000-a000-000000000011', 5, 'Heart-wrenching beauty. This song will make you feel things you forgot about.', now() - interval '40 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000073', 'aaaaaaaa-1000-4000-a000-000000000024', 'aaaaaaaa-0002-4000-a000-000000000011', 4, 'Grand and sweeping with an orchestral sensibility. Deeply moving.', now() - interval '32 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000074', 'aaaaaaaa-1000-4000-a000-000000000035', 'aaaaaaaa-0002-4000-a000-000000000011', 3, 'Beautiful but has been so widely covered that the original feels less impactful.', now() - interval '20 days', now()),

  -- Curator 12 (Tone Shepherd) — 6 reviews
  ('aaaaaaaa-3000-4000-a000-000000000075', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0002-4000-a000-000000000012', 3, 'Big pop energy. Entertaining but doesn''t push boundaries much.', now() - interval '65 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000076', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0002-4000-a000-000000000012', 4, 'Clever songwriting with a hook that won''t quit. Modern R&B at its catchiest.', now() - interval '55 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000077', 'aaaaaaaa-1000-4000-a000-000000000012', 'aaaaaaaa-0002-4000-a000-000000000012', 4, 'The sax solo elevates an already great synthpop track to iconic status.', now() - interval '48 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000078', 'aaaaaaaa-1000-4000-a000-000000000021', 'aaaaaaaa-0002-4000-a000-000000000012', 4, 'Three voices weaving together with devastating effect. A supergroup triumph.', now() - interval '38 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000079', 'aaaaaaaa-1000-4000-a000-000000000028', 'aaaaaaaa-0002-4000-a000-000000000012', 5, 'Achingly beautiful. Every whispered word carries the weight of the world.', now() - interval '30 days', now()),
  ('aaaaaaaa-3000-4000-a000-000000000080', 'aaaaaaaa-1000-4000-a000-000000000036', 'aaaaaaaa-0002-4000-a000-000000000012', 3, 'Moody and atmospheric R&B. Well executed but a slow burn that may lose some listeners.', now() - interval '16 days', now());

-- ──────────────────────────────────────────────
-- 7. Insert ~70 chart entries
-- ──────────────────────────────────────────────
-- Monthly charts: 2025-12, 2026-01, 2026-02 + Yearly chart: 2026
-- Ranked by vote count (using the vote summary above)

INSERT INTO public.charts (id, submission_id, chart_type, period, rank, vote_count, created_at)
VALUES
  -- Monthly: 2025-12 (top 15 — submissions 1-35 that existed by then)
  ('aaaaaaaa-4000-4000-a000-000000000001', 'aaaaaaaa-1000-4000-a000-000000000001', 'monthly', '2025-12', 1, 30, now() - interval '55 days'),
  ('aaaaaaaa-4000-4000-a000-000000000002', 'aaaaaaaa-1000-4000-a000-000000000009', 'monthly', '2025-12', 2, 30, now() - interval '55 days'),
  ('aaaaaaaa-4000-4000-a000-000000000003', 'aaaaaaaa-1000-4000-a000-000000000010', 'monthly', '2025-12', 3, 28, now() - interval '55 days'),
  ('aaaaaaaa-4000-4000-a000-000000000004', 'aaaaaaaa-1000-4000-a000-000000000004', 'monthly', '2025-12', 4, 24, now() - interval '55 days'),
  ('aaaaaaaa-4000-4000-a000-000000000005', 'aaaaaaaa-1000-4000-a000-000000000005', 'monthly', '2025-12', 5, 23, now() - interval '55 days'),
  ('aaaaaaaa-4000-4000-a000-000000000006', 'aaaaaaaa-1000-4000-a000-000000000006', 'monthly', '2025-12', 6, 23, now() - interval '55 days'),
  ('aaaaaaaa-4000-4000-a000-000000000007', 'aaaaaaaa-1000-4000-a000-000000000007', 'monthly', '2025-12', 7, 22, now() - interval '55 days'),
  ('aaaaaaaa-4000-4000-a000-000000000008', 'aaaaaaaa-1000-4000-a000-000000000002', 'monthly', '2025-12', 8, 21, now() - interval '55 days'),
  ('aaaaaaaa-4000-4000-a000-000000000009', 'aaaaaaaa-1000-4000-a000-000000000008', 'monthly', '2025-12', 9, 21, now() - interval '55 days'),
  ('aaaaaaaa-4000-4000-a000-000000000010', 'aaaaaaaa-1000-4000-a000-000000000003', 'monthly', '2025-12', 10, 20, now() - interval '55 days'),
  ('aaaaaaaa-4000-4000-a000-000000000011', 'aaaaaaaa-1000-4000-a000-000000000012', 'monthly', '2025-12', 11, 16, now() - interval '55 days'),
  ('aaaaaaaa-4000-4000-a000-000000000012', 'aaaaaaaa-1000-4000-a000-000000000019', 'monthly', '2025-12', 12, 16, now() - interval '55 days'),
  ('aaaaaaaa-4000-4000-a000-000000000013', 'aaaaaaaa-1000-4000-a000-000000000020', 'monthly', '2025-12', 13, 16, now() - interval '55 days'),
  ('aaaaaaaa-4000-4000-a000-000000000014', 'aaaaaaaa-1000-4000-a000-000000000013', 'monthly', '2025-12', 14, 15, now() - interval '55 days'),
  ('aaaaaaaa-4000-4000-a000-000000000015', 'aaaaaaaa-1000-4000-a000-000000000017', 'monthly', '2025-12', 15, 13, now() - interval '55 days'),

  -- Monthly: 2026-01 (top 20)
  ('aaaaaaaa-4000-4000-a000-000000000016', 'aaaaaaaa-1000-4000-a000-000000000001', 'monthly', '2026-01', 1, 30, now() - interval '24 days'),
  ('aaaaaaaa-4000-4000-a000-000000000017', 'aaaaaaaa-1000-4000-a000-000000000009', 'monthly', '2026-01', 2, 30, now() - interval '24 days'),
  ('aaaaaaaa-4000-4000-a000-000000000018', 'aaaaaaaa-1000-4000-a000-000000000010', 'monthly', '2026-01', 3, 28, now() - interval '24 days'),
  ('aaaaaaaa-4000-4000-a000-000000000019', 'aaaaaaaa-1000-4000-a000-000000000004', 'monthly', '2026-01', 4, 24, now() - interval '24 days'),
  ('aaaaaaaa-4000-4000-a000-000000000020', 'aaaaaaaa-1000-4000-a000-000000000005', 'monthly', '2026-01', 5, 23, now() - interval '24 days'),
  ('aaaaaaaa-4000-4000-a000-000000000021', 'aaaaaaaa-1000-4000-a000-000000000006', 'monthly', '2026-01', 6, 23, now() - interval '24 days'),
  ('aaaaaaaa-4000-4000-a000-000000000022', 'aaaaaaaa-1000-4000-a000-000000000007', 'monthly', '2026-01', 7, 22, now() - interval '24 days'),
  ('aaaaaaaa-4000-4000-a000-000000000023', 'aaaaaaaa-1000-4000-a000-000000000002', 'monthly', '2026-01', 8, 21, now() - interval '24 days'),
  ('aaaaaaaa-4000-4000-a000-000000000024', 'aaaaaaaa-1000-4000-a000-000000000008', 'monthly', '2026-01', 9, 21, now() - interval '24 days'),
  ('aaaaaaaa-4000-4000-a000-000000000025', 'aaaaaaaa-1000-4000-a000-000000000003', 'monthly', '2026-01', 10, 20, now() - interval '24 days'),
  ('aaaaaaaa-4000-4000-a000-000000000026', 'aaaaaaaa-1000-4000-a000-000000000012', 'monthly', '2026-01', 11, 16, now() - interval '24 days'),
  ('aaaaaaaa-4000-4000-a000-000000000027', 'aaaaaaaa-1000-4000-a000-000000000019', 'monthly', '2026-01', 12, 16, now() - interval '24 days'),
  ('aaaaaaaa-4000-4000-a000-000000000028', 'aaaaaaaa-1000-4000-a000-000000000020', 'monthly', '2026-01', 13, 16, now() - interval '24 days'),
  ('aaaaaaaa-4000-4000-a000-000000000029', 'aaaaaaaa-1000-4000-a000-000000000013', 'monthly', '2026-01', 14, 15, now() - interval '24 days'),
  ('aaaaaaaa-4000-4000-a000-000000000030', 'aaaaaaaa-1000-4000-a000-000000000017', 'monthly', '2026-01', 15, 13, now() - interval '24 days'),
  ('aaaaaaaa-4000-4000-a000-000000000031', 'aaaaaaaa-1000-4000-a000-000000000018', 'monthly', '2026-01', 16, 13, now() - interval '24 days'),
  ('aaaaaaaa-4000-4000-a000-000000000032', 'aaaaaaaa-1000-4000-a000-000000000033', 'monthly', '2026-01', 17, 12, now() - interval '24 days'),
  ('aaaaaaaa-4000-4000-a000-000000000033', 'aaaaaaaa-1000-4000-a000-000000000034', 'monthly', '2026-01', 18, 12, now() - interval '24 days'),
  ('aaaaaaaa-4000-4000-a000-000000000034', 'aaaaaaaa-1000-4000-a000-000000000011', 'monthly', '2026-01', 19, 12, now() - interval '24 days'),
  ('aaaaaaaa-4000-4000-a000-000000000035', 'aaaaaaaa-1000-4000-a000-000000000014', 'monthly', '2026-01', 20, 12, now() - interval '24 days'),

  -- Monthly: 2026-02 (top 20)
  ('aaaaaaaa-4000-4000-a000-000000000036', 'aaaaaaaa-1000-4000-a000-000000000001', 'monthly', '2026-02', 1, 30, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000037', 'aaaaaaaa-1000-4000-a000-000000000009', 'monthly', '2026-02', 2, 30, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000038', 'aaaaaaaa-1000-4000-a000-000000000010', 'monthly', '2026-02', 3, 28, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000039', 'aaaaaaaa-1000-4000-a000-000000000004', 'monthly', '2026-02', 4, 24, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000040', 'aaaaaaaa-1000-4000-a000-000000000005', 'monthly', '2026-02', 5, 23, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000041', 'aaaaaaaa-1000-4000-a000-000000000006', 'monthly', '2026-02', 6, 23, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000042', 'aaaaaaaa-1000-4000-a000-000000000007', 'monthly', '2026-02', 7, 22, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000043', 'aaaaaaaa-1000-4000-a000-000000000002', 'monthly', '2026-02', 8, 21, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000044', 'aaaaaaaa-1000-4000-a000-000000000008', 'monthly', '2026-02', 9, 21, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000045', 'aaaaaaaa-1000-4000-a000-000000000003', 'monthly', '2026-02', 10, 20, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000046', 'aaaaaaaa-1000-4000-a000-000000000012', 'monthly', '2026-02', 11, 16, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000047', 'aaaaaaaa-1000-4000-a000-000000000019', 'monthly', '2026-02', 12, 16, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000048', 'aaaaaaaa-1000-4000-a000-000000000020', 'monthly', '2026-02', 13, 16, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000049', 'aaaaaaaa-1000-4000-a000-000000000013', 'monthly', '2026-02', 14, 15, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000050', 'aaaaaaaa-1000-4000-a000-000000000017', 'monthly', '2026-02', 15, 13, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000051', 'aaaaaaaa-1000-4000-a000-000000000018', 'monthly', '2026-02', 16, 13, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000052', 'aaaaaaaa-1000-4000-a000-000000000033', 'monthly', '2026-02', 17, 12, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000053', 'aaaaaaaa-1000-4000-a000-000000000034', 'monthly', '2026-02', 18, 12, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000054', 'aaaaaaaa-1000-4000-a000-000000000011', 'monthly', '2026-02', 19, 12, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000055', 'aaaaaaaa-1000-4000-a000-000000000014', 'monthly', '2026-02', 20, 12, now() - interval '1 day'),

  -- Yearly: 2026 (top 15)
  ('aaaaaaaa-4000-4000-a000-000000000056', 'aaaaaaaa-1000-4000-a000-000000000001', 'yearly', '2026', 1, 30, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000057', 'aaaaaaaa-1000-4000-a000-000000000009', 'yearly', '2026', 2, 30, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000058', 'aaaaaaaa-1000-4000-a000-000000000010', 'yearly', '2026', 3, 28, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000059', 'aaaaaaaa-1000-4000-a000-000000000004', 'yearly', '2026', 4, 24, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000060', 'aaaaaaaa-1000-4000-a000-000000000005', 'yearly', '2026', 5, 23, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000061', 'aaaaaaaa-1000-4000-a000-000000000006', 'yearly', '2026', 6, 23, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000062', 'aaaaaaaa-1000-4000-a000-000000000007', 'yearly', '2026', 7, 22, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000063', 'aaaaaaaa-1000-4000-a000-000000000002', 'yearly', '2026', 8, 21, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000064', 'aaaaaaaa-1000-4000-a000-000000000008', 'yearly', '2026', 9, 21, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000065', 'aaaaaaaa-1000-4000-a000-000000000003', 'yearly', '2026', 10, 20, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000066', 'aaaaaaaa-1000-4000-a000-000000000012', 'yearly', '2026', 11, 16, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000067', 'aaaaaaaa-1000-4000-a000-000000000019', 'yearly', '2026', 12, 16, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000068', 'aaaaaaaa-1000-4000-a000-000000000020', 'yearly', '2026', 13, 16, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000069', 'aaaaaaaa-1000-4000-a000-000000000013', 'yearly', '2026', 14, 15, now() - interval '1 day'),
  ('aaaaaaaa-4000-4000-a000-000000000070', 'aaaaaaaa-1000-4000-a000-000000000017', 'yearly', '2026', 15, 13, now() - interval '1 day');

-- ──────────────────────────────────────────────
-- 8. Insert 50 payments
-- ──────────────────────────────────────────────

INSERT INTO public.payments (id, submission_id, user_id, stripe_session_id, stripe_payment_intent_id, amount_cents, currency, status, created_at, updated_at)
VALUES
  ('aaaaaaaa-5000-4000-a000-000000000001', 'aaaaaaaa-1000-4000-a000-000000000001', 'aaaaaaaa-0001-4000-a000-000000000001', 'demo_cs_001', 'demo_pi_001', 200, 'usd', 'succeeded', now() - interval '85 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000002', 'aaaaaaaa-1000-4000-a000-000000000002', 'aaaaaaaa-0001-4000-a000-000000000002', 'demo_cs_002', 'demo_pi_002', 200, 'usd', 'succeeded', now() - interval '83 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000003', 'aaaaaaaa-1000-4000-a000-000000000003', 'aaaaaaaa-0001-4000-a000-000000000003', 'demo_cs_003', 'demo_pi_003', 200, 'usd', 'succeeded', now() - interval '81 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000004', 'aaaaaaaa-1000-4000-a000-000000000004', 'aaaaaaaa-0001-4000-a000-000000000004', 'demo_cs_004', 'demo_pi_004', 200, 'usd', 'succeeded', now() - interval '80 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000005', 'aaaaaaaa-1000-4000-a000-000000000005', 'aaaaaaaa-0001-4000-a000-000000000005', 'demo_cs_005', 'demo_pi_005', 200, 'usd', 'succeeded', now() - interval '78 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000006', 'aaaaaaaa-1000-4000-a000-000000000006', 'aaaaaaaa-0001-4000-a000-000000000006', 'demo_cs_006', 'demo_pi_006', 200, 'usd', 'succeeded', now() - interval '77 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000007', 'aaaaaaaa-1000-4000-a000-000000000007', 'aaaaaaaa-0001-4000-a000-000000000007', 'demo_cs_007', 'demo_pi_007', 200, 'usd', 'succeeded', now() - interval '75 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000008', 'aaaaaaaa-1000-4000-a000-000000000008', 'aaaaaaaa-0001-4000-a000-000000000008', 'demo_cs_008', 'demo_pi_008', 200, 'usd', 'succeeded', now() - interval '74 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000009', 'aaaaaaaa-1000-4000-a000-000000000009', 'aaaaaaaa-0001-4000-a000-000000000009', 'demo_cs_009', 'demo_pi_009', 200, 'usd', 'succeeded', now() - interval '72 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000010', 'aaaaaaaa-1000-4000-a000-000000000010', 'aaaaaaaa-0001-4000-a000-000000000010', 'demo_cs_010', 'demo_pi_010', 200, 'usd', 'succeeded', now() - interval '70 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000011', 'aaaaaaaa-1000-4000-a000-000000000011', 'aaaaaaaa-0001-4000-a000-000000000011', 'demo_cs_011', 'demo_pi_011', 200, 'usd', 'succeeded', now() - interval '68 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000012', 'aaaaaaaa-1000-4000-a000-000000000012', 'aaaaaaaa-0001-4000-a000-000000000012', 'demo_cs_012', 'demo_pi_012', 200, 'usd', 'succeeded', now() - interval '66 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000013', 'aaaaaaaa-1000-4000-a000-000000000013', 'aaaaaaaa-0001-4000-a000-000000000013', 'demo_cs_013', 'demo_pi_013', 200, 'usd', 'succeeded', now() - interval '65 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000014', 'aaaaaaaa-1000-4000-a000-000000000014', 'aaaaaaaa-0001-4000-a000-000000000014', 'demo_cs_014', 'demo_pi_014', 200, 'usd', 'succeeded', now() - interval '63 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000015', 'aaaaaaaa-1000-4000-a000-000000000015', 'aaaaaaaa-0001-4000-a000-000000000015', 'demo_cs_015', 'demo_pi_015', 200, 'usd', 'succeeded', now() - interval '62 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000016', 'aaaaaaaa-1000-4000-a000-000000000016', 'aaaaaaaa-0001-4000-a000-000000000016', 'demo_cs_016', 'demo_pi_016', 200, 'usd', 'succeeded', now() - interval '60 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000017', 'aaaaaaaa-1000-4000-a000-000000000017', 'aaaaaaaa-0001-4000-a000-000000000017', 'demo_cs_017', 'demo_pi_017', 200, 'usd', 'succeeded', now() - interval '58 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000018', 'aaaaaaaa-1000-4000-a000-000000000018', 'aaaaaaaa-0001-4000-a000-000000000018', 'demo_cs_018', 'demo_pi_018', 200, 'usd', 'succeeded', now() - interval '56 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000019', 'aaaaaaaa-1000-4000-a000-000000000019', 'aaaaaaaa-0001-4000-a000-000000000019', 'demo_cs_019', 'demo_pi_019', 200, 'usd', 'succeeded', now() - interval '55 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000020', 'aaaaaaaa-1000-4000-a000-000000000020', 'aaaaaaaa-0001-4000-a000-000000000020', 'demo_cs_020', 'demo_pi_020', 200, 'usd', 'succeeded', now() - interval '53 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000021', 'aaaaaaaa-1000-4000-a000-000000000021', 'aaaaaaaa-0001-4000-a000-000000000021', 'demo_cs_021', 'demo_pi_021', 200, 'usd', 'succeeded', now() - interval '51 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000022', 'aaaaaaaa-1000-4000-a000-000000000022', 'aaaaaaaa-0001-4000-a000-000000000022', 'demo_cs_022', 'demo_pi_022', 200, 'usd', 'succeeded', now() - interval '49 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000023', 'aaaaaaaa-1000-4000-a000-000000000023', 'aaaaaaaa-0001-4000-a000-000000000023', 'demo_cs_023', 'demo_pi_023', 200, 'usd', 'succeeded', now() - interval '47 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000024', 'aaaaaaaa-1000-4000-a000-000000000024', 'aaaaaaaa-0001-4000-a000-000000000024', 'demo_cs_024', 'demo_pi_024', 200, 'usd', 'succeeded', now() - interval '45 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000025', 'aaaaaaaa-1000-4000-a000-000000000025', 'aaaaaaaa-0001-4000-a000-000000000025', 'demo_cs_025', 'demo_pi_025', 200, 'usd', 'succeeded', now() - interval '43 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000026', 'aaaaaaaa-1000-4000-a000-000000000026', 'aaaaaaaa-0001-4000-a000-000000000026', 'demo_cs_026', 'demo_pi_026', 200, 'usd', 'succeeded', now() - interval '41 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000027', 'aaaaaaaa-1000-4000-a000-000000000027', 'aaaaaaaa-0001-4000-a000-000000000027', 'demo_cs_027', 'demo_pi_027', 200, 'usd', 'succeeded', now() - interval '39 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000028', 'aaaaaaaa-1000-4000-a000-000000000028', 'aaaaaaaa-0001-4000-a000-000000000028', 'demo_cs_028', 'demo_pi_028', 200, 'usd', 'succeeded', now() - interval '37 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000029', 'aaaaaaaa-1000-4000-a000-000000000029', 'aaaaaaaa-0001-4000-a000-000000000029', 'demo_cs_029', 'demo_pi_029', 200, 'usd', 'succeeded', now() - interval '35 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000030', 'aaaaaaaa-1000-4000-a000-000000000030', 'aaaaaaaa-0001-4000-a000-000000000030', 'demo_cs_030', 'demo_pi_030', 200, 'usd', 'succeeded', now() - interval '33 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000031', 'aaaaaaaa-1000-4000-a000-000000000031', 'aaaaaaaa-0001-4000-a000-000000000031', 'demo_cs_031', 'demo_pi_031', 200, 'usd', 'succeeded', now() - interval '31 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000032', 'aaaaaaaa-1000-4000-a000-000000000032', 'aaaaaaaa-0001-4000-a000-000000000032', 'demo_cs_032', 'demo_pi_032', 200, 'usd', 'succeeded', now() - interval '29 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000033', 'aaaaaaaa-1000-4000-a000-000000000033', 'aaaaaaaa-0001-4000-a000-000000000033', 'demo_cs_033', 'demo_pi_033', 200, 'usd', 'succeeded', now() - interval '27 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000034', 'aaaaaaaa-1000-4000-a000-000000000034', 'aaaaaaaa-0001-4000-a000-000000000034', 'demo_cs_034', 'demo_pi_034', 200, 'usd', 'succeeded', now() - interval '25 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000035', 'aaaaaaaa-1000-4000-a000-000000000035', 'aaaaaaaa-0001-4000-a000-000000000035', 'demo_cs_035', 'demo_pi_035', 200, 'usd', 'succeeded', now() - interval '23 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000036', 'aaaaaaaa-1000-4000-a000-000000000036', 'aaaaaaaa-0001-4000-a000-000000000001', 'demo_cs_036', 'demo_pi_036', 200, 'usd', 'succeeded', now() - interval '20 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000037', 'aaaaaaaa-1000-4000-a000-000000000037', 'aaaaaaaa-0001-4000-a000-000000000002', 'demo_cs_037', 'demo_pi_037', 200, 'usd', 'succeeded', now() - interval '19 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000038', 'aaaaaaaa-1000-4000-a000-000000000038', 'aaaaaaaa-0001-4000-a000-000000000003', 'demo_cs_038', 'demo_pi_038', 200, 'usd', 'succeeded', now() - interval '18 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000039', 'aaaaaaaa-1000-4000-a000-000000000039', 'aaaaaaaa-0001-4000-a000-000000000004', 'demo_cs_039', 'demo_pi_039', 200, 'usd', 'succeeded', now() - interval '17 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000040', 'aaaaaaaa-1000-4000-a000-000000000040', 'aaaaaaaa-0001-4000-a000-000000000005', 'demo_cs_040', 'demo_pi_040', 200, 'usd', 'succeeded', now() - interval '15 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000041', 'aaaaaaaa-1000-4000-a000-000000000041', 'aaaaaaaa-0001-4000-a000-000000000006', 'demo_cs_041', 'demo_pi_041', 200, 'usd', 'succeeded', now() - interval '14 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000042', 'aaaaaaaa-1000-4000-a000-000000000042', 'aaaaaaaa-0001-4000-a000-000000000007', 'demo_cs_042', 'demo_pi_042', 200, 'usd', 'succeeded', now() - interval '12 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000043', 'aaaaaaaa-1000-4000-a000-000000000043', 'aaaaaaaa-0001-4000-a000-000000000008', 'demo_cs_043', 'demo_pi_043', 200, 'usd', 'succeeded', now() - interval '11 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000044', 'aaaaaaaa-1000-4000-a000-000000000044', 'aaaaaaaa-0001-4000-a000-000000000009', 'demo_cs_044', 'demo_pi_044', 200, 'usd', 'succeeded', now() - interval '10 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000045', 'aaaaaaaa-1000-4000-a000-000000000045', 'aaaaaaaa-0001-4000-a000-000000000010', 'demo_cs_045', 'demo_pi_045', 200, 'usd', 'succeeded', now() - interval '8 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000046', 'aaaaaaaa-1000-4000-a000-000000000046', 'aaaaaaaa-0001-4000-a000-000000000011', 'demo_cs_046', 'demo_pi_046', 200, 'usd', 'succeeded', now() - interval '5 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000047', 'aaaaaaaa-1000-4000-a000-000000000047', 'aaaaaaaa-0001-4000-a000-000000000012', 'demo_cs_047', 'demo_pi_047', 200, 'usd', 'succeeded', now() - interval '4 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000048', 'aaaaaaaa-1000-4000-a000-000000000048', 'aaaaaaaa-0001-4000-a000-000000000013', 'demo_cs_048', 'demo_pi_048', 200, 'usd', 'succeeded', now() - interval '3 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000049', 'aaaaaaaa-1000-4000-a000-000000000049', 'aaaaaaaa-0001-4000-a000-000000000014', 'demo_cs_049', 'demo_pi_049', 200, 'usd', 'succeeded', now() - interval '2 days', now()),
  ('aaaaaaaa-5000-4000-a000-000000000050', 'aaaaaaaa-1000-4000-a000-000000000050', 'aaaaaaaa-0001-4000-a000-000000000015', 'demo_cs_050', 'demo_pi_050', 200, 'usd', 'succeeded', now() - interval '1 day', now());

-- ──────────────────────────────────────────────
-- 9. Insert 12 curator payouts
-- ──────────────────────────────────────────────
-- One per curator for period 2026-01
-- amount_cents = review_count * 200

INSERT INTO public.curator_payouts (id, curator_id, amount_cents, currency, stripe_transfer_id, review_count, period, paid_at, created_at)
VALUES
  ('aaaaaaaa-6000-4000-a000-000000000001', 'aaaaaaaa-0002-4000-a000-000000000001', 1600, 'usd', 'demo_tr_001', 8, '2026-01', now() - interval '20 days', now() - interval '20 days'),
  ('aaaaaaaa-6000-4000-a000-000000000002', 'aaaaaaaa-0002-4000-a000-000000000002', 1400, 'usd', 'demo_tr_002', 7, '2026-01', now() - interval '20 days', now() - interval '20 days'),
  ('aaaaaaaa-6000-4000-a000-000000000003', 'aaaaaaaa-0002-4000-a000-000000000003', 1400, 'usd', 'demo_tr_003', 7, '2026-01', now() - interval '20 days', now() - interval '20 days'),
  ('aaaaaaaa-6000-4000-a000-000000000004', 'aaaaaaaa-0002-4000-a000-000000000004', 1200, 'usd', 'demo_tr_004', 6, '2026-01', now() - interval '20 days', now() - interval '20 days'),
  ('aaaaaaaa-6000-4000-a000-000000000005', 'aaaaaaaa-0002-4000-a000-000000000005', 1600, 'usd', 'demo_tr_005', 8, '2026-01', now() - interval '20 days', now() - interval '20 days'),
  ('aaaaaaaa-6000-4000-a000-000000000006', 'aaaaaaaa-0002-4000-a000-000000000006', 1400, 'usd', 'demo_tr_006', 7, '2026-01', now() - interval '20 days', now() - interval '20 days'),
  ('aaaaaaaa-6000-4000-a000-000000000007', 'aaaaaaaa-0002-4000-a000-000000000007', 1200, 'usd', 'demo_tr_007', 6, '2026-01', now() - interval '20 days', now() - interval '20 days'),
  ('aaaaaaaa-6000-4000-a000-000000000008', 'aaaaaaaa-0002-4000-a000-000000000008', 1400, 'usd', 'demo_tr_008', 7, '2026-01', now() - interval '20 days', now() - interval '20 days'),
  ('aaaaaaaa-6000-4000-a000-000000000009', 'aaaaaaaa-0002-4000-a000-000000000009', 1200, 'usd', 'demo_tr_009', 6, '2026-01', now() - interval '20 days', now() - interval '20 days'),
  ('aaaaaaaa-6000-4000-a000-000000000010', 'aaaaaaaa-0002-4000-a000-000000000010', 1400, 'usd', 'demo_tr_010', 7, '2026-01', now() - interval '20 days', now() - interval '20 days'),
  ('aaaaaaaa-6000-4000-a000-000000000011', 'aaaaaaaa-0002-4000-a000-000000000011', 1000, 'usd', 'demo_tr_011', 5, '2026-01', now() - interval '20 days', now() - interval '20 days'),
  ('aaaaaaaa-6000-4000-a000-000000000012', 'aaaaaaaa-0002-4000-a000-000000000012', 1200, 'usd', 'demo_tr_012', 6, '2026-01', now() - interval '20 days', now() - interval '20 days');


COMMIT;

-- ============================================================================
-- Done! Demo data seeded successfully.
-- To remove: run supabase/unseed-demo.sql
-- ============================================================================
