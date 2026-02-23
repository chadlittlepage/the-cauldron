import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Music, ThumbsUp } from 'lucide-react';
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

export function TrackCard({
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
      className="block rounded-lg border border-hex-border bg-hex-card p-5 transition-colors hover:border-primary"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Music className="h-4 w-4 text-hex-muted shrink-0" />
            <h3 className="font-semibold text-hex-text truncate">{trackTitle}</h3>
          </div>
          <p className="mt-1 text-sm text-hex-muted">by {artistName}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge variant="outline">{genre}</Badge>
            <Badge variant="outline">{platform}</Badge>
            <Badge variant={statusVariant[status]}>{status.replace('_', ' ')}</Badge>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 text-hex-muted">
          <ThumbsUp className="h-5 w-5" />
          <span className="text-sm font-semibold">{voteCount}</span>
        </div>
      </div>
      <p className="mt-3 text-xs text-hex-muted">
        {new Date(createdAt).toLocaleDateString()}
      </p>
    </Link>
  );
}
