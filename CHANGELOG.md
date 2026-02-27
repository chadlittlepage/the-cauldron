# Changelog

All notable changes to hexwave.io are documented here.

## [Unreleased]

### Added
- Per-route error boundaries — a crash in one section no longer takes down the whole app
- Stripe webhook idempotency — duplicate webhook deliveries are safely skipped
- Edge Functions CI lint/typecheck step in GitHub Actions
- Sentry replay PII masking — all form inputs masked in session replays
- CODEOWNERS file for code review enforcement
- Firefox and WebKit browser testing in Playwright
- Vote count reconciliation function (`reconcile_vote_counts`) for data integrity
- JSDoc documentation on all exported hooks and utility functions
- CHANGELOG.md

### Changed
- Error boundaries now wrap each route individually instead of a single global boundary
- Playwright CI installs all browsers instead of Chromium only

### Security
- PKCE OAuth flow (replaced implicit flow)
- Audit log RLS restricts inserts to admins only
- pg_trgm indexes replace leading-wildcard ILIKE queries
- SENTRY_AUTH_TOKEN added to CI/CD pipeline
- GitHub Actions pinned to commit SHAs
- Sentry replay masks all input fields by default

## [0.1.0] - 2026-02-26

### Added
- Initial release of hexwave.io
- Artist track submission with $2 Stripe payment
- Community voting system with cooldown protection
- Curator review queue with rating system
- Monthly and yearly charts generation
- Admin dashboard with analytics, payout management, and debug console
- Sentry error tracking with session replay and performance monitoring
- TanStack Query with localStorage persistence
- Supabase Auth with PKCE flow
- Row Level Security on all database tables
- Edge Functions: create-checkout, stripe-webhook, create-payout, generate-charts, sentry-proxy, track-metadata
- E2E tests with Playwright (authenticated and public flows)
- CI/CD pipeline with GitHub Actions and Vercel deployment
