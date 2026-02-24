import { useDocumentTitle } from '@/hooks/use-document-title';
import { Check } from 'lucide-react';

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <Check className="h-4 w-4 text-accent-purple shrink-0 mt-1" />
      <span>{children}</span>
    </li>
  );
}

export function PrivacyPage() {
  useDocumentTitle('Privacy Policy');
  return (
    <div className="relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full bg-accent-cyan/3 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-hex-muted mb-10">Last updated: February 2026</p>

        {/* Summary */}
        <div className="glass-card rounded-xl p-6 mb-10">
          <h2 className="font-bold text-hex-text mb-3">Quick Summary</h2>
          <ul className="space-y-2 text-sm text-hex-muted">
            <BulletItem>We collect only what we need to run the platform</BulletItem>
            <BulletItem>We never sell your personal data to third parties</BulletItem>
            <BulletItem>Payment info is handled securely by Stripe</BulletItem>
            <BulletItem>You can delete your account and data at any time</BulletItem>
            <BulletItem>We use cookies only for authentication and analytics</BulletItem>
          </ul>
        </div>

        <div className="space-y-8 text-hex-muted leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-hex-text mb-3">1. Information We Collect</h2>
            <p className="mb-3">We collect information you provide directly:</p>
            <ul className="space-y-2 text-sm">
              <BulletItem>Account information (email, display name, role)</BulletItem>
              <BulletItem>Profile information (bio, avatar, listener count)</BulletItem>
              <BulletItem>Submission data (track URLs, genres, descriptions)</BulletItem>
              <BulletItem>Reviews and ratings you write</BulletItem>
              <BulletItem>Votes you cast</BulletItem>
            </ul>
            <p className="mt-3">We automatically collect:</p>
            <ul className="space-y-2 text-sm mt-2">
              <BulletItem>IP address and browser type for security</BulletItem>
              <BulletItem>Usage analytics (pages visited, actions taken)</BulletItem>
              <BulletItem>Device information for responsive experience</BulletItem>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-hex-text mb-3">2. How We Use Your Information</h2>
            <ul className="space-y-2 text-sm">
              <BulletItem>Provide and maintain the hexwave platform</BulletItem>
              <BulletItem>Process submissions and payments</BulletItem>
              <BulletItem>Match tracks with curators for review</BulletItem>
              <BulletItem>Generate charts and leaderboards</BulletItem>
              <BulletItem>Send notifications about your submissions and reviews</BulletItem>
              <BulletItem>Prevent fraud and abuse</BulletItem>
              <BulletItem>Improve the platform experience</BulletItem>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-hex-text mb-3">3. Payment Processing</h2>
            <p>
              All payment processing is handled by Stripe. We never store your credit card
              number, CVV, or full payment details on our servers. Stripe&apos;s privacy policy
              governs their handling of your payment information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-hex-text mb-3">4. Data Sharing</h2>
            <p>We do not sell your personal data. We share data only with:</p>
            <ul className="space-y-2 text-sm mt-3">
              <BulletItem>Stripe for payment processing</BulletItem>
              <BulletItem>Supabase for database hosting and authentication</BulletItem>
              <BulletItem>Vercel for application hosting</BulletItem>
              <BulletItem>Law enforcement when legally required</BulletItem>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-hex-text mb-3">5. Data Security</h2>
            <p>
              We implement industry-standard security measures including encryption in transit
              (TLS), row-level security on our database, and secure authentication via Supabase
              Auth. We regularly review our security practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-hex-text mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="space-y-2 text-sm mt-3">
              <BulletItem>Access your personal data</BulletItem>
              <BulletItem>Correct inaccurate data</BulletItem>
              <BulletItem>Delete your account and associated data</BulletItem>
              <BulletItem>Export your data in a portable format</BulletItem>
              <BulletItem>Opt out of non-essential communications</BulletItem>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-hex-text mb-3">7. Cookies</h2>
            <p>
              We use essential cookies for authentication and session management. We use
              analytics cookies to understand platform usage. You can disable non-essential
              cookies in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-hex-text mb-3">8. Changes</h2>
            <p>
              We may update this policy from time to time. We will notify you of material
              changes via email or platform notification. Continued use after changes
              constitutes acceptance.
            </p>
          </section>

          <section className="glass-card rounded-xl p-6">
            <p className="text-sm">
              Questions about privacy? Contact us at{' '}
              <a
                href="mailto:privacy@hexwave.io"
                className="text-accent-purple hover:underline"
              >
                privacy@hexwave.io
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
