import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            'flex h-11 w-full appearance-none rounded-lg border border-hex-border bg-hex-surface/80 px-4 py-2 pr-10 text-sm text-hex-text transition-all duration-200 hover:border-hex-border-light focus-visible:outline-none focus-visible:border-accent-purple focus-visible:ring-1 focus-visible:ring-accent-purple/50 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-hex-muted" />
      </div>
    );
  },
);
Select.displayName = 'Select';

export { Select };
