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
| Features | Error Monitoring, Session Replay (100% on error, 10% baseline), Performance Tracing (20% prod) |
| Source Maps | Uploaded via `@sentry/vite-plugin` on production builds, deleted from dist after upload |
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
