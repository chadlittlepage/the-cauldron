import { Link } from 'react-router-dom';
import { useReviewQueue } from '@/hooks/use-submissions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { EmptyState } from '@/components/ui/empty-state';
import { CheckCircle, ThumbsUp } from 'lucide-react';

export function ReviewQueuePage() {
  const { data: queue, isLoading } = useReviewQueue();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">Review Queue</h1>
      <p className="mt-2 text-hex-muted">Tracks waiting for your expert review</p>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : !queue?.length ? (
        <EmptyState
          icon={<CheckCircle className="h-12 w-12" />}
          title="Queue is empty"
          description="No tracks waiting for review. Check back later."
        />
      ) : (
        <div className="mt-8 space-y-3">
          {queue.map((submission) => (
            <div
              key={submission.id}
              className="flex items-center justify-between rounded-lg border border-hex-border bg-hex-card p-4"
            >
              <div>
                <h3 className="font-medium">{submission.track_title}</h3>
                <p className="mt-1 text-sm text-hex-muted">
                  by {(submission.profiles as { display_name: string } | null)?.display_name ?? 'Unknown'}
                </p>
                <div className="mt-2 flex gap-2">
                  <Badge variant="outline">{submission.genre}</Badge>
                  <Badge variant="outline">{submission.platform}</Badge>
                  <span className="flex items-center gap-1 text-xs text-hex-muted">
                    <ThumbsUp className="h-3 w-3" /> {submission.vote_count}
                  </span>
                </div>
              </div>
              <Link to={`/dashboard/review/${submission.id}`}>
                <Button variant="accent" size="sm">
                  Review
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
