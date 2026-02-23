import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { queryKeys } from './query-keys';
import type { UpdateTables } from '@/types/database';

export function useProfile(userId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.profiles.detail(userId ?? ''),
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
}

export function useCurators() {
  return useQuery({
    queryKey: queryKeys.profiles.curators(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'curator')
        .order('listener_count', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      updates,
    }: {
      userId: string;
      updates: UpdateTables<'profiles'>;
    }) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles.curators() });
    },
  });
}
