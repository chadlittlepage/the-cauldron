import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Spinner } from '@/components/ui/spinner';

export function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase puts tokens in the URL hash after email confirmation.
    // getSession() will automatically exchange them for a session.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard', { replace: true });
        return;
      }

      // If no session yet, listen for the auth state change
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_IN') {
          navigate('/dashboard', { replace: true });
        }
      });

      // Timeout fallback — redirect to login if nothing happens in 10s
      const timeout = setTimeout(() => {
        subscription.unsubscribe();
        navigate('/login', { replace: true });
      }, 10000);

      return () => {
        clearTimeout(timeout);
        subscription.unsubscribe();
      };
    });
  }, [navigate]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <Spinner size="lg" />
      <p className="text-hex-muted">Confirming your account...</p>
    </div>
  );
}
