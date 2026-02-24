import { Alert, AlertTitle, AlertDescription } from './alert';
import { Button } from './button';
import { RefreshCw } from 'lucide-react';

interface QueryErrorProps {
  error: unknown;
  fallbackMessage?: string;
  onRetry?: () => void;
  className?: string;
}

export function QueryError({
  error,
  fallbackMessage = 'Something went wrong',
  onRetry,
  className,
}: QueryErrorProps) {
  return (
    <div className={className ?? 'flex flex-col items-center justify-center py-24 gap-4'}>
      <Alert variant="error" className="max-w-md">
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : fallbackMessage}
        </AlertDescription>
        {onRetry && (
          <Button variant="outline" size="sm" className="mt-4 gap-2" onClick={onRetry}>
            <RefreshCw className="h-3.5 w-3.5" />
            Try Again
          </Button>
        )}
      </Alert>
    </div>
  );
}
