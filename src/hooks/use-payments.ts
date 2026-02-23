import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { queryKeys } from './query-keys';

export function useUserPayments(userId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.payments.byUser(userId ?? ''),
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('payments')
        .select('*, submissions(track_title)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
}
