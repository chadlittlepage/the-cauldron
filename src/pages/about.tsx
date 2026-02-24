import { Link } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { Button } from '@/components/ui/button';
import {
  Headphones,
  Music,
  Users,
  Shield,
  Heart,
  ArrowRight,
  Zap,
  DollarSign,
  Star,
} from 'lucide-react';

export function AboutPage() {
  useDocumentTitle('About');
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-accent-purple/5 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 pt-16 pb-20 text-center">
          <div className="inline-flex items-center justify-center rounded-2xl bg-accent-purple/10 p-4 mb-6">
            <Headphones className="h-8 w-8 text-accent-purple" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            About <span className="gradient-text">hexwave</span>
          </h1>
          <p className="mt-6 text-lg text-hex-muted max-w-2xl mx-auto leading-relaxed">
            We believe great music deserves to be heard. hexwave is a community-powered platform
            where independent artists get real feedback, fair exposure, and a genuine path to
            recognition.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-hex-muted leading-relaxed">
              <p>
                The music industry is broken for independent artists. Algorithms decide what gets
                heard. Playlists are pay-to-play. And genuine feedback is nearly impossible to find.
              </p>
              <p>
                hexwave was built to change that. We created a platform where music is judged on
                its merit, not its marketing budget. Where curators with real audiences provide
                honest reviews. Where community votes, not algorithms, determine what rises to
                the top.
              </p>
              <p>
                Every track submitted gets listened to. Every artist gets feedback. And the best
                music earns its place on the charts through genuine community support.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="glass-card rounded-xl p-6">
              <Heart className="h-6 w-6 text-accent-pink mb-3" />
              <h3 className="font-bold mb-2">Fair & Transparent</h3>
              <p className="text-sm text-hex-muted">
                No hidden algorithms. No pay-to-win. Every submission costs the same $2, and
                every track gets equal opportunity for exposure.
              </p>
            </div>
            <div className="glass-card rounded-xl p-6">
              <Shield className="h-6 w-6 text-accent-cyan mb-3" />
              <h3 className="font-bold mb-2">Community Driven</h3>
              <p className="text-sm text-hex-muted">
                Curators are verified listeners with real audiences. Votes come from real people
                who care about great music.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Artists & Curators */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="glass-card rounded-2xl p-8 border-l-4 border-l-accent-purple">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-purple/10 mb-5">
                <Music className="h-6 w-6 text-accent-purple" />
              </div>
              <h3 className="text-xl font-bold mb-4">For Artists</h3>
              <ul className="space-y-3 text-sm text-hex-muted">
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-accent-purple shrink-0 mt-0.5" />
                  Submit any track for just $2
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-accent-purple shrink-0 mt-0.5" />
                  Get reviewed by curators with 1,000+ listeners
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-accent-purple shrink-0 mt-0.5" />
                  Earn community votes and chart placement
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-accent-purple shrink-0 mt-0.5" />
                  Detailed feedback on every submission
                </li>
              </ul>
              <Link to="/dashboard/submit" className="inline-block mt-6">
                <Button variant="accent" className="gap-2 group">
                  Submit a Track
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="glass-card rounded-2xl p-8 border-l-4 border-l-accent-pink">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-pink/10 mb-5">
                <Users className="h-6 w-6 text-accent-pink" />
              </div>
              <h3 className="text-xl font-bold mb-4">For Curators</h3>
              <ul className="space-y-3 text-sm text-hex-muted">
                <li className="flex items-start gap-2">
                  <Star className="h-4 w-4 text-accent-pink shrink-0 mt-0.5" />
                  Earn money reviewing tracks you love
                </li>
                <li className="flex items-start gap-2">
                  <Star className="h-4 w-4 text-accent-pink shrink-0 mt-0.5" />
                  Tier-based payouts up to $7 per review
                </li>
                <li className="flex items-start gap-2">
                  <Star className="h-4 w-4 text-accent-pink shrink-0 mt-0.5" />
                  Build your reputation as an expert listener
                </li>
                <li className="flex items-start gap-2">
                  <Star className="h-4 w-4 text-accent-pink shrink-0 mt-0.5" />
                  Discover new talent before anyone else
                </li>
              </ul>
              <Link to="/become-curator" className="inline-block mt-6">
                <Button variant="outline" className="gap-2 group">
                  Become a Curator
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: 'Submit', label: 'Share your music', icon: Music },
              { value: 'Review', label: 'Expert feedback', icon: Users },
              { value: 'Vote', label: 'Community decides', icon: Heart },
              { value: 'Chart', label: 'Rise to the top', icon: DollarSign },
            ].map((stat) => (
              <div key={stat.label} className="glass-card rounded-xl p-6">
                <stat.icon className="mx-auto h-6 w-6 text-accent-purple mb-3" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-hex-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
