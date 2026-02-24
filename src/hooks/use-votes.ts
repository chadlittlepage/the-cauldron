import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { queryKeys } from './query-keys';
import { toast } from './use-toast';

export function useHasVoted(submissionId: string | undefined, userId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.votes.hasVoted(submissionId ?? '', userId ?? ''),
    queryFn: async () => {
      if (!submissionId || !userId) return false;
      const { data, error } = await supabase.rpc('has_voted', {
        p_submission_id: submissionId,
        p_user_id: userId,
      });
      if (error) throw error;
      return data ?? false;
    },
    enabled: !!submissionId && !!userId,
  });
}

export function useToggleVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      submissionId,
      voterId,
      hasVoted,
    }: {
      submissionId: string;
      voterId: string;
      hasVoted: boolean;
    }) => {
      if (hasVoted) {
        const { error } = await supabase
          .from('votes')
          .delete()
          .eq('submission_id', submissionId)
          .eq('voter_id', voterId);
        if (error) throw error;
        return { action: 'removed' as const };
      } else {
        const { error } = await supabase
          .from('votes')
          .insert({ submission_id: submissionId, voter_id: voterId });
        if (error) throw error;
        return { action: 'added' as const };
      }
    },
    onMutate: async (variables) => {
      const hasVotedKey = queryKeys.votes.hasVoted(variables.submissionId, variables.voterId);

      // Cancel in-flight queries so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: hasVotedKey });

      // Snapshot previous value for rollback
      const previousHasVoted = queryClient.getQueryData<boolean>(hasVotedKey);

      // Optimistically flip the vote status
      queryClient.setQueryData(hasVotedKey, !variables.hasVoted);

      return { previousHasVoted, hasVotedKey };
    },
    onError: (_error, _variables, context) => {
      // Roll back to previous value on failure
      if (context) {
        queryClient.setQueryData(context.hasVotedKey, context.previousHasVoted);
      }
      toast.error('Failed to update vote');
    },
    onSettled: (_data, _error, variables) => {
      // Always refetch to ensure server state is correct
      queryClient.invalidateQueries({
        queryKey: queryKeys.votes.hasVoted(variables.submissionId, variables.voterId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.submissions.detail(variables.submissionId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.submissions.all });
    },
  });
}
