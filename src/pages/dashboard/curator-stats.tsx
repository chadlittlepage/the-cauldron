import { useAuth } from '@/hooks/use-auth';
import { useCuratorReviews } from '@/hooks/use-reviews';
import { StatCard } from '@/components/dashboard/stat-card';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { MessageSquare, Star, TrendingUp } from 'lucide-react';

export function CuratorStatsPage() {
  const { user } = useAuth();
  const { data: reviews, isLoading, isError, error } = useCuratorReviews(user?.id);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Alert variant="error" className="max-w-md">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'Failed to load curator stats'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const totalReviews = reviews?.length ?? 0;
  const avgRating = totalReviews
    ? (reviews!.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : 'N/A';

  const ratingDistribution = [1, 2, 3, 4, 5].map((star) => ({
    star,
    count: reviews?.filter((r) => r.rating === star).length ?? 0,
  }));

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">Curator Stats</h1>
      <p className="mt-2 text-hex-muted">Your review performance</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Reviews"
          value={totalReviews}
          icon={<MessageSquare className="h-5 w-5" />}
        />
        <StatCard label="Average Rating" value={avgRating} icon={<Star className="h-5 w-5" />} />
        <StatCard
          label="This Month"
          value={
            reviews?.filter((r) => {
              const d = new Date(r.created_at);
              const now = new Date();
              return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            }).length ?? 0
          }
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Rating Distribution</h2>
        <div className="mt-4 space-y-2">
          {ratingDistribution.reverse().map(({ star, count }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="w-12 text-sm text-hex-muted">{star} star</span>
              <div className="flex-1 rounded-full bg-hex-border h-3">
                <div
                  className="h-full rounded-full bg-accent-orange transition-all"
                  style={{ width: totalReviews ? `${(count / totalReviews) * 100}%` : '0%' }}
                />
              </div>
              <span className="w-8 text-sm text-hex-muted text-right">{count}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
