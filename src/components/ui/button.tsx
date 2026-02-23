import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-hex-dark disabled:pointer-events-none disabled:opacity-40 cursor-pointer active:scale-[0.97]',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary-light shadow-lg shadow-primary/20',
        accent:
          'gradient-primary text-white shadow-lg shadow-accent-purple/25 hover:shadow-accent-purple/40 hover:brightness-110',
        destructive: 'bg-error text-white hover:bg-error/90 shadow-lg shadow-error/20',
        outline:
          'border border-accent-purple/50 bg-gradient-to-r from-accent-purple/60 to-accent-pink/60 text-white hover:from-accent-purple/80 hover:to-accent-pink/80 shadow-lg shadow-accent-purple/20',
        ghost: 'text-hex-muted hover:text-hex-text hover:bg-white/5',
        link: 'text-accent-purple underline-offset-4 hover:underline',
        glass:
          'border border-accent-purple/50 bg-gradient-to-r from-accent-purple/60 to-accent-pink/60 text-white hover:from-accent-purple/80 hover:to-accent-pink/80 shadow-lg shadow-accent-purple/20',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
