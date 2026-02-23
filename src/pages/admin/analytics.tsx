import { useAdminStats, useAdminAnalytics } from '@/hooks/use-admin';
import { StatsGrid } from '@/components/admin/stats-grid';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export function AnalyticsPage() {
  const { data: stats, isLoading, isError, error } = useAdminStats();
  const { data: analytics, isLoading: analyticsLoading } = useAdminAnalytics();

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

  const genreCounts = analytics?.genreBreakdown.map((g) => g.count) ?? [];
  const maxGenreCount = genreCounts.length > 0 ? Math.max(...genreCounts) : 1;

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

      {analyticsLoading ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : analytics ? (
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Genre Distribution */}
          <div className="rounded-lg border border-hex-border bg-hex-card p-6">
            <h2 className="text-lg font-semibold mb-4">Submissions by Genre</h2>
            {analytics.genreBreakdown.length === 0 ? (
              <p className="text-sm text-hex-muted">No data yet</p>
            ) : (
              <div className="space-y-3">
                {analytics.genreBreakdown.map((g) => (
                  <div key={g.genre} className="flex items-center gap-3">
                    <span className="w-24 text-sm text-hex-muted capitalize truncate">{g.genre}</span>
                    <div className="flex-1 h-6 bg-hex-surface rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent-purple/60"
                        style={{ width: `${(g.count / maxGenreCount) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8 text-right">{g.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Monthly Submissions Trend */}
          <div className="rounded-lg border border-hex-border bg-hex-card p-6">
            <h2 className="text-lg font-semibold mb-4">Monthly Submissions</h2>
            {analytics.monthlySubmissions.length === 0 ? (
              <p className="text-sm text-hex-muted">No data yet</p>
            ) : (
              <div className="space-y-2">
                {analytics.monthlySubmissions.map((m) => (
                  <div key={m.month} className="flex items-center justify-between py-2 border-b border-hex-border last:border-0">
                    <span className="text-sm text-hex-muted">{m.month}</span>
                    <span className="text-sm font-semibold">{m.count} submissions</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top Curators */}
          <div className="rounded-lg border border-hex-border bg-hex-card p-6">
            <h2 className="text-lg font-semibold mb-4">Top Curators</h2>
            {analytics.topCurators.length === 0 ? (
              <p className="text-sm text-hex-muted">No data yet</p>
            ) : (
              <div className="space-y-3">
                {analytics.topCurators.map((c, idx) => (
                  <div key={c.curator_id} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-hex-surface text-xs font-bold">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{c.display_name}</p>
                      <p className="text-xs text-hex-muted">
                        {c.review_count} reviews &middot; avg {c.avg_rating}/5
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Revenue Summary */}
          <div className="rounded-lg border border-hex-border bg-hex-card p-6">
            <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
            {analytics.monthlyRevenue.length === 0 ? (
              <p className="text-sm text-hex-muted">No data yet</p>
            ) : (
              <div className="space-y-2">
                {analytics.monthlyRevenue.map((r) => (
                  <div key={r.month} className="flex items-center justify-between py-2 border-b border-hex-border last:border-0">
                    <span className="text-sm text-hex-muted">{r.month}</span>
                    <span className="text-sm font-semibold">${(r.revenue_cents / 100).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
