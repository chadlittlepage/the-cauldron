-- Fix overly permissive INSERT policy on admin_audit_logs.
-- Previously WITH CHECK (true) allowed any authenticated user to insert.
-- Now restricted to admins only.

DROP POLICY "Admins can insert audit logs" ON admin_audit_logs;

CREATE POLICY "Admins can insert audit logs"
  ON admin_audit_logs FOR INSERT
  WITH CHECK (is_admin());
