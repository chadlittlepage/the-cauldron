import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-accent-purple/15 text-accent-purple border border-accent-purple/20',
        accent: 'gradient-primary text-white shadow-sm shadow-accent-purple/20',
        success: 'bg-success/15 text-success border border-success/20',
        warning: 'bg-warning/15 text-warning border border-warning/20',
        error: 'bg-error/15 text-error border border-error/20',
        outline: 'border border-hex-border text-hex-muted hover:border-hex-border-light',
        glass: 'glass text-hex-text text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
