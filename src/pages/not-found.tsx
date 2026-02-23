import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Headphones } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center px-6">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-accent-purple/5 blur-[120px]" />
      </div>

      <div className="relative text-center">
        <div className="inline-flex items-center justify-center rounded-2xl bg-accent-purple/10 p-4 mb-6">
          <Headphones className="h-10 w-10 text-accent-purple" />
        </div>
        <h1 className="text-7xl font-bold gradient-text mb-4">404</h1>
        <p className="text-lg text-hex-muted mb-2">Page not found</p>
        <p className="text-sm text-hex-muted max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/" className="inline-block mt-8">
          <Button variant="accent" size="lg" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
