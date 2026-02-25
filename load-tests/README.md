# Load Testing

Smoke tests using [k6](https://k6.io/) to verify basic performance thresholds.

## Prerequisites

```bash
brew install k6
```

## Run against local dev server

Start the dev server first (`npm run dev`), then:

```bash
npm run test:load
```

## Run against staging

```bash
K6_STAGING_URL=https://staging.hexwave.io k6 run load-tests/smoke.js
```

## Thresholds

- **p95 response time**: < 500ms
- **Error rate**: < 1%
- **Virtual users**: 10
- **Duration**: 30 seconds
