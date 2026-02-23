import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import type { Tables, SubmissionStatus } from '@/types/database';
import { ThumbsUp } from 'lucide-react';

interface SubmissionListProps {
  submissions: Tables<'submissions'>[];
  linkPrefix?: string;
}

const statusVariant: Record<SubmissionStatus, 'warning' | 'default' | 'success' | 'error'> = {
  pending: 'warning',
  in_review: 'default',
  accepted: 'success',
  rejected: 'error',
};

export function SubmissionList({ submissions, linkPrefix = '/dashboard/submission' }: SubmissionListProps) {
  return (
    <div className="space-y-3">
      {submissions.map((sub) => (
        <Link
          key={sub.id}
          to={`${linkPrefix}/${sub.id}`}
          className="flex items-center justify-between rounded-lg border border-hex-border bg-hex-card p-4 transition-colors hover:border-primary"
        >
          <div>
            <h3 className="font-medium">{sub.track_title}</h3>
            <div className="mt-1 flex gap-2">
              <Badge variant="outline">{sub.genre}</Badge>
              <Badge variant={statusVariant[sub.status]}>{sub.status.replace('_', ' ')}</Badge>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-hex-muted">
            <ThumbsUp className="h-4 w-4" />
            <span className="text-sm font-semibold">{sub.vote_count}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
