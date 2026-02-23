import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import type { Tables, SubmissionStatus } from '@/types/database';
import { ThumbsUp, Music, ExternalLink } from 'lucide-react';

interface SubmissionListProps {
  submissions: Tables<'submissions'>[];
  linkPrefix?: string;
  className?: string;
}

const statusVariant: Record<SubmissionStatus, 'warning' | 'default' | 'success' | 'error'> = {
  pending: 'warning',
  in_review: 'default',
  accepted: 'success',
  rejected: 'error',
};

export function SubmissionList({
  submissions,
  linkPrefix = '/dashboard/submission',
  className,
}: SubmissionListProps) {
  return (
    <div className={className}>
      <div className="space-y-3">
        {submissions.map((sub) => (
          <Link
            key={sub.id}
            to={`${linkPrefix}/${sub.id}`}
            className="group flex items-center justify-between gap-4 glass-card rounded-xl p-4 transition-all duration-300"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-purple/10">
                <Music className="h-4 w-4 text-accent-purple" />
              </div>
              <div className="min-w-0">
                <h3 className="font-medium truncate group-hover:text-accent-purple transition-colors">
                  {sub.track_title}
                </h3>
                <div className="mt-1.5 flex gap-2">
                  <Badge variant="outline">{sub.genre}</Badge>
                  <Badge variant={statusVariant[sub.status]}>
                    {sub.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-1.5 text-hex-muted">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-sm font-semibold">{sub.vote_count}</span>
              </div>
              <ExternalLink className="h-4 w-4 text-hex-muted opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
