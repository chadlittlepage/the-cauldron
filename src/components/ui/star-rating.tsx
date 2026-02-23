import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

export function StarRating({
  value,
  onChange,
  max = 5,
  size = 'md',
  readonly = false,
  className,
}: StarRatingProps) {
  return (
    <div className={cn('flex gap-1', className)}>
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={cn(
            'transition-colors',
            readonly ? 'cursor-default' : 'cursor-pointer hover:text-accent-orange',
          )}
        >
          <Star
            className={cn(
              sizeMap[size],
              star <= value ? 'fill-accent-orange text-accent-orange' : 'text-hex-border',
            )}
          />
        </button>
      ))}
    </div>
  );
}
