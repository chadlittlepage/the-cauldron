import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { env } from '@/lib/env';

export const supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    lock: async <R>(name: string, acquireTimeout: number, fn: () => Promise<R>): Promise<R> => {
      if (navigator.locks) {
        try {
          return await navigator.locks.request(
            name,
            { signal: AbortSignal.timeout(acquireTimeout) },
            async () => fn(),
          );
        } catch {
          // Lock acquisition timed out — fall through to execute without lock
          return fn();
        }
      }
      // Fallback for environments without Web Locks API
      return fn();
    },
  },
});
