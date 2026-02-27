import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { queryKeys } from './query-keys';
import { toast } from './use-toast';
import * as Sentry from '@sentry/react';
import type { InsertTables, SubmissionStatus, Tables, MusicPlatform } from '@/types/database';
import { ITEMS_PER_PAGE } from '@/lib/constants';

/** Strips PostgREST filter syntax characters and escapes ILIKE wildcards. */
export function sanitizeSearch(input: string): string {
  return input
    .replace(/[,().\\*]/g, '')
    .replace(/[_%]/g, '\\$&')
    .trim();
}

export type SubmissionWithProfile = Tables<'submissions'> & {
  profiles: { display_name: string; avatar_url: string | null } | null;
};

export type SubmissionWithDisplayName = Tables<'submissions'> & {
  profiles: { display_name: string } | null;
};

export type SubmissionDetail = {
  artist_id: string;
  artist_name: string;
  avg_rating: number;
  created_at: string;
  description: string;
  genre: string;
  id: string;
  platform: MusicPlatform;
  review_count: number;
  status: SubmissionStatus;
  track_title: string;
  track_url: string;
  vote_count: number;
};

interface SubmissionFilters {
  genre?: string;
  status?: string;
  page?: number;
  search?: string;
}

/** Fetches paginated submissions with optional genre, status, and search filters. */
export function useSubmissions(filters: SubmissionFilters = {}) {
  const { genre, status, page = 1, search } = filters;

  return useQuery({
    queryKey: queryKeys.submissions.list(filters),
    placeholderData: keepPreviousData,
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
      if (search) {
        const safe = sanitizeSearch(search);
        if (safe) query = query.or(`track_title.ilike.*${safe}*,genre.ilike.*${safe}*`);
      }

      const { data, error, count } = await query.returns<SubmissionWithProfile[]>();
      if (error) throw error;
      return { data, totalCount: count ?? 0, totalPages: Math.ceil((count ?? 0) / ITEMS_PER_PAGE) };
    },
  });
}

/** Fetches a single submission by ID using the `get_submission_details` RPC. */
export function useSubmission(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.submissions.detail(id ?? ''),
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .rpc('get_submission_details', {
          p_submission_id: id,
        })
        .returns<SubmissionDetail[]>();
      if (error) throw error;
      return data?.[0] ?? null;
    },
    enabled: !!id,
  });
}

/** Fetches all submissions for a given artist, ordered by newest first. */
export function useArtistSubmissions(artistId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.submissions.byArtist(artistId ?? ''),
    queryFn: async () => {
      if (!artistId) return [];
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .eq('artist_id', artistId)
        .order('created_at', { ascending: false })
        .returns<Tables<'submissions'>[]>();
      if (error) throw error;
      return data;
    },
    enabled: !!artistId,
  });
}

/** Fetches the curator review queue — pending/in_review submissions with pagination and filters. */
export function useReviewQueue(filters: { page?: number; genre?: string; search?: string } = {}) {
  const { page = 1, genre, search } = filters;

  return useQuery({
    queryKey: queryKeys.submissions.reviewQueue(filters),
    placeholderData: keepPreviousData,
    queryFn: async () => {
      let query = supabase
        .from('submissions')
        .select('*, profiles!submissions_artist_id_fkey(display_name)', { count: 'exact' })
        .in('status', ['pending', 'in_review'] as SubmissionStatus[]);
      if (genre) query = query.eq('genre', genre);
      if (search) {
        const safe = sanitizeSearch(search);
        if (safe) query = query.or(`track_title.ilike.*${safe}*,genre.ilike.*${safe}*`);
      }
      const { data, error, count } = await query
        .order('created_at', { ascending: true })
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)
        .returns<SubmissionWithDisplayName[]>();
      if (error) throw error;
      return { data, totalCount: count ?? 0, totalPages: Math.ceil((count ?? 0) / ITEMS_PER_PAGE) };
    },
  });
}

/** Creates a new track submission and invalidates related query caches on success. */
export function useCreateSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: InsertTables<'submissions'>) => {
      return Sentry.startSpan({ name: 'submission.create', op: 'db.query' }, async () => {
        const { data, error } = await supabase
          .from('submissions')
          .insert(input)
          .select()
          .single()
          .returns<Tables<'submissions'>>();
        if (error) throw error;
        return data;
      });
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
