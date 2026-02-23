import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export function PaymentSuccessPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
      <CheckCircle className="h-16 w-16 text-success" />
      <h1 className="mt-6 text-3xl font-bold">Payment Successful</h1>
      <p className="mt-4 text-hex-muted">
        Your track has been submitted and will be reviewed by our curators.
      </p>
      <div className="mt-8 flex gap-4">
        <Link to="/dashboard/submissions">
          <Button variant="accent">View Submissions</Button>
        </Link>
        <Link to="/browse">
          <Button variant="outline">Browse Tracks</Button>
        </Link>
      </div>
    </div>
  );
}
