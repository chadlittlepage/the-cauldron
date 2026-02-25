import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { queryKeys } from './query-keys';
import { toast } from './use-toast';
import type { InsertTables, SubmissionStatus } from '@/types/database';
import { ITEMS_PER_PAGE } from '@/lib/constants';

interface SubmissionFilters {
  genre?: string;
  status?: string;
  page?: number;
}

export function useSubmissions(filters: SubmissionFilters = {}) {
  const { genre, status, page = 1 } = filters;

  return useQuery({
    queryKey: queryKeys.submissions.list(filters),
    queryFn: async () => {
      let query = supabase
        .from('submissions')
        .select('*, profiles!submissions_artist_id_fkey(display_name, avatar_url)', {
          count: 'exact',
        })
        .order('created_at', { ascending: false })
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);

      if (genre) query = query.eq('genre', genre);
      if (status) query = query.eq('status', status as SubmissionStatus);

      const { data, error, count } = await query;
      if (error) throw error;
      return { data, totalCount: count ?? 0, totalPages: Math.ceil((count ?? 0) / ITEMS_PER_PAGE) };
    },
  });
}

export function useSubmission(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.submissions.detail(id ?? ''),
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase.rpc('get_submission_details', {
        p_submission_id: id,
      });
      if (error) throw error;
      return data?.[0] ?? null;
    },
    enabled: !!id,
  });
}

export function useArtistSubmissions(artistId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.submissions.byArtist(artistId ?? ''),
    queryFn: async () => {
      if (!artistId) return [];
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .eq('artist_id', artistId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!artistId,
  });
}

export function useReviewQueue(filters: { page?: number } = {}) {
  const { page = 1 } = filters;

  return useQuery({
    queryKey: queryKeys.submissions.reviewQueue(filters),
    queryFn: async () => {
      const { data, error, count } = await supabase
        .from('submissions')
        .select('*, profiles!submissions_artist_id_fkey(display_name)', { count: 'exact' })
        .in('status', ['pending', 'in_review'])
        .order('created_at', { ascending: true })
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);
      if (error) throw error;
      return { data, totalCount: count ?? 0, totalPages: Math.ceil((count ?? 0) / ITEMS_PER_PAGE) };
    },
  });
}

export function useCreateSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: InsertTables<'submissions'>) => {
      const { data, error } = await supabase.from('submissions').insert(input).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.submissions.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.submissions.byArtist(variables.artist_id),
      });
      toast.success('Track submitted');
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : 'Failed to submit track');
    },
  });
}
