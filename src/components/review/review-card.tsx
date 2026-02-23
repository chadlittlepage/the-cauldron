import { Link } from 'react-router-dom';
import { StarRating } from '@/components/ui/star-rating';

interface ReviewCardProps {
  id: string;
  submissionId: string;
  trackTitle: string;
  genre: string;
  rating: number;
  feedback: string;
  createdAt: string;
}

export function ReviewCard({
  submissionId,
  trackTitle,
  genre,
  rating,
  feedback,
  createdAt,
}: ReviewCardProps) {
  return (
    <div className="rounded-lg border border-hex-border bg-hex-card p-5">
      <div className="flex items-center justify-between">
        <Link
          to={`/track/${submissionId}`}
          className="font-medium hover:text-accent-purple transition-colors"
        >
          {trackTitle}
        </Link>
        <StarRating value={rating} readonly size="sm" />
      </div>
      <p className="mt-1 text-xs text-hex-muted">{genre}</p>
      <p className="mt-3 text-sm text-hex-muted">{feedback}</p>
      <p className="mt-2 text-xs text-hex-muted">{new Date(createdAt).toLocaleDateString()}</p>
    </div>
  );
}
