import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useCuratorReviews } from '@/hooks/use-reviews';
import { useReviewQueue } from '@/hooks/use-submissions';
import { StatCard } from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { MessageSquare, Star, ListTodo, ArrowRight, Users } from 'lucide-react';

export function CuratorDashboardPage() {
  const { user, profile } = useAuth();
  const { data: reviews, isLoading: reviewsLoading, isError: reviewsError, error: reviewsErr } = useCuratorReviews(user?.id);
  const { data: queue, isLoading: queueLoading, isError: queueError, error: queueErr } = useReviewQueue();

  if (reviewsLoading || queueLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Spinner size="lg" />
        <p className="text-sm text-hex-muted">Loading dashboard...</p>
      </div>
    );
  }

  if (reviewsError || queueError) {
    const err = reviewsErr ?? queueErr;
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Alert variant="error" className="max-w-md">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>{err instanceof Error ? err.message : 'Failed to load curator dashboard'}</AlertDescription>
        </Alert>
      </div>
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
            value={queue?.length ?? 0}
            icon={<ListTodo className="h-5 w-5" />}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Link to="/dashboard/review-queue">
            <Button variant="accent" className="gap-2 group">
              Review Queue ({queue?.length ?? 0})
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
