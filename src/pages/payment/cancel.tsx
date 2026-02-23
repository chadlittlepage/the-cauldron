import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export function PaymentCancelPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
      <XCircle className="h-16 w-16 text-error" />
      <h1 className="mt-6 text-3xl font-bold">Payment Cancelled</h1>
      <p className="mt-4 text-hex-muted">
        Your track submission is saved but won&apos;t enter the review queue until payment is complete.
      </p>
      <div className="mt-8 flex gap-4">
        <Link to="/dashboard/submissions">
          <Button variant="accent">View Submissions</Button>
        </Link>
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
