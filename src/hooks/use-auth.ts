import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  createElement,
} from 'react';
import type { ReactNode } from 'react';
import type { AuthResponse, Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Tables } from '@/types/database';

/**
 * Read the Supabase session from localStorage synchronously so the very first
 * render already knows whether the user is logged in.  This eliminates the
 * flash where auth buttons briefly show "Sign In" before switching to the
 * logged-in layout.
 */
function getStoredSession(): { user: User; session: Session } | null {
  try {
    const key = Object.keys(localStorage).find(
      (k) => k.startsWith('sb-') && k.endsWith('-auth-token'),
    );
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

  const fetchProfile = useCallback(async (userId: string) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    return data;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!state.user) return;
    const profile = await fetchProfile(state.user.id);
    setState((prev) => ({ ...prev, profile }));
  }, [state.user, fetchProfile]);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setState({ user: session.user, profile, session, loading: false });
      } else {
        setState({ user: null, profile: null, session: null, loading: false });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Skip INITIAL_SESSION — getSession() above handles the first load.
      // This event fires before getSession resolves with session=null,
      // which would briefly flash the logged-out UI.
      if (event === 'INITIAL_SESSION') return;

      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setState({ user: session.user, profile, session, loading: false });
      } else {
        setState({ user: null, profile: null, session: null, loading: false });
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
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  return createElement(
    AuthContext.Provider,
    { value: { ...state, signIn, signUp, signOut, refreshProfile } },
    children,
  );
}
