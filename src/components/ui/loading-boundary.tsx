import { Suspense, Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { Spinner } from './spinner';
import { Alert, AlertTitle, AlertDescription } from './alert';
import { Button } from './button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex min-h-[40vh] items-center justify-center p-6">
          <Alert variant="error" className="max-w-md">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription className="mt-2">
              {this.state.error?.message ?? 'An unexpected error occurred'}
            </AlertDescription>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Try Again
            </Button>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

interface LoadingBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function LoadingBoundary({ children, fallback }: LoadingBoundaryProps) {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          fallback ?? (
            <div className="flex min-h-[40vh] items-center justify-center">
              <Spinner size="lg" />
            </div>
          )
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
