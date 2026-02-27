import { useAuth } from '@/hooks/use-auth';
import { useCuratorReviews } from '@/hooks/use-reviews';
import {
  useCuratorReviewsByMonth,
  useCuratorGenrePerformance,
  useCuratorEarningsByMonth,
} from '@/hooks/use-curator-analytics';
import { BarChart } from '@/components/dashboard/bar-chart';
import { Button } from '@/components/ui/button';
import { RefreshCw, Star } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/hooks/query-keys';

export function CuratorAnalyticsTab() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: reviews } = useCuratorReviews(user?.id);
  const { data: monthlyData } = useCuratorReviewsByMonth(user?.id);
  const { data: genreData } = useCuratorGenrePerformance(user?.id);
  const { data: earningsData } = useCuratorEarningsByMonth(user?.id);

  function handleRefresh() {
    queryClient.invalidateQueries({ queryKey: ['curator-analytics'] as const });
    queryClient.invalidateQueries({ queryKey: queryKeys.reviews.all });
  }

  const reviewMonths = (monthlyData ?? []).map((d) => ({
    label: d.month.slice(5),
    value: d.count,
  }));

  const genreChartData = (genreData ?? []).map((d) => ({
    label: d.genre,
    value: d.reviews,
  }));

  const ratingsData = [1, 2, 3, 4, 5].map((star) => ({
    label: `${star}\u2605`,
    value: reviews?.filter((r) => r.rating === star).length ?? 0,
  }));

  const avgRating =
    reviews && reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '0.0';

  const earningsChartData = (earningsData ?? []).map((d) => ({
    label: d.month.slice(5),
    value: d.earnings_cents / 100,
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Analytics</h3>
          <p className="text-sm text-hex-muted">Your review performance over the last 6 months</p>
        </div>
        <Button variant="ghost" size="sm" className="gap-2" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-xl p-6">
          <h4 className="text-sm font-semibold mb-4">Reviews Over Time</h4>
          {reviewMonths.length > 0 ? (
            <BarChart data={reviewMonths} color="#4a556c" height={180} />
          ) : (
            <p className="text-sm text-hex-muted py-8 text-center">No review data yet</p>
          )}
        </div>

        <div className="glass-card rounded-xl p-6">
          <h4 className="text-sm font-semibold mb-4">Genre Performance</h4>
          {genreChartData.length > 0 ? (
            <BarChart data={genreChartData} color="#6366f1" height={180} />
          ) : (
            <p className="text-sm text-hex-muted py-8 text-center">No genre data available</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold">Rating Distribution</h4>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="font-bold">{avgRating}</span>
            </div>
          </div>
          <BarChart data={ratingsData} color="#f59e0b" height={180} />
        </div>

        <div className="glass-card rounded-xl p-6">
          <h4 className="text-sm font-semibold mb-4">Earnings Over Time</h4>
          {earningsChartData.length > 0 ? (
            <BarChart data={earningsChartData} color="#22c55e" height={180} />
          ) : (
            <p className="text-sm text-hex-muted py-8 text-center">No earnings data yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
