import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { queryKeys } from './query-keys';

export function useArtistSubmissionsByMonth(artistId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.artistAnalytics.submissionsByMonth(artistId ?? ''),
    queryFn: async () => {
      if (!artistId) return [];
      const { data, error } = await supabase
        .rpc('get_artist_submissions_by_month', {
          p_artist_id: artistId,
        })
        .returns<{ count: number; month: string }[]>();
      if (error) throw error;
      return data;
    },
    enabled: !!artistId,
  });
}

export function useArtistCuratorDecisions(artistId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.artistAnalytics.curatorDecisions(artistId ?? ''),
    queryFn: async () => {
      if (!artistId) return [];
      const { data, error } = await supabase
        .rpc('get_artist_curator_decisions', {
          p_artist_id: artistId,
        })
        .returns<{ accepted: number; month: string; pending: number; rejected: number }[]>();
      if (error) throw error;
      return data;
    },
    enabled: !!artistId,
  });
}

export function useArtistGenreDistribution(artistId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.artistAnalytics.genreDistribution(artistId ?? ''),
    queryFn: async () => {
      if (!artistId) return [];
      const { data, error } = await supabase
        .rpc('get_artist_genre_distribution', {
          p_artist_id: artistId,
        })
        .returns<{ count: number; genre: string }[]>();
      if (error) throw error;
      return data;
    },
    enabled: !!artistId,
  });
}

export function useArtistRatingsDistribution(artistId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.artistAnalytics.ratingsDistribution(artistId ?? ''),
    queryFn: async () => {
      if (!artistId) return [];
      const { data, error } = await supabase
        .rpc('get_artist_ratings_distribution', {
          p_artist_id: artistId,
        })
        .returns<{ count: number; rating: number }[]>();
      if (error) throw error;
      return data;
    },
    enabled: !!artistId,
  });
}

export function useArtistVoteTrend(artistId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.artistAnalytics.voteTrend(artistId ?? ''),
    queryFn: async () => {
      if (!artistId) return [];
      const { data, error } = await supabase
        .rpc('get_artist_vote_trend', {
          p_artist_id: artistId,
        })
        .returns<{ day: string; upvotes: number }[]>();
      if (error) throw error;
      return data;
    },
    enabled: !!artistId,
  });
}

export function useArtistTotalSpent(artistId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.artistAnalytics.totalSpent(artistId ?? ''),
    queryFn: async () => {
      if (!artistId) return null;
      const { data, error } = await supabase
        .rpc('get_artist_total_spent', {
          p_artist_id: artistId,
        })
        .returns<{ total_cents: number }[]>();
      if (error) throw error;
      return data?.[0]?.total_cents ?? 0;
    },
    enabled: !!artistId,
  });
}

export function useArtistPlacements(artistId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.artistAnalytics.placements(artistId ?? ''),
    queryFn: async () => {
      if (!artistId) return null;
      const { data, error } = await supabase
        .rpc('get_artist_placements', {
          p_artist_id: artistId,
        })
        .returns<{ count: number }[]>();
      if (error) throw error;
      return data?.[0]?.count ?? 0;
    },
    enabled: !!artistId,
  });
}

export function useArtistTierBreakdown(artistId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.artistAnalytics.tierBreakdown(artistId ?? ''),
    queryFn: async () => {
      if (!artistId) return [];
      const { data, error } = await supabase
        .rpc('get_artist_tier_breakdown', {
          p_artist_id: artistId,
        })
        .returns<{ count: number; tier: string; total_cents: number }[]>();
      if (error) throw error;
      return data;
    },
    enabled: !!artistId,
  });
}

export function useArtistVoteHistory(artistId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.artistAnalytics.voteHistory(artistId ?? ''),
    queryFn: async () => {
      if (!artistId) return [];
      const { data, error } = await supabase
        .rpc('get_artist_vote_history', {
          p_artist_id: artistId,
        })
        .returns<
          {
            artist_name: string;
            created_at: string;
            genre: string;
            submission_id: string;
            track_title: string;
          }[]
        >();
      if (error) throw error;
      return data;
    },
    enabled: !!artistId,
  });
}
