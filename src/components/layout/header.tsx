import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  LogOut,
  LayoutDashboard,
  Shield,
  Menu,
  X,
  Headphones,
  BarChart3,
  Users,
  Music,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { to: '/browse', label: 'Browse', icon: Music },
  { to: '/charts', label: 'Charts', icon: BarChart3 },
  { to: '/curators', label: 'Curators', icon: Users },
];

export function Header() {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary shadow-lg shadow-accent-purple/20 transition-transform group-hover:scale-105">
            <Headphones className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="gradient-text">hex</span>
            <span className="text-hex-text">wave</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-accent-purple/10 text-accent-purple'
                    : 'text-hex-muted hover:text-hex-text hover:bg-white/5',
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user && profile ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              {profile.role === 'admin' && (
                <Link to="/admin">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Shield className="h-4 w-4" />
                    Admin
                  </Button>
                </Link>
              )}
              <div className="flex items-center gap-3 ml-1 pl-3 border-l border-hex-border">
                <span className="text-sm font-medium text-hex-text">
                  {profile.display_name}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => void signOut()}
                  className="text-hex-muted hover:text-error"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="accent" size="sm">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-hex-muted hover:text-hex-text transition-colors"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-hex-surface/95 backdrop-blur-xl animate-slide-up">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-hex-muted hover:text-hex-text hover:bg-white/5 transition-colors"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-hex-border space-y-2">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-hex-muted hover:text-hex-text hover:bg-white/5"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { void signOut(); setMobileOpen(false); }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-hex-muted hover:text-error hover:bg-white/5"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button variant="accent" className="w-full" size="sm">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
