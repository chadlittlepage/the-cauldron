import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Users,
  Star,
  DollarSign,
  Headphones,
  ArrowRight,
  Check,
  Clock,
  TrendingUp,
  Shield,
  Zap,
  MessageSquare,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const tiers = [
  {
    name: 'Tier 1',
    requirement: '500+ followers',
    payout: '$2.00',
    color: 'border-hex-border',
    accent: 'text-hex-text',
    badge: 'bg-hex-surface',
  },
  {
    name: 'Tier 2',
    requirement: '3,000+ followers',
    payout: '$3.33',
    color: 'border-accent-purple/30',
    accent: 'text-accent-purple',
    badge: 'bg-accent-purple/10',
  },
  {
    name: 'Tier 3',
    requirement: '10,000+ followers',
    payout: '$7.00',
    color: 'border-accent-pink/30',
    accent: 'text-accent-pink',
    badge: 'bg-accent-pink/10',
  },
];

const howItWorks = [
  {
    icon: Users,
    title: 'Apply',
    description: 'Sign up as a curator with your Spotify or social media profile.',
  },
  {
    icon: Shield,
    title: 'Get Verified',
    description: 'We verify your listener/follower count and approve your application.',
  },
  {
    icon: Headphones,
    title: 'Listen & Review',
    description: 'Listen to tracks in your queue and write detailed, honest reviews.',
  },
  {
    icon: DollarSign,
    title: 'Get Paid',
    description: 'Earn per review based on your tier. Payouts processed monthly.',
  },
];

const benefits = [
  { icon: DollarSign, label: 'Earn Per Review' },
  { icon: Headphones, label: 'Discover First' },
  { icon: Star, label: 'Build Reputation' },
  { icon: TrendingUp, label: 'Grow Audience' },
  { icon: MessageSquare, label: 'Shape Culture' },
  { icon: BarChart3, label: 'Track Stats' },
];

export function BecomeCuratorPage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-accent-pink/5 blur-[120px]" />
          <div className="absolute top-[200px] right-0 w-[300px] h-[300px] rounded-full bg-accent-purple/5 blur-[80px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 pt-16 pb-20 text-center">
          <div className="inline-flex items-center justify-center rounded-2xl bg-accent-pink/10 p-4 mb-6">
            <Users className="h-8 w-8 text-accent-pink" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Become a <span className="gradient-text">Curator</span>
          </h1>
          <p className="mt-6 text-lg text-hex-muted max-w-2xl mx-auto leading-relaxed">
            Get paid to discover and review independent music. Earn up to $7 per review, build your
            reputation, and shape what the community hears.
          </p>
          <div className="mt-10">
            <Link to="/signup">
              <Button variant="accent" size="xl" className="gap-2 group">
                Apply Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Earnings Tiers */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Earnings Tiers</h2>
          <p className="mt-3 text-hex-muted">
            The more listeners you have, the more you earn per review.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                'glass-card rounded-2xl p-6 border-t-4 text-center transition-all duration-300 hover:shadow-lg',
                tier.color,
              )}
            >
              <div
                className={cn(
                  'inline-flex rounded-lg px-3 py-1 text-xs font-semibold mb-4',
                  tier.badge,
                  tier.accent,
                )}
              >
                {tier.name}
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">{tier.payout}</div>
              <p className="text-sm text-hex-muted mb-4">per review</p>
              <p className={cn('text-sm font-medium', tier.accent)}>{tier.requirement}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 glass-card rounded-xl p-6 text-center">
          <h3 className="font-bold mb-2">Example Monthly Earnings</h3>
          <p className="text-sm text-hex-muted">
            A Tier 2 curator reviewing 30 tracks/month earns{' '}
            <span className="font-bold text-accent-purple">$99.90/month</span>. Tier 3 curators can
            earn <span className="font-bold text-accent-pink">$210+/month</span>.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, idx) => (
              <div key={step.title} className="text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-hex-card border border-hex-border mb-4">
                  <step.icon className="h-7 w-7 text-accent-pink" />
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full gradient-primary text-[10px] font-bold text-white">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-hex-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track Lifecycle */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Track Lifecycle</h2>
            <p className="mt-3 text-hex-muted">What happens to each submission</p>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: Zap,
                label: 'Submitted',
                desc: 'Artist submits track, enters queue',
                color: 'text-accent-orange',
              },
              {
                icon: Clock,
                label: 'In Review',
                desc: 'Assigned to curators in your tier',
                color: 'text-accent-purple',
              },
              {
                icon: Star,
                label: 'Reviewed',
                desc: 'Curators rate 1-5 stars and write feedback',
                color: 'text-accent-pink',
              },
              {
                icon: Check,
                label: 'Accepted',
                desc: 'Track is published and open for community votes',
                color: 'text-success',
              },
              {
                icon: TrendingUp,
                label: 'Charting',
                desc: 'Top-voted tracks appear on monthly/yearly charts',
                color: 'text-accent-cyan',
              },
            ].map((phase) => (
              <div key={phase.label} className="flex items-center gap-4 glass-card rounded-xl p-4">
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-hex-surface',
                    phase.color,
                  )}
                >
                  <phase.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">{phase.label}</h4>
                  <p className="text-sm text-hex-muted">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.label}
                className="glass-card rounded-xl p-4 text-center transition-all duration-300 hover:border-accent-purple/30"
              >
                <benefit.icon className="mx-auto h-6 w-6 text-accent-purple mb-2" />
                <p className="text-xs font-medium text-hex-muted">{benefit.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-accent-pink/5 blur-[80px]" />
          </div>
          <div className="relative">
            <h2 className="text-3xl font-bold">Ready to curate?</h2>
            <p className="mt-4 text-hex-muted max-w-lg mx-auto">
              Join our growing team of curators and start earning while discovering amazing
              independent music.
            </p>
            <Link to="/signup" className="inline-block mt-8">
              <Button variant="accent" size="xl" className="gap-2 group">
                Apply Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
