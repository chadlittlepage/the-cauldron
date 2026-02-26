import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useArtistVoteHistory } from '@/hooks/use-artist-analytics';
import { EmptyState } from '@/components/ui/empty-state';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, Music, ExternalLink } from 'lucide-react';

export function VotingHistoryTab() {
  const { user } = useAuth();
  const { data: votes, isLoading } = useArtistVoteHistory(user?.id);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="glass-card rounded-xl p-4 animate-pulse">
            <div className="h-5 w-48 rounded bg-hex-surface/80" />
            <div className="mt-2 h-4 w-32 rounded bg-hex-surface/80" />
          </div>
        ))}
      </div>
    );
  }

  if (!votes?.length) {
    return (
      <EmptyState
        icon={<ThumbsUp className="h-10 w-10" />}
        title="No votes yet"
        description="Vote on tracks in the browse page to see your history here."
      />
    );
  }

  return (
    <div className="space-y-3">
      {votes.map((vote) => (
        <Link
          key={`${vote.submission_id}-${vote.created_at}`}
          to={`/track/${vote.submission_id}`}
          className="group flex items-center justify-between gap-4 glass-card rounded-xl p-4 transition-all duration-300"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-purple/10">
              <Music className="h-4 w-4 text-accent-purple" />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium truncate group-hover:text-accent-purple transition-colors">
                {vote.track_title}
              </h3>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm text-hex-muted">{vote.artist_name}</span>
                <Badge variant="outline">{vote.genre}</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-hex-muted">
              {new Date(vote.created_at).toLocaleDateString()}
            </span>
            <ExternalLink className="h-4 w-4 text-hex-muted opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>
        </Link>
      ))}
    </div>
  );
}
