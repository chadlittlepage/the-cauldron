import { useCallback, useRef } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useHasVoted, useToggleVote } from '@/hooks/use-votes';
import { Button } from '@/components/ui/button';
import { ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const VOTE_COOLDOWN_MS = 1000;

interface VoteButtonProps {
  submissionId: string;
  voteCount: number;
  className?: string;
}

export function VoteButton({ submissionId, voteCount, className }: VoteButtonProps) {
  const { user } = useAuth();
  const { data: hasVoted } = useHasVoted(submissionId, user?.id);
  const toggleVote = useToggleVote();
  const lastVoteAt = useRef(0);

  // During optimistic update, hasVoted is already flipped in cache.
  // The prop voteCount is stale until refetch, so we don't try to derive it —
  // the number updates on the next render after invalidation.
  const voted = hasVoted ?? false;

  const handleVote = useCallback(() => {
    if (!user) return;
    const now = Date.now();
    if (now - lastVoteAt.current < VOTE_COOLDOWN_MS) return;
    lastVoteAt.current = now;
    toggleVote.mutate({
      submissionId,
      voterId: user.id,
      hasVoted: voted,
    });
  }, [user, submissionId, voted, toggleVote]);

  return (
    <Button
      variant={voted ? 'accent' : 'outline'}
      onClick={handleVote}
      disabled={!user}
      aria-label={voted ? `Remove vote (${voteCount} votes)` : `Vote (${voteCount} votes)`}
      className={cn(
        'gap-2.5 rounded-xl px-5 py-2.5 transition-all duration-200',
        voted && 'glow-purple',
        className,
      )}
    >
      <ThumbsUp className={cn('h-4 w-4', voted && 'fill-current')} />
      <span className="font-bold">{voteCount}</span>
    </Button>
  );
}
