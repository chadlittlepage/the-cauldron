import type { DetectedPlatform } from './validators';
import { env } from './env';
import { supabase } from './supabase';
import * as Sentry from '@sentry/react';

export interface TrackMetadata {
  title: string;
  thumbnailUrl: string | null;
  artistName: string | null;
}

const OEMBED_ENDPOINTS: Partial<Record<NonNullable<DetectedPlatform>, string>> = {
  spotify: 'https://open.spotify.com/oembed?url=',
  soundcloud: 'https://soundcloud.com/oembed?format=json&url=',
};

/** Fetches artist name from the track-metadata Edge Function (SSRF-protected server-side scrape). */
async function fetchArtistFromEdge(
  url: string,
  platform: string,
  signal?: AbortSignal,
): Promise<string | null> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }

    const res = await fetch(`${env.SUPABASE_URL}/functions/v1/track-metadata`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ url, platform }),
      signal,
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { artistName?: string | null };
    return data.artistName || null;
  } catch (err) {
    Sentry.captureException(err, {
      tags: { source: 'edge_artist_fetch' },
      extra: { url, platform },
    });
    return null;
  }
}

/** Fetches track title, thumbnail, and artist name via oEmbed (Spotify/SoundCloud). Falls back to Edge Function for artist name. */
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
  } catch (err) {
    Sentry.captureException(err, { tags: { source: 'oembed_fetch' }, extra: { url, platform } });
    return null;
  }
}
