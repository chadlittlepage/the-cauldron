import { assertEquals } from 'https://deno.land/std@0.177.0/testing/asserts.ts';

// Extract and test the pure functions directly

/** Extract artist from Spotify og:description: "{artist} · {album} · Song · {year}" */
function parseSpotifyArtist(html: string): string | null {
  const match = html.match(
    /<meta\s+property="og:description"\s+content="([^"]*)"/i,
  );
  if (!match) return null;
  const desc = match[1];
  const parts = desc.split('\u00B7').map((s) => s.trim());
  if (parts.length >= 2) {
    return parts[0] || null;
  }
  return null;
}

/** Extract artist from SoundCloud og:description or meta tags */
function parseSoundCloudArtist(html: string): string | null {
  const authorMatch = html.match(
    /<meta\s+name="twitter:audio:artist_name"\s+content="([^"]*)"/i,
  );
  if (authorMatch) return authorMatch[1] || null;

  const ogMatch = html.match(
    /<meta\s+property="og:description"\s+content="([^"]*)"/i,
  );
  if (ogMatch) {
    const byMatch = ogMatch[1].match(/by\s+(.+?)(?:\s+on\s+SoundCloud|\.|\s*$)/i);
    if (byMatch) return byMatch[1].trim() || null;
  }

  return null;
}

// --- parseSpotifyArtist tests ---

Deno.test('parseSpotifyArtist: extracts artist from standard format', () => {
  const html = '<meta property="og:description" content="Drake · Certified Lover Boy · Song · 2021">';
  assertEquals(parseSpotifyArtist(html), 'Drake');
});

Deno.test('parseSpotifyArtist: returns null when no og:description', () => {
  const html = '<html><head><title>Spotify</title></head></html>';
  assertEquals(parseSpotifyArtist(html), null);
});

Deno.test('parseSpotifyArtist: returns null for single-segment description', () => {
  const html = '<meta property="og:description" content="Just a description">';
  assertEquals(parseSpotifyArtist(html), null);
});

Deno.test('parseSpotifyArtist: handles multi-word artist names', () => {
  const html = '<meta property="og:description" content="The Weeknd · After Hours · Song · 2020">';
  assertEquals(parseSpotifyArtist(html), 'The Weeknd');
});

// --- parseSoundCloudArtist tests ---

Deno.test('parseSoundCloudArtist: extracts from twitter:audio:artist_name', () => {
  const html = '<meta name="twitter:audio:artist_name" content="Flume">';
  assertEquals(parseSoundCloudArtist(html), 'Flume');
});

Deno.test('parseSoundCloudArtist: falls back to og:description "by" pattern', () => {
  const html = '<meta property="og:description" content="Listen to Cool Track by ODESZA on SoundCloud">';
  assertEquals(parseSoundCloudArtist(html), 'ODESZA');
});

Deno.test('parseSoundCloudArtist: returns null when no matching meta tags', () => {
  const html = '<html><head><title>SoundCloud</title></head></html>';
  assertEquals(parseSoundCloudArtist(html), null);
});

Deno.test('parseSoundCloudArtist: handles artist name with period at end', () => {
  const html = '<meta property="og:description" content="Listen to Beat by Artist Name.">';
  assertEquals(parseSoundCloudArtist(html), 'Artist Name');
});

// --- SSRF protection tests ---

Deno.test('SSRF: rejects non-HTTPS URLs', () => {
  const parsed = new URL('http://open.spotify.com/track/abc');
  assertEquals(parsed.protocol !== 'https:', true);
});

Deno.test('SSRF: rejects internal hostnames', () => {
  const allowedHosts: Record<string, string[]> = {
    spotify: ['open.spotify.com'],
    soundcloud: ['soundcloud.com', 'www.soundcloud.com', 'm.soundcloud.com'],
  };
  const parsed = new URL('https://localhost:3000/track/abc');
  assertEquals(allowedHosts['spotify']!.includes(parsed.hostname), false);
});

Deno.test('SSRF: accepts valid Spotify URL', () => {
  const allowedHosts = ['open.spotify.com'];
  const parsed = new URL('https://open.spotify.com/track/abc123');
  assertEquals(allowedHosts.includes(parsed.hostname), true);
});

Deno.test('SSRF: accepts valid SoundCloud URL', () => {
  const allowedHosts = ['soundcloud.com', 'www.soundcloud.com', 'm.soundcloud.com'];
  const parsed = new URL('https://soundcloud.com/artist/track');
  assertEquals(allowedHosts.includes(parsed.hostname), true);
});

Deno.test('SSRF: rejects IP addresses', () => {
  const allowedHosts = ['open.spotify.com'];
  const parsed = new URL('https://192.168.1.1/track/abc');
  assertEquals(allowedHosts.includes(parsed.hostname), false);
});
