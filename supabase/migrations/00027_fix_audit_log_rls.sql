-- Fix audit log insert policy: restrict to admins only (was WITH CHECK (true))
DROP POLICY "Admins can insert audit logs" ON admin_audit_logs;

CREATE POLICY "Admins can insert audit logs"
  ON admin_audit_logs FOR INSERT
  WITH CHECK (is_admin());
