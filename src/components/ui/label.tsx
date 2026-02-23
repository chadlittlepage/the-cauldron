import { forwardRef } from 'react';
import type { LabelHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(({ className, ...props }, ref) => {
  return (
    <label
      className={cn('text-sm font-medium text-hex-text leading-none', className)}
      ref={ref}
      {...props}
    />
  );
});
Label.displayName = 'Label';

export { Label };
