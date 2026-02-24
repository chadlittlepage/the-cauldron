import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { queryKeys } from './query-keys';
import { env } from '@/lib/env';
import type { AuditAction } from '@/types/database';

const ITEMS_PER_PAGE = 20;

const EDGE_FUNCTIONS = ['create-checkout', 'stripe-webhook', 'create-payout', 'generate-charts'] as const;

// --- System Health ---

export function useSupabaseHealth() {
  return useQuery({
    queryKey: queryKeys.debug.supabaseHealth(),
    queryFn: async () => {
      const start = performance.now();
      const { error } = await supabase.from('profiles').select('id', { count: 'exact', head: true });
      const latencyMs = Math.round(performance.now() - start);
      return { connected: !error, latencyMs };
    },
    refetchInterval: 30_000,
  });
}

export function useEdgeFunctionHealth() {
  return useQuery({
    queryKey: queryKeys.debug.edgeFunctionHealth(),
    queryFn: async () => {
      const results = await Promise.all(
        EDGE_FUNCTIONS.map(async (name) => {
          const start = performance.now();
          try {
            const resp = await fetch(`${env.SUPABASE_URL}/functions/v1/${name}`, { method: 'OPTIONS' });
            const latencyMs = Math.round(performance.now() - start);
            return { name, status: resp.ok || resp.status === 204 ? 'ok' : 'error', latencyMs } as const;
          } catch {
            const latencyMs = Math.round(performance.now() - start);
            return { name, status: 'error' as const, latencyMs };
          }
        }),
      );
      return results;
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
      return data as Array<{
        id: string;
        title: string;
        culprit: string;
        count: string;
        firstSeen: string;
        lastSeen: string;
        level: string;
        permalink: string;
      }>;
    },
  });
}

// --- Data Inspector ---

type InspectableTable = 'profiles' | 'submissions' | 'reviews' | 'payments' | 'votes' | 'curator_payouts' | 'charts';

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

      const { data, error, count } = await query;
      if (error) throw error;
      return { data: data ?? [], totalCount: count ?? 0, totalPages: Math.ceil((count ?? 0) / ITEMS_PER_PAGE) };
    },
    enabled: !!table,
  });
}

// --- Audit Trail ---

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

      const { data, error, count } = await query;
      if (error) throw error;
      return { data: data ?? [], totalCount: count ?? 0, totalPages: Math.ceil((count ?? 0) / ITEMS_PER_PAGE) };
    },
  });
}

export function useLogAuditAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entry: {
      action: AuditAction;
      target_type: string;
      target_id: string;
      metadata?: Record<string, unknown>;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('admin_audit_logs').insert({
        admin_id: user.id,
        action: entry.action,
        target_type: entry.target_type,
        target_id: entry.target_id,
        metadata: entry.metadata ?? {},
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debug', 'auditLogs'] });
    },
  });
}
