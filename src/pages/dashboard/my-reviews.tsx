import { useAuth } from '@/hooks/use-auth';
import { useCuratorReviews } from '@/hooks/use-reviews';
import { ReviewCard } from '@/components/review/review-card';
import { Spinner } from '@/components/ui/spinner';
import { EmptyState } from '@/components/ui/empty-state';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { MessageSquare } from 'lucide-react';

export function MyReviewsPage() {
  const { user } = useAuth();
  const { data: reviews, isLoading, isError, error } = useCuratorReviews(user?.id);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">My Reviews</h1>
      <p className="mt-2 text-hex-muted">All reviews you&apos;ve written</p>

      {isError ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Alert variant="error" className="max-w-md">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>{error instanceof Error ? error.message : 'Failed to load reviews'}</AlertDescription>
          </Alert>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
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
