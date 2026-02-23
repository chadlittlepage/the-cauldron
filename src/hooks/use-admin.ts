import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { queryKeys } from './query-keys';
import type { SubmissionStatus } from '@/types/database';
import { ITEMS_PER_PAGE } from '@/lib/constants';

export function useAdminStats() {
  return useQuery({
    queryKey: queryKeys.admin.stats(),
    queryFn: async () => {
      const [submissions, curators, payments] = await Promise.all([
        supabase.from('submissions').select('status', { count: 'exact', head: true }),
        supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true })
          .eq('role', 'curator'),
        supabase.from('payments').select('amount_cents', { count: 'exact' }).eq('status', 'succeeded'),
      ]);

      const totalRevenue = (payments.data ?? []).reduce((sum, p) => sum + p.amount_cents, 0);

      return {
        totalSubmissions: submissions.count ?? 0,
        totalCurators: curators.count ?? 0,
        totalPayments: payments.count ?? 0,
        totalRevenueCents: totalRevenue,
      };
    },
  });
}

export function useAdminSubmissions(filters: { status?: string; page?: number } = {}) {
  const { status, page = 1 } = filters;

  return useQuery({
    queryKey: queryKeys.admin.allSubmissions(filters),
    queryFn: async () => {
      let query = supabase
        .from('submissions')
        .select('*, profiles!submissions_artist_id_fkey(display_name, email)', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);

      if (status) query = query.eq('status', status);

      const { data, error, count } = await query;
      if (error) throw error;
      return { data, totalCount: count ?? 0, totalPages: Math.ceil((count ?? 0) / ITEMS_PER_PAGE) };
    },
  });
}

export function useUpdateSubmissionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: SubmissionStatus }) => {
      const { data, error } = await supabase
        .from('submissions')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.submissions.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.allSubmissions() });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.stats() });
    },
  });
}

export function useAdminCurators() {
  return useQuery({
    queryKey: queryKeys.admin.allCurators(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'curator')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useAdminPayouts() {
  return useQuery({
    queryKey: queryKeys.admin.allPayouts(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('curator_payouts')
        .select('*, profiles!curator_payouts_curator_id_fkey(display_name, email)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}
