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
          'rounded-full px-3 py-1 text-sm transition-colors',
          !selected
            ? 'bg-accent-purple text-white'
            : 'border border-hex-border text-hex-muted hover:text-hex-text',
        )}
      >
        All
      </button>
      {GENRES.map((genre) => (
        <button
          key={genre}
          onClick={() => onChange(genre)}
          className={cn(
            'rounded-full px-3 py-1 text-sm capitalize transition-colors',
            selected === genre
              ? 'bg-accent-purple text-white'
              : 'border border-hex-border text-hex-muted hover:text-hex-text',
          )}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
