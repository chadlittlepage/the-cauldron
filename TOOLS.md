# hexwave.io — Tools & Services

## Source Control
| Tool | URL |
|------|-----|
| GitHub Repo | https://github.com/chadlittlepage/hexwave |
| GitHub Actions (CI) | https://github.com/chadlittlepage/hexwave/actions |
| GitHub Settings | https://github.com/chadlittlepage/hexwave/settings |
| GitHub Secrets | https://github.com/chadlittlepage/hexwave/settings/secrets/actions |

## Hosting
| Tool | URL |
|------|-----|
| Live Site (Custom Domain) | https://hexwave.io |
| Live Site (Vercel) | https://hexwave.vercel.app |
| Vercel Dashboard | https://vercel.com/chad-littlepages-projects/hexwave |
| Vercel Deployments | https://vercel.com/chad-littlepages-projects/hexwave/deployments |
| Vercel Domains | https://vercel.com/chad-littlepages-projects/hexwave/settings/domains |
| Vercel Settings | https://vercel.com/chad-littlepages-projects/hexwave/settings |
| Vercel Environment Variables | https://vercel.com/chad-littlepages-projects/hexwave/settings/environment-variables |

## Backend
| Tool | URL |
|------|-----|
| Supabase Dashboard | https://supabase.com/dashboard/project/jitgzcumsjaxemjbjhit |
| Supabase Auth Users | https://supabase.com/dashboard/project/jitgzcumsjaxemjbjhit/auth/users |
| Supabase Auth Settings | https://supabase.com/dashboard/project/jitgzcumsjaxemjbjhit/auth/providers |
| Supabase Auth URL Config | https://supabase.com/dashboard/project/jitgzcumsjaxemjbjhit/auth/url-configuration |
| Supabase Auth Rate Limits | https://supabase.com/dashboard/project/jitgzcumsjaxemjbjhit/auth/rate-limits |
| Supabase Table Editor | https://supabase.com/dashboard/project/jitgzcumsjaxemjbjhit/editor |
| Supabase SQL Editor | https://supabase.com/dashboard/project/jitgzcumsjaxemjbjhit/sql |
| Supabase Edge Functions | https://supabase.com/dashboard/project/jitgzcumsjaxemjbjhit/functions |
| Supabase API Settings | https://supabase.com/dashboard/project/jitgzcumsjaxemjbjhit/settings/api |
| Supabase Storage | https://supabase.com/dashboard/project/jitgzcumsjaxemjbjhit/storage |

## Email (Resend)
| Tool | URL |
|------|-----|
| Resend Dashboard | https://resend.com/overview |
| Resend API Keys | https://resend.com/api-keys |
| Resend Domains | https://resend.com/domains |
| Resend Logs | https://resend.com/logs |
| SMTP Host | `smtp.resend.com` |
| SMTP Port | `465` |
| Sender Address | `noreply@hexwave.io` |
| Sender Name | `HexWave` |
| Domain | `hexwave.io` (verified) |

## Domain Registrar (IONOS)
| Tool | URL |
|------|-----|
| IONOS Dashboard | https://my.ionos.com |
| IONOS DNS Settings | https://my.ionos.com/domains/hexwave.io |
| Domain | `hexwave.io` |
| A Record | `@ → 216.198.79.1` (Vercel) |
| CNAME | `www → 04ef5040f141ae61.vercel-dns-017.com` (Vercel) |

## Error Tracking (Sentry)
| Tool | URL |
|------|-----|
| Sentry Dashboard | https://cell-division.sentry.io |
| Sentry Issues | https://cell-division.sentry.io/issues/?project=4510938330431488 |
| Sentry Project Settings | https://cell-division.sentry.io/settings/projects/hexwave/ |
| Sentry Performance | https://cell-division.sentry.io/performance/?project=4510938330431488 |
| Sentry Session Replay | https://cell-division.sentry.io/replays/?project=4510938330431488 |
| Sentry Releases | https://cell-division.sentry.io/releases/?project=4510938330431488 |
| Sentry Auth Tokens | https://cell-division.sentry.io/settings/account/api/auth-tokens/ |
| Organization | `cell-division` |
| Project Slug | `hexwave` |
| Project ID | `4510938330431488` |
| DSN | `https://62ed9dd0b91f8bf05e1e294905cf3313@o4510140548055040.ingest.us.sentry.io/4510938330431488` |
| Platform | React |
| Features | Error Monitoring, Session Replay (100% on error, 10% baseline), Performance Tracing (20% prod), Web Vitals (LCP, CLS, FID) |
| Source Maps | Uploaded via `@sentry/vite-plugin` on production builds, deleted from dist after upload |
| Edge Functions | 4 Edge Functions report errors to Sentry via lightweight envelope API (`_shared/sentry.ts`); `sentry-proxy` proxies Sentry Issues API for Debug Console |
| Web Vitals | Core Web Vitals (LCP, CLS, FID) reported to Sentry via PerformanceObserver in `src/lib/web-vitals.ts` |
| Enabled | Production only (`import.meta.env.PROD`) |

## Payments (Not Yet Configured)
| Tool | URL |
|------|-----|
| Stripe Dashboard | https://dashboard.stripe.com |
| Stripe API Keys | https://dashboard.stripe.com/apikeys |
| Stripe Webhooks | https://dashboard.stripe.com/webhooks |
| Stripe Payments | https://dashboard.stripe.com/payments |

## Local Development
| Item | Path / URL |
|------|------------|
| Project Folder | `/Users/chadlittlepage/Documents/APPs/hexwave` |
| Dev Server | http://localhost:5173 |
| Environment Variables | `/Users/chadlittlepage/Documents/APPs/hexwave/.env` |

## Key Credentials & IDs
| Item | Value |
|------|-------|
| Supabase Project ID | `jitgzcumsjaxemjbjhit` |
| Supabase URL | `https://jitgzcumsjaxemjbjhit.supabase.co` |
| Supabase Site URL | `https://hexwave.io` |
| Supabase Redirect URLs | `https://hexwave.io/**`, `https://www.hexwave.io/**`, `https://hexwave.vercel.app/**`, `http://localhost:5173/**` |
| Sentry Org Slug | `cell-division` |
| Sentry Project Slug | `hexwave` |
| Sentry Project ID | `4510938330431488` |
| Sentry DSN | `https://62ed9dd0b91f8bf05e1e294905cf3313@o4510140548055040.ingest.us.sentry.io/4510938330431488` |
| Apple Developer Team ID | `72J767FV46` |
| Apple Developer Email | `chad.littlepage@me.com` |

## Security & Rate Limiting
| Feature | Implementation |
|---------|---------------|
| Vote Cooldown | 1-second client-side cooldown via `useRef` timestamp |
| Submission Guard | Ref-based double-submit prevention on track submit + review forms |
| Edge Function CORS | Restricted to `APP_URL` env var (not wildcard `*`) |
| CSP | Strict Content-Security-Policy via Vercel headers (Stripe, Spotify, Supabase, Sentry) |
| Asset Caching | `Cache-Control: immutable, 1 year` on `/assets/*` |
| RLS | Row Level Security on all database tables |
| Auth Guards | `ProtectedRoute` (login required) + `RoleRoute` (role check) |
| Mobile Zoom Lock | Viewport meta + JS gesture/touch prevention |

## Pagination
| Page | Hook | Items Per Page |
|------|------|---------------|
| Browse Tracks | `useSubmissions({ genre, status, page })` | 20 |
| Admin Submissions | `useAdminSubmissions({ status, page })` | 20 |
| Review Queue | `useReviewQueue({ page })` | 20 |
| Manage Curators | `useAdminCurators({ page })` | 20 |
| Manage Payouts | `useAdminPayouts({ page })` | 20 |

## Track Navigation
| Feature | Implementation |
|---------|---------------|
| Prev/Next Buttons | Track IDs passed via `location.state` from Browse/Charts |
| Keyboard Nav | ArrowLeft/ArrowRight on track detail page |
| Mobile Swipe | `useSwipe` hook (50px threshold, direction locking) |
| Back Link | Context-aware: "Back to Charts" or "Back to Browse" |
| Direct URL | Nav row hidden gracefully when no list context |

## Error Handling & Recovery
| Feature | Implementation |
|---------|---------------|
| QueryError Component | Reusable `<QueryError>` with error message + "Try Again" retry button |
| Retry Buttons | All data-fetching pages pass `refetch()` to QueryError for user-initiated retry |
| Error Boundary | `<ErrorBoundary>` in `loading-boundary.tsx` with Sentry capture + "Try Again" button |
| Optimistic Votes | Instant UI update via `onMutate`, rollback on error via `onError` |
| Toast Notifications | `useSyncExternalStore`-based toast system for success/error/warning feedback |

## SEO & Document Titles
| Page | Title |
|------|-------|
| Home | `hexwave — Music Curation Platform` |
| Browse | `Browse Tracks — hexwave` |
| Track Detail | `{track_title} — hexwave` (dynamic) |
| Charts | `Charts — hexwave` |
| Curators | `Curators — hexwave` |
| Login | `Sign In — hexwave` |
| Signup | `Sign Up — hexwave` |
| Dashboard | `Dashboard — hexwave` |
| Curator Dashboard | `Curator Dashboard — hexwave` |
| Review Queue | `Review Queue — hexwave` |
| My Submissions | `My Submissions — hexwave` |
| My Reviews | `My Reviews — hexwave` |
| Admin Dashboard | `Admin Dashboard — hexwave` |
| Manage Submissions | `Manage Submissions — hexwave` |
| Manage Curators | `Manage Curators — hexwave` |
| Manage Payouts | `Manage Payouts — hexwave` |
| Analytics | `Analytics — hexwave` |
| Debug Console | `Debug Console — hexwave` |
| Profile Settings | `Profile Settings — hexwave` |
| About | `About — hexwave` |
| Terms | `Terms of Service — hexwave` |
| Privacy | `Privacy Policy — hexwave` |
| Implementation | `useDocumentTitle` hook in `src/hooks/use-document-title.ts` |

## Skeleton Loaders
| Component | Used On |
|-----------|---------|
| `SkeletonCard` | Browse, Curators (grid loading states) |
| `SkeletonTable` | My Submissions, My Reviews, Review Queue, Manage Submissions/Curators/Payouts |
| `SkeletonStats` | Artist Dashboard, Curator Dashboard, Admin Dashboard, Analytics |
| `Skeleton` | Track Detail (custom layout skeleton) |

## Bundle Budgets
| Setting | Value |
|---------|-------|
| Chunk Size Warning | 250 KB (`vite.config.ts: chunkSizeWarningLimit`) |
| Manual Chunks | `vendor` (React), `supabase`, `stripe`, `query`, `sentry` |
| Source Maps | Generated for Sentry upload, deleted from production dist |

## Environment Validation
| Feature | Implementation |
|---------|---------------|
| Required Vars | `requireEnv()` throws on missing `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` |
| Optional Vars | `optionalEnv()` returns fallback for `VITE_STRIPE_PUBLISHABLE_KEY`, `VITE_SENTRY_DSN`, `VITE_APP_URL` |
| Central Config | All env access via `src/lib/env.ts` — no direct `import.meta.env.VITE_*` in components |

## Debug Console (`/admin/debug`)
| Tab | Features |
|-----|----------|
| System Health | Supabase connection status (green/red dot + latency, auto-refresh 30s), Edge Function status grid (create-checkout, stripe-webhook, create-payout, generate-charts — reachability + latency), Sentry recent unresolved issues (title, event count, last seen) with "Send Test Error" button (30s countdown + auto-refresh) and fallback link |
| Data Inspector | Table selector dropdown (profiles, submissions, reviews, payments, votes, curator_payouts, charts), search by ID, dynamic columns via Object.keys, paginated DataTable |
| Audit Trail | Filter by action type (status change, role change, payout created, profile updated, submission deleted, manual action), DataTable with admin name, action, target, expandable JSON metadata, timestamp, pagination |

| Audit Logging | Mechanism |
|---------------|-----------|
| Submission status change | Client-side insert in `useUpdateSubmissionStatus` (primary) + DB trigger (fallback) |
| Submission deletion | DB trigger (automatic) |
| Profile role change | DB trigger (automatic) |
| Payout creation | Direct insert in create-payout Edge Function |

## Scalability
| Feature | Implementation |
|---------|---------------|
| Analytics Indexes | Composite indexes on `reviews(curator_id, created_at)` and `payments(status, created_at)` |
| Analytics Date Filters | `get_submissions_by_genre` scoped to 12 months, `get_top_curators` scoped to 6 months |
| Query Cache Persistence | `@tanstack/react-query-persist-client` with localStorage, 5-min maxAge, version buster |
| Avatar Lazy Loading | `loading="lazy"` + `decoding="async"` on all avatar `<img>` tags |
| Pagination | All list pages paginated at 20 items (Browse, Review Queue, Admin pages) |

## Image Upload
| Feature | Implementation |
|---------|---------------|
| Avatar Upload | `src/lib/image-upload.ts` — client-side resize via Canvas API |
| Max File Size | 5 MB |
| Output Format | WebP at 85% quality, max 512x512px |
| Storage | Supabase Storage `avatars` bucket (public read, user-scoped write) |
| Migration | `supabase/migrations/00019_avatars_storage.sql` |

## Database Type Generation
| Feature | Implementation |
|---------|---------------|
| Command | `npm run gen:types` |
| Output | `src/types/database.generated.ts` |
| Source | Live Supabase schema via `supabase gen types typescript` |

## Test Coverage
| Test File | Tests | What's Covered |
|-----------|-------|---------------|
| `src/hooks/use-toast.test.ts` | 7 | addToast, dismissToast, auto-dismiss, convenience helpers |
| `src/hooks/use-document-title.test.ts` | 4 | Title setting, default title, re-render updates |
| `src/components/ui/query-error.test.tsx` | 5 | Error rendering, fallback messages, retry button |
| `src/lib/env.test.ts` | 3 | Env fallback logic, MODE/DEV values |
| `src/App.test.tsx` | 5 | Route rendering, navigation, hero section |
| Config | `vitest.config.ts` with 70% coverage thresholds |
