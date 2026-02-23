import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string | null;
  alt: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
};

export function Avatar({ src, alt, fallback, size = 'md', className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn('rounded-full object-cover', sizeMap[size], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-primary font-semibold text-white',
        sizeMap[size],
        className,
      )}
      aria-label={alt}
    >
      {fallback.slice(0, 2).toUpperCase()}
    </div>
  );
}
