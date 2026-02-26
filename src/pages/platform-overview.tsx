import type { LucideIcon } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/use-document-title';
import {
  Building2,
  Code2,
  Puzzle,
  Globe,
  Copyright,
  Server,
  Package,
  Database,
  Wifi,
  ShieldCheck,
  Lock,
  TableProperties,
  Frame,
  Key,
  Ban,
  FileCheck,
  FileCode2,
  Fingerprint,
  Activity,
  GitBranch,
  TestTube,
  ClipboardList,
  CreditCard,
  DollarSign,
  Users,
  Layers,
  FileStack,
  Cloud,
  GitPullRequest,
  Shield,
  UserCheck,
  Wallet,
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

const originalCode: DetailCard[] = [
  {
    icon: Code2,
    title: 'Custom-Built Frontend',
    description:
      'React 19 + TypeScript 5.9 strict mode — no templates, no boilerplate generators. Every component hand-written with CVA pattern system.',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
  },
  {
    icon: Puzzle,
    title: 'Purpose-Built Backend',
    description:
      '5 Supabase Edge Functions, 25 database migrations, custom RLS policies — designed specifically for music curation workflows.',
    color: 'text-accent-pink',
    bg: 'bg-accent-pink/10',
  },
  {
    icon: Globe,
    title: 'No Vendor Lock-In Dependencies',
    description:
      'Standard open-source stack (React, PostgreSQL, Stripe). No proprietary frameworks or black-box SaaS dependencies that limit transferability.',
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
  },
  {
    icon: Copyright,
    title: 'Clean IP',
    description:
      'Entire codebase is original work. No copied code, no GPL contamination, no third-party code that restricts licensing or sale.',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
  },
];

const scalability: DetailCard[] = [
  {
    icon: Server,
    title: 'Serverless Architecture',
    description:
      'Supabase Edge Functions + Vercel CDN — scales automatically with zero infrastructure management. No servers to provision or maintain.',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
  },
  {
    icon: Package,
    title: 'Optimized Bundle Strategy',
    description:
      '5 vendor chunks (React, Supabase, Stripe, TanStack Query, Sentry) + lazy-loaded pages. Sub-second initial loads.',
    color: 'text-accent-pink',
    bg: 'bg-accent-pink/10',
  },
  {
    icon: Database,
    title: 'Database Performance',
    description:
      'PostgreSQL with targeted indexes, materialized analytics functions, and cron-scheduled chart generation — handles growth without query degradation.',
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
  },
  {
    icon: Wifi,
    title: 'CDN-First Delivery',
    description:
      'Vercel edge network with Brotli + Gzip compression, 1-year immutable asset caching. Global low-latency delivery out of the box.',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
  },
];

const securityPosture: CompactCard[] = [
  { icon: ShieldCheck, title: 'Strict Content Security Policy', color: 'text-accent-purple' },
  { icon: Lock, title: '2-Year HSTS Preload', color: 'text-accent-pink' },
  { icon: TableProperties, title: 'Row-Level Security on All Tables', color: 'text-accent-cyan' },
  { icon: Frame, title: 'X-Frame-Options: DENY', color: 'text-accent-purple' },
  { icon: Key, title: 'Server-Side-Only Stripe Keys', color: 'text-accent-pink' },
  { icon: Ban, title: 'No Wildcard CORS', color: 'text-accent-cyan' },
  { icon: FileCheck, title: 'Zod Validation at Every Boundary', color: 'text-accent-purple' },
  { icon: FileCode2, title: 'TypeScript Strict Mode', color: 'text-accent-pink' },
  {
    icon: Fingerprint,
    title: 'Permissions Policy (no camera/mic/geo)',
    color: 'text-accent-cyan',
  },
];

const productionHardening: DetailCard[] = [
  {
    icon: Activity,
    title: 'Error Monitoring',
    description:
      'Sentry with 20% performance tracing, 10% session replay (100% on errors), Web Vitals tracking. Source maps uploaded but deleted from production builds.',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
  },
  {
    icon: GitBranch,
    title: 'CI/CD Pipeline',
    description:
      '4-stage CI (lint → unit tests → build → E2E) with 3-environment CD (preview → staging → production). GitHub Actions + Vercel.',
    color: 'text-accent-pink',
    bg: 'bg-accent-pink/10',
  },
  {
    icon: TestTube,
    title: 'Automated Testing',
    description:
      'Vitest unit tests with coverage reporting, Playwright E2E on Chromium, k6 load tests. Full quality gates before any deploy.',
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
  },
  {
    icon: ClipboardList,
    title: 'Admin Audit Trail',
    description:
      'All admin actions logged. Curator eligibility gating, analytics dashboards, and payout management built in.',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
  },
];

const revenueReady: DetailCard[] = [
  {
    icon: CreditCard,
    title: 'Stripe Integration',
    description:
      'Full payment infrastructure — checkout sessions, webhook handling, curator payouts. Edge Functions keep secret keys server-side only.',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
  },
  {
    icon: DollarSign,
    title: 'Tiered Curator Payouts',
    description:
      'Built-in payout system with tier-based earnings (up to $7/review). Automated payout tracking and admin management.',
    color: 'text-accent-pink',
    bg: 'bg-accent-pink/10',
  },
  {
    icon: Users,
    title: 'Three User Roles',
    description:
      'Artist, Curator, Admin — each with dedicated dashboards, analytics, and permissions enforced at both route and database level.',
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
  },
  {
    icon: Layers,
    title: 'Monetization Flexibility',
    description:
      'Payment infrastructure supports multiple models — submission fees, premium features, subscription tiers. Architecture is ready to pivot.',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
  },
];

const whatYouGet: CompactCard[] = [
  { icon: FileStack, title: '25 Database Migrations', color: 'text-accent-purple' },
  { icon: Cloud, title: '5 Edge Functions', color: 'text-accent-pink' },
  { icon: GitPullRequest, title: '4-Stage CI/CD Pipeline', color: 'text-accent-cyan' },
  { icon: Shield, title: '7 Security Headers', color: 'text-accent-purple' },
  { icon: UserCheck, title: '3 User Roles with Dashboards', color: 'text-accent-pink' },
  { icon: Wallet, title: 'Full Stripe Payment Stack', color: 'text-accent-cyan' },
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

export function PlatformOverviewPage() {
  useDocumentTitle('Platform Overview');
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
            <Building2 className="h-8 w-8 text-accent-purple" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Platform <span className="gradient-text">Overview</span>
          </h1>
          <p className="mt-6 text-lg text-hex-muted max-w-2xl mx-auto leading-relaxed">
            A turnkey, production-grade SaaS product — 100% original code, modern stack, hardened
            security, ready for scale or acquisition.
          </p>
        </div>
      </section>

      <Section
        title={
          <>
            100% Original <span className="gradient-text">Code</span>
          </>
        }
        subtitle="Every line written from scratch. No templates, no generated boilerplate, no licensing baggage."
      >
        <DetailGrid items={originalCode} />
      </Section>

      <Section
        title={<span className="gradient-text">Scalability</span>}
        subtitle="Serverless architecture that scales with demand — no infrastructure overhead."
      >
        <DetailGrid items={scalability} />
      </Section>

      <Section
        title={
          <>
            Security <span className="gradient-text">Posture</span>
          </>
        }
        subtitle="Defense in depth — locked down at every layer."
      >
        <CompactGrid items={securityPosture} />
      </Section>

      <Section
        title={
          <>
            Production <span className="gradient-text">Hardening</span>
          </>
        }
        subtitle="Battle-tested monitoring, testing, and deployment pipeline."
      >
        <DetailGrid items={productionHardening} />
      </Section>

      <Section
        title={
          <>
            Revenue-<span className="gradient-text">Ready</span>
          </>
        }
        subtitle="Full payment infrastructure and monetization flexibility built in."
      >
        <DetailGrid items={revenueReady} />
      </Section>

      <Section
        title={
          <>
            What You <span className="gradient-text">Get</span>
          </>
        }
        subtitle="A complete, production-deployed SaaS platform."
      >
        <CompactGrid items={whatYouGet} />
      </Section>
    </div>
  );
}
