import { useAuth } from '@/hooks/use-auth';
import { useCuratorReviews } from '@/hooks/use-reviews';
import { useReviewQueue } from '@/hooks/use-submissions';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { Tabs } from '@/components/ui/tabs';
import { CuratorOverviewTab } from '@/components/dashboard/curator-overview-tab';
import { CuratorAnalyticsTab } from '@/components/dashboard/curator-analytics-tab';
import { CuratorReviewsTab } from '@/components/dashboard/curator-reviews-tab';
import { CuratorPayoutsTab } from '@/components/dashboard/curator-payouts-tab';
import { SettingsTab } from '@/components/dashboard/settings-tab';
import { QueryError } from '@/components/ui/query-error';
import { SkeletonStats } from '@/components/ui/skeleton';
import { Users } from 'lucide-react';

export function CuratorDashboardPage() {
  useDocumentTitle('Curator Dashboard');
  const { user, profile } = useAuth();
  const {
    isLoading: reviewsLoading,
    isError: reviewsError,
    error: reviewsErr,
    refetch: refetchReviews,
  } = useCuratorReviews(user?.id);
  const {
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

  const tabs = [
    { value: 'overview', label: 'Overview', content: <CuratorOverviewTab /> },
    { value: 'analytics', label: 'Analytics', content: <CuratorAnalyticsTab /> },
    { value: 'reviews', label: 'Reviews', content: <CuratorReviewsTab /> },
    { value: 'payouts', label: 'Payouts', content: <CuratorPayoutsTab /> },
    { value: 'settings', label: 'Settings', content: <SettingsTab /> },
  ];

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

        {/* Tabs */}
        <Tabs tabs={tabs} defaultValue="overview" />
      </div>
    </div>
  );
}
