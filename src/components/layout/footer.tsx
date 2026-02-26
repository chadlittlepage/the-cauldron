import { Link } from 'react-router-dom';
import { Headphones, Mail, Music, BarChart3, Users, Shield, FileText, Lock } from 'lucide-react';

const forArtists = [
  { to: '/dashboard/submit', label: 'Submit Song Free' },
  { to: '/browse', label: 'Browse Music' },
  { to: '/charts', label: 'View Charts' },
  { to: '/about', label: 'How It Works' },
];

const forCurators = [
  { to: '/become-curator', label: 'Become a Curator' },
  { to: '/curators', label: 'Top Curators' },
  { to: '/dashboard/review-queue', label: 'Review Queue' },
];

const hexwaveLinks = [{ to: '/features', label: 'Features' }];

const company = [
  { to: '/about', label: 'About Us' },
  { to: '/terms', label: 'Terms of Service' },
  { to: '/privacy', label: 'Privacy Policy' },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-hex-deeper/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Headphones className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="gradient-text">hex</span>
                <span className="text-hex-text">wave</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-hex-muted leading-relaxed max-w-xs">
              Community-powered music curation. Submit, vote, and discover the next wave of
              independent music.
            </p>
            <a
              href="mailto:hello@hexwave.io"
              className="mt-4 inline-flex items-center gap-2 text-sm text-hex-muted hover:text-accent-purple transition-colors"
            >
              <Mail className="h-4 w-4" />
              hello@hexwave.io
            </a>
          </div>

          {/* For Artists */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold text-hex-text mb-4">
              <Music className="h-4 w-4 text-accent-purple" />
              For Artists
            </h4>
            <ul className="space-y-2.5">
              {forArtists.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-hex-muted hover:text-hex-text transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Curators */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold text-hex-text mb-4">
              <Users className="h-4 w-4 text-accent-pink" />
              For Curators
            </h4>
            <ul className="space-y-2.5">
              {forCurators.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-hex-muted hover:text-hex-text transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* hexwave */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold text-hex-text mb-4">
              <Headphones className="h-4 w-4 text-accent-purple" />
              hexwave
            </h4>
            <ul className="space-y-2.5">
              {hexwaveLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-hex-muted hover:text-hex-text transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold text-hex-text mb-4">
              <Shield className="h-4 w-4 text-accent-cyan" />
              Company
            </h4>
            <ul className="space-y-2.5">
              {company.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-hex-muted hover:text-hex-text transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <p className="text-xs text-hex-muted">
            &copy; {new Date().getFullYear()} hexwave.io. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/terms"
              className="flex items-center gap-1.5 text-xs text-hex-muted hover:text-hex-text transition-colors"
            >
              <FileText className="h-3 w-3" />
              Terms
            </Link>
            <Link
              to="/privacy"
              className="flex items-center gap-1.5 text-xs text-hex-muted hover:text-hex-text transition-colors"
            >
              <Lock className="h-3 w-3" />
              Privacy
            </Link>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="h-3 w-3 text-success" />
              <span className="text-xs text-hex-muted">Community-powered curation</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
