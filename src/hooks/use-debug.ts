import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { queryKeys } from './query-keys';
import { ITEMS_PER_PAGE } from '@/lib/constants';
import type { AuditAction, Tables } from '@/types/database';

const EDGE_FUNCTIONS = [
  'create-checkout',
  'create-payout',
  'generate-charts',
  'health-check',
  'sentry-proxy',
  'stripe-webhook',
  'track-metadata',
] as const;

// --- System Health ---

export function useSupabaseHealth() {
  return useQuery({
    queryKey: queryKeys.debug.supabaseHealth(),
    queryFn: async () => {
      const start = performance.now();
      const { error } = await supabase
        .from('profiles')
        .select('id', { count: 'exact', head: true });
      const latencyMs = Math.round(performance.now() - start);
      return { connected: !error, latencyMs };
    },
    refetchInterval: 30_000,
  });
}

interface SentryIssue {
  id: string;
  title: string;
  culprit: string;
  count: string;
  firstSeen: string;
  lastSeen: string;
  level: string;
  permalink: string;
}

export function useEdgeFunctionHealth() {
  return useQuery({
    queryKey: queryKeys.debug.edgeFunctionHealth(),
    queryFn: async () => {
      const baseUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
      const start = performance.now();
      let reachable = false;
      try {
        const res = await fetch(`${baseUrl}/sentry-proxy`, { method: 'POST', mode: 'no-cors' });
        // Opaque response (type 'opaque') still means the endpoint is reachable
        reachable = res.type === 'opaque' || res.ok;
      } catch {
        // Network error means edge functions are unreachable
      }
      const latencyMs = Math.round(performance.now() - start);

      return EDGE_FUNCTIONS.map((name) => ({
        name,
        status: reachable ? ('ok' as const) : ('error' as const),
        latencyMs,
      }));
    },
    refetchInterval: 30_000,
  });
}

export function useSentryIssues() {
  return useQuery({
    queryKey: queryKeys.debug.sentryIssues(),
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('sentry-proxy');
      if (error) throw new Error(error.message);
      return data as SentryIssue[];
    },
  });
}

// --- Data Inspector ---

export type InspectableTable =
  | 'profiles'
  | 'submissions'
  | 'reviews'
  | 'payments'
  | 'votes'
  | 'curator_payouts'
  | 'charts';

export function useTableInspector(
  table: InspectableTable,
  opts: { id?: string; page?: number } = {},
) {
  const { id, page = 1 } = opts;

  return useQuery({
    queryKey: queryKeys.debug.tableData(table, { id, page }),
    queryFn: async () => {
      let query = supabase
        .from(table)
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);

      if (id) {
        query = query.eq('id', id);
      }

      const { data, error, count } = await query.returns<Record<string, unknown>[]>();
      if (error) throw error;
      return {
        data: data ?? [],
        totalCount: count ?? 0,
        totalPages: Math.ceil((count ?? 0) / ITEMS_PER_PAGE),
      };
    },
    enabled: !!table,
  });
}

// --- Audit Trail ---

export type AuditLogWithProfile = Tables<'admin_audit_logs'> & {
  profiles: { display_name: string } | null;
};

export function useAuditLogs(opts: { action?: AuditAction; page?: number } = {}) {
  const { action, page = 1 } = opts;

  return useQuery({
    queryKey: queryKeys.debug.auditLogs({ action, page }),
    queryFn: async () => {
      let query = supabase
        .from('admin_audit_logs')
        .select('*, profiles!admin_audit_logs_admin_id_fkey(display_name)', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);

      if (action) {
        query = query.eq('action', action);
      }

      const { data, error, count } = await query.returns<AuditLogWithProfile[]>();
      if (error) throw error;
      return {
        data: data ?? [],
        totalCount: count ?? 0,
        totalPages: Math.ceil((count ?? 0) / ITEMS_PER_PAGE),
      };
    },
  });
}
