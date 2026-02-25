import { Link } from 'react-router-dom';
import { useAdminStats } from '@/hooks/use-admin';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { StatsGrid } from '@/components/admin/stats-grid';
import { QueryError } from '@/components/ui/query-error';
import { SkeletonStats } from '@/components/ui/skeleton';
import { Shield, FileText, Users, DollarSign, BarChart3, Bug, ArrowRight } from 'lucide-react';

const adminLinks = [
  {
    to: '/admin/submissions',
    label: 'Manage Submissions',
    icon: FileText,
    color: 'bg-accent-purple/10 text-accent-purple',
  },
  {
    to: '/admin/curators',
    label: 'Manage Curators',
    icon: Users,
    color: 'bg-accent-pink/10 text-accent-pink',
  },
  {
    to: '/admin/payouts',
    label: 'Manage Payouts',
    icon: DollarSign,
    color: 'bg-accent-orange/10 text-accent-orange',
  },
  {
    to: '/admin/analytics',
    label: 'Analytics',
    icon: BarChart3,
    color: 'bg-accent-cyan/10 text-accent-cyan',
  },
  {
    to: '/admin/debug',
    label: 'Debug Console',
    icon: Bug,
    color: 'bg-accent-orange/10 text-accent-orange',
  },
];

export function AdminDashboardPage() {
  useDocumentTitle('Admin Dashboard');
  const { data: stats, isLoading, isError, error, refetch } = useAdminStats();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <SkeletonStats />
      </div>
    );
  }

  if (isError) {
    return (
      <QueryError
        error={error}
        fallbackMessage="Failed to load admin stats"
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[300px] rounded-full bg-accent-cyan/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-cyan/10">
            <Shield className="h-5 w-5 text-accent-cyan" />
          </div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <p className="text-hex-muted mb-8">Platform overview and management</p>

        <StatsGrid
          totalSubmissions={stats?.totalSubmissions ?? 0}
          totalCurators={stats?.totalCurators ?? 0}
          totalPayments={stats?.totalPayments ?? 0}
          totalRevenueCents={stats?.totalRevenueCents ?? 0}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {adminLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              <div className="group glass-card rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-accent-purple/5 h-full">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${link.color} mb-4`}
                >
                  <link.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-accent-purple transition-colors">
                  {link.label}
                </h3>
                <span className="flex items-center gap-1 text-xs text-hex-muted opacity-60 group-hover:opacity-100 transition-opacity">
                  Open <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
