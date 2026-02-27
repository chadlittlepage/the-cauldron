import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { queryKeys } from './query-keys';
import { toast } from './use-toast';
import type { SubmissionStatus, Tables } from '@/types/database';
import { ITEMS_PER_PAGE } from '@/lib/constants';

export type AdminSubmissionWithProfile = Tables<'submissions'> & {
  profiles: { display_name: string; email: string } | null;
};

export type AdminPayoutWithProfile = Tables<'curator_payouts'> & {
  profiles: { display_name: string; email: string } | null;
};

export function useAdminStats() {
  return useQuery({
    queryKey: queryKeys.admin.stats(),
    queryFn: async () => {
      const [submissions, curators, payments] = await Promise.all([
        supabase.from('submissions').select('status', { count: 'exact', head: true }),
        supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true })
          .eq('role', 'curator' as const),
        supabase
          .from('payments')
          .select('amount_cents', { count: 'exact' })
          .eq('status', 'succeeded' as const)
          .returns<{ amount_cents: number }[]>(),
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
    placeholderData: keepPreviousData,
    queryFn: async () => {
      let query = supabase
        .from('submissions')
        .select('*, profiles!submissions_artist_id_fkey(display_name, email)', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);

      if (status) query = query.eq('status', status as SubmissionStatus);

      const { data, error, count } = await query.returns<AdminSubmissionWithProfile[]>();
      if (error) throw error;
      return { data, totalCount: count ?? 0, totalPages: Math.ceil((count ?? 0) / ITEMS_PER_PAGE) };
    },
  });
}

export function useUpdateSubmissionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
      oldStatus,
    }: {
      id: string;
      status: SubmissionStatus;
      oldStatus?: string;
    }) => {
      const { data, error } = await supabase
        .from('submissions')
        .update({ status })
        .eq('id', id)
        .select()
        .single()
        .returns<Tables<'submissions'>>();
      if (error) throw error;
      return { ...data, _oldStatus: oldStatus };
    },
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.submissions.all });
      queryClient.invalidateQueries({ queryKey: ['admin', 'submissions'] as const });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.stats() });
      toast.success(`Submission ${variables.status}`);

      // Log to audit trail
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('admin_audit_logs').insert({
          admin_id: user.id,
          action: 'submission_status_change' as const,
          target_type: 'submission',
          target_id: variables.id,
          metadata: { old_status: data._oldStatus ?? 'unknown', new_status: variables.status },
        });
        queryClient.invalidateQueries({ queryKey: ['debug', 'auditLogs'] as const });
      }
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : 'Failed to update submission');
    },
  });
}

export function useAdminCurators(filters: { page?: number } = {}) {
  const { page = 1 } = filters;

  return useQuery({
    queryKey: queryKeys.admin.allCurators(filters),
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const { data, error, count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .eq('role', 'curator' as const)
        .order('created_at', { ascending: false })
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)
        .returns<Tables<'profiles'>[]>();
      if (error) throw error;
      return { data, totalCount: count ?? 0, totalPages: Math.ceil((count ?? 0) / ITEMS_PER_PAGE) };
    },
  });
}

export function useAdminPayouts(filters: { page?: number } = {}) {
  const { page = 1 } = filters;

  return useQuery({
    queryKey: queryKeys.admin.allPayouts(filters),
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const { data, error, count } = await supabase
        .from('curator_payouts')
        .select('*, profiles!curator_payouts_curator_id_fkey(display_name, email)', {
          count: 'exact',
        })
        .order('created_at', { ascending: false })
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)
        .returns<AdminPayoutWithProfile[]>();
      if (error) throw error;
      return { data, totalCount: count ?? 0, totalPages: Math.ceil((count ?? 0) / ITEMS_PER_PAGE) };
    },
  });
}

export function useAdminAnalytics() {
  return useQuery({
    queryKey: queryKeys.admin.analytics(),
    queryFn: async () => {
      const [genres, monthly, curators, revenue] = await Promise.all([
        supabase.rpc('get_submissions_by_genre').returns<{ count: number; genre: string }[]>(),
        supabase.rpc('get_submissions_by_month').returns<{ count: number; month: string }[]>(),
        supabase
          .rpc('get_top_curators')
          .returns<
            { avg_rating: number; curator_id: string; display_name: string; review_count: number }[]
          >(),
        supabase.rpc('get_revenue_by_month').returns<{ month: string; revenue_cents: number }[]>(),
      ]);

      const firstError = [genres, monthly, curators, revenue].find((r) => r.error)?.error;
      if (firstError) throw firstError;

      return {
        genreBreakdown: genres.data ?? [],
        monthlySubmissions: monthly.data ?? [],
        topCurators: curators.data ?? [],
        monthlyRevenue: revenue.data ?? [],
      };
    },
  });
}
