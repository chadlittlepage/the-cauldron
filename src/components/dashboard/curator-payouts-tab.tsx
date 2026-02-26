import { useAuth } from '@/hooks/use-auth';
import { useCuratorPayouts } from '@/hooks/use-curator-analytics';
import { StatCard } from '@/components/dashboard/stat-card';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { QueryError } from '@/components/ui/query-error';
import { SkeletonTable } from '@/components/ui/skeleton';
import { DollarSign, Clock } from 'lucide-react';

export function CuratorPayoutsTab() {
  const { user } = useAuth();
  const { data: payouts, isLoading, isError, error, refetch } = useCuratorPayouts(user?.id);

  if (isError) {
    return (
      <QueryError
        error={error}
        fallbackMessage="Failed to load payouts"
        onRetry={() => refetch()}
      />
    );
  }

  if (isLoading) {
    return <SkeletonTable rows={5} />;
  }

  const totalEarned = (payouts ?? [])
    .filter((p) => p.paid_at)
    .reduce((sum, p) => sum + p.amount_cents, 0);
  const pendingAmount = (payouts ?? [])
    .filter((p) => !p.paid_at)
    .reduce((sum, p) => sum + p.amount_cents, 0);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          label="Total Earned"
          value={`$${(totalEarned / 100).toFixed(2)}`}
          icon={<DollarSign className="h-5 w-5" />}
        />
        <StatCard
          label="Pending"
          value={`$${(pendingAmount / 100).toFixed(2)}`}
          icon={<Clock className="h-5 w-5" />}
        />
      </div>

      {!payouts?.length ? (
        <EmptyState
          icon={<DollarSign className="h-12 w-12" />}
          title="No payouts yet"
          description="Payouts appear here once you've completed reviews and a payout period closes."
        />
      ) : (
        <div className="glass-card rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-hex-border text-left">
                <th className="px-5 py-3 text-xs font-semibold text-hex-muted uppercase tracking-wider">
                  Period
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-hex-muted uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-hex-muted uppercase tracking-wider">
                  Reviews
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-hex-muted uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hex-border">
              {payouts.map((payout) => (
                <tr key={payout.id} className="transition-colors hover:bg-hex-surface/40">
                  <td className="px-5 py-4 text-sm font-medium">{payout.period}</td>
                  <td className="px-5 py-4 text-sm">${(payout.amount_cents / 100).toFixed(2)}</td>
                  <td className="px-5 py-4 text-sm text-hex-muted">{payout.review_count}</td>
                  <td className="px-5 py-4">
                    {payout.paid_at ? (
                      <Badge variant="success">Paid</Badge>
                    ) : (
                      <Badge variant="warning">Pending</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
