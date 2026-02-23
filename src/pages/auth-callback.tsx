import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Spinner } from '@/components/ui/spinner';

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function handleCallback() {
      const errorParam = searchParams.get('error_description') || searchParams.get('error');
      if (errorParam) {
        if (!cancelled) setError(errorParam);
        return;
      }

      // PKCE flow
      const code = searchParams.get('code');
      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (cancelled) return;
        if (exchangeError) { setError(exchangeError.message); return; }
        navigate('/dashboard', { replace: true });
        return;
      }

      // Implicit flow: tokens in hash fragment
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken && refreshToken) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (cancelled) return;
          if (sessionError) { setError(sessionError.message); return; }
          navigate('/dashboard', { replace: true });
          return;
        }
      }

      // Check existing session
      const { data: { session } } = await supabase.auth.getSession();
      if (cancelled) return;
      if (session) {
        navigate('/dashboard', { replace: true });
        return;
      }

      // Wait for auth state change
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          subscription.unsubscribe();
          navigate('/dashboard', { replace: true });
        }
      });

      setTimeout(() => {
        subscription.unsubscribe();
        if (!cancelled) setError('Confirmation timed out. Please try logging in.');
      }, 10000);
    }

    handleCallback();
    return () => { cancelled = true; };
  }, [navigate, searchParams]);

  if (error) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <p className="text-error text-sm">{error}</p>
        <button
          type="button"
          onClick={() => navigate('/login', { replace: true })}
          className="text-accent-purple hover:underline text-sm"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <Spinner size="lg" />
      <p className="text-hex-muted">Confirming your account...</p>
    </div>
  );
}
