import { useState } from 'react';
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

function Initials({ alt, fallback, size, className }: Omit<AvatarProps, 'src'>) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-primary font-semibold text-white',
        sizeMap[size ?? 'md'],
        className,
      )}
      aria-label={alt}
    >
      {fallback.slice(0, 2).toUpperCase()}
    </div>
  );
}

export function Avatar({ src, alt, fallback, size = 'md', className }: AvatarProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <Initials alt={alt} fallback={fallback} size={size} className={className} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn('rounded-full object-cover', sizeMap[size], className)}
    />
  );
}
