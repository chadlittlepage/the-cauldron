import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useCuratorReviews } from '@/hooks/use-reviews';
import { useReviewQueue } from '@/hooks/use-submissions';
import { StatCard } from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { MessageSquare, Star, ListTodo } from 'lucide-react';

export function CuratorDashboardPage() {
  const { user, profile } = useAuth();
  const { data: reviews, isLoading: reviewsLoading } = useCuratorReviews(user?.id);
  const { data: queue, isLoading: queueLoading } = useReviewQueue();

  if (reviewsLoading || queueLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  const avgRating = reviews?.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 'N/A';

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">Curator Dashboard</h1>
      <p className="mt-1 text-hex-muted">Welcome back, {profile?.display_name}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Reviews Written" value={reviews?.length ?? 0} icon={<MessageSquare className="h-5 w-5" />} />
        <StatCard label="Avg Rating Given" value={avgRating} icon={<Star className="h-5 w-5" />} />
        <StatCard label="Queue Size" value={queue?.length ?? 0} icon={<ListTodo className="h-5 w-5" />} />
      </div>

      <div className="mt-10 flex gap-4">
        <Link to="/dashboard/review-queue">
          <Button variant="accent">Review Queue ({queue?.length ?? 0})</Button>
        </Link>
        <Link to="/dashboard/my-reviews">
          <Button variant="outline">My Reviews</Button>
        </Link>
        <Link to="/dashboard/curator-stats">
          <Button variant="outline">Stats</Button>
        </Link>
      </div>
    </div>
  );
}
