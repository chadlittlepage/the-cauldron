import { useAuth } from '@/hooks/use-auth';
import { useCuratorReviews } from '@/hooks/use-reviews';
import { ReviewCard } from '@/components/review/review-card';
import { EmptyState } from '@/components/ui/empty-state';
import { QueryError } from '@/components/ui/query-error';
import { SkeletonTable } from '@/components/ui/skeleton';
import { MessageSquare } from 'lucide-react';

export function CuratorReviewsTab() {
  const { user } = useAuth();
  const { data: reviews, isLoading, isError, error, refetch } = useCuratorReviews(user?.id);

  if (isError) {
    return (
      <QueryError
        error={error}
        fallbackMessage="Failed to load reviews"
        onRetry={() => refetch()}
      />
    );
  }

  if (isLoading) {
    return <SkeletonTable rows={5} />;
  }

  if (!reviews?.length) {
    return (
      <EmptyState
        icon={<MessageSquare className="h-12 w-12" />}
        title="No reviews yet"
        description="Head to the review queue to start reviewing tracks."
      />
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const submission = review.submissions as { track_title: string; genre: string } | null;
        return (
          <ReviewCard
            key={review.id}
            submissionId={review.submission_id}
            trackTitle={submission?.track_title ?? 'Unknown'}
            genre={submission?.genre ?? ''}
            rating={review.rating}
            feedback={review.feedback}
            createdAt={review.created_at}
          />
        );
      })}
    </div>
  );
}
