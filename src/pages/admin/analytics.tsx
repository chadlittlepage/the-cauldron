import { useAdminStats } from '@/hooks/use-admin';
import { StatsGrid } from '@/components/admin/stats-grid';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export function AnalyticsPage() {
  const { data: stats, isLoading, isError, error } = useAdminStats();

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
          <AlertDescription>{error instanceof Error ? error.message : 'Failed to load analytics'}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <p className="mt-2 text-hex-muted">Platform performance metrics</p>

      <div className="mt-8">
        <StatsGrid
          totalSubmissions={stats?.totalSubmissions ?? 0}
          totalCurators={stats?.totalCurators ?? 0}
          totalPayments={stats?.totalPayments ?? 0}
          totalRevenueCents={stats?.totalRevenueCents ?? 0}
        />
      </div>

      <div className="mt-10 rounded-lg border border-hex-border bg-hex-card p-8 text-center text-hex-muted">
        <p>Detailed analytics with charts and trends will be available in a future update.</p>
      </div>
    </div>
  );
}
