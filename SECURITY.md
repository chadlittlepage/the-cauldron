# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| latest  | Yes       |

## Reporting a Vulnerability

If you discover a security vulnerability in hexwave, please report it responsibly.

**Do NOT open a public GitHub issue for security vulnerabilities.**

### How to Report

1. Email: Send a detailed report to the project maintainer
2. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: Within 48 hours of your report
- **Assessment**: Within 7 days, we will confirm the vulnerability and assess severity
- **Fix timeline**: Critical issues will be patched within 14 days; lower-severity issues within 30 days
- **Credit**: We will credit reporters in release notes (unless you prefer anonymity)

## Security Measures

hexwave employs the following security practices:

- **Row Level Security (RLS)**: All Supabase tables enforce role-based access at the database level
- **CORS restrictions**: Edge Functions use explicit origin allowlists (not wildcard `*`)
- **Content Security Policy**: Strict CSP headers via Vercel (allowlists Stripe, Spotify, Supabase, Sentry)
- **SSRF protection**: Edge Functions validate URLs against allowlisted domains before server-side fetches
- **Input validation**: Zod schemas validate all user input at client and server boundaries
- **Secret isolation**: Stripe secret keys and service role keys are only available in Edge Functions, never in client code
- **PKCE authentication**: OAuth flows use Proof Key for Code Exchange
- **Dependency scanning**: Dependabot monitors for vulnerable dependencies
- **Source map protection**: Production source maps are uploaded to Sentry and deleted from the public build

## Scope

The following are in scope for security reports:

- Authentication and authorization bypasses
- RLS policy circumvention
- Cross-site scripting (XSS)
- SQL injection
- Server-side request forgery (SSRF)
- Sensitive data exposure
- Payment flow manipulation

The following are out of scope:

- Rate limiting (informational only)
- Denial of service attacks
- Social engineering
- Issues in third-party services (Supabase, Stripe, Sentry)
