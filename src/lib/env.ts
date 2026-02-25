function requireEnv(key: string): string {
  const value = import.meta.env[key];
  if (!value || value === 'placeholder') {
    throw new Error(`Missing required environment variable: ${key}. Check your .env file.`);
  }
  return value;
}

function optionalEnv(key: string, fallback = ''): string {
  return import.meta.env[key] || fallback;
}

export const env = {
  SUPABASE_URL: requireEnv('VITE_SUPABASE_URL'),
  SUPABASE_ANON_KEY: requireEnv('VITE_SUPABASE_ANON_KEY'),
  STRIPE_PUBLISHABLE_KEY: optionalEnv('VITE_STRIPE_PUBLISHABLE_KEY'),
  SENTRY_DSN: optionalEnv('VITE_SENTRY_DSN'),
  APP_URL: optionalEnv('VITE_APP_URL', 'http://localhost:5173'),
  MODE: import.meta.env.MODE,
  PROD: import.meta.env.PROD,
  DEV: import.meta.env.DEV,
} as const;
