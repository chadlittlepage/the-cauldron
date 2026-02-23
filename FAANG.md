# hexwave.io — FAANG Pipeline

## Pipeline Flow

**Code** > **Lint & Type Check** > **Unit Tests** > **Build** > **E2E Tests** > **Preview Deploy** > **Production Deploy**

---

## Pipeline Stages

### 1. Code
- **Language:** TypeScript (strict mode, zero `any`)
- **Framework:** React 19 + Vite 7
- **Styling:** Tailwind CSS 4 + CVA components
- **State:** TanStack Query v5 (server), React state (local)
- **Routing:** React Router v7 + React.lazy code splitting
- **Validation:** Zod schemas at every boundary
- **Error Handling:** ErrorBoundary + LoadingBoundary on all routes

### 2. Lint & Type Check
- **TypeScript:** `tsc -b --noEmit` (build mode, catches all errors)
- **ESLint:** Strict rules, React hooks plugin, refresh plugin
- **Prettier:** Format check on all `src/**/*.{ts,tsx,css,json}`
- **Runs:** On every PR to `main`/`develop`, pushes to `develop`

### 3. Unit Tests
- **Tool:** Vitest + React Testing Library
- **Tests:** 28 passing (validators, app routes)
- **Coverage:** Uploaded as artifact on every CI run
- **Location:** `src/**/*.test.ts` / `src/**/*.test.tsx`

### 4. Build
- **Tool:** Vite 7 production build
- **Source maps:** Disabled in production
- **Output:** Minified/mangled JS bundle → `dist/`
- **Artifact:** Uploaded for E2E stage
- **Depends on:** Lint + Tests passing

### 5. E2E Tests
- **Tool:** Playwright (Chromium)
- **Specs:** 6 test files
  - `e2e/smoke.spec.ts` — basic page loads
  - `e2e/auth.spec.ts` — signup, login, logout
  - `e2e/submission.spec.ts` — artist track submission
  - `e2e/voting.spec.ts` — community voting
  - `e2e/curator-review.spec.ts` — curator review flow
  - `e2e/admin.spec.ts` — admin panel
- **Reports:** Uploaded as artifact
- **Depends on:** Build passing

### 6. Preview Deploy
- **Trigger:** Push to `main`
- **Tool:** Vercel via GitHub Actions (`cd.yml`)
- **Environment:** Preview URL for QA

### 7. Production Deploy
- **Trigger:** Git tag `v*` (e.g., `v1.0.0`)
- **Tool:** Vercel `--prod` via GitHub Actions
- **URL:** https://hexwave.vercel.app

---

## Infrastructure

### Source Control
| Item | Value |
|------|-------|
| Repository | `github.com/chadlittlepage/hexwave` |
| Branch Strategy | `main` (prod), `develop` (integration), `feature/*`, `fix/*` |
| CI Workflow | `.github/workflows/ci.yml` |
| CD Workflow | `.github/workflows/cd.yml` |

### Hosting & CDN
| Item | Value |
|------|-------|
| Platform | Vercel |
| URL | https://hexwave.vercel.app |
| SPA Routing | `vercel.json` rewrites to `index.html` |
| Source Maps | Disabled in production |

### Backend — Supabase
| Item | Value |
|------|-------|
| Project ID | `jitgzcumsjaxemjbjhit` |
| Database | Postgres (12 migrations) |
| Auth | Email/password with email confirmation |
| RLS | Enabled on all tables with role-based policies |
| Admin Policies | Separate admin-level access controls |

**Database Migrations (12):**
1. `00001_create_enums.sql` — user roles, submission statuses, platforms
2. `00002_create_profiles.sql` — user profiles with role
3. `00003_create_submissions.sql` — track submissions
4. `00004_create_votes.sql` — unique votes per user per track
5. `00005_create_reviews.sql` — curator reviews (1 per curator per track)
6. `00006_create_charts.sql` — monthly/yearly chart entries
7. `00007_create_payments.sql` — Stripe payment records
8. `00008_create_curator_payouts.sql` — curator payout tracking
9. `00009_rls_policies.sql` — row-level security on all tables
10. `00010_admin_policies.sql` — admin-specific policies
11. `00011_functions.sql` — helper database functions
12. `00012_chart_generation_function.sql` — chart ranking logic

### Edge Functions (Server-Side)
| Function | Purpose |
|----------|---------|
| `create-checkout` | Creates Stripe Checkout session ($2 per submission) |
| `stripe-webhook` | Verifies Stripe signature, updates payment status in DB |
| `create-payout` | Processes curator payouts via Stripe |
| `generate-charts` | Generates monthly/yearly charts from vote counts |

### Payments — Stripe
| Item | Value |
|------|-------|
| Client | Publishable key only (safe in bundle) |
| Server | Secret key in Edge Functions only |
| Flow | Submit > Edge Function > Stripe Checkout > Webhook > DB update |
| Webhook | Signature verification on every event |

---

## Security Hardening

### HTTP Security Headers (`vercel.json`)
| Header | Value |
|--------|-------|
| Content-Security-Policy | Strict CSP allowing only self, Stripe, Supabase, Spotify, SoundCloud, Bandcamp, Cloudflare |
| Strict-Transport-Security | `max-age=63072000; includeSubDomains; preload` |
| X-Frame-Options | `DENY` |
| X-Content-Type-Options | `nosniff` |
| X-XSS-Protection | `1; mode=block` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` |

### Application Security
| Protection | Implementation |
|-----------|---------------|
| No secrets in client | Stripe secret key + Supabase service_role only in Edge Functions |
| RLS on every table | Postgres row-level security enforced at database level |
| Zod double validation | Client-side forms + Edge Functions both validate |
| Unique constraints | One vote per user per track, one review per curator per track (DB enforced) |
| Source maps off | `build.sourcemap: false` in production Vite config |
| Auth token validation | Supabase Auth handles session management + CSRF |
| Input sanitization | React auto-escapes JSX; Edge Functions sanitize before DB insert |

---

## AI Agents (`.claude/agents/`)

| Agent | File | Purpose |
|-------|------|---------|
| Code Reviewer | `code-reviewer.md` | TypeScript strict compliance, React best practices, RLS verification, security review |
| Security Analyst | `security-analyst.md` | Attack surface analysis, RLS audit, secrets detection, Stripe webhook verification |
| Test Generator | `test-generator.md` | Unit + E2E test generation, coverage requirements, critical path testing |

---

## Frontend Architecture

### Pages (27 routes, code-split with React.lazy)
**Eager loaded:** Home, Login, Signup, NotFound
**Lazy loaded:** Browse, Charts, Curators, CuratorProfile, TrackDetail, About, BecomeCurator, Privacy, Terms, AuthCallback, ArtistDashboard, SubmitTrack, MySubmissions, SubmissionDetail, ProfileSettings, CuratorDashboard, ReviewQueue, WriteReview, MyReviews, CuratorStats, Checkout, PaymentSuccess, PaymentCancel, AdminDashboard, ManageSubmissions, ManageCurators, ManagePayouts, Analytics

### Component Library (CVA pattern)
**UI:** Button, Input, Label, Card, Badge, Avatar, Skeleton, Dialog, DropdownMenu, Select, Textarea, Tabs, Table, Pagination, Spinner, EmptyState, StarRating, Toast, Alert, FormField
**Layout:** Header, Footer, MainLayout, ProtectedRoute, RoleRoute, LoadingBoundary
**Feature:** TrackCard, TrackEmbed, VoteButton, GenreFilter, ReviewCard, ReviewForm, ChartTable, PeriodSelector, StatCard, SubmissionList, StatsGrid, DataTable

### User Roles
| Role | Capabilities |
|------|-------------|
| Artist | Submit tracks ($2), view dashboard, see review feedback |
| Curator | Review queue, rate tracks 1-5, write feedback, receive payouts (1000+ listeners required) |
| Admin | Manage curators, view all submissions, analytics, process payouts |

---

## Build Commands

```bash
npm run dev          # Start dev server (localhost:5173)
npm run build        # Type check + production build
npm run lint         # ESLint
npm run format       # Prettier format
npm run typecheck    # TypeScript type checking
npm run test         # Unit tests (watch mode)
npm run test:ci      # Unit tests with coverage
npm run test:e2e     # Playwright E2E tests
npm run check        # Full pre-commit (typecheck + lint + format + test)
```

---

## Remaining Setup

| Item | Action Needed |
|------|--------------|
| Stripe Keys | Add `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` to Supabase Edge Function env vars |
| GitHub Secrets | Add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` for CD auto-deploy |
| Supabase Redirect | Add `https://hexwave.vercel.app/**` to Auth > URL Configuration |
| Custom Domain | Configure `hexwave.io` in Vercel when ready |
| CAPTCHA | Add Cloudflare Turnstile to submission form |
| Custom SMTP | Configure custom email sender (from "HexWave" instead of "Supabase") |
