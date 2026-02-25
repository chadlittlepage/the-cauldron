# hexwave.io

A music curation platform where artists submit tracks for $2, the community votes, and curators with 1000+ listeners review and get paid. Monthly and yearly charts rank the best tracks.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + TypeScript + Vite 7 |
| Backend | Supabase (Postgres, Auth, RLS, Edge Functions) |
| Payments | Stripe Checkout |
| Styling | Tailwind CSS 4 + CVA components |
| State | TanStack Query (with localStorage persistence) |
| Validation | Zod |
| Testing | Vitest + Playwright |
| Monitoring | Sentry (errors, session replay, performance, Web Vitals) |
| CI/CD | GitHub Actions → Vercel |

## Quick Start

```bash
npm install
cp .env.example .env  # Fill in your Supabase + Stripe keys
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run check` | Full check (types + lint + format + tests) |
| `npm run test` | Unit tests (watch) |
| `npm run test:e2e` | E2E tests |
| `npm run gen:types` | Regenerate Supabase DB types |

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │ React 19   │  │ TanStack     │  │ Sentry               │ │
│  │ + Router   │──│ Query Cache  │  │ (errors, replay,     │ │
│  │ + Tailwind │  │ + localStorage│  │  perf, Web Vitals)   │ │
│  └─────┬──────┘  └──────┬───────┘  └──────────────────────┘ │
└────────┼────────────────┼───────────────────────────────────┘
         │                │
         ▼                ▼
┌────────────────────────────────────────────┐
│              Supabase                       │
│  ┌──────┐  ┌─────────┐  ┌───────────────┐ │
│  │ Auth │  │ Postgres │  │ Edge Functions │ │
│  │      │  │ + RLS    │  │ (Stripe, etc.) │ │
│  └──────┘  └─────────┘  └───────┬───────┘ │
│  ┌──────────────┐                │         │
│  │ Storage      │                │         │
│  │ (avatars)    │                │         │
│  └──────────────┘                │         │
└──────────────────────────────────┼─────────┘
                                   │
                                   ▼
                          ┌────────────────┐
                          │ Stripe API     │
                          │ (payments)     │
                          └────────────────┘
```

### Key Principles

- **Supabase RLS** is the real security layer — client-side role checks are UX only
- **TanStack Query** is the single source of server state (persisted to localStorage across page reloads)
- **Zod** validates at every boundary (client forms + Edge Functions)
- **Edge Functions** handle all secrets (Stripe secret key, service_role key)
- Source maps uploaded to Sentry, then deleted from production dist

### Edge Functions

| Function | Purpose |
|----------|---------|
| `create-checkout` | Creates Stripe Checkout session for $2 submission fee |
| `stripe-webhook` | Handles Stripe payment events, updates submission status |
| `create-payout` | Admin-only: records curator payout for a billing period |
| `generate-charts` | Generates monthly/yearly charts from vote data |

## Project Structure

```
src/
├── components/         # UI components (ui/, layout/, track/, review/, chart/, admin/)
├── hooks/              # Custom hooks (auth, data queries, toast, swipe)
├── lib/                # Supabase client, utils, validators, Stripe, image upload
├── pages/              # Route-level pages (dashboard/, admin/, payment/, settings/)
├── types/              # TypeScript types (database.ts)
├── test/               # Test setup
├── App.tsx             # Routes (lazy-loaded except home/login/signup)
└── main.tsx            # Entry point + providers + Sentry init
supabase/
├── migrations/         # SQL migrations (00001–00019)
└── functions/          # Edge Functions (Deno runtime)
e2e/                    # Playwright E2E tests
```

## Deployment

### Prerequisites

- Node.js 20+
- Supabase project with Auth, Postgres, Storage, and Edge Functions
- Stripe account with webhook endpoint
- Vercel account (or any static hosting)
- Sentry project for error tracking

### Environment Variables

```bash
# Required
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# Required for payments
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Required for error tracking
VITE_SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=sntrys_...    # For source map uploads in CI

# Optional
VITE_APP_VERSION=1.0.0          # Cache buster for query persistence
VITE_APP_URL=https://hexwave.io # Used in Edge Function CORS
```

### Deploy to Vercel

1. Connect your GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Vercel auto-deploys on push to `main`

Vercel config (`vercel.json`) handles:
- SPA rewrites (`/index.html` fallback)
- Security headers (CSP, HSTS, X-Frame-Options)
- Asset caching (`Cache-Control: immutable` on `/assets/*`)

### Deploy Supabase Migrations

Run each migration file in the Supabase SQL Editor, in order:

```bash
# Or use the Supabase CLI:
npx supabase db push
```

### Deploy Edge Functions

```bash
npx supabase functions deploy create-checkout
npx supabase functions deploy stripe-webhook
npx supabase functions deploy create-payout
npx supabase functions deploy generate-charts
```

Set Edge Function secrets:
```bash
npx supabase secrets set STRIPE_SECRET_KEY=sk_live_...
npx supabase secrets set APP_URL=https://hexwave.io
```

### Regenerate Database Types

When the schema changes, regenerate TypeScript types:

```bash
npm run gen:types
```

This outputs `src/types/database.generated.ts` from the live Supabase schema.

## User Roles

| Role | Capabilities |
|------|-------------|
| **Artist** | Submit tracks ($2), view dashboard, see review feedback |
| **Curator** | Review submission queue, rate tracks, receive payouts (requires 1000+ listeners) |
| **Admin** | Manage curators, view all submissions, analytics, payouts, debug console |

## Security

- Row Level Security (RLS) on all database tables
- Edge Functions enforce CORS via `APP_URL` env var
- Strict CSP headers via Vercel (allowlists Stripe, Spotify, Supabase, Sentry)
- Rate limiting on Edge Functions (checkout: 5/min, payouts: 10/min)
- Client-side vote cooldown and double-submit prevention
- Source maps never shipped to production

## License

Private — all rights reserved.
