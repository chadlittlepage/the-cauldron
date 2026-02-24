import { useState } from 'react';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { Tabs } from '@/components/ui/tabs';
import { DataTable } from '@/components/admin/data-table';
import { QueryError } from '@/components/ui/query-error';
import { SkeletonTable } from '@/components/ui/skeleton';
import { Pagination } from '@/components/ui/pagination';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  useSupabaseHealth,
  useEdgeFunctionHealth,
  useSentryIssues,
  useTableInspector,
  useAuditLogs,
} from '@/hooks/use-debug';
import type { AuditAction } from '@/types/database';
import {
  Bug,
  Search,
  ExternalLink,
} from 'lucide-react';

// ──────────────────────────────────────────────
// System Health Tab
// ──────────────────────────────────────────────

function SystemHealthTab() {
  const supaHealth = useSupabaseHealth();
  const edgeHealth = useEdgeFunctionHealth();
  const sentry = useSentryIssues();

  return (
    <div className="space-y-8">
      {/* Supabase connection */}
      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-hex-muted mb-3">Supabase Connection</h3>
        <div className="glass-card rounded-xl p-4 flex items-center gap-3">
          <span
            className={`h-3 w-3 rounded-full ${supaHealth.data?.connected ? 'bg-success shadow-sm shadow-success/40' : 'bg-error shadow-sm shadow-error/40'}`}
          />
          <span className="text-sm font-medium">
            {supaHealth.isLoading
              ? 'Checking...'
              : supaHealth.data?.connected
                ? 'Connected'
                : 'Disconnected'}
          </span>
          {supaHealth.data?.latencyMs != null && (
            <Badge variant="outline" className="ml-auto">{supaHealth.data.latencyMs}ms</Badge>
          )}
        </div>
      </section>

      {/* Edge Functions */}
      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-hex-muted mb-3">Edge Functions</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {edgeHealth.isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-card rounded-xl p-4 animate-pulse h-14" />
            ))
          ) : (
            edgeHealth.data?.map((fn) => (
              <div key={fn.name} className="glass-card rounded-xl p-4 flex items-center gap-3">
                <span
                  className={`h-3 w-3 rounded-full ${fn.status === 'ok' ? 'bg-success shadow-sm shadow-success/40' : 'bg-error shadow-sm shadow-error/40'}`}
                />
                <span className="text-sm font-medium font-mono">{fn.name}</span>
                <Badge variant="outline" className="ml-auto">{fn.latencyMs}ms</Badge>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Sentry Issues */}
      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-hex-muted mb-3">Sentry Issues</h3>
        {sentry.isLoading ? (
          <SkeletonTable rows={3} />
        ) : sentry.isError ? (
          <div className="glass-card rounded-xl p-5 text-center space-y-2">
            <p className="text-sm text-hex-muted">Could not fetch Sentry issues</p>
            <a
              href="https://cell-division.sentry.io/issues/?project=4510938330431488"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-accent-purple hover:underline"
            >
              View in Sentry <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ) : sentry.data && sentry.data.length > 0 ? (
          <DataTable
            columns={[
              { header: 'Title', accessor: (r) => <span className="font-medium">{r.title}</span> },
              { header: 'Events', accessor: (r) => r.count, className: 'w-20 text-center' },
              {
                header: 'Last Seen',
                accessor: (r) => (
                  <span className="text-hex-muted text-xs">
                    {new Date(r.lastSeen).toLocaleDateString()}
                  </span>
                ),
              },
              {
                header: '',
                accessor: (r) =>
                  r.permalink ? (
                    <a
                      href={r.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-purple hover:underline text-xs"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : null,
                className: 'w-10',
              },
            ]}
            data={sentry.data}
            keyExtractor={(r) => r.id}
          />
        ) : (
          <div className="glass-card rounded-xl p-5 text-center">
            <p className="text-sm text-hex-muted">No unresolved issues</p>
          </div>
        )}
      </section>
    </div>
  );
}

// ──────────────────────────────────────────────
// Data Inspector Tab
// ──────────────────────────────────────────────

const INSPECTABLE_TABLES = [
  'profiles',
  'submissions',
  'reviews',
  'payments',
  'votes',
  'curator_payouts',
  'charts',
] as const;

type InspectableTable = (typeof INSPECTABLE_TABLES)[number];

function DataInspectorTab() {
  const [table, setTable] = useState<InspectableTable>('submissions');
  const [searchId, setSearchId] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, refetch } = useTableInspector(table, {
    id: searchId || undefined,
    page,
  });

  const columns =
    data?.data && data.data.length > 0
      ? Object.keys(data.data[0] as Record<string, unknown>).map((key) => ({
          header: key,
          accessor: (row: Record<string, unknown>) => {
            const val = row[key];
            if (val === null) return <span className="text-hex-muted italic">null</span>;
            if (typeof val === 'object') return <code className="text-xs">{JSON.stringify(val)}</code>;
            return String(val);
          },
          className: 'max-w-[200px] truncate',
        }))
      : [];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <Select
          value={table}
          onChange={(e) => {
            setTable(e.target.value as InspectableTable);
            setPage(1);
            setSearchId('');
          }}
          className="sm:w-48"
        >
          {INSPECTABLE_TABLES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </Select>
        <Input
          placeholder="Search by ID..."
          value={searchId}
          onChange={(e) => {
            setSearchId(e.target.value);
            setPage(1);
          }}
          icon={<Search className="h-4 w-4" />}
          className="sm:flex-1"
        />
      </div>

      {isLoading ? (
        <SkeletonTable rows={5} />
      ) : isError ? (
        <QueryError error={error} fallbackMessage="Failed to load table data" onRetry={() => refetch()} />
      ) : data?.data && data.data.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <DataTable
              columns={columns}
              data={data.data as Record<string, unknown>[]}
              keyExtractor={(row) => String((row as Record<string, unknown>).id ?? Math.random())}
            />
          </div>
          <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} className="mt-4" />
        </>
      ) : (
        <div className="glass-card rounded-xl p-8 text-center">
          <p className="text-sm text-hex-muted">No results found</p>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// Audit Trail Tab
// ──────────────────────────────────────────────

const AUDIT_ACTIONS: { value: AuditAction | ''; label: string }[] = [
  { value: '', label: 'All actions' },
  { value: 'submission_status_change', label: 'Status Change' },
  { value: 'curator_role_change', label: 'Role Change' },
  { value: 'payout_created', label: 'Payout Created' },
  { value: 'profile_updated', label: 'Profile Updated' },
  { value: 'submission_deleted', label: 'Submission Deleted' },
  { value: 'manual_action', label: 'Manual Action' },
];

interface AuditRow {
  id: string;
  admin_id: string;
  action: AuditAction;
  target_type: string;
  target_id: string;
  metadata: Record<string, unknown>;
  created_at: string;
  profiles: { display_name: string } | null;
}

function AuditTrailTab() {
  const [actionFilter, setActionFilter] = useState<AuditAction | ''>('');
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data, isLoading, isError, error, refetch } = useAuditLogs({
    action: actionFilter || undefined,
    page,
  });

  return (
    <div className="space-y-4">
      <Select
        value={actionFilter}
        onChange={(e) => {
          setActionFilter(e.target.value as AuditAction | '');
          setPage(1);
        }}
        className="sm:w-56"
      >
        {AUDIT_ACTIONS.map((a) => (
          <option key={a.value} value={a.value}>{a.label}</option>
        ))}
      </Select>

      {isLoading ? (
        <SkeletonTable rows={5} />
      ) : isError ? (
        <QueryError error={error} fallbackMessage="Failed to load audit logs" onRetry={() => refetch()} />
      ) : data?.data && data.data.length > 0 ? (
        <>
          <DataTable
            columns={[
              {
                header: 'Admin',
                accessor: (row: AuditRow) => (
                  <span className="font-medium">{row.profiles?.display_name ?? 'Unknown'}</span>
                ),
              },
              {
                header: 'Action',
                accessor: (row: AuditRow) => (
                  <Badge variant="outline">{row.action.replace(/_/g, ' ')}</Badge>
                ),
              },
              {
                header: 'Target',
                accessor: (row: AuditRow) => (
                  <span className="text-xs text-hex-muted">
                    {row.target_type}/{row.target_id.slice(0, 8)}...
                  </span>
                ),
              },
              {
                header: 'Metadata',
                accessor: (row: AuditRow) => (
                  <button
                    onClick={() => setExpandedId(expandedId === row.id ? null : row.id)}
                    className="text-xs text-accent-purple hover:underline"
                  >
                    {expandedId === row.id ? 'Hide' : 'Show'}
                  </button>
                ),
                className: 'w-20',
              },
              {
                header: 'Time',
                accessor: (row: AuditRow) => (
                  <span className="text-xs text-hex-muted whitespace-nowrap">
                    {new Date(row.created_at).toLocaleString()}
                  </span>
                ),
              },
            ]}
            data={data.data as AuditRow[]}
            keyExtractor={(row: AuditRow) => row.id}
          />

          {/* Expanded metadata panel */}
          {expandedId && (
            <div className="glass-card rounded-xl p-4 mt-2">
              <pre className="text-xs text-hex-muted overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(
                  (data.data as AuditRow[]).find((r) => r.id === expandedId)?.metadata ?? {},
                  null,
                  2,
                )}
              </pre>
            </div>
          )}

          <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} className="mt-4" />
        </>
      ) : (
        <div className="glass-card rounded-xl p-8 text-center">
          <p className="text-sm text-hex-muted">No audit log entries</p>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// Debug Console Page
// ──────────────────────────────────────────────

export function DebugConsolePage() {
  useDocumentTitle('Debug Console');

  return (
    <div className="relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[300px] rounded-full bg-accent-orange/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-orange/10">
            <Bug className="h-5 w-5 text-accent-orange" />
          </div>
          <h1 className="text-2xl font-bold">Debug Console</h1>
        </div>
        <p className="text-hex-muted mb-8">System health, data inspection, and audit trail</p>

        <Tabs
          tabs={[
            {
              value: 'health',
              label: 'System Health',
              content: <SystemHealthTab />,
            },
            {
              value: 'inspector',
              label: 'Data Inspector',
              content: <DataInspectorTab />,
            },
            {
              value: 'audit',
              label: 'Audit Trail',
              content: <AuditTrailTab />,
            },
          ]}
          defaultValue="health"
        />
      </div>
    </div>
  );
}
