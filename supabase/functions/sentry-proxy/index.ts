import { captureException } from '../_shared/sentry.ts';
import { requireAdmin, corsResponse, jsonResponse, log } from '../_shared/middleware.ts';

const sentryAuthToken = Deno.env.get('SENTRY_AUTH_TOKEN') ?? '';
const sentryOrg = 'cell-division';
const sentryProject = 'hexwave';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return corsResponse({ 'Access-Control-Allow-Headers': 'authorization, content-type, apikey, x-client-info' });
  }

  let userId: string | undefined;
  try {
    const auth = await requireAdmin(req);
    if (!auth.ok) return auth.response;
    userId = auth.user.id;

    if (!sentryAuthToken) {
      return jsonResponse({ error: 'Sentry not configured' }, 503);
    }

    const sentryResp = await fetch(
      `https://sentry.io/api/0/projects/${sentryOrg}/${sentryProject}/issues/?query=is:unresolved&sort=date&limit=25`,
      {
        headers: { Authorization: `Bearer ${sentryAuthToken}` },
      },
    );

    if (!sentryResp.ok) {
      const text = await sentryResp.text();
      log('error', 'sentry-proxy', 'Sentry API error', { status: sentryResp.status, body: text });
      return jsonResponse({ error: 'Sentry API error' }, sentryResp.status);
    }

    const issues = await sentryResp.json();

    const simplified = (issues as Array<Record<string, unknown>>).map((issue) => ({
      id: issue.id,
      title: issue.title,
      culprit: issue.culprit,
      count: issue.count,
      firstSeen: issue.firstSeen,
      lastSeen: issue.lastSeen,
      level: issue.level,
      permalink: issue.permalink,
    }));

    return jsonResponse(simplified);
  } catch (err) {
    log('error', 'sentry-proxy', (err as Error).message);
    await captureException(err, { function: 'sentry-proxy', userId });
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
});
