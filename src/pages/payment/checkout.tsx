import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCheckout } from '@/hooks/use-checkout';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SUBMISSION_FEE_DISPLAY } from '@/lib/constants';

export function CheckoutPage() {
  const { submissionId } = useParams<{ submissionId: string }>();
  const checkout = useCheckout();

  useEffect(() => {
    if (!submissionId) return;

    checkout.mutate(submissionId, {
      onSuccess: (url) => {
        window.location.href = url;
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionId]);

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
          <p className="mt-4 text-hex-muted">Redirecting to payment ({SUBMISSION_FEE_DISPLAY})...</p>
        </>
      )}
    </div>
  );
}
