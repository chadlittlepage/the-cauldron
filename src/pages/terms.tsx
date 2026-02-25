import { useDocumentTitle } from '@/hooks/use-document-title';

export function TermsPage() {
  useDocumentTitle('Terms of Service');
  return (
    <div className="relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-accent-purple/3 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-hex-muted mb-10">Last updated: February 2026</p>

        <div className="space-y-8 text-hex-muted leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-hex-text mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using hexwave.io (&quot;the Platform&quot;), you agree to be bound by
              these Terms of Service. If you do not agree to these terms, please do not use the
              Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-hex-text mb-3">2. User Accounts</h2>
            <p>
              You must create an account to submit tracks, vote, or curate. You are responsible for
              maintaining the security of your account credentials. You must be at least 13 years
              old to use the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-hex-text mb-3">3. Submissions</h2>
            <p>
              Artists may submit tracks for a non-refundable fee of $2.00 per submission. By
              submitting, you confirm that you own or have rights to the submitted music. The
              submission fee covers the cost of curation and platform maintenance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-hex-text mb-3">4. Curation & Reviews</h2>
            <p>
              Curators are verified users who review submitted tracks. Reviews must be honest,
              constructive, and meet minimum quality standards. Curators are compensated based on
              their tier level. hexwave reserves the right to remove curators who provide
              low-quality or fraudulent reviews.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-hex-text mb-3">5. Voting</h2>
            <p>
              Each user may cast one vote per track. Vote manipulation, including the use of bots,
              multiple accounts, or coordinated voting schemes, is strictly prohibited and will
              result in account termination.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-hex-text mb-3">6. Payments</h2>
            <p>
              All payments are processed through Stripe. Submission fees are non-refundable. Curator
              payouts are processed monthly. hexwave is not responsible for payment processing
              delays caused by third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-hex-text mb-3">7. Content</h2>
            <p>
              You retain ownership of all music you submit. By submitting, you grant hexwave a
              non-exclusive license to display, embed, and promote your track on the Platform. You
              may remove your submission at any time. Submitted tracks must not contain illegal,
              hateful, or infringing content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-hex-text mb-3">8. Prohibited Conduct</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Creating multiple accounts to manipulate votes</li>
              <li>Submitting music you do not own or have rights to</li>
              <li>Harassment of other users, artists, or curators</li>
              <li>Attempting to circumvent platform security measures</li>
              <li>Using automated tools to interact with the Platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-hex-text mb-3">9. Termination</h2>
            <p>
              hexwave may suspend or terminate your account at any time for violations of these
              terms. You may delete your account at any time through your account settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-hex-text mb-3">10. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the Platform after
              changes constitutes acceptance of the updated terms. We will notify users of material
              changes via email or platform notification.
            </p>
          </section>

          <section className="glass-card rounded-xl p-6">
            <p className="text-sm">
              Questions about these terms? Contact us at{' '}
              <a href="mailto:legal@hexwave.io" className="text-accent-purple hover:underline">
                legal@hexwave.io
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
