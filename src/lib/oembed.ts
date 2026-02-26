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

    if (platform === 'spotify') {
      const raw = (data.title as string) || '';
      const parts = raw.split(' - ');
      return {
        title: parts.length > 1 ? parts.slice(1).join(' - ') : raw,
        thumbnailUrl: (data.thumbnail_url as string) || null,
        artistName: parts.length > 1 ? parts[0] : null,
      };
    }

    return {
      title: (data.title as string) || '',
      thumbnailUrl: (data.thumbnail_url as string) || null,
      artistName: (data.author_name as string) || null,
    };
  } catch {
    return null;
  }
}
