import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './use-auth';

export function useRequireAuth(redirectTo = '/login') {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate(redirectTo, { replace: true });
    }
  }, [user, loading, navigate, redirectTo]);

  return { user, loading };
}
