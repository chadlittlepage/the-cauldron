import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchTrackMetadata } from './oembed';

describe('fetchTrackMetadata', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns null for unsupported platforms', async () => {
    expect(await fetchTrackMetadata('https://example.com', 'bandcamp')).toBeNull();
    expect(await fetchTrackMetadata('https://example.com', 'other')).toBeNull();
    expect(await fetchTrackMetadata('https://example.com', null)).toBeNull();
  });

  it('parses Spotify oEmbed response (Artist - Track format)', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          title: 'Daft Punk - Around the World',
          thumbnail_url: 'https://i.scdn.co/image/abc123',
        }),
        { status: 200 },
      ),
    );

    const result = await fetchTrackMetadata('https://open.spotify.com/track/abc123', 'spotify');

    expect(result).toEqual({
      title: 'Around the World',
      thumbnailUrl: 'https://i.scdn.co/image/abc123',
      artistName: 'Daft Punk',
    });
  });

  it('handles Spotify title without dash separator', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ title: 'Just a Title', thumbnail_url: null }), { status: 200 }),
    );

    const result = await fetchTrackMetadata('https://open.spotify.com/track/abc123', 'spotify');

    expect(result).toEqual({
      title: 'Just a Title',
      thumbnailUrl: null,
      artistName: null,
    });
  });

  it('parses SoundCloud oEmbed response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          title: 'Cool Track',
          author_name: 'Cool Artist',
          thumbnail_url: 'https://i1.sndcdn.com/artworks-abc.jpg',
        }),
        { status: 200 },
      ),
    );

    const result = await fetchTrackMetadata(
      'https://soundcloud.com/cool-artist/cool-track',
      'soundcloud',
    );

    expect(result).toEqual({
      title: 'Cool Track',
      thumbnailUrl: 'https://i1.sndcdn.com/artworks-abc.jpg',
      artistName: 'Cool Artist',
    });
  });

  it('returns null on fetch error', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'));

    const result = await fetchTrackMetadata('https://open.spotify.com/track/abc123', 'spotify');

    expect(result).toBeNull();
  });

  it('returns null on non-ok response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response('Not Found', { status: 404 }));

    const result = await fetchTrackMetadata('https://open.spotify.com/track/abc123', 'spotify');

    expect(result).toBeNull();
  });
});
