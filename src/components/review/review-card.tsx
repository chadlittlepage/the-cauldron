import { memo } from 'react';
import { Link } from 'react-router-dom';
import { StarRating } from '@/components/ui/star-rating';
import { Badge } from '@/components/ui/badge';
import { Music, Calendar, ExternalLink } from 'lucide-react';

interface ReviewCardProps {
  id: string;
  submissionId: string;
  trackTitle: string;
  genre: string;
  rating: number;
  feedback: string;
  createdAt: string;
}

export const ReviewCard = memo(function ReviewCard({
  submissionId,
  trackTitle,
  genre,
  rating,
  feedback,
  createdAt,
}: ReviewCardProps) {
  return (
    <div className="group glass-card rounded-xl p-5 transition-all duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-purple/10">
            <Music className="h-4 w-4 text-accent-purple" />
          </div>
          <div>
            <Link
              to={`/track/${submissionId}`}
              className="font-semibold hover:text-accent-purple transition-colors inline-flex items-center gap-1"
            >
              {trackTitle}
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">{genre}</Badge>
              <span className="flex items-center gap-1 text-xs text-hex-muted">
                <Calendar className="h-3 w-3" />
                {new Date(createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <StarRating value={rating} readonly size="sm" />
      </div>
      <p className="mt-4 text-sm text-hex-muted leading-relaxed">{feedback}</p>
    </div>
  );
});
