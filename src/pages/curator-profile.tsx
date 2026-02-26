import { useParams, Link } from 'react-router-dom';
import { useProfile } from '@/hooks/use-profile';
import { useCuratorReviews } from '@/hooks/use-reviews';
import { useCuratorStats } from '@/hooks/use-curator-analytics';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/star-rating';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  Globe,
  Instagram,
  Mail,
  MessageSquare,
  Star,
  DollarSign,
  CheckCircle,
  XCircle,
} from 'lucide-react';

export function CuratorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data: curator, isLoading, isError, error } = useProfile(id);
  const { data: reviews } = useCuratorReviews(id);
  const { data: stats } = useCuratorStats(id);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Alert variant="error" className="max-w-md">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'Failed to load curator profile'}
          </AlertDescription>
        </Alert>
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

  const hasGenres = curator.genres.length > 0;
  const hasSocialLinks =
    curator.website_url ||
    curator.instagram_handle ||
    curator.tiktok_handle ||
    curator.contact_email;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-6">
        <Avatar
          src={curator.avatar_url}
          alt={curator.display_name}
          fallback={curator.display_name.slice(0, 2)}
          size="lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{curator.display_name}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="accent">Curator</Badge>
            <Badge variant="outline">{curator.listener_count.toLocaleString()} listeners</Badge>
            {curator.accepting_submissions ? (
              <Badge variant="success" className="gap-1">
                <CheckCircle className="h-3 w-3" />
                Accepting Submissions
              </Badge>
            ) : (
              <Badge variant="error" className="gap-1">
                <XCircle className="h-3 w-3" />
                Not Accepting
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Genre Tags */}
      {hasGenres && (
        <div className="flex flex-wrap gap-2">
          {curator.genres.map((genre) => (
            <Badge key={genre} variant="default">
              {genre}
            </Badge>
          ))}
        </div>
      )}

      {/* About */}
      {curator.bio && (
        <section className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-3">About</h2>
          <p className="text-hex-muted leading-relaxed whitespace-pre-line">{curator.bio}</p>
        </section>
      )}

      {/* What I'm Looking For */}
      {curator.looking_for && (
        <section className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-3">What I&apos;m Looking For</h2>
          <p className="text-hex-muted leading-relaxed whitespace-pre-line">
            {curator.looking_for}
          </p>
        </section>
      )}

      {/* Curator Stats */}
      {stats && (
        <section className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Curator Stats</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <MessageSquare className="h-5 w-5 text-accent-purple" />
              </div>
              <p className="text-2xl font-bold">{stats.total_reviews}</p>
              <p className="text-xs text-hex-muted mt-1">Reviews</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-5 w-5 text-accent-purple" />
              </div>
              <p className="text-2xl font-bold">
                {stats.total_reviews > 0 ? stats.avg_rating.toFixed(1) : 'N/A'}
              </p>
              <p className="text-xs text-hex-muted mt-1">Avg Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="h-5 w-5 text-accent-purple" />
              </div>
              <p className="text-2xl font-bold">${(stats.total_earnings_cents / 100).toFixed(0)}</p>
              <p className="text-xs text-hex-muted mt-1">Earned</p>
            </div>
          </div>
        </section>
      )}

      {/* Connect */}
      {hasSocialLinks && (
        <section className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Connect</h2>
          <div className="space-y-3">
            {curator.website_url && (
              <a
                href={curator.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-hex-muted hover:text-accent-purple transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm">{curator.website_url.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
            {curator.instagram_handle && (
              <a
                href={`https://instagram.com/${curator.instagram_handle.replace(/^@/, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-hex-muted hover:text-accent-purple transition-colors"
              >
                <Instagram className="h-4 w-4" />
                <span className="text-sm">@{curator.instagram_handle.replace(/^@/, '')}</span>
              </a>
            )}
            {curator.tiktok_handle && (
              <a
                href={`https://tiktok.com/@${curator.tiktok_handle.replace(/^@/, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-hex-muted hover:text-accent-purple transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78c.27 0 .54.04.8.1v-3.5a6.37 6.37 0 0 0-.8-.05A6.34 6.34 0 0 0 3.15 15.3 6.34 6.34 0 0 0 9.49 21.64a6.34 6.34 0 0 0 6.34-6.34V8.7a8.16 8.16 0 0 0 3.76.92V6.18a4.84 4.84 0 0 1 0 .51z" />
                </svg>
                <span className="text-sm">@{curator.tiktok_handle.replace(/^@/, '')}</span>
              </a>
            )}
            {curator.contact_email && (
              <a
                href={`mailto:${curator.contact_email}`}
                className="flex items-center gap-3 text-hex-muted hover:text-accent-purple transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm">{curator.contact_email}</span>
              </a>
            )}
          </div>
        </section>
      )}

      {/* Reviews */}
      <section>
        <h2 className="text-xl font-semibold">Reviews ({reviews?.length ?? 0})</h2>
        {reviews?.length ? (
          <div className="mt-6 space-y-4">
            {reviews.map((review) => {
              const submission = review.submissions as {
                track_title: string;
                genre: string;
              } | null;
              return (
                <div key={review.id} className="glass-card rounded-xl p-5">
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
