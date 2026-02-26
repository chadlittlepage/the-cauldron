import { Link } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { Button } from '@/components/ui/button';
import {
  Music,
  Play,
  MessageSquare,
  Heart,
  BarChart3,
  TrendingUp,
  ClipboardList,
  Star,
  Tags,
  DollarSign,
  UserCircle,
  ArrowRight,
  Zap,
  Shield,
  Smartphone,
  Lock,
  Eye,
  Users,
} from 'lucide-react';

const platformFlow = [
  {
    step: '01',
    title: 'Submit',
    description: 'Share your Spotify, SoundCloud, or Bandcamp link for free',
    icon: Music,
  },
  {
    step: '02',
    title: 'Review',
    description: 'Expert curators listen and provide detailed feedback & ratings',
    icon: Star,
  },
  {
    step: '03',
    title: 'Vote',
    description: 'The community discovers your track and votes for the best music',
    icon: Heart,
  },
  {
    step: '04',
    title: 'Chart',
    description: 'Top-voted tracks land on monthly and yearly community charts',
    icon: BarChart3,
  },
  {
    step: '05',
    title: 'Earn',
    description: 'Curators earn payouts and artists earn recognition & exposure',
    icon: DollarSign,
  },
];

const artistFeatures = [
  {
    icon: Music,
    title: 'Free Submissions',
    description:
      'Submit any track for free. No hidden fees, no paywalls. Every artist gets equal opportunity.',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
  },
  {
    icon: Play,
    title: 'Multi-Platform Support',
    description:
      'Link tracks from Spotify, SoundCloud, or Bandcamp. We support the platforms you already use.',
    color: 'text-accent-pink',
    bg: 'bg-accent-pink/10',
  },
  {
    icon: MessageSquare,
    title: 'Expert Curator Feedback',
    description:
      'Every submission gets reviewed by curators with 1,000+ listeners. Real feedback, not bots.',
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
  },
  {
    icon: Heart,
    title: 'Community Voting',
    description:
      'Real listeners discover and vote for your music. Community support drives chart placement.',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
  },
  {
    icon: BarChart3,
    title: 'Monthly & Yearly Charts',
    description:
      'Top-voted tracks land on community-powered charts. Rise through the ranks organically.',
    color: 'text-accent-pink',
    bg: 'bg-accent-pink/10',
  },
  {
    icon: TrendingUp,
    title: 'Track Analytics Dashboard',
    description:
      'See how your submissions perform — votes, reviews, chart positions, all in one place.',
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
  },
];

const curatorFeatures = [
  {
    icon: ClipboardList,
    title: 'Review Queue',
    description:
      'A steady stream of fresh submissions to review. Listen, rate, and provide feedback at your pace.',
    color: 'text-accent-pink',
    bg: 'bg-accent-pink/10',
  },
  {
    icon: Star,
    title: 'Detailed Feedback & Ratings',
    description:
      'Rate tracks on production, originality, and overall quality. Your expertise shapes what rises.',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
  },
  {
    icon: Tags,
    title: 'Genre Specialization',
    description:
      'Focus on the genres you know best. Get matched with submissions in your area of expertise.',
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
  },
  {
    icon: DollarSign,
    title: 'Earnings & Payouts',
    description:
      'Earn up to $7 per review with tier-based payouts. Quality reviews earn more over time.',
    color: 'text-accent-pink',
    bg: 'bg-accent-pink/10',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description:
      'Track your review count, earnings, average ratings, and performance stats in real time.',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
  },
  {
    icon: UserCircle,
    title: 'Public Curator Profile',
    description:
      'Build your reputation with a public profile showcasing your reviews, genres, and stats.',
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
  },
];

const platformFeatures = [
  {
    icon: BarChart3,
    title: 'Community-Powered Charts',
    description: 'Charts driven by real votes, not algorithms',
    color: 'text-accent-purple',
  },
  {
    icon: Eye,
    title: 'Transparent Curation',
    description: 'Every review is visible. No hidden gatekeeping.',
    color: 'text-accent-pink',
  },
  {
    icon: TrendingUp,
    title: 'Real-Time Analytics',
    description: 'Live dashboards for artists and curators',
    color: 'text-accent-cyan',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Stripe-powered payouts for curators',
    color: 'text-accent-purple',
  },
  {
    icon: Smartphone,
    title: 'Mobile Responsive',
    description: 'Full experience on any device',
    color: 'text-accent-pink',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Your data stays yours. No selling to third parties.',
    color: 'text-accent-cyan',
  },
];

export function FeaturesPage() {
  useDocumentTitle('Features');
  return (
    <div className="relative">
      {/* ── Hero ── */}
      <section className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-accent-purple/8 blur-[120px]" />
          <div className="absolute top-[200px] right-0 w-[400px] h-[400px] rounded-full bg-accent-pink/5 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-16 text-center">
          <div className="inline-flex items-center justify-center rounded-2xl bg-accent-purple/10 p-4 mb-6">
            <Zap className="h-8 w-8 text-accent-purple" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Everything <span className="gradient-text">hexwave</span> Does
          </h1>
          <p className="mt-6 text-lg text-hex-muted max-w-2xl mx-auto leading-relaxed">
            A complete platform for independent music discovery — from submission to chart
            placement, powered by real curators and community votes.
          </p>
        </div>
      </section>

      {/* ── Platform Flow ── */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              The <span className="gradient-text">hexwave</span> Flow
            </h2>
            <p className="mt-4 text-hex-muted max-w-lg mx-auto">
              From your first submission to chart placement in five steps.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {platformFlow.map((step, idx) => (
              <div key={step.step} className="relative text-center group">
                {/* Connector line (desktop) */}
                {idx < platformFlow.length - 1 && (
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

      {/* ── For Artists ── */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              For <span className="gradient-text">Artists</span>
            </h2>
            <p className="mt-4 text-hex-muted max-w-lg mx-auto">
              Everything you need to get your music heard by the right people.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {artistFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group glass-card rounded-2xl p-8 transition-all duration-300"
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

      {/* ── For Curators ── */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              For <span className="gradient-text">Curators</span>
            </h2>
            <p className="mt-4 text-hex-muted max-w-lg mx-auto">
              Turn your ear for great music into earnings and reputation.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {curatorFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group glass-card rounded-2xl p-8 transition-all duration-300"
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

      {/* ── Platform Features ── */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Platform <span className="gradient-text">Features</span>
            </h2>
            <p className="mt-4 text-hex-muted max-w-lg mx-auto">
              Built for trust, transparency, and a great experience.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {platformFeatures.map((feature) => (
              <div
                key={feature.title}
                className="glass-card rounded-xl p-6 text-center transition-all duration-300"
              >
                <feature.icon className={`mx-auto h-6 w-6 ${feature.color} mb-3`} />
                <h3 className="text-base font-bold text-hex-text mb-2">{feature.title}</h3>
                <p className="text-sm text-hex-muted">{feature.description}</p>
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
              <Users className="h-7 w-7 text-accent-purple" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">Ready to get started?</h2>
            <p className="mt-4 text-hex-muted max-w-lg mx-auto leading-relaxed">
              Join independent artists and curators building a fairer music industry on hexwave.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/dashboard/submit">
                <Button variant="accent" size="xl" className="w-full sm:w-auto group">
                  Submit Song Free
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
