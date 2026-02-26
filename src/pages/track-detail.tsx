import { useCallback, useEffect, useMemo } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSubmission } from '@/hooks/use-submissions';
import { useSubmissionReviews } from '@/hooks/use-reviews';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { useSwipe } from '@/hooks/use-swipe';
import { TrackEmbed } from '@/components/track/track-embed';
import { VoteButton } from '@/components/track/vote-button';
import { Badge } from '@/components/ui/badge';
import { QueryError } from '@/components/ui/query-error';
import { Skeleton } from '@/components/ui/skeleton';
import { StarRating } from '@/components/ui/star-rating';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, MessageSquare, Star } from 'lucide-react';
import type { MusicPlatform } from '@/types/database';

interface TrackNavState {
  trackIds?: string[];
  source?: string;
}

function parseNavState(state: unknown): TrackNavState {
  if (state && typeof state === 'object' && 'trackIds' in state) {
    const s = state as TrackNavState;
    if (Array.isArray(s.trackIds)) return s;
  }
  return {};
}

function TrackDetailSkeleton() {
  return (
    <div className="space-y-6 py-4">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-5 w-1/3" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="h-[352px] w-full rounded-xl" />
    </div>
  );
}

export function TrackDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: track, isLoading, isError, error, refetch } = useSubmission(id);
  const { data: reviews } = useSubmissionReviews(id);

  useDocumentTitle(track?.track_title);

  const { trackIds, source } = parseNavState(location.state);

  const currentIndex = trackIds && id ? trackIds.indexOf(id) : -1;
  const prevId = trackIds && currentIndex > 0 ? trackIds[currentIndex - 1] : null;
  const nextId =
    trackIds && currentIndex >= 0 && currentIndex < trackIds.length - 1
      ? trackIds[currentIndex + 1]
      : null;

  // Stabilize navState — only recompute when the serialized IDs actually change
  const trackIdsKey = trackIds?.join(',');
  const navState = useMemo(
    () => (trackIds ? { trackIds, source } : undefined),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [trackIdsKey, source],
  );

  const goToPrev = useCallback(() => {
    if (prevId) navigate(`/track/${prevId}`, { state: navState });
  }, [prevId, navigate, navState]);

  const goToNext = useCallback(() => {
    if (nextId) navigate(`/track/${nextId}`, { state: navState });
  }, [nextId, navigate, navState]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft') goToPrev();
      else if (e.key === 'ArrowRight') goToNext();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext]);

  // Swipe navigation
  const swipeRef = useSwipe(goToNext, goToPrev);

  const backTo = source === 'charts' ? '/charts' : '/browse';
  const backLabel = source === 'charts' ? 'Back to Charts' : 'Back to Browse';
  const hasNav = trackIds && currentIndex >= 0;

  return (
    <div className="relative" ref={swipeRef}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-accent-purple/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-10">
        {/* Back link */}
        <Link
          to={backTo}
          className="inline-flex items-center gap-2 text-sm text-hex-muted hover:text-hex-text transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {backLabel}
        </Link>

        {/* Prev / Next navigation — always visible when list context exists */}
        {hasNav && (
          <nav className="flex items-center justify-between mb-6" aria-label="Track navigation">
            <Button
              variant="ghost"
              size="sm"
              disabled={!prevId}
              onClick={goToPrev}
              className="gap-1"
              aria-label="Previous track"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Prev
            </Button>
            <span className="text-sm text-hex-muted">
              {currentIndex + 1} of {trackIds.length}
            </span>
            <Button
              variant="ghost"
              size="sm"
              disabled={!nextId}
              onClick={goToNext}
              className="gap-1"
              aria-label="Next track"
            >
              Next
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </nav>
        )}

        {/* Content: loading / error / not-found / track */}
        {isLoading ? (
          <TrackDetailSkeleton />
        ) : isError ? (
          <QueryError
            error={error}
            fallbackMessage="Failed to load track"
            onRetry={() => refetch()}
          />
        ) : !track ? (
          <div className="py-20 text-center">
            <h1 className="text-2xl font-bold">Track not found</h1>
            <p className="mt-2 text-hex-muted">
              This track may have been removed or doesn&apos;t exist.
            </p>
            {!hasNav && (
              <Link to="/browse" className="mt-6 inline-block">
                <Button variant="outline">Back to Browse</Button>
              </Link>
            )}
          </div>
        ) : (
          <>
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
                      <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                      {track.avg_rating} avg
                    </Badge>
                  )}
                  <span className="flex items-center gap-1.5 text-xs text-hex-muted">
                    <Calendar className="h-3 w-3" aria-hidden="true" />
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
                  <MessageSquare className="h-5 w-5 text-accent-pink" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold">Reviews ({track.review_count})</h2>
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
                            <p className="text-sm font-semibold">
                              {curator?.display_name ?? 'Curator'}
                            </p>
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
                  <p className="text-hex-muted">
                    No reviews yet. Curators will review this track soon.
                  </p>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
