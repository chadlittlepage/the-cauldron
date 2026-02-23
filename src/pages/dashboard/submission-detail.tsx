import { useParams, Link } from 'react-router-dom';
import { useSubmission } from '@/hooks/use-submissions';
import { useSubmissionReviews } from '@/hooks/use-reviews';
import { TrackEmbed } from '@/components/track/track-embed';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { StarRating } from '@/components/ui/star-rating';
import { StatCard } from '@/components/dashboard/stat-card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ThumbsUp, Star, MessageSquare, ArrowLeft } from 'lucide-react';
import type { MusicPlatform, SubmissionStatus } from '@/types/database';

const statusVariant: Record<SubmissionStatus, 'warning' | 'default' | 'success' | 'error'> = {
  pending: 'warning',
  in_review: 'default',
  accepted: 'success',
  rejected: 'error',
};

export function SubmissionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: track, isLoading, isError, error } = useSubmission(id);
  const { data: reviews } = useSubmissionReviews(id);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Spinner size="lg" />
        <p className="text-sm text-hex-muted">Loading submission...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Alert variant="error" className="max-w-md">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>{error instanceof Error ? error.message : 'Failed to load submission'}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Submission not found</h1>
        <Link to="/dashboard/submissions" className="mt-4 inline-block">
          <Button variant="outline">Back to Submissions</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-accent-purple/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-10">
        <Link
          to="/dashboard/submissions"
          className="inline-flex items-center gap-2 text-sm text-hex-muted hover:text-hex-text transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Submissions
        </Link>

        <h1 className="text-2xl font-bold">{track.track_title}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge>{track.genre}</Badge>
          <Badge variant="outline">{track.platform}</Badge>
          <Badge variant={statusVariant[track.status]}>{track.status.replace('_', ' ')}</Badge>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Votes" value={track.vote_count} icon={<ThumbsUp className="h-5 w-5" />} />
          <StatCard label="Reviews" value={track.review_count} icon={<MessageSquare className="h-5 w-5" />} />
          <StatCard label="Avg Rating" value={track.avg_rating ?? 'N/A'} icon={<Star className="h-5 w-5" />} />
        </div>

        <div className="mt-8">
          <TrackEmbed url={track.track_url} platform={track.platform as MusicPlatform} />
        </div>

        {track.description && (
          <p className="mt-6 text-hex-muted leading-relaxed">{track.description}</p>
        )}

        <section className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-pink/10">
              <MessageSquare className="h-5 w-5 text-accent-pink" />
            </div>
            <h2 className="text-lg font-bold">Reviews</h2>
          </div>

          {reviews?.length ? (
            <div className="space-y-4">
              {reviews.map((review) => {
                const curator = review.profiles as { display_name: string } | null;
                return (
                  <div key={review.id} className="glass-card rounded-xl p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{curator?.display_name ?? 'Curator'}</span>
                      <StarRating value={review.rating} readonly size="sm" />
                    </div>
                    <p className="mt-3 text-sm text-hex-muted leading-relaxed">{review.feedback}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="glass-card rounded-xl p-8 text-center">
              <p className="text-hex-muted">No reviews yet. Your track is in the queue.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
