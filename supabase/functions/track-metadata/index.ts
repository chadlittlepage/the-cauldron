import { captureException } from '../_shared/sentry.ts';
import { createRateLimiter, rateLimitResponse } from '../_shared/rate-limit.ts';
import { requireAuth, corsResponse, jsonResponse, log } from '../_shared/middleware.ts';

// 20 lookups per user per minute
const metadataLimiter = createRateLimiter(60_000, 20);

/** Extract artist from Spotify og:description: "{artist} · {album} · Song · {year}" */
function parseSpotifyArtist(html: string): string | null {
  const match = html.match(
    /<meta\s+property="og:description"\s+content="([^"]*)"/i,
  );
  if (!match) return null;
  const desc = match[1];
  // Format: "Artist · Album · Song · Year"
  const parts = desc.split('\u00B7').map((s) => s.trim());
  // The artist is the first segment
  if (parts.length >= 2) {
    return parts[0] || null;
  }
  return null;
}

/** Extract artist from SoundCloud og:description or meta tags */
function parseSoundCloudArtist(html: string): string | null {
  // SoundCloud uses twitter:app:url:googleplay which contains the user
  // But simplest: look for the "by X" in og:description or the author meta
  const authorMatch = html.match(
    /<meta\s+name="twitter:audio:artist_name"\s+content="([^"]*)"/i,
  );
  if (authorMatch) return authorMatch[1] || null;

  // Fallback: og:description often has "Listen to {title} by {artist}"
  const ogMatch = html.match(
    /<meta\s+property="og:description"\s+content="([^"]*)"/i,
  );
  if (ogMatch) {
    const byMatch = ogMatch[1].match(/by\s+(.+?)(?:\s+on\s+SoundCloud|\.|\s*$)/i);
    if (byMatch) return byMatch[1].trim() || null;
  }

  return null;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return corsResponse();

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  let userId: string | undefined;
  try {
    // Require authentication
    const auth = await requireAuth(req);
    if (!auth.ok) return auth.response;
    userId = auth.user.id;

    // Rate limit per user
    if (!(await metadataLimiter.check(`metadata:${auth.user.id}`))) {
      return rateLimitResponse(Deno.env.get('APP_URL') || 'https://hexwave.io');
    }

    const { url, platform } = (await req.json()) as {
      url?: string;
      platform?: string;
    };

    if (!url || !platform) {
      return jsonResponse({ error: 'url and platform are required' }, 400);
    }

    if (platform !== 'spotify' && platform !== 'soundcloud') {
      return jsonResponse({ error: 'Unsupported platform' }, 400);
    }

    // SSRF protection: only allow https URLs to known music platforms
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return jsonResponse({ error: 'Invalid URL' }, 400);
    }

    if (parsed.protocol !== 'https:') {
      return jsonResponse({ error: 'Only HTTPS URLs are allowed' }, 400);
    }

    const allowedHosts: Record<string, string[]> = {
      spotify: ['open.spotify.com'],
      soundcloud: ['soundcloud.com', 'www.soundcloud.com', 'm.soundcloud.com'],
    };

    const hosts = allowedHosts[platform];
    if (!hosts || !hosts.includes(parsed.hostname)) {
      return jsonResponse({ error: 'URL does not match expected platform domain' }, 400);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; HexwaveBot/1.0)' },
      redirect: 'follow',
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return jsonResponse({ error: 'Failed to fetch track page' }, 502);
    }

    const html = await res.text();
    const artistName =
      platform === 'spotify'
        ? parseSpotifyArtist(html)
        : parseSoundCloudArtist(html);

    return jsonResponse({ artistName });
  } catch (err) {
    log('error', 'track-metadata', (err as Error).message, { stack: (err as Error).stack });
    await captureException(err, { function: 'track-metadata', userId });
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
});
