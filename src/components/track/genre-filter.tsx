import { GENRES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface GenreFilterProps {
  selected: string;
  onChange: (genre: string) => void;
  className?: string;
}

export function GenreFilter({ selected, onChange, className }: GenreFilterProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      <button
        onClick={() => onChange('')}
        className={cn(
          'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200',
          !selected
            ? 'gradient-primary text-white shadow-md shadow-accent-purple/20'
            : 'border border-hex-border text-hex-muted hover:text-hex-text hover:border-hex-border-light',
        )}
      >
        All
      </button>
      {GENRES.map((genre) => (
        <button
          key={genre}
          onClick={() => onChange(genre)}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-all duration-200',
            selected === genre
              ? 'gradient-primary text-white shadow-md shadow-accent-purple/20'
              : 'border border-hex-border text-hex-muted hover:text-hex-text hover:border-hex-border-light',
          )}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
