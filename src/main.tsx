import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
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
      Sentry.replayIntegration({ maskAllText: false, blockAllMedia: false }),
    ],
    tracesSampleRate: env.PROD ? 0.2 : 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    enabled: env.PROD,
  });

  // Report Web Vitals to Sentry
  import('./lib/web-vitals.ts').then(({ reportWebVitals }) => reportWebVitals());
}

// Prevent double-tap zoom on iOS (preserves pinch-to-zoom for WCAG 1.4.4 compliance)
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
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
      gcTime: 1000 * 60 * 5, // match staleTime for persistence
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
