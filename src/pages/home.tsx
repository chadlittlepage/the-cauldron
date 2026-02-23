import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Music,
  TrendingUp,
  Users,
  ArrowRight,
  Play,
  Star,
  Zap,
  DollarSign,
  Headphones,
  BarChart3,
  Shield,
  Sparkles,
} from 'lucide-react';

const stats = [
  { label: 'Tracks Submitted', value: '343+', icon: Music },
  { label: 'Active Curators', value: '28', icon: Users },
  { label: 'Community Votes', value: '12K+', icon: TrendingUp },
  { label: 'Artists Paid', value: '$4.2K', icon: DollarSign },
];

const features = [
  {
    icon: Music,
    title: 'Submit Your Music',
    description:
      'Share your tracks with a passionate community for just $2. Get real feedback from verified curators.',
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
    description:
      'Community votes drive monthly charts. The best music rises naturally.',
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
  return (
    <div className="relative">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-accent-purple/8 blur-[120px] animate-pulse-glow" />
          <div className="absolute top-[200px] right-0 w-[400px] h-[400px] rounded-full bg-accent-pink/5 blur-[100px] animate-pulse-glow stagger-2" />
          <div className="absolute top-[100px] left-0 w-[300px] h-[300px] rounded-full bg-accent-cyan/5 blur-[80px] animate-pulse-glow stagger-3" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-28">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-purple/20 bg-accent-purple/10 px-4 py-1.5 text-sm text-accent-purple mb-8 animate-fade-in">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Community-powered music curation</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] animate-slide-up">
              Discover Music
              <br />
              <span className="gradient-text">Worth Hearing</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg text-hex-muted leading-relaxed animate-slide-up stagger-1">
              Submit tracks for $2, get reviewed by expert curators, and let the community
              decide what rises to the top.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-slide-up stagger-2">
              <Link to="/dashboard/submit">
                <Button variant="accent" size="xl" className="w-full sm:w-auto group">
                  Submit Your Track
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

          {/* Stats bar */}
          <div className="mx-auto mt-20 max-w-4xl animate-slide-up stagger-3">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-xl px-5 py-4 text-center transition-all duration-300"
                >
                  <stat.icon className="mx-auto h-5 w-5 text-accent-purple mb-2" />
                  <div className="text-2xl font-bold text-hex-text">{stat.value}</div>
                  <div className="text-xs text-hex-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative border-t border-white/5">
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
                <div className={`inline-flex items-center justify-center rounded-xl ${feature.bg} p-3 mb-5`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-bold text-hex-text mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-hex-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="relative border-t border-white/5">
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
      <section className="relative border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-accent-purple/5 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center rounded-xl bg-accent-purple/10 p-3 mb-6">
              <Shield className="h-7 w-7 text-accent-purple" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ready to share your music?
            </h2>
            <p className="mt-4 text-hex-muted max-w-lg mx-auto leading-relaxed">
              Join hundreds of independent artists already getting real feedback and community
              recognition on hexwave.
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
