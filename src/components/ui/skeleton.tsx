import { cn } from '@/lib/utils';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-lg bg-gradient-to-r from-hex-border/30 via-hex-border/60 to-hex-border/30 animate-shimmer',
        className,
      )}
      style={{ backgroundSize: '200% 100%' }}
      {...props}
    />
  );
}
