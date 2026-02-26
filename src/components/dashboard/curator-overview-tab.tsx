import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useCuratorReviews } from '@/hooks/use-reviews';
import { useReviewQueue } from '@/hooks/use-submissions';
import { useCuratorPayouts } from '@/hooks/use-curator-analytics';
import { StatCard } from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Star, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';

export function CuratorOverviewTab() {
  const { user } = useAuth();
  const { data: reviews } = useCuratorReviews(user?.id);
  const { data: queue } = useReviewQueue();
  const { data: payouts } = useCuratorPayouts(user?.id);

  const totalReviews = reviews?.length ?? 0;
  const avgRating = totalReviews
    ? (reviews!.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : 'N/A';

  const queueSize = queue?.totalCount ?? 0;

  // Acceptance rate: reviews with rating >= 4 out of total reviews
  const accepted = reviews?.filter((r) => r.rating >= 4).length ?? 0;
  const acceptanceRate =
    totalReviews > 0 ? `${Math.round((accepted / totalReviews) * 100)}%` : 'N/A';

  const totalEarnedCents = (payouts ?? [])
    .filter((p) => p.paid_at)
    .reduce((sum, p) => sum + p.amount_cents, 0);
  const totalEarned = `$${(totalEarnedCents / 100).toFixed(2)}`;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Reviews"
          value={totalReviews}
          icon={<MessageSquare className="h-5 w-5" />}
        />
        <StatCard
          label="Total Earnings"
          value={totalEarned}
          icon={<DollarSign className="h-5 w-5" />}
        />
        <StatCard
          label="Acceptance Rate"
          value={acceptanceRate}
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <StatCard label="Avg Rating Given" value={avgRating} icon={<Star className="h-5 w-5" />} />
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/dashboard/review-queue">
          <Button variant="accent" className="gap-2 group">
            Review Queue ({queueSize})
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
        <Link to="/dashboard/my-reviews">
          <Button variant="outline" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            My Reviews
          </Button>
        </Link>
      </div>
    </div>
  );
}
