import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useCheckout() {
  return useMutation({
    mutationFn: async (submissionId: string) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const response = await supabase.functions.invoke('create-checkout', {
        body: { submission_id: submissionId },
      });

      if (response.error) throw new Error(response.error.message);

      const { url } = response.data as { url: string };
      if (!url) throw new Error('No checkout URL returned');

      return url;
    },
  });
}
