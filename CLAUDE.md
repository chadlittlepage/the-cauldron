# The Witches' Cauldron — Music Curation Platform

## Build Commands
- `npm run dev` — Start dev server (http://localhost:5173)
- `npm run build` — Type check + production build
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
- **Styling**: Tailwind CSS 4 + shadcn/ui + custom dark theme
- **State**: TanStack Query (server state), React state (local UI)
- **Routing**: React Router v7
- **Testing**: Vitest (unit) + Playwright (E2E)
- **CI/CD**: GitHub Actions → Vercel
- **Primary Color**: #4a556c

## Project Structure
```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── lib/            # Supabase client, utils, Stripe setup
├── pages/          # Route-level page components
├── types/          # TypeScript types (database.ts = Supabase schema)
├── styles/         # Additional styles
├── test/           # Test setup and utilities
├── App.tsx         # Root component + routes
└── main.tsx        # Entry point + providers
supabase/
├── migrations/     # SQL migration files
e2e/                # Playwright E2E tests
```

## User Roles
- **artist**: Submits tracks ($2), views dashboard, sees review feedback
- **curator**: Reviews submission queue, rates tracks, receives payouts (requires 1000+ listeners)
- **admin**: Manages curators, views all submissions, analytics, payouts

## Code Standards
- TypeScript strict mode — no `any` types
- All Supabase queries through TanStack Query hooks
- Zod validation on all user inputs
- RLS policies enforce role-based access at the database level
- Stripe secret key NEVER in client code — Edge Functions only
- Components use Tailwind utility classes (no inline styles)
- Path alias: `@/` maps to `src/`

## Branch Strategy
- `main` — Production (auto-deploys to Vercel)
- `develop` — Integration branch
- `feature/*` — Feature branches (PR to develop)
- `fix/*` — Bug fix branches
