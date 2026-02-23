# hexwave.io

A music curation platform where artists submit tracks for $2, the community votes, and curators with 1000+ listeners review and get paid. Monthly and yearly charts rank the best tracks.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + TypeScript + Vite 7 |
| Backend | Supabase (Postgres, Auth, RLS, Edge Functions) |
| Payments | Stripe Checkout |
| Styling | Tailwind CSS 4 + CVA components |
| State | TanStack Query |
| Validation | Zod |
| Testing | Vitest + Playwright |
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

## Architecture

- **Supabase RLS** is the real security layer — client-side role checks are UX only
- **TanStack Query** is the single source of server state
- **Zod** validates at every boundary (client forms + Edge Functions)
- **Edge Functions** handle all secrets (Stripe, service_role key)
- Source maps are disabled in production builds
