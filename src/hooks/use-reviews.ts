import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { queryKeys } from './query-keys';
import { toast } from './use-toast';
import type { InsertTables } from '@/types/database';

export function useSubmissionReviews(submissionId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.reviews.bySubmission(submissionId ?? ''),
    queryFn: async () => {
      if (!submissionId) return [];
      const { data, error } = await supabase
        .from('reviews')
        .select('*, profiles!reviews_curator_id_fkey(display_name, avatar_url)')
        .eq('submission_id', submissionId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!submissionId,
  });
}

export function useCuratorReviews(curatorId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.reviews.byCurator(curatorId ?? ''),
    queryFn: async () => {
      if (!curatorId) return [];
      const { data, error } = await supabase
        .from('reviews')
        .select('*, submissions(track_title, artist_id, genre)')
        .eq('curator_id', curatorId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!curatorId,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: InsertTables<'reviews'>) => {
      const { data, error } = await supabase.from('reviews').insert(input).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.bySubmission(data.submission_id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.byCurator(data.curator_id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.submissions.detail(data.submission_id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.submissions.reviewQueue() });
      toast.success('Review submitted');
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : 'Failed to submit review');
    },
  });
}
