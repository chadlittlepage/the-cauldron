import { useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useSubmission } from '@/hooks/use-submissions';
import { useCreateReview } from '@/hooks/use-reviews';
import { ReviewForm } from '@/components/review/review-form';
import { TrackEmbed } from '@/components/track/track-embed';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import type { MusicPlatform } from '@/types/database';

export function WriteReviewPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: track, isLoading, isError, error } = useSubmission(id);
  const createReview = useCreateReview();
  const submitting = useRef(false);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Spinner size="lg" />
        <p className="text-sm text-hex-muted">Loading track...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Alert variant="error" className="max-w-md">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'Failed to load track for review'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Track not found</h1>
        <Link to="/dashboard/review-queue" className="mt-4 inline-block">
          <Button variant="outline">Back to Queue</Button>
        </Link>
      </div>
    );
  }

  async function handleSubmit(rating: number, feedback: string) {
    if (!user || !id || submitting.current) return;
    submitting.current = true;
    try {
      await createReview.mutateAsync({
        submission_id: id,
        curator_id: user.id,
        rating,
        feedback,
      });
      navigate('/dashboard/review-queue');
    } finally {
      submitting.current = false;
    }
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-accent-pink/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-10">
        <Link
          to="/dashboard/review-queue"
          className="inline-flex items-center gap-2 text-sm text-hex-muted hover:text-hex-text transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Queue
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-pink/10">
            <MessageSquare className="h-5 w-5 text-accent-pink" />
          </div>
          <h1 className="text-2xl font-bold">Review: {track.track_title}</h1>
        </div>
        <p className="text-hex-muted mb-2">by {track.artist_name}</p>
        <div className="flex gap-2 mb-6">
          <Badge>{track.genre}</Badge>
          <Badge variant="outline">{track.platform}</Badge>
        </div>

        <div className="mb-6">
          <TrackEmbed url={track.track_url} platform={track.platform as MusicPlatform} />
        </div>

        {track.description && (
          <p className="text-hex-muted mb-8 leading-relaxed">{track.description}</p>
        )}

        <div className="glass-card rounded-2xl p-8">
          <h2 className="text-lg font-bold mb-5">Your Review</h2>
          <ReviewForm onSubmit={handleSubmit} loading={createReview.isPending} />
        </div>
      </div>
    </div>
  );
}
