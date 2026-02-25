import { StatCard } from '@/components/dashboard/stat-card';
import { Music, Users, CreditCard, DollarSign } from 'lucide-react';

interface StatsGridProps {
  totalSubmissions: number;
  totalCurators: number;
  totalPayments: number;
  totalRevenueCents: number;
}

export function StatsGrid({
  totalSubmissions,
  totalCurators,
  totalPayments,
  totalRevenueCents,
}: StatsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Submissions"
        value={totalSubmissions}
        icon={<Music className="h-5 w-5" />}
      />
      <StatCard label="Total Curators" value={totalCurators} icon={<Users className="h-5 w-5" />} />
      <StatCard
        label="Total Payments"
        value={totalPayments}
        icon={<CreditCard className="h-5 w-5" />}
      />
      <StatCard
        label="Revenue"
        value={`$${(totalRevenueCents / 100).toFixed(2)}`}
        icon={<DollarSign className="h-5 w-5" />}
      />
    </div>
  );
}
