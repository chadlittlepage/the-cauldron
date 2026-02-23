import { Link } from 'react-router-dom';
import { useAdminStats } from '@/hooks/use-admin';
import { StatsGrid } from '@/components/admin/stats-grid';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export function AdminDashboardPage() {
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-hex-muted">Platform overview and management</p>

      <div className="mt-8">
        <StatsGrid
          totalSubmissions={stats?.totalSubmissions ?? 0}
          totalCurators={stats?.totalCurators ?? 0}
          totalPayments={stats?.totalPayments ?? 0}
          totalRevenueCents={stats?.totalRevenueCents ?? 0}
        />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link to="/admin/submissions">
          <Button variant="outline" className="w-full">Manage Submissions</Button>
        </Link>
        <Link to="/admin/curators">
          <Button variant="outline" className="w-full">Manage Curators</Button>
        </Link>
        <Link to="/admin/payouts">
          <Button variant="outline" className="w-full">Manage Payouts</Button>
        </Link>
        <Link to="/admin/analytics">
          <Button variant="outline" className="w-full">Analytics</Button>
        </Link>
      </div>
    </div>
  );
}
