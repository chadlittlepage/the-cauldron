# hexwave.io — Music Curation Platform

## Build Commands
- `npm run dev` — Start dev server (http://localhost:5173)
- `npm run build` — Type check + production build (uploads source maps to Sentry)
- `npm run lint` — Run ESLint
- `npm run format` — Format code with Prettier
- `npm run typecheck` — TypeScript type checking
- `npm run test` — Run unit tests (watch mode)
- `npm run test:ci` — Run unit tests with coverage
- `npm run test:e2e` — Run Playwright E2E tests
- `npm run check` — Full pre-commit check (typecheck + lint + format + test)

## Architecture
- **Frontend**: React 19 + TypeScript + Vite 7
- **Backend**: Supabase (Postgres, Auth, RLS, Edge Functions, Storage)
- **Payments**: Stripe (client: publishable key only, server: Edge Functions)
- **Error Tracking**: Sentry (error capture, session replay, performance tracing)
- **Styling**: Tailwind CSS 4 + CVA components + custom dark theme
- **State**: TanStack Query (server state), React state (local UI)
- **Routing**: React Router v7 (with location.state for track navigation context)
- **Validation**: Zod schemas at every boundary
- **Testing**: Vitest (unit) + Playwright (E2E)
- **CI/CD**: GitHub Actions → Vercel
- **Primary Color**: #4a556c

## Project Structure
```
src/
├── components/
│   ├── ui/         # Reusable UI components (button, input, card, etc.)
│   ├── layout/     # Layout components (header, footer, main-layout)
│   ├── track/      # Track-related components (track-card, track-embed, vote-button)
│   ├── review/     # Review-related components
│   ├── chart/      # Chart-related components (chart-table)
│   ├── dashboard/  # Dashboard-related components
│   └── admin/      # Admin-related components
├── hooks/          # Custom React hooks (auth, data, toast, swipe)
├── lib/            # Supabase client, utils, validators, Stripe setup
├── pages/          # Route-level page components
│   ├── dashboard/  # Artist/curator dashboard pages
│   ├── admin/      # Admin panel pages
│   ├── payment/    # Payment flow pages
│   └── settings/   # User settings pages
├── types/          # TypeScript types (database.ts = Supabase schema)
├── test/           # Test setup and utilities
├── App.tsx         # Root component + routes (lazy-loaded except home/login/signup)
└── main.tsx        # Entry point + providers + Sentry init
supabase/
├── migrations/     # SQL migration files (00001–00015 + seed)
├── functions/      # Supabase Edge Functions (create-checkout, stripe-webhook, create-payout, generate-charts)
e2e/                # Playwright E2E tests
```

## User Roles
- **artist**: Submits tracks, views dashboard, sees review feedback
- **curator**: Reviews submission queue, rates tracks, receives payouts (requires 1000+ listeners)
- **admin**: Manages curators, views all submissions, analytics, payouts

## Code Standards
- TypeScript strict mode — no `any` types
- All Supabase queries through TanStack Query hooks
- Zod validation on all user inputs (client + Edge Functions)
- RLS policies enforce role-based access at the database level
- Stripe secret key NEVER in client code — Edge Functions only
- Components use CVA pattern with Tailwind utility classes
- Path alias: `@/` maps to `src/`
- Source maps uploaded to Sentry on production builds, deleted from dist

## Security & Rate Limiting
- **CORS**: Edge Functions use `APP_URL` env var (not wildcard `*`)
- **CSP**: Strict Content-Security-Policy via Vercel headers (allowlists Stripe, Spotify, Supabase, Sentry)
- **Vote cooldown**: 1-second client-side cooldown prevents vote spam
- **Submission guard**: Ref-based double-submit prevention on track submissions and reviews
- **RLS**: All database tables have Row Level Security policies enabled
- **Auth**: Protected routes via ProtectedRoute/RoleRoute components + Supabase auth
- **Mobile**: Pinch-to-zoom disabled (viewport meta + JS gesture prevention)

## Track Navigation
- Browse and Charts pages pass track ID lists via `location.state` to track detail
- Track detail supports prev/next buttons, keyboard arrows, and mobile swipe gestures
- `useSwipe` hook handles touch events with 50px threshold and direction locking
- Navigation state preserved when moving between tracks
- Direct URL access (`/track/:id`) gracefully hides nav when no list context exists

## Environment Variables
```
VITE_SUPABASE_URL          # Supabase project URL
VITE_SUPABASE_ANON_KEY     # Supabase anon/publishable key
VITE_STRIPE_PUBLISHABLE_KEY # Stripe publishable key (never secret key)
VITE_SENTRY_DSN            # Sentry DSN for error tracking
SENTRY_AUTH_TOKEN           # Sentry auth token for source map uploads (CI + local)
```

## External Services
- **Sentry**: Org `cell-division`, Project `hexwave` — error tracking + session replay + performance
- **Supabase**: Auth, Postgres, RLS, Edge Functions, Storage
- **Stripe**: Payment processing via Edge Functions (currently unused, kept for future use)
- **Vercel**: Hosting, CDN, security headers, SPA rewrites

## Branch Strategy
- `main` — Production (auto-deploys to Vercel)
- `develop` — Integration branch
- `feature/*` — Feature branches (PR to develop)
- `fix/*` — Bug fix branches
