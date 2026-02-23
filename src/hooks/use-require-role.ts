import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './use-auth';
import type { UserRole } from '@/types/database';

export function useRequireRole(role: UserRole, redirectTo = '/') {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login', { replace: true });
      } else if (profile && profile.role !== role && profile.role !== 'admin') {
        navigate(redirectTo, { replace: true });
      }
    }
  }, [user, profile, loading, role, navigate, redirectTo]);

  return { user, profile, loading };
}
