import { useParams } from 'react-router-dom';
import { useSubmission } from '@/hooks/use-submissions';
import { useSubmissionReviews } from '@/hooks/use-reviews';
import { TrackEmbed } from '@/components/track/track-embed';
import { VoteButton } from '@/components/track/vote-button';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { StarRating } from '@/components/ui/star-rating';
import { Avatar } from '@/components/ui/avatar';
import type { MusicPlatform } from '@/types/database';

export function TrackDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: track, isLoading } = useSubmission(id);
  const { data: reviews } = useSubmissionReviews(id);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!track) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Track not found</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{track.track_title}</h1>
          <p className="mt-1 text-hex-muted">by {track.artist_name}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="outline">{track.genre}</Badge>
            <Badge variant="outline">{track.platform}</Badge>
            {track.avg_rating && (
              <Badge variant="accent">{track.avg_rating} avg rating</Badge>
            )}
          </div>
        </div>
        <VoteButton submissionId={track.id} voteCount={track.vote_count} />
      </div>

      {track.description && (
        <p className="mt-6 text-hex-muted">{track.description}</p>
      )}

      <div className="mt-8">
        <TrackEmbed url={track.track_url} platform={track.platform as MusicPlatform} />
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">
          Reviews ({track.review_count})
        </h2>
        {reviews?.length ? (
          <div className="mt-6 space-y-4">
            {reviews.map((review) => {
              const curator = review.profiles as { display_name: string; avatar_url: string | null } | null;
              return (
                <div
                  key={review.id}
                  className="rounded-lg border border-hex-border bg-hex-card p-5"
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={curator?.avatar_url}
                      alt={curator?.display_name ?? 'Curator'}
                      fallback={curator?.display_name?.slice(0, 2) ?? 'C'}
                      size="sm"
                    />
                    <div>
                      <p className="text-sm font-medium">{curator?.display_name}</p>
                      <StarRating value={review.rating} readonly size="sm" />
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-hex-muted">{review.feedback}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mt-4 text-hex-muted">No reviews yet.</p>
        )}
      </section>
    </div>
  );
}
