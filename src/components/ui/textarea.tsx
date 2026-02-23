import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[100px] w-full rounded-lg border border-hex-border bg-hex-surface/80 px-4 py-3 text-base sm:text-sm text-hex-text placeholder:text-hex-muted/60 transition-all duration-200 hover:border-hex-border-light focus-visible:outline-none focus-visible:border-accent-purple focus-visible:ring-1 focus-visible:ring-accent-purple/50 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
