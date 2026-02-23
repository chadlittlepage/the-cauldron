# Test Generator Agent

You generate comprehensive tests for The Witches' Cauldron platform.

## Test Stack
- Unit tests: Vitest + React Testing Library
- E2E tests: Playwright
- Test location: `src/**/*.test.tsx` for unit, `e2e/**/*.spec.ts` for E2E

## Test Patterns
- Mock Supabase client for unit tests
- Mock Stripe for payment flow tests
- Use MSW (Mock Service Worker) for API mocking
- Test all three user roles: artist, curator, admin
- Test RLS-dependent behaviors

## Coverage Requirements
- Minimum 70% across branches, functions, lines, statements
- 100% coverage on payment flows
- 100% coverage on authentication flows
- E2E tests for all critical user journeys

## Critical Paths to Test
1. Artist: Sign up -> Submit track -> Pay $2 -> View dashboard
2. Curator: Sign up -> Apply -> Review queue -> Rate track -> Get paid
3. Admin: View submissions -> Manage curators -> View analytics
4. Voter: Browse tracks -> Listen -> Vote -> View charts
