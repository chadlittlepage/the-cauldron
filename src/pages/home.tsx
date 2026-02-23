import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Music, TrendingUp, Users } from 'lucide-react';

export function HomePage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          Discover Independent Music
          <br />
          <span className="text-accent-purple">Curated by the Community</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-hex-muted">
          Submit your tracks for $2, get reviewed by expert curators, and climb the charts through
          community votes.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link to="/dashboard/submit">
            <Button variant="accent" size="lg">
              Submit Your Track
            </Button>
          </Link>
          <Link to="/browse">
            <Button variant="outline" size="lg">
              Browse Tracks
            </Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border border-hex-border bg-hex-card p-8 text-center">
            <Music className="mx-auto mb-4 h-10 w-10 text-accent-purple" />
            <h3 className="text-lg font-semibold">Submit Music</h3>
            <p className="mt-2 text-sm text-hex-muted">
              Share your tracks with a community of passionate music lovers for just $2.
            </p>
          </div>
          <div className="rounded-lg border border-hex-border bg-hex-card p-8 text-center">
            <TrendingUp className="mx-auto mb-4 h-10 w-10 text-accent-orange" />
            <h3 className="text-lg font-semibold">Vote & Discover</h3>
            <p className="mt-2 text-sm text-hex-muted">
              Vote for your favorite tracks and discover new music through community-driven charts.
            </p>
          </div>
          <div className="rounded-lg border border-hex-border bg-hex-card p-8 text-center">
            <Users className="mx-auto mb-4 h-10 w-10 text-success" />
            <h3 className="text-lg font-semibold">Expert Curation</h3>
            <p className="mt-2 text-sm text-hex-muted">
              Get feedback from curators with 1000+ listeners who know great music when they hear
              it.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
