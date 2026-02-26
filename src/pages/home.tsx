import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Music,
  TrendingUp,
  ArrowRight,
  Play,
  Star,
  Zap,
  Headphones,
  BarChart3,
  Shield,
  Sparkles,
  Heart,
  ThumbsDown,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useSwipe } from '@/hooks/use-swipe';
import trackPool from './track-pool.json';

/** Fisher-Yates shuffle, returns a new array. */
function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const FEATURED_COUNT = 50;

const pillStats = [
  { label: 'Submit Music', icon: Music, desc: 'Share your tracks' },
  { label: 'Get Reviewed', icon: Star, desc: 'Expert curators listen' },
  { label: 'Earn Votes', icon: Heart, desc: 'Community decides' },
  { label: 'Chart', icon: TrendingUp, desc: 'Rise to the top' },
];

const features = [
  {
    icon: Music,
    title: 'Submit Your Music',
    description:
      'Share your tracks with a passionate community. Get real feedback from verified curators.',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
    glow: 'group-hover:shadow-accent-purple/10',
  },
  {
    icon: Headphones,
    title: 'Expert Curation',
    description:
      'Curators with 1,000+ listeners review every track. Genuine feedback, not algorithms.',
    color: 'text-accent-pink',
    bg: 'bg-accent-pink/10',
    glow: 'group-hover:shadow-accent-pink/10',
  },
  {
    icon: BarChart3,
    title: 'Climb the Charts',
    description: 'Community votes drive monthly charts. The best music rises naturally.',
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
    glow: 'group-hover:shadow-accent-cyan/10',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Upload',
    description: 'Submit your Spotify, SoundCloud, or Bandcamp link',
    icon: Play,
  },
  {
    step: '02',
    title: 'Review',
    description: 'Expert curators listen and provide detailed feedback',
    icon: Star,
  },
  {
    step: '03',
    title: 'Vote',
    description: 'The community discovers and votes for the best tracks',
    icon: Zap,
  },
  {
    step: '04',
    title: 'Chart',
    description: 'Top tracks land on monthly and yearly charts',
    icon: TrendingUp,
  },
];

export function HomePage() {
  const featuredTracks = useMemo(() => shuffle(trackPool).slice(0, FEATURED_COUNT), []);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [loadedIframes, setLoadedIframes] = useState<Set<number>>(new Set());

  function markLoaded(idx: number) {
    setLoadedIframes((prev) => new Set(prev).add(idx));
  }

  const nextTrack = useCallback(() => {
    setCurrentTrack((i) => (i + 1) % featuredTracks.length);
  }, [featuredTracks.length]);

  const prevTrack = useCallback(() => {
    setCurrentTrack((i) => (i - 1 + featuredTracks.length) % featuredTracks.length);
  }, [featuredTracks.length]);

  const swipeRef = useSwipe(nextTrack, prevTrack);

  return (
    <div className="relative">
      {/* ── Hero ── */}
      <section className="relative">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-accent-purple/8 blur-[120px] animate-pulse-glow" />
          <div className="absolute top-[200px] right-0 w-[400px] h-[400px] rounded-full bg-accent-pink/5 blur-[100px] animate-pulse-glow" />
          <div className="absolute top-[100px] left-0 w-[300px] h-[300px] rounded-full bg-accent-cyan/5 blur-[80px] animate-pulse-glow" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-purple/20 bg-accent-purple/10 px-4 py-1.5 text-sm text-accent-purple mb-8">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Community-powered music curation</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Discover Music
              <br />
              <span className="gradient-text">Worth Hearing</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg text-hex-muted leading-relaxed">
              Submit your songs for free, get reviewed by expert curators, and let the community
              decide what rises to the top.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/dashboard/submit">
                <Button variant="accent" size="xl" className="w-full sm:w-auto group">
                  Submit Song Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/browse">
                <Button variant="glass" size="xl" className="w-full sm:w-auto">
                  <Play className="h-4 w-4" />
                  Explore Music
                </Button>
              </Link>
            </div>
          </div>

          {/* Process pills */}
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {pillStats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-xl px-5 py-4 text-center transition-all duration-300"
                >
                  <stat.icon className="mx-auto h-5 w-5 text-accent-purple mb-2" />
                  <div className="text-sm font-bold text-hex-text">{stat.label}</div>
                  <div className="text-xs text-hex-muted mt-1">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Track / Now Playing ── */}
      <section className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-purple/5 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 py-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold">
              <span className="gradient-text">Now Playing</span>
            </h2>
            <p className="mt-3 text-hex-muted">Listen, vote, and help great music rise.</p>
          </div>

          {/* Track counter */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              type="button"
              onClick={prevTrack}
              className="p-2 rounded-lg text-hex-muted hover:text-hex-text hover:bg-white/5 transition-colors"
              aria-label="Previous track"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-hex-muted">
              Song {currentTrack + 1} of {featuredTracks.length}
            </span>
            <button
              type="button"
              onClick={nextTrack}
              className="p-2 rounded-lg text-hex-muted hover:text-hex-text hover:bg-white/5 transition-colors"
              aria-label="Next track"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Track cards — sliding window ±2, stacked with opacity */}
          <div className="relative">
            {featuredTracks.map((t, idx) => {
              const len = featuredTracks.length;
              const distance = Math.min(
                Math.abs(idx - currentTrack),
                len - Math.abs(idx - currentTrack),
              );
              if (distance > 2) return null;
              const isActive = idx === currentTrack;

              return (
                <div
                  key={t.spotifyId}
                  ref={isActive ? swipeRef : undefined}
                  className={`glass-card rounded-2xl p-6 ${isActive ? 'relative glow-purple' : 'absolute inset-0 pointer-events-none'}`}
                  style={!isActive ? { opacity: 0 } : undefined}
                >
                  {/* Track header */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <h3 className="text-xl font-bold">{t.title}</h3>
                      <p className="text-hex-muted">{t.artist}</p>
                    </div>
                    <div className="flex gap-1.5">
                      {t.genres.map((g) => (
                        <Badge key={g} variant="outline">
                          {g}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Spotify Embed */}
                  <div
                    className="rounded-xl overflow-hidden mb-5"
                    style={{ height: 152, background: '#000' }}
                  >
                    <iframe
                      src={`https://open.spotify.com/embed/track/${t.spotifyId}?theme=0`}
                      width="100%"
                      height="152"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="eager"
                      style={{
                        touchAction: 'auto',
                        display: 'block',
                        border: 'none',
                        visibility: loadedIframes.has(idx) ? 'visible' : 'hidden',
                      }}
                      title={`${t.title} by ${t.artist}`}
                      className="rounded-xl"
                      onLoad={() => markLoaded(idx)}
                    />
                  </div>

                  {/* Open in Spotify link */}
                  <div className="flex justify-end mb-5">
                    <a
                      href={`https://open.spotify.com/track/${t.spotifyId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-accent-purple hover:text-accent-purple/80 transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Open in Spotify
                    </a>
                  </div>

                  {/* Vote / Pass buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/signup">
                      <Button variant="accent" size="lg" className="w-full gap-2">
                        <Heart className="h-4 w-4" />
                        Vote ({t.votes})
                      </Button>
                    </Link>
                    <Button variant="outline" size="lg" className="w-full gap-2" onClick={nextTrack}>
                      <ThumbsDown className="h-4 w-4" />
                      Pass
                    </Button>
                  </div>

                  <p className="text-center text-xs text-hex-muted mt-4">
                    <Link to="/signup" className="text-accent-purple hover:underline">
                      Sign up
                    </Link>{' '}
                    to hear full songs and vote.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Why <span className="gradient-text">hexwave</span>?
            </h2>
            <p className="mt-4 text-hex-muted max-w-lg mx-auto">
              A fair, transparent platform where great music gets the recognition it deserves.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`group glass-card rounded-2xl p-8 transition-all duration-300 hover:shadow-xl ${feature.glow}`}
              >
                <div
                  className={`inline-flex items-center justify-center rounded-xl ${feature.bg} p-3 mb-5`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-bold text-hex-text mb-3">{feature.title}</h3>
                <p className="text-sm text-hex-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">How It Works</h2>
            <p className="mt-4 text-hex-muted max-w-lg mx-auto">
              From submission to chart placement in four simple steps.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, idx) => (
              <div key={step.step} className="relative text-center group">
                {/* Connector line (desktop) */}
                {idx < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+32px)] w-[calc(100%-64px)] h-px bg-gradient-to-r from-hex-border to-transparent" />
                )}
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-hex-card border border-hex-border mb-5 group-hover:border-accent-purple/30 transition-colors">
                  <step.icon className="h-8 w-8 text-accent-purple" />
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full gradient-primary text-[10px] font-bold text-white">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-hex-text mb-2">{step.title}</h3>
                <p className="text-sm text-hex-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-accent-purple/5 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center rounded-xl bg-accent-purple/10 p-3 mb-6">
              <Shield className="h-7 w-7 text-accent-purple" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">Ready to share your music?</h2>
            <p className="mt-4 text-hex-muted max-w-lg mx-auto leading-relaxed">
              Join independent artists getting real feedback and community recognition on hexwave.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button variant="accent" size="xl" className="w-full sm:w-auto group">
                  Create Free Account
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/become-curator">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Become a Curator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
