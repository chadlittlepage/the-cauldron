import { useParams } from 'react-router-dom';
import { useSubmission } from '@/hooks/use-submissions';
import { useSubmissionReviews } from '@/hooks/use-reviews';
import { TrackEmbed } from '@/components/track/track-embed';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { StarRating } from '@/components/ui/star-rating';
import { StatCard } from '@/components/dashboard/stat-card';
import { ThumbsUp, Star, MessageSquare } from 'lucide-react';
import type { MusicPlatform, SubmissionStatus } from '@/types/database';

const statusVariant: Record<SubmissionStatus, 'warning' | 'default' | 'success' | 'error'> = {
  pending: 'warning',
  in_review: 'default',
  accepted: 'success',
  rejected: 'error',
};

export function SubmissionDetailPage() {
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
        <h1 className="text-2xl font-bold">Submission not found</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">{track.track_title}</h1>
      <div className="mt-3 flex flex-wrap gap-2">
        <Badge variant="outline">{track.genre}</Badge>
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
        <p className="mt-6 text-hex-muted">{track.description}</p>
      )}

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {reviews?.length ? (
          <div className="mt-4 space-y-4">
            {reviews.map((review) => {
              const curator = review.profiles as { display_name: string } | null;
              return (
                <div key={review.id} className="rounded-lg border border-hex-border bg-hex-card p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{curator?.display_name ?? 'Curator'}</span>
                    <StarRating value={review.rating} readonly size="sm" />
                  </div>
                  <p className="mt-2 text-sm text-hex-muted">{review.feedback}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mt-4 text-hex-muted">No reviews yet. Your track is in the queue.</p>
        )}
      </section>
    </div>
  );
}
