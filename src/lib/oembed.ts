import type { DetectedPlatform } from './validators';
import { env } from './env';

export interface TrackMetadata {
  title: string;
  thumbnailUrl: string | null;
  artistName: string | null;
}

const OEMBED_ENDPOINTS: Partial<Record<NonNullable<DetectedPlatform>, string>> = {
  spotify: 'https://open.spotify.com/oembed?url=',
  soundcloud: 'https://soundcloud.com/oembed?format=json&url=',
};

async function fetchArtistFromEdge(
  url: string,
  platform: string,
  signal?: AbortSignal,
): Promise<string | null> {
  try {
    const res = await fetch(`${env.SUPABASE_URL}/functions/v1/track-metadata`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, platform }),
      signal,
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { artistName?: string | null };
    return data.artistName || null;
  } catch {
    return null;
  }
}

export async function fetchTrackMetadata(
  url: string,
  platform: DetectedPlatform,
  signal?: AbortSignal,
): Promise<TrackMetadata | null> {
  if (!platform || !(platform in OEMBED_ENDPOINTS)) return null;

  const endpoint = OEMBED_ENDPOINTS[platform as keyof typeof OEMBED_ENDPOINTS];
  if (!endpoint) return null;

  try {
    const res = await fetch(`${endpoint}${encodeURIComponent(url)}`, { signal });
    if (!res.ok) return null;

    const data = (await res.json()) as Record<string, unknown>;

    let artistName = (data.author_name as string) || null;

    // Spotify oEmbed doesn't return author_name — fetch from Edge Function
    if (!artistName) {
      artistName = await fetchArtistFromEdge(url, platform, signal);
    }

    return {
      title: (data.title as string) || '',
      thumbnailUrl: (data.thumbnail_url as string) || null,
      artistName,
    };
  } catch {
    return null;
  }
}
