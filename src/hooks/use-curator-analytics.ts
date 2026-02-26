import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { queryKeys } from './query-keys';
import type { Tables } from '@/types/database';

export function useCuratorReviewsByMonth(curatorId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.curatorAnalytics.reviewsByMonth(curatorId ?? ''),
    queryFn: async () => {
      if (!curatorId) return [];
      const { data, error } = await supabase
        .rpc('get_curator_reviews_by_month', {
          p_curator_id: curatorId,
        })
        .returns<{ count: number; month: string }[]>();
      if (error) throw error;
      return data;
    },
    enabled: !!curatorId,
  });
}

export function useCuratorGenrePerformance(curatorId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.curatorAnalytics.genrePerformance(curatorId ?? ''),
    queryFn: async () => {
      if (!curatorId) return [];
      const { data, error } = await supabase
        .rpc('get_curator_genre_performance', {
          p_curator_id: curatorId,
        })
        .returns<{ avg_rating: number; genre: string; reviews: number }[]>();
      if (error) throw error;
      return data;
    },
    enabled: !!curatorId,
  });
}

export function useCuratorEarningsByMonth(curatorId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.curatorAnalytics.earningsByMonth(curatorId ?? ''),
    queryFn: async () => {
      if (!curatorId) return [];
      const { data, error } = await supabase
        .rpc('get_curator_earnings_by_month', {
          p_curator_id: curatorId,
        })
        .returns<{ earnings_cents: number; month: string }[]>();
      if (error) throw error;
      return data;
    },
    enabled: !!curatorId,
  });
}

export function useCuratorPayouts(curatorId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.curatorAnalytics.payouts(curatorId ?? ''),
    queryFn: async () => {
      if (!curatorId) return [];
      const { data, error } = await supabase
        .from('curator_payouts')
        .select('*')
        .eq('curator_id', curatorId)
        .order('period', { ascending: false })
        .returns<Tables<'curator_payouts'>[]>();
      if (error) throw error;
      return data;
    },
    enabled: !!curatorId,
  });
}
