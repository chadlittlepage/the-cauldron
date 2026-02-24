import { useState } from 'react';
import { useAdminPayouts } from '@/hooks/use-admin';
import { DataTable } from '@/components/admin/data-table';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { Pagination } from '@/components/ui/pagination';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export function ManagePayoutsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useAdminPayouts({ page });
  const payouts = data?.data;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">Manage Payouts</h1>
      <p className="mt-2 text-hex-muted">Curator payment history</p>

      {isError ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Alert variant="error" className="max-w-md">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>{error instanceof Error ? error.message : 'Failed to load payouts'}</AlertDescription>
          </Alert>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : (
        <>
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
          {data && data.totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
              className="mt-8"
            />
          )}
        </>
      )}
    </div>
  );
}
