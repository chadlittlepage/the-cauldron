import { createContext, useContext, useEffect, useState, useCallback, createElement } from 'react';
import type { ReactNode } from 'react';
import type { AuthResponse, Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Tables } from '@/types/database';

function getAuthTokenKey(): string | undefined {
  return Object.keys(localStorage).find((k) => k.startsWith('sb-') && k.endsWith('-auth-token'));
}

function removeAuthToken() {
  try {
    const key = getAuthTokenKey();
    if (key) localStorage.removeItem(key);
  } catch {
    /* ignore localStorage errors */
  }
}

/**
 * Read the Supabase session from localStorage synchronously so the very first
 * render already knows whether the user is logged in.  This eliminates the
 * flash where auth buttons briefly show "Sign In" before switching to the
 * logged-in layout.
 */
function getStoredSession(): { user: User; session: Session } | null {
  try {
    const key = getAuthTokenKey();
    if (!key) return null;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const stored = JSON.parse(raw) as Record<string, unknown>;
    if (stored?.access_token && stored?.user) {
      return { user: stored.user as User, session: stored as unknown as Session };
    }
    return null;
  } catch {
    return null;
  }
}

const storedSession = getStoredSession();

interface AuthState {
  user: User | null;
  profile: Tables<'profiles'> | null;
  session: Session | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    metadata: { display_name: string; role: string },
  ) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: storedSession?.user ?? null,
    profile: null,
    session: storedSession?.session ?? null,
    loading: true,
  });

  const fetchProfile = useCallback(async (userId: string): Promise<Tables<'profiles'>> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
      .returns<Tables<'profiles'>>();
    if (error) throw error;
    return data;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!state.user) return;
    const profile = await fetchProfile(state.user.id);
    setState((prev) => ({ ...prev, profile }));
  }, [state.user, fetchProfile]);

  useEffect(() => {
    const clearState = () => setState({ user: null, profile: null, session: null, loading: false });

    supabase.auth
      .getSession()
      .then(async ({ data: { session }, error }) => {
        if (error || !session?.user) {
          clearState();
          return;
        }
        const profile = await fetchProfile(session.user.id);
        if (!profile) {
          await supabase.auth.signOut({ scope: 'local' }).catch(() => {});
          clearState();
          return;
        }
        setState({ user: session.user, profile, session, loading: false });
      })
      .catch(() => {
        // LockManager timeout or other unhandled auth error — clear stale state
        removeAuthToken();
        clearState();
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'INITIAL_SESSION') return;

      if (session?.user) {
        try {
          const profile = await fetchProfile(session.user.id);
          setState({ user: session.user, profile, session, loading: false });
        } catch {
          clearState();
        }
      } else {
        clearState();
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, metadata: { display_name: string; role: string }) => {
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (response.error) throw response.error;
      return response;
    },
    [],
  );

  const signOut = useCallback(async () => {
    // Clear state immediately so the UI updates even if the SDK call is slow
    // or fails to fire onAuthStateChange (Safari bug).
    setState({ user: null, profile: null, session: null, loading: false });

    // Remove the Supabase auth token from localStorage directly as a safety net.
    removeAuthToken();

    // Tell the SDK to clean up. scope: 'local' avoids a network call.
    await supabase.auth.signOut({ scope: 'local' }).catch(() => {});
  }, []);

  return createElement(
    AuthContext.Provider,
    { value: { ...state, signIn, signUp, signOut, refreshProfile } },
    children,
  );
}
