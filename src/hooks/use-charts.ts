import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { queryKeys } from './query-keys';
import type { ChartType } from '@/types/database';

export function useCharts(type: ChartType, period: string) {
  return useQuery({
    queryKey: queryKeys.charts.byPeriod(type, period),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('charts')
        .select('id, submission_id, rank, vote_count, chart_type, period, submissions(track_title, track_url, platform, genre, artist_id, profiles!submissions_artist_id_fkey(display_name))')
        .eq('chart_type', type)
        .eq('period', period)
        .order('rank', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

export function useChartPeriods() {
  return useQuery({
    queryKey: queryKeys.charts.periods(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('charts')
        .select('chart_type, period')
        .order('period', { ascending: false });
      if (error) throw error;

      const periods = new Map<string, Set<string>>();
      for (const row of data ?? []) {
        if (!periods.has(row.chart_type)) {
          periods.set(row.chart_type, new Set());
        }
        periods.get(row.chart_type)!.add(row.period);
      }

      return {
        monthly: Array.from(periods.get('monthly') ?? []),
        yearly: Array.from(periods.get('yearly') ?? []),
      };
    },
  });
}
