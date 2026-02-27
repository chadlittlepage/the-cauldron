const corsHeaders = {
  'Access-Control-Allow-Origin': Deno.env.get('APP_URL') || 'https://hexwave.io',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  try {
    const { url, platform } = (await req.json()) as {
      url?: string;
      platform?: string;
    };

    if (!url || !platform) {
      return json({ error: 'url and platform are required' }, 400);
    }

    if (platform !== 'spotify' && platform !== 'soundcloud') {
      return json({ error: 'Unsupported platform' }, 400);
    }

    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; HexwaveBot/1.0)' },
      redirect: 'follow',
    });

    if (!res.ok) {
      return json({ error: 'Failed to fetch track page' }, 502);
    }

    const html = await res.text();
    const artistName =
      platform === 'spotify'
        ? parseSpotifyArtist(html)
        : parseSoundCloudArtist(html);

    return json({ artistName });
  } catch (err) {
    console.error('track-metadata error:', err);
    return json({ error: 'Internal server error' }, 500);
  }
});
