import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { queryKeys } from './query-keys';
import { toast } from './use-toast';
import * as Sentry from '@sentry/react';

/** Checks whether a user has already voted on a submission. */
export function useHasVoted(submissionId: string | undefined, userId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.votes.hasVoted(submissionId ?? '', userId ?? ''),
    staleTime: 1000 * 30, // 30s — votes change frequently
    queryFn: async () => {
      if (!submissionId || !userId) return false;
      const { data, error } = await supabase
        .rpc('has_voted', {
          p_submission_id: submissionId,
          p_user_id: userId,
        })
        .returns<boolean>();
      if (error) throw error;
      return data ?? false;
    },
    enabled: !!submissionId && !!userId,
  });
}

/** Toggles a vote on a submission with optimistic UI updates and automatic cache invalidation. */
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
      return Sentry.startSpan(
        { name: hasVoted ? 'vote.remove' : 'vote.add', op: 'db.query' },
        async () => {
          if (hasVoted) {
            const { error } = await supabase
              .from('votes')
              .delete()
              .eq('submission_id', submissionId)
              .eq('voter_id', voterId)
              .returns<null>();
            if (error) throw error;
            return { action: 'removed' as const };
          } else {
            const { error } = await supabase
              .from('votes')
              .insert({ submission_id: submissionId, voter_id: voterId })
              .returns<null>();
            if (error) throw error;
            return { action: 'added' as const };
          }
        },
      );
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
    onError: (error, variables, context) => {
      // Roll back to previous value on failure
      if (context) {
        queryClient.setQueryData(context.hasVotedKey, context.previousHasVoted);
      }
      const isRateLimit =
        error instanceof Error && error.message?.includes('check_vote_rate_limit');
      toast.error(isRateLimit ? 'Voting too fast — please wait a moment' : 'Failed to update vote');
      Sentry.captureException(error, {
        tags: { source: 'vote_toggle', rateLimit: isRateLimit },
        extra: { submissionId: variables.submissionId, voterId: variables.voterId },
      });
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
