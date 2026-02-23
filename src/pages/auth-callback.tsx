import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Spinner } from '@/components/ui/spinner';

export function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        navigate('/dashboard', { replace: true });
      }
    });
  }, [navigate]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <Spinner size="lg" />
      <p className="text-hex-muted">Confirming your account...</p>
    </div>
  );
}
