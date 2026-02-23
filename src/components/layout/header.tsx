import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, Shield } from 'lucide-react';

export function Header() {
  const { user, profile, signOut } = useAuth();

  return (
    <header className="border-b border-hex-border bg-hex-surface px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="text-xl font-bold text-accent-purple">
          hexwave
        </Link>
        <nav className="flex items-center gap-6 text-sm text-hex-muted">
          <Link to="/browse" className="hover:text-hex-text transition-colors">
            Browse
          </Link>
          <Link to="/charts" className="hover:text-hex-text transition-colors">
            Charts
          </Link>
          <Link to="/curators" className="hover:text-hex-text transition-colors">
            Curators
          </Link>
          {user && profile ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-1.5 hover:text-hex-text transition-colors">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              {profile.role === 'admin' && (
                <Link to="/admin" className="flex items-center gap-1.5 hover:text-hex-text transition-colors">
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
              )}
              <span className="text-hex-text">{profile.display_name}</span>
              <Button variant="ghost" size="sm" onClick={() => void signOut()}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="default" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
