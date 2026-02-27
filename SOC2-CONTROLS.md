# SOC 2 Type II Controls Mapping

## Overview

This document maps hexwave's existing security controls to the **AICPA SOC 2 Trust Service Criteria (TSC)**. All controls listed below are implemented and verifiable in the codebase.

**Assessment Date**: February 2026
**Scope**: hexwave.io production environment (Vercel + Supabase + Stripe)

---

## CC6.1 — Logical and Physical Access Control

**Requirement**: The entity implements logical access security measures to protect against unauthorized access.

| Control | Implementation | Source |
|---|---|---|
| Row-Level Security | RLS policies on every database table enforce role-based data access | `supabase/migrations/` (32 migrations) |
| Route Guards | `ProtectedRoute` and `RoleRoute` components enforce auth and role checks at the UI level | `src/components/layout/` |
| Edge Function Auth | `requireAuth()` and `requireAdmin()` middleware validate JWTs on every server-side request | `supabase/functions/_shared/middleware.ts` |
| Role Enforcement | Three roles (artist, curator, admin) enforced at both database (RLS) and application (route) level | `src/types/database.ts`, `src/hooks/use-auth.ts` |
| PKCE Auth Flow | Supabase Auth uses PKCE (Proof Key for Code Exchange) for all authentication flows | `src/lib/supabase.ts` |

---

## CC6.6 — Encryption

**Requirement**: The entity implements encryption to protect data in transit and at rest.

| Control | Implementation | Source |
|---|---|---|
| HSTS Preload | 2-year `Strict-Transport-Security` with `includeSubDomains` and `preload` | `vercel.json` |
| TLS 1.2+ | All traffic encrypted via Vercel's edge network (TLS 1.2 minimum) | Vercel platform |
| Encryption at Rest | Supabase Postgres encrypts data at rest using AES-256 | Supabase platform |
| Source Map Protection | Source maps uploaded to Sentry, then deleted from production builds | `vite.config.ts`, `.github/workflows/cd.yml` |

---

## CC6.8 — Input Validation

**Requirement**: The entity implements controls to prevent or detect unauthorized or malicious inputs.

| Control | Implementation | Source |
|---|---|---|
| Zod Client Validation | All user inputs validated with Zod schemas before submission | `src/lib/validators.ts` |
| Server Validation | Edge Functions validate request bodies with custom schemas before processing | `supabase/functions/_shared/validate.ts` |
| Parameterized Queries | All database queries use Supabase client (parameterized) — no raw SQL | All query hooks in `src/hooks/` |
| CSP Headers | Strict Content-Security-Policy prevents XSS and injection attacks | `vercel.json` |
| No Eval/innerHTML | Codebase contains zero uses of `eval()` or `dangerouslySetInnerHTML` | Enforced by ESLint |

---

## CC7.1 — Monitoring

**Requirement**: The entity monitors system components and detects anomalies.

| Control | Implementation | Source |
|---|---|---|
| Sentry Error Tracking | All errors captured with stack traces and user context | `src/main.tsx` (Sentry init) |
| Session Replay | 20% baseline, 100% on error — full session recordings | Sentry configuration |
| Performance Tracing | 20% sample rate for transaction performance monitoring | Sentry configuration |
| Web Vitals | LCP, CLS, FID reported to Sentry for Core Web Vitals monitoring | Sentry browser integration |
| Edge Function Monitoring | All 7 Edge Functions report errors via Sentry envelope API | `supabase/functions/_shared/sentry.ts` |

---

## CC7.2 — Incident Response

**Requirement**: The entity has processes to detect, respond to, and recover from incidents.

| Control | Implementation | Source |
|---|---|---|
| Automated Rollback | CD pipeline includes health check; failure triggers `vercel promote` to last known good deployment | `.github/workflows/cd.yml` |
| Health Checks | Frontend and backend health check endpoints verify system availability | `supabase/functions/health-check/` |
| Sentry Alerting | Real-time error alerts for anomaly detection | Sentry project configuration |
| Incident Severity Levels | P1–P4 severity classification with defined response times | `SLA.md` |

---

## CC7.3 — Change Management

**Requirement**: The entity manages changes to system components in a controlled manner.

| Control | Implementation | Source |
|---|---|---|
| 5-Stage CI Pipeline | Lint → Unit Tests → Edge Functions → Build → E2E tests must all pass before merge | `.github/workflows/ci.yml` |
| 3-Environment CD | Preview → Staging → Production deployment pipeline | `.github/workflows/cd.yml` |
| Branch Protection | `main` branch requires passing CI checks before merge | GitHub repository settings |
| Dependency Monitoring | Dependabot monitors for vulnerable dependencies | `.github/dependabot.yml` |
| Pre-commit Checks | `npm run check` runs typecheck + lint + format + test before commit | `package.json` |

---

## CC8.1 — Audit Logging

**Requirement**: The entity logs and monitors system activities.

| Control | Implementation | Source |
|---|---|---|
| Admin Audit Logs | `admin_audit_logs` table records all admin actions with action type, admin ID, timestamp, and metadata | `supabase/migrations/` |
| Action Type Tracking | Logged actions include curator approvals, payout processing, submission management | Admin panel components |
| Admin Identification | Every audit log entry links to the performing admin's user ID | `admin_audit_logs.admin_id` column |
| Debug Console | Admin debug console provides system health, data inspector, and audit trail views | `src/pages/admin/` |

---

## CC9.1 — Data Protection

**Requirement**: The entity protects confidential information during processing, storage, and transmission.

| Control | Implementation | Source |
|---|---|---|
| Secret Isolation | Stripe secret key and Supabase service role key exist only in Edge Functions — never in client bundle | `supabase/functions/` |
| CORS Restrictions | Edge Functions restrict origins to `APP_URL` environment variable (no wildcard `*`) | `supabase/functions/_shared/middleware.ts` |
| CSP Headers | Content-Security-Policy allowlists only required domains (Stripe, Spotify, Supabase, Sentry) | `vercel.json` |
| Permissions Policy | Camera, microphone, and geolocation disabled via Permissions-Policy header | `vercel.json` |
| X-Frame-Options | `DENY` prevents clickjacking via iframe embedding | `vercel.json` |

---

## Evidence Summary

| TSC Criteria | Controls | Status |
|---|---|---|
| CC6.1 Access Control | 5 controls | Implemented |
| CC6.6 Encryption | 4 controls | Implemented |
| CC6.8 Input Validation | 5 controls | Implemented |
| CC7.1 Monitoring | 5 controls | Implemented |
| CC7.2 Incident Response | 4 controls | Implemented |
| CC7.3 Change Management | 5 controls | Implemented |
| CC8.1 Audit Logging | 4 controls | Implemented |
| CC9.1 Data Protection | 5 controls | Implemented |
| **Total** | **37 controls** | **All implemented** |

---

*Document version: 1.0 | February 2026 | hexwave.io*
