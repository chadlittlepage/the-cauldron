import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCheckout } from '@/hooks/use-checkout';
import { useSubmission } from '@/hooks/use-submissions';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SUBMISSION_FEE_DISPLAY } from '@/lib/constants';

export function CheckoutPage() {
  const { submissionId } = useParams<{ submissionId: string }>();
  const navigate = useNavigate();
  const checkout = useCheckout();
  const { data: submission, isLoading: submissionLoading } = useSubmission(submissionId);
  const mutatedRef = useRef(false);

  useEffect(() => {
    if (!submissionId || submissionLoading) return;

    if (!submission) {
      navigate('/dashboard/submissions', { replace: true });
      return;
    }

    if (mutatedRef.current) return;
    mutatedRef.current = true;

    checkout.mutate(submissionId, {
      onSuccess: (url) => {
        const parsed = new URL(url);
        if (parsed.protocol !== 'https:' || !parsed.hostname.endsWith('stripe.com')) {
          throw new Error('Invalid checkout URL');
        }
        window.location.href = url;
      },
      onError: () => {
        mutatedRef.current = false;
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionId, submissionLoading, submission]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
      {checkout.isError ? (
        <Alert variant="error">
          <AlertDescription>
            {checkout.error instanceof Error ? checkout.error.message : 'Checkout failed'}
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <Spinner size="lg" />
          <p className="mt-4 text-hex-muted">
            Redirecting to payment ({SUBMISSION_FEE_DISPLAY})...
          </p>
        </>
      )}
    </div>
  );
}
