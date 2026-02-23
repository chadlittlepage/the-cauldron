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
    <div className={cn('rounded-lg border border-hex-border bg-hex-card p-5', className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-hex-muted">{label}</p>
        {icon && <div className="text-hex-muted">{icon}</div>}
      </div>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
