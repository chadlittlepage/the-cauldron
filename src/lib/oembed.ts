import type { DetectedPlatform } from './validators';

export interface TrackMetadata {
  title: string;
  thumbnailUrl: string | null;
  artistName: string | null;
}

const OEMBED_ENDPOINTS: Partial<Record<NonNullable<DetectedPlatform>, string>> = {
  spotify: 'https://open.spotify.com/oembed?url=',
  soundcloud: 'https://soundcloud.com/oembed?format=json&url=',
};

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

    return {
      title: (data.title as string) || '',
      thumbnailUrl: (data.thumbnail_url as string) || null,
      artistName: (data.author_name as string) || null,
    };
  } catch {
    return null;
  }
}
