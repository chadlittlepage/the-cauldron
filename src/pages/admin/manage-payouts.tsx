import { useAdminPayouts } from '@/hooks/use-admin';
import { DataTable } from '@/components/admin/data-table';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';

export function ManagePayoutsPage() {
  const { data: payouts, isLoading } = useAdminPayouts();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">Manage Payouts</h1>
      <p className="mt-2 text-hex-muted">Curator payment history</p>

      {isLoading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : (
        <DataTable
          className="mt-8"
          data={payouts ?? []}
          keyExtractor={(row) => row.id}
          columns={[
            {
              header: 'Curator',
              accessor: (row) =>
                (row.profiles as { display_name: string } | null)?.display_name ?? 'Unknown',
            },
            {
              header: 'Amount',
              accessor: (row) => `$${(row.amount_cents / 100).toFixed(2)}`,
            },
            {
              header: 'Period',
              accessor: (row) => row.period,
            },
            {
              header: 'Reviews',
              accessor: (row) => row.review_count,
            },
            {
              header: 'Status',
              accessor: (row) => (
                <Badge variant={row.paid_at ? 'success' : 'warning'}>
                  {row.paid_at ? 'Paid' : 'Pending'}
                </Badge>
              ),
            },
            {
              header: 'Date',
              accessor: (row) => row.paid_at ? new Date(row.paid_at).toLocaleDateString() : '-',
            },
          ]}
        />
      )}
    </div>
  );
}
