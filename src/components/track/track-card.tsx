import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Music, ThumbsUp, ExternalLink } from 'lucide-react';
import type { MusicPlatform, SubmissionStatus } from '@/types/database';

interface TrackCardProps {
  id: string;
  trackTitle: string;
  artistName: string;
  genre: string;
  platform: MusicPlatform;
  status: SubmissionStatus;
  voteCount: number;
  createdAt: string;
}

const statusVariant: Record<SubmissionStatus, 'warning' | 'default' | 'success' | 'error'> = {
  pending: 'warning',
  in_review: 'default',
  accepted: 'success',
  rejected: 'error',
};

const platformColors: Record<MusicPlatform, string> = {
  spotify: 'text-green-400',
  soundcloud: 'text-orange-400',
  bandcamp: 'text-cyan-400',
  other: 'text-hex-muted',
};

export const TrackCard = memo(function TrackCard({
  id,
  trackTitle,
  artistName,
  genre,
  platform,
  status,
  voteCount,
  createdAt,
}: TrackCardProps) {
  return (
    <Link
      to={`/track/${id}`}
      className="group block glass-card rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-accent-purple/5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-purple/10">
              <Music className="h-4 w-4 text-accent-purple" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-hex-text truncate group-hover:text-accent-purple transition-colors">
                {trackTitle}
              </h3>
              <p className="text-xs text-hex-muted">by {artistName}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="outline">{genre}</Badge>
            <Badge variant="outline" className={platformColors[platform]}>
              {platform}
            </Badge>
            <Badge variant={statusVariant[status]}>
              {status.replace('_', ' ')}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1.5 rounded-lg bg-hex-surface/80 px-3 py-2.5">
          <ThumbsUp className="h-4 w-4 text-accent-purple" />
          <span className="text-sm font-bold text-hex-text">{voteCount}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-hex-muted">
        <span>{new Date(createdAt).toLocaleDateString()}</span>
        <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-accent-purple">
          View details <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
});
