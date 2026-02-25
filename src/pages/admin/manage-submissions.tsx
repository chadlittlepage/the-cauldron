import { useState } from 'react';
import { useAdminSubmissions, useUpdateSubmissionStatus } from '@/hooks/use-admin';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { DataTable } from '@/components/admin/data-table';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
import { Pagination } from '@/components/ui/pagination';
import { QueryError } from '@/components/ui/query-error';
import { SkeletonTable } from '@/components/ui/skeleton';
import { STATUSES } from '@/lib/constants';
import type { SubmissionStatus } from '@/types/database';

export function ManageSubmissionsPage() {
  useDocumentTitle('Manage Submissions');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, refetch } = useAdminSubmissions({ status: statusFilter || undefined, page });
  const updateStatus = useUpdateSubmissionStatus();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">Manage Submissions</h1>

      <div className="mt-6 flex gap-4">
        <Select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="w-48"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </Select>
      </div>

      {isError ? (
        <QueryError error={error} fallbackMessage="Failed to load submissions" onRetry={() => refetch()} />
      ) : isLoading ? (
        <SkeletonTable rows={5} />
      ) : (
        <>
          <DataTable
            className="mt-6"
            data={data?.data ?? []}
            keyExtractor={(row) => row.id}
            columns={[
              {
                header: 'Track',
                accessor: (row) => (
                  <div>
                    <p className="font-medium">{row.track_title}</p>
                    <p className="text-xs text-hex-muted">
                      {(row.profiles as { display_name: string } | null)?.display_name}
                    </p>
                  </div>
                ),
              },
              {
                header: 'Genre',
                accessor: (row) => <Badge variant="outline">{row.genre}</Badge>,
              },
              {
                header: 'Status',
                accessor: (row) => (
                  <Select
                    value={row.status}
                    onChange={(e) =>
                      updateStatus.mutate({
                        id: row.id,
                        status: e.target.value as SubmissionStatus,
                        oldStatus: row.status,
                      })
                    }
                    className="w-32"
                  >
                    {STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </Select>
                ),
              },
              {
                header: 'Votes',
                accessor: (row) => row.vote_count,
                className: 'text-right',
              },
              {
                header: 'Date',
                accessor: (row) => new Date(row.created_at).toLocaleDateString(),
              },
            ]}
          />
          <Pagination page={page} totalPages={data?.totalPages ?? 1} onPageChange={setPage} className="mt-6" />
        </>
      )}
    </div>
  );
}
