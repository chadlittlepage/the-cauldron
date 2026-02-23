import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  suffix?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, suffix, ...props }, ref) => {
    if (icon || suffix) {
      return (
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-hex-muted">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'flex h-11 w-full rounded-lg border border-hex-border bg-hex-surface/80 px-4 py-2 text-base sm:text-sm text-hex-text placeholder:text-hex-muted/60 transition-all duration-200 hover:border-hex-border-light focus-visible:outline-none focus-visible:border-accent-purple focus-visible:ring-1 focus-visible:ring-accent-purple/50 disabled:cursor-not-allowed disabled:opacity-50',
              icon && 'pl-10',
              suffix && 'pr-10',
              className,
            )}
            ref={ref}
            {...props}
          />
          {suffix && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-hex-muted">
              {suffix}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-lg border border-hex-border bg-hex-surface/80 px-4 py-2 text-base sm:text-sm text-hex-text placeholder:text-hex-muted/60 transition-all duration-200 hover:border-hex-border-light focus-visible:outline-none focus-visible:border-accent-purple focus-visible:ring-1 focus-visible:ring-accent-purple/50 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
