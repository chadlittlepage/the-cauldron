import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useSubmission } from '@/hooks/use-submissions';
import { useCreateReview } from '@/hooks/use-reviews';
import { ReviewForm } from '@/components/review/review-form';
import { TrackEmbed } from '@/components/track/track-embed';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import type { MusicPlatform } from '@/types/database';

export function WriteReviewPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: track, isLoading } = useSubmission(id);
  const createReview = useCreateReview();

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

  async function handleSubmit(rating: number, feedback: string) {
    if (!user || !id) return;
    await createReview.mutateAsync({
      submission_id: id,
      curator_id: user.id,
      rating,
      feedback,
    });
    navigate('/dashboard/review-queue');
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">Review: {track.track_title}</h1>
      <p className="mt-1 text-hex-muted">by {track.artist_name}</p>
      <div className="mt-3 flex gap-2">
        <Badge variant="outline">{track.genre}</Badge>
        <Badge variant="outline">{track.platform}</Badge>
      </div>

      <div className="mt-6">
        <TrackEmbed url={track.track_url} platform={track.platform as MusicPlatform} />
      </div>

      {track.description && (
        <p className="mt-4 text-hex-muted">{track.description}</p>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Review</h2>
        <ReviewForm onSubmit={handleSubmit} loading={createReview.isPending} />
      </div>
    </div>
  );
}
