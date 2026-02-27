# Service Level Agreement (SLA)

## Overview

**Service**: hexwave.io
**Effective Date**: February 2026
**Infrastructure**: Vercel (hosting/CDN) + Supabase (database/auth/Edge Functions) + Stripe (payments)

---

## Uptime Target

**99.9% monthly uptime** (approximately 43 minutes of allowed downtime per month)

This target is supported by:
- **Vercel**: Global edge network with built-in redundancy and automatic failover
- **Supabase**: Managed PostgreSQL with automated backups and high availability
- **Stripe**: Enterprise-grade payment infrastructure with 99.99% uptime SLA

---

## Incident Severity Levels

| Severity | Definition | Example |
|---|---|---|
| **P1 — Critical** | Site completely unavailable or data loss occurring | Full outage, database unreachable, auth system down |
| **P2 — High** | Major feature broken, significant user impact | Payment processing failing, track submission broken, curator dashboard inaccessible |
| **P3 — Medium** | Feature degraded, workaround available | Slow page loads, intermittent errors, chart generation delayed |
| **P4 — Low** | Cosmetic issue, minimal user impact | UI alignment issue, non-critical console warning, minor styling bug |

---

## Response Times

| Severity | Response Time | Resolution Target |
|---|---|---|
| **P1 — Critical** | 1 hour | 4 hours |
| **P2 — High** | 4 hours | 24 hours |
| **P3 — Medium** | 24 hours | 72 hours |
| **P4 — Low** | 72 hours | Next release cycle |

---

## Incident Response Procedure

### 1. Detection

Incidents are detected through multiple channels:

- **Sentry Alerting** — Real-time error monitoring with anomaly detection (`src/main.tsx`)
- **Health Checks** — Frontend and backend health check endpoints verify system availability (`supabase/functions/health-check/`)
- **Web Vitals** — Core Web Vitals (LCP, CLS, FID) monitored for performance degradation
- **Session Replay** — 100% replay capture on errors enables rapid diagnosis

### 2. Triage

Upon detection, the incident is classified by severity (P1–P4) based on:
- User impact scope (all users vs. subset vs. single user)
- Feature criticality (core flow vs. secondary feature vs. cosmetic)
- Data integrity risk (data loss possible vs. no data impact)

### 3. Automated Response

For deployment-related incidents, the CD pipeline includes automatic rollback:

- Health check runs after each production deployment (`.github/workflows/cd.yml`)
- If the health check fails, `vercel promote` automatically reverts to the last known good deployment
- No manual intervention required for deployment regressions

### 4. Manual Response

For non-deployment incidents:
1. **Investigate** — Review Sentry error details, session replays, and logs
2. **Identify** — Determine root cause and affected scope
3. **Fix** — Implement fix on a `fix/*` branch
4. **Test** — 4-stage CI pipeline validates the fix (lint → test → build → E2E)
5. **Deploy** — Merge to `main` triggers automatic production deployment

### 5. Post-Incident Review

After resolution of P1 and P2 incidents:
- Document root cause and timeline
- Identify preventive measures
- Update monitoring or alerting as needed
- Track remediation in audit log

---

## Monitoring Stack

| Tool | Purpose | Coverage |
|---|---|---|
| **Sentry** | Error tracking, session replay, performance tracing | All errors, 20% sessions (100% on error), 20% transactions |
| **Health Check (Backend)** | Supabase database and Edge Function availability | `supabase/functions/health-check/` |
| **Health Check (Frontend)** | Client-side system health verification | Frontend health check component |
| **Web Vitals** | Core Web Vitals performance monitoring | LCP, CLS, FID reported to Sentry |
| **Dependabot** | Dependency vulnerability monitoring | Automated PRs for vulnerable packages |
| **Admin Debug Console** | System health, data inspector, audit trail | `src/pages/admin/` |

---

## Maintenance Windows

**No scheduled maintenance windows required.**

- Vercel deployments are zero-downtime (atomic deployment swaps)
- Supabase migrations run without downtime for additive changes
- No manual server restarts or planned outages needed

---

## Escalation Path

```
Automated Rollback (health check failure → vercel promote)
    ↓ (if rollback insufficient)
Manual Investigation (Sentry error analysis + session replay)
    ↓ (root cause identified)
Hotfix Deploy (fix/* branch → CI pipeline → production)
    ↓ (if infrastructure issue)
Provider Escalation (Vercel / Supabase support)
```

---

## Exclusions

The following are excluded from uptime calculations:
- Third-party service outages (Vercel, Supabase, Stripe, Spotify, SoundCloud)
- Scheduled database migrations (typically under 1 minute)
- Force majeure events
- Client-side network issues

---

*Document version: 1.0 | February 2026 | hexwave.io*
