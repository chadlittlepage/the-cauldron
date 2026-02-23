import { useParams, Link } from 'react-router-dom';
import { useSubmission } from '@/hooks/use-submissions';
import { useSubmissionReviews } from '@/hooks/use-reviews';
import { TrackEmbed } from '@/components/track/track-embed';
import { VoteButton } from '@/components/track/vote-button';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { StarRating } from '@/components/ui/star-rating';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MessageSquare, Star } from 'lucide-react';
import type { MusicPlatform } from '@/types/database';

export function TrackDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: track, isLoading } = useSubmission(id);
  const { data: reviews } = useSubmissionReviews(id);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Spinner size="lg" />
        <p className="text-sm text-hex-muted">Loading track...</p>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Track not found</h1>
        <p className="mt-2 text-hex-muted">This track may have been removed or doesn&apos;t exist.</p>
        <Link to="/browse" className="mt-6 inline-block">
          <Button variant="outline">Back to Browse</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-accent-purple/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-10">
        {/* Back link */}
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 text-sm text-hex-muted hover:text-hex-text transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Browse
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold">{track.track_title}</h1>
            <p className="mt-1 text-lg text-hex-muted">by {track.artist_name}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge>{track.genre}</Badge>
              <Badge variant="outline">{track.platform}</Badge>
              {track.avg_rating && (
                <Badge variant="accent" className="gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  {track.avg_rating} avg
                </Badge>
              )}
              <span className="flex items-center gap-1.5 text-xs text-hex-muted">
                <Calendar className="h-3 w-3" />
                {new Date(track.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          <VoteButton submissionId={track.id} voteCount={track.vote_count} />
        </div>

        {track.description && (
          <p className="mt-6 text-hex-muted leading-relaxed">{track.description}</p>
        )}

        {/* Embed */}
        <div className="mt-8">
          <TrackEmbed url={track.track_url} platform={track.platform as MusicPlatform} />
        </div>

        {/* Reviews */}
        <section className="mt-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-pink/10">
              <MessageSquare className="h-5 w-5 text-accent-pink" />
            </div>
            <h2 className="text-xl font-bold">
              Reviews ({track.review_count})
            </h2>
          </div>

          {reviews?.length ? (
            <div className="space-y-4">
              {reviews.map((review) => {
                const curator = review.profiles as {
                  display_name: string;
                  avatar_url: string | null;
                } | null;
                return (
                  <div key={review.id} className="glass-card rounded-xl p-5">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={curator?.avatar_url}
                        alt={curator?.display_name ?? 'Curator'}
                        fallback={curator?.display_name?.slice(0, 2) ?? 'C'}
                        size="sm"
                      />
                      <div>
                        <p className="text-sm font-semibold">{curator?.display_name}</p>
                        <StarRating value={review.rating} readonly size="sm" />
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-hex-muted leading-relaxed">
                      {review.feedback}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="glass-card rounded-xl p-8 text-center">
              <p className="text-hex-muted">No reviews yet. Curators will review this track soon.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
