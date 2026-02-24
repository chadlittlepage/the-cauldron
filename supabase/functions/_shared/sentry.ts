const SENTRY_DSN = Deno.env.get('SENTRY_DSN') ?? '';
const SENTRY_ENV = Deno.env.get('SENTRY_ENVIRONMENT') ?? 'production';

/**
 * Report an error to Sentry using the envelope API (no SDK dependency).
 * This is lightweight and works in Deno Edge Functions without npm packages.
 */
export async function captureException(error: unknown, context?: Record<string, unknown>) {
  if (!SENTRY_DSN) return;

  try {
    const dsn = new URL(SENTRY_DSN);
    const projectId = dsn.pathname.replace('/', '');
    const publicKey = dsn.username;
    const host = dsn.hostname;

    const event = {
      event_id: crypto.randomUUID().replace(/-/g, ''),
      timestamp: new Date().toISOString(),
      platform: 'node',
      environment: SENTRY_ENV,
      server_name: 'supabase-edge',
      exception: {
        values: [
          {
            type: error instanceof Error ? error.constructor.name : 'Error',
            value: error instanceof Error ? error.message : String(error),
            stacktrace: error instanceof Error && error.stack
              ? { frames: parseStack(error.stack) }
              : undefined,
          },
        ],
      },
      extra: context,
    };

    const envelope = [
      JSON.stringify({ event_id: event.event_id, sent_at: event.timestamp, dsn: SENTRY_DSN }),
      JSON.stringify({ type: 'event' }),
      JSON.stringify(event),
    ].join('\n');

    await fetch(`https://${host}/api/${projectId}/envelope/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-sentry-envelope',
        'X-Sentry-Auth': `Sentry sentry_version=7,sentry_client=edge-functions/1.0,sentry_key=${publicKey}`,
      },
      body: envelope,
    });
  } catch {
    // Silently fail — never let Sentry reporting break the function
  }
}

function parseStack(stack: string) {
  return stack
    .split('\n')
    .slice(1)
    .map((line) => {
      const match = line.match(/at\s+(.+?)\s+\((.+):(\d+):(\d+)\)/);
      if (match) {
        return { function: match[1], filename: match[2], lineno: Number(match[3]), colno: Number(match[4]) };
      }
      return { function: '<anonymous>', filename: line.trim(), lineno: 0, colno: 0 };
    })
    .reverse(); // Sentry expects frames in caller order (oldest first)
}
