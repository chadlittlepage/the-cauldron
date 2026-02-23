import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
}

export function StatCard({ label, value, icon, className }: StatCardProps) {
  return (
    <div className={cn('glass-card rounded-xl p-5 transition-all duration-300', className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-hex-muted">{label}</p>
        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-purple/10 text-accent-purple">
            {icon}
          </div>
        )}
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
