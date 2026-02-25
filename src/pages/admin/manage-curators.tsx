import { useState } from 'react';
import { useAdminCurators } from '@/hooks/use-admin';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { DataTable } from '@/components/admin/data-table';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { QueryError } from '@/components/ui/query-error';
import { SkeletonTable } from '@/components/ui/skeleton';
import { Pagination } from '@/components/ui/pagination';
import { CURATOR_MIN_LISTENERS } from '@/lib/constants';

export function ManageCuratorsPage() {
  useDocumentTitle('Manage Curators');
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, refetch } = useAdminCurators({ page });
  const curators = data?.data;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">Manage Curators</h1>
      <p className="mt-2 text-hex-muted">
        Curators need {CURATOR_MIN_LISTENERS.toLocaleString()}+ listeners to review
      </p>

      {isError ? (
        <QueryError
          error={error}
          fallbackMessage="Failed to load curators"
          onRetry={() => refetch()}
        />
      ) : isLoading ? (
        <SkeletonTable rows={5} />
      ) : (
        <>
          <DataTable
            className="mt-8"
            data={curators ?? []}
            keyExtractor={(row) => row.id}
            columns={[
              {
                header: 'Curator',
                accessor: (row) => (
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={row.avatar_url}
                      alt={row.display_name}
                      fallback={row.display_name.slice(0, 2)}
                      size="sm"
                    />
                    <div>
                      <p className="font-medium">{row.display_name}</p>
                      <p className="text-xs text-hex-muted">{row.email}</p>
                    </div>
                  </div>
                ),
              },
              {
                header: 'Listeners',
                accessor: (row) => (
                  <span>
                    {row.listener_count.toLocaleString()}
                    {row.listener_count >= CURATOR_MIN_LISTENERS && (
                      <Badge variant="success" className="ml-2">
                        Eligible
                      </Badge>
                    )}
                  </span>
                ),
              },
              {
                header: 'Joined',
                accessor: (row) => new Date(row.created_at).toLocaleDateString(),
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
