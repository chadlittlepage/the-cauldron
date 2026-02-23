import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Spinner } from '@/components/ui/spinner';

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleCallback() {
      // Check for error in query params (e.g., expired link)
      const errorParam = searchParams.get('error_description') || searchParams.get('error');
      if (errorParam) {
        setError(errorParam);
        return;
      }

      // Supabase may pass tokens via hash fragment or query params.
      // For PKCE flow (default in newer Supabase), there's a `code` param.
      const code = searchParams.get('code');

      if (code) {
        // Exchange the code for a session
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) {
          setError(exchangeError.message);
          return;
        }
        navigate('/dashboard', { replace: true });
        return;
      }

      // Fallback: check if the hash fragment has tokens (implicit flow)
      // supabase-js auto-detects hash tokens on init, so just check session
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard', { replace: true });
        return;
      }

      // Last resort: listen for auth state change briefly
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_IN') {
          subscription.unsubscribe();
          navigate('/dashboard', { replace: true });
        }
      });

      // Timeout — if nothing happens in 5 seconds, show error
      setTimeout(() => {
        subscription.unsubscribe();
        setError('Confirmation timed out. Please try logging in.');
      }, 5000);
    }

    handleCallback();
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
