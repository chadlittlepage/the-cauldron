/**
 * In-memory sliding-window rate limiter for Edge Functions.
 * Each isolate maintains its own window — sufficient for stopping
 * automated abuse without external dependencies.
 */
export function createRateLimiter(windowMs: number, maxRequests: number) {
  const requests = new Map<string, number[]>();

  return {
    check(key: string): boolean {
      const now = Date.now();
      const valid = (requests.get(key) ?? []).filter((t) => now - t < windowMs);

      if (valid.length >= maxRequests) {
        requests.set(key, valid);
        return false;
      }

      valid.push(now);
      requests.set(key, valid);
      return true;
    },
  };
}

export function rateLimitResponse(appUrl: string): Response {
  return new Response(
    JSON.stringify({ error: 'Too many requests. Please try again later.' }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': appUrl,
        'Retry-After': '60',
      },
    },
  );
}
