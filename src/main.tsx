import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, onlineManager } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import * as Sentry from '@sentry/react';
import { AuthProvider } from './hooks/use-auth.ts';
import { Toaster } from './components/ui/toaster.tsx';
import { env } from './lib/env.ts';
import './index.css';
import App from './App.tsx';

const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? '0.1.0';

// Initialize Sentry before anything else
if (env.SENTRY_DSN) {
  Sentry.init({
    dsn: env.SENTRY_DSN,
    environment: env.MODE,
    release: `hexwave@${APP_VERSION}`,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({ maskAllText: false, blockAllMedia: false, maskAllInputs: true }),
    ],
    tracesSampleRate: env.PROD ? 0.2 : 1.0,
    replaysSessionSampleRate: 0.2,
    replaysOnErrorSampleRate: 1.0,
    enabled: env.PROD,
  });

  // Report Web Vitals to Sentry
  import('./lib/web-vitals.ts').then(({ reportWebVitals }) => reportWebVitals());
}

// Sync TanStack Query online state with browser — pauses mutations when offline
onlineManager.setEventListener((setOnline) => {
  const onOnline = () => setOnline(true);
  const onOffline = () => setOnline(false);
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
});

// Prevent double-tap zoom on iOS while preserving pinch-to-zoom (WCAG 1.4.4)
document.addEventListener(
  'touchend',
  (e) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    const lastTap = (document as unknown as Record<string, number>).__lastTap ?? 0;
    if (now - lastTap < DOUBLE_TAP_DELAY) {
      e.preventDefault();
    }
    (document as unknown as Record<string, number>).__lastTap = now;
  },
  { passive: false },
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min default — overridden per-query for votes/profiles
      retry: 2,
      refetchOnWindowFocus: false,
      gcTime: 1000 * 60 * 10, // 10 min — keep cache longer than staleTime for fast re-mounts
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 5, // 5 minutes — never serve data older than staleTime
        buster: APP_VERSION,
      }}
    >
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </PersistQueryClientProvider>
  </StrictMode>,
);
