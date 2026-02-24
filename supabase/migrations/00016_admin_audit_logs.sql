-- Admin Audit Logs: enum, table, indexes, RLS, trigger function, triggers

-- 1. Enum for audit actions
CREATE TYPE audit_action AS ENUM (
  'submission_status_change',
  'curator_role_change',
  'payout_created',
  'profile_updated',
  'submission_deleted',
  'manual_action'
);

-- 2. Audit log table
CREATE TABLE admin_audit_logs (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id   uuid NOT NULL REFERENCES profiles(id),
  action     audit_action NOT NULL,
  target_type text NOT NULL,
  target_id  text NOT NULL,
  metadata   jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 3. Indexes
CREATE INDEX idx_audit_logs_created_at ON admin_audit_logs (created_at DESC);
CREATE INDEX idx_audit_logs_admin_id ON admin_audit_logs (admin_id);
CREATE INDEX idx_audit_logs_target ON admin_audit_logs (target_type, target_id);

-- 4. RLS
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read audit logs"
  ON admin_audit_logs FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can insert audit logs"
  ON admin_audit_logs FOR INSERT
  WITH CHECK (is_admin());

-- 5. Trigger function: auto-log admin changes
CREATE OR REPLACE FUNCTION log_admin_action()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_admin_id uuid;
  v_is_admin boolean;
BEGIN
  -- Get current user id from auth context
  v_admin_id := auth.uid();
  IF v_admin_id IS NULL THEN
    RETURN COALESCE(NEW, OLD);
  END IF;

  -- Check if current user is admin
  SELECT (role = 'admin') INTO v_is_admin
  FROM profiles
  WHERE id = v_admin_id;

  IF NOT COALESCE(v_is_admin, false) THEN
    RETURN COALESCE(NEW, OLD);
  END IF;

  -- Submission status change
  IF TG_TABLE_NAME = 'submissions' AND TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO admin_audit_logs (admin_id, action, target_type, target_id, metadata)
    VALUES (
      v_admin_id,
      'submission_status_change',
      'submission',
      NEW.id::text,
      jsonb_build_object('old_status', OLD.status::text, 'new_status', NEW.status::text)
    );
  END IF;

  -- Submission deletion
  IF TG_TABLE_NAME = 'submissions' AND TG_OP = 'DELETE' THEN
    INSERT INTO admin_audit_logs (admin_id, action, target_type, target_id, metadata)
    VALUES (
      v_admin_id,
      'submission_deleted',
      'submission',
      OLD.id::text,
      jsonb_build_object('track_title', OLD.track_title)
    );
    RETURN OLD;
  END IF;

  -- Profile role change
  IF TG_TABLE_NAME = 'profiles' AND TG_OP = 'UPDATE' AND OLD.role IS DISTINCT FROM NEW.role THEN
    INSERT INTO admin_audit_logs (admin_id, action, target_type, target_id, metadata)
    VALUES (
      v_admin_id,
      'curator_role_change',
      'profile',
      NEW.id::text,
      jsonb_build_object('old_role', OLD.role::text, 'new_role', NEW.role::text)
    );
  END IF;

  RETURN NEW;
END;
$$;

-- 6. Triggers
CREATE TRIGGER trg_audit_submission_update
  AFTER UPDATE ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION log_admin_action();

CREATE TRIGGER trg_audit_submission_delete
  AFTER DELETE ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION log_admin_action();

CREATE TRIGGER trg_audit_profile_update
  AFTER UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION log_admin_action();
