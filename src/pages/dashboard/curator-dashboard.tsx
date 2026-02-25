import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useCuratorReviews } from '@/hooks/use-reviews';
import { useReviewQueue } from '@/hooks/use-submissions';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { StatCard } from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import { QueryError } from '@/components/ui/query-error';
import { SkeletonStats } from '@/components/ui/skeleton';
import { MessageSquare, Star, ListTodo, ArrowRight, Users } from 'lucide-react';

export function CuratorDashboardPage() {
  useDocumentTitle('Curator Dashboard');
  const { user, profile } = useAuth();
  const {
    data: reviews,
    isLoading: reviewsLoading,
    isError: reviewsError,
    error: reviewsErr,
    refetch: refetchReviews,
  } = useCuratorReviews(user?.id);
  const {
    data: queue,
    isLoading: queueLoading,
    isError: queueError,
    error: queueErr,
    refetch: refetchQueue,
  } = useReviewQueue();

  if (reviewsLoading || queueLoading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <SkeletonStats />
      </div>
    );
  }

  if (reviewsError || queueError) {
    const err = reviewsErr ?? queueErr;
    return (
      <QueryError
        error={err}
        fallbackMessage="Failed to load curator dashboard"
        onRetry={() => {
          refetchReviews();
          refetchQueue();
        }}
      />
    );
  }

  const avgRating = reviews?.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 'N/A';

  return (
    <div className="relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[300px] rounded-full bg-accent-pink/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-pink/10">
            <Users className="h-5 w-5 text-accent-pink" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Curator Dashboard</h1>
            <p className="text-sm text-hex-muted">Welcome back, {profile?.display_name}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3 mb-10">
          <StatCard
            label="Reviews Written"
            value={reviews?.length ?? 0}
            icon={<MessageSquare className="h-5 w-5" />}
          />
          <StatCard
            label="Avg Rating Given"
            value={avgRating}
            icon={<Star className="h-5 w-5" />}
          />
          <StatCard
            label="Queue Size"
            value={queue?.totalCount ?? 0}
            icon={<ListTodo className="h-5 w-5" />}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Link to="/dashboard/review-queue">
            <Button variant="accent" className="gap-2 group">
              Review Queue ({queue?.totalCount ?? 0})
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/dashboard/my-reviews">
            <Button variant="outline" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              My Reviews
            </Button>
          </Link>
          <Link to="/dashboard/curator-stats">
            <Button variant="outline" className="gap-2">
              <Star className="h-4 w-4" />
              Stats
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
