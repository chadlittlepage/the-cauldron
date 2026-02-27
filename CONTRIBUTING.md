# Contributing to hexwave

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production (auto-deploys to Vercel) |
| `develop` | Integration branch |
| `feature/*` | New features (PR to develop) |
| `fix/*` | Bug fixes (PR to develop) |

## Development Setup

```bash
npm install
cp .env.example .env  # Fill in Supabase + Stripe keys
npm run dev
```

## Before Submitting a PR

Run the full check suite:

```bash
npm run check  # typecheck + lint + format + tests
```

All of the following must pass:
- `tsc --noEmit` — zero type errors
- `eslint .` — zero errors (warnings acceptable)
- `prettier --check` — all files formatted
- `vitest run` — all 127+ tests pass with 70%+ coverage

## Commit Messages

Use imperative mood, focus on "why" not "what":

```
Fix vote cooldown race condition on rapid clicks

Add artist name auto-fill from Spotify oEmbed metadata
```

## Code Standards

- **TypeScript strict mode** — no `any` types, no `@ts-ignore`
- **Zod validation** on all user inputs (client + Edge Functions)
- **TanStack Query** for all server state (no raw `useEffect` + `fetch`)
- **CVA pattern** for UI components with Tailwind
- **Path aliases** — use `@/` not relative `../` chains
- **No `dangerouslySetInnerHTML`** — ever

## Testing

- Unit tests go in `src/**/*.test.ts(x)` alongside source files
- E2E tests go in `e2e/*.spec.ts`
- Mock Supabase at the module level with `vi.hoisted`
- Test error paths, not just happy paths

## Security

- Never expose secrets in client code
- All database access goes through RLS — don't bypass with service role
- Validate and sanitize all user input with Zod
- Edge Functions restrict CORS to `APP_URL`

## Database Changes

1. Create a new migration file: `supabase/migrations/00029_description.sql`
2. Push to remote: `npx supabase db push`
3. Regenerate types: `npm run gen:types`
4. Format generated types: `npx prettier --write src/types/database.generated.ts`
