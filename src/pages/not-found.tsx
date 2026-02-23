import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold text-accent-purple">404</h1>
      <p className="mt-4 text-lg text-hex-muted">Page not found</p>
      <Link to="/" className="mt-8">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
