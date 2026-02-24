import { useAuth } from '@/hooks/use-auth';
import { useCuratorReviews } from '@/hooks/use-reviews';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { ReviewCard } from '@/components/review/review-card';
import { QueryError } from '@/components/ui/query-error';
import { SkeletonTable } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { MessageSquare } from 'lucide-react';

export function MyReviewsPage() {
  useDocumentTitle('My Reviews');
  const { user } = useAuth();
  const { data: reviews, isLoading, isError, error, refetch } = useCuratorReviews(user?.id);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">My Reviews</h1>
      <p className="mt-2 text-hex-muted">All reviews you&apos;ve written</p>

      {isError ? (
        <QueryError error={error} fallbackMessage="Failed to load reviews" onRetry={() => refetch()} />
      ) : isLoading ? (
        <SkeletonTable rows={5} />
      ) : !reviews?.length ? (
        <EmptyState
          icon={<MessageSquare className="h-12 w-12" />}
          title="No reviews yet"
          description="Head to the review queue to start reviewing tracks."
        />
      ) : (
        <div className="mt-8 space-y-4">
          {reviews.map((review) => {
            const submission = review.submissions as { track_title: string; genre: string } | null;
            return (
              <ReviewCard
                key={review.id}
                id={review.id}
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
      )}
    </div>
  );
}
