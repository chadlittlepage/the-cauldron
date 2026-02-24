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

  const handleVote = useCallback(() => {
    if (!user) return;
    const now = Date.now();
    if (now - lastVoteAt.current < VOTE_COOLDOWN_MS) return;
    lastVoteAt.current = now;
    toggleVote.mutate({
      submissionId,
      voterId: user.id,
      hasVoted: hasVoted ?? false,
    });
  }, [user, submissionId, hasVoted, toggleVote]);

  return (
    <Button
      variant={hasVoted ? 'accent' : 'outline'}
      onClick={handleVote}
      disabled={!user || toggleVote.isPending}
      aria-label={hasVoted ? `Remove vote (${voteCount} votes)` : `Vote (${voteCount} votes)`}
      className={cn(
        'gap-2.5 rounded-xl px-5 py-2.5 transition-all duration-200',
        hasVoted && 'glow-purple',
        className,
      )}
    >
      <ThumbsUp className={cn('h-4 w-4', hasVoted && 'fill-current')} />
      <span className="font-bold">{voteCount}</span>
    </Button>
  );
}
