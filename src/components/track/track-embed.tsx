import type { MusicPlatform } from '@/types/database';

interface TrackEmbedProps {
  url: string;
  platform: MusicPlatform;
  className?: string;
}

function getEmbedUrl(url: string, platform: MusicPlatform): string | null {
  switch (platform) {
    case 'spotify': {
      const match = url.match(/track\/([a-zA-Z0-9]+)/);
      if (match) return `https://open.spotify.com/embed/track/${match[1]}`;
      return null;
    }
    case 'soundcloud': {
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%239b59b6&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;
    }
    case 'bandcamp': {
      return null; // Bandcamp embeds require album/track IDs, not URLs
    }
    default:
      return null;
  }
}

export function TrackEmbed({ url, platform, className }: TrackEmbedProps) {
  const embedUrl = getEmbedUrl(url, platform);

  if (!embedUrl) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg border border-hex-border bg-hex-surface px-4 py-3 text-sm text-accent-purple hover:border-primary transition-colors"
      >
        Listen on {platform}
      </a>
    );
  }

  const height = platform === 'spotify' ? '152' : '166';

  return (
    <iframe
      src={embedUrl}
      width="100%"
      height={height}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      className={className}
      title={`${platform} embed`}
    />
  );
}
