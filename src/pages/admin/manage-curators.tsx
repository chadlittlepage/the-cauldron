import { useAdminCurators } from '@/hooks/use-admin';
import { DataTable } from '@/components/admin/data-table';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CURATOR_MIN_LISTENERS } from '@/lib/constants';

export function ManageCuratorsPage() {
  const { data: curators, isLoading, isError, error } = useAdminCurators();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">Manage Curators</h1>
      <p className="mt-2 text-hex-muted">
        Curators need {CURATOR_MIN_LISTENERS.toLocaleString()}+ listeners to review
      </p>

      {isError ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Alert variant="error" className="max-w-md">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>{error instanceof Error ? error.message : 'Failed to load curators'}</AlertDescription>
          </Alert>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : (
        <DataTable
          className="mt-8"
          data={curators ?? []}
          keyExtractor={(row) => row.id}
          columns={[
            {
              header: 'Curator',
              accessor: (row) => (
                <div className="flex items-center gap-3">
                  <Avatar src={row.avatar_url} alt={row.display_name} fallback={row.display_name.slice(0, 2)} size="sm" />
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
                    <Badge variant="success" className="ml-2">Eligible</Badge>
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
      )}
    </div>
  );
}
