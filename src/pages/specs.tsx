import type { LucideIcon } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/use-document-title';
import {
  Code2,
  Palette,
  Layers,
  Database,
  Cloud,
  Globe,
  KeyRound,
  ShieldCheck,
  Lock,
  TableProperties,
  Frame,
  Key,
  Fingerprint,
  Scissors,
  Loader2,
  Timer,
  HardDrive,
  Activity,
  TestTube,
  GitBranch,
  CheckCircle2,
  FileCode2,
  FileStack,
} from 'lucide-react';

interface DetailCard {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bg: string;
}

interface CompactCard {
  icon: LucideIcon;
  title: string;
  color: string;
}

const techStack: DetailCard[] = [
  {
    icon: Code2,
    title: 'Frontend',
    description: 'React 19, TypeScript 5.9, Vite 7.3',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
  },
  {
    icon: Palette,
    title: 'Styling',
    description: 'Tailwind CSS 4.2, CVA components',
    color: 'text-accent-pink',
    bg: 'bg-accent-pink/10',
  },
  {
    icon: Layers,
    title: 'State & Routing',
    description: 'TanStack Query, React Router 7',
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
  },
];

const backend: DetailCard[] = [
  {
    icon: Database,
    title: 'Database',
    description: 'Supabase PostgreSQL with Row-Level Security on all tables',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
  },
  {
    icon: Cloud,
    title: 'Edge Functions',
    description:
      '5 deployed: create-checkout, stripe-webhook, create-payout, generate-charts, sentry-proxy',
    color: 'text-accent-pink',
    bg: 'bg-accent-pink/10',
  },
  {
    icon: Globe,
    title: 'Hosting',
    description: 'Vercel CDN with Brotli + Gzip compression',
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
  },
  {
    icon: KeyRound,
    title: 'Auth',
    description: 'Supabase Auth — email/password, OAuth implicit flow, auto-refresh sessions',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
  },
];

const security: CompactCard[] = [
  { icon: ShieldCheck, title: 'Strict CSP Headers', color: 'text-accent-purple' },
  { icon: Lock, title: 'HSTS (2-year preload)', color: 'text-accent-pink' },
  { icon: TableProperties, title: 'RLS on All Tables', color: 'text-accent-cyan' },
  { icon: Frame, title: 'X-Frame-Options: DENY', color: 'text-accent-purple' },
  { icon: Key, title: 'Stripe Keys Server-Side Only', color: 'text-accent-pink' },
  { icon: Fingerprint, title: 'Permissions Policy (no camera/mic/geo)', color: 'text-accent-cyan' },
];

const performance: DetailCard[] = [
  {
    icon: Scissors,
    title: 'Code Splitting',
    description: 'Vendor, Supabase, Stripe, Query, Sentry in separate chunks',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
  },
  {
    icon: Loader2,
    title: 'Lazy Loading',
    description: 'All pages except login/signup/404',
    color: 'text-accent-pink',
    bg: 'bg-accent-pink/10',
  },
  {
    icon: Timer,
    title: 'Query Caching',
    description: '5-min stale time with localStorage persistence',
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
  },
  {
    icon: HardDrive,
    title: 'Asset Caching',
    description: '1-year immutable cache for versioned assets',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
  },
];

const monitoring: DetailCard[] = [
  {
    icon: Activity,
    title: 'Sentry',
    description:
      'Error tracking, session replay (10% sample, 100% on error), performance tracing, Web Vitals',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
  },
  {
    icon: TestTube,
    title: 'Testing',
    description: 'Vitest unit tests, Playwright E2E, k6 load tests',
    color: 'text-accent-pink',
    bg: 'bg-accent-pink/10',
  },
  {
    icon: GitBranch,
    title: 'CI/CD',
    description: 'GitHub Actions → Vercel auto-deploy',
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
  },
];

const validation: CompactCard[] = [
  { icon: CheckCircle2, title: 'Zod schemas at every boundary', color: 'text-accent-purple' },
  { icon: FileStack, title: '19 database migrations', color: 'text-accent-pink' },
  { icon: FileCode2, title: 'TypeScript strict mode', color: 'text-accent-cyan' },
];

function Section({
  title,
  subtitle,
  children,
}: {
  title: React.ReactNode;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">{title}</h2>
          <p className="mt-4 text-hex-muted max-w-lg mx-auto">{subtitle}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function DetailGrid({ items, cols = 2 }: { items: DetailCard[]; cols?: 2 | 3 }) {
  const gridCols = cols === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2';
  return (
    <div className={`grid gap-6 ${gridCols}`}>
      {items.map((item) => (
        <div key={item.title} className="glass-card rounded-2xl p-8 transition-all duration-300">
          <div className={`inline-flex items-center justify-center rounded-xl ${item.bg} p-3 mb-5`}>
            <item.icon className={`h-6 w-6 ${item.color}`} />
          </div>
          <h3 className="text-lg font-bold text-hex-text mb-3">{item.title}</h3>
          <p className="text-sm text-hex-muted leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

function CompactGrid({ items }: { items: CompactCard[] }) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="glass-card rounded-xl p-6 text-center transition-all duration-300"
        >
          <item.icon className={`mx-auto h-6 w-6 ${item.color} mb-3`} />
          <h3 className="text-base font-bold text-hex-text">{item.title}</h3>
        </div>
      ))}
    </div>
  );
}

export function SpecsPage() {
  useDocumentTitle('Specs');
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
            <Code2 className="h-8 w-8 text-accent-purple" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Under the <span className="gradient-text">Hood</span>
          </h1>
          <p className="mt-6 text-lg text-hex-muted max-w-2xl mx-auto leading-relaxed">
            Transparency matters. Here's every layer of the stack that powers hexwave — from
            frontend frameworks to security headers.
          </p>
        </div>
      </section>

      <Section
        title={
          <>
            Tech <span className="gradient-text">Stack</span>
          </>
        }
        subtitle="Modern tools chosen for speed, type safety, and developer experience."
      >
        <DetailGrid items={techStack} cols={3} />
      </Section>

      <Section
        title={
          <>
            Backend & <span className="gradient-text">Infrastructure</span>
          </>
        }
        subtitle="Serverless architecture with edge-first performance."
      >
        <DetailGrid items={backend} />
      </Section>

      <Section
        title={<span className="gradient-text">Security</span>}
        subtitle="Defense in depth — every layer locked down."
      >
        <CompactGrid items={security} />
      </Section>

      <Section
        title={<span className="gradient-text">Performance</span>}
        subtitle="Optimized loading, caching, and bundle strategy."
      >
        <DetailGrid items={performance} />
      </Section>

      <Section
        title={
          <>
            Monitoring & <span className="gradient-text">Testing</span>
          </>
        }
        subtitle="Full observability and automated quality gates."
      >
        <DetailGrid items={monitoring} cols={3} />
      </Section>

      <Section
        title={
          <>
            Validation & <span className="gradient-text">Data</span>
          </>
        }
        subtitle="Type safety and data integrity at every boundary."
      >
        <CompactGrid items={validation} />
      </Section>
    </div>
  );
}
