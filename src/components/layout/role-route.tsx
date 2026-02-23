import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Spinner } from '@/components/ui/spinner';
import type { UserRole } from '@/types/database';

interface RoleRouteProps {
  children: ReactNode;
  role: UserRole;
}

export function RoleRoute({ children, role }: RoleRouteProps) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (profile && profile.role !== role && profile.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
