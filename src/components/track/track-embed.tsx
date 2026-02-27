import { useState } from 'react';
import type { MusicPlatform } from '@/types/database';
import { ExternalLink, Music } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrackEmbedProps {
  url: string;
  platform: MusicPlatform;
  className?: string;
}

function getEmbedUrl(url: string, platform: MusicPlatform): string | null {
  switch (platform) {
    case 'spotify': {
      const match = url.match(/track\/([a-zA-Z0-9]+)/);
      if (match) return `https://open.spotify.com/embed/track/${match[1]}?theme=0`;
      return null;
    }
    case 'soundcloud': {
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%238b5cf6&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;
    }
    case 'bandcamp': {
      return null;
    }
    default:
      return null;
  }
}

export function TrackEmbed({ url, platform, className }: TrackEmbedProps) {
  const embedUrl = getEmbedUrl(url, platform);
  const [loaded, setLoaded] = useState(false);

  if (!embedUrl) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'group flex items-center gap-3 rounded-xl glass-card p-5 transition-all duration-300 hover:shadow-lg hover:shadow-accent-purple/5',
          className,
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-purple/10">
          <Music className="h-6 w-6 text-accent-purple" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-hex-text group-hover:text-accent-purple transition-colors">
            Listen on {platform}
          </p>
          <p className="text-xs text-hex-muted mt-0.5">Opens in a new tab</p>
        </div>
        <ExternalLink className="h-4 w-4 text-hex-muted group-hover:text-accent-purple transition-colors" />
      </a>
    );
  }

  const height = platform === 'spotify' ? 152 : 166;

  return (
    <div
      className={cn('relative rounded-xl overflow-hidden', className)}
      style={{ background: '#000', height }}
    >
      <iframe
        src={embedUrl}
        width="100%"
        height={height}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        sandbox="allow-scripts allow-same-origin"
        loading="eager"
        title={`${platform} embed`}
        style={{ touchAction: 'auto' }}
        className={cn(
          'rounded-xl transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0',
        )}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
