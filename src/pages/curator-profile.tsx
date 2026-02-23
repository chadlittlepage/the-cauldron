import { useParams } from 'react-router-dom';
import { useProfile } from '@/hooks/use-profile';
import { useCuratorReviews } from '@/hooks/use-reviews';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/star-rating';
import { Spinner } from '@/components/ui/spinner';
import { Link } from 'react-router-dom';

export function CuratorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data: curator, isLoading } = useProfile(id);
  const { data: reviews } = useCuratorReviews(id);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!curator) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Curator not found</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-center gap-6">
        <Avatar
          src={curator.avatar_url}
          alt={curator.display_name}
          fallback={curator.display_name.slice(0, 2)}
          size="lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{curator.display_name}</h1>
          <div className="mt-2 flex gap-2">
            <Badge variant="accent">Curator</Badge>
            <Badge variant="outline">{curator.listener_count.toLocaleString()} listeners</Badge>
          </div>
        </div>
      </div>

      {curator.bio && <p className="mt-6 text-hex-muted">{curator.bio}</p>}

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Reviews ({reviews?.length ?? 0})</h2>
        {reviews?.length ? (
          <div className="mt-6 space-y-4">
            {reviews.map((review) => {
              const submission = review.submissions as { track_title: string; genre: string } | null;
              return (
                <div key={review.id} className="rounded-lg border border-hex-border bg-hex-card p-5">
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/track/${review.submission_id}`}
                      className="font-medium hover:text-accent-purple transition-colors"
                    >
                      {submission?.track_title ?? 'Unknown Track'}
                    </Link>
                    <StarRating value={review.rating} readonly size="sm" />
                  </div>
                  <p className="mt-2 text-sm text-hex-muted">{review.feedback}</p>
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
