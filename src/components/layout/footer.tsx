import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-hex-border bg-hex-surface px-6 py-8 mt-auto">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-sm text-hex-muted">
          &copy; {new Date().getFullYear()} hexwave. All rights reserved.
        </div>
        <nav className="flex gap-6 text-sm text-hex-muted">
          <Link to="/browse" className="hover:text-hex-text transition-colors">
            Browse
          </Link>
          <Link to="/charts" className="hover:text-hex-text transition-colors">
            Charts
          </Link>
          <Link to="/curators" className="hover:text-hex-text transition-colors">
            Curators
          </Link>
        </nav>
      </div>
    </footer>
  );
}
