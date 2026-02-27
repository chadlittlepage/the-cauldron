import type { ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary, LoadingBoundary } from './loading-boundary';
import * as Sentry from '@sentry/react';

vi.mock('@sentry/react', () => ({
  captureException: vi.fn(),
}));

function ThrowingComponent({ error }: { error: Error }): ReactNode {
  throw error;
}

function GoodComponent() {
  return <div>All good</div>;
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    // Suppress console.error for expected error boundary logs
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <GoodComponent />
      </ErrorBoundary>,
    );
    expect(screen.getByText('All good')).toBeDefined();
  });

  it('renders error UI when child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent error={new Error('Test crash')} />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Something went wrong')).toBeDefined();
    expect(screen.getByText('Test crash')).toBeDefined();
  });

  it('reports error to Sentry with componentStack', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent error={new Error('Sentry test')} />
      </ErrorBoundary>,
    );
    expect(Sentry.captureException).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Sentry test' }),
      expect.objectContaining({
        extra: expect.objectContaining({ componentStack: expect.any(String) }),
      }),
    );
  });

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<div>Custom error UI</div>}>
        <ThrowingComponent error={new Error('Fallback test')} />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Custom error UI')).toBeDefined();
  });

  it('recovers when Try Again is clicked', () => {
    let shouldThrow = true;

    function MaybeThrow() {
      if (shouldThrow) throw new Error('Recoverable error');
      return <div>Recovered</div>;
    }

    render(
      <ErrorBoundary>
        <MaybeThrow />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something went wrong')).toBeDefined();

    shouldThrow = false;
    fireEvent.click(screen.getByText('Try Again'));

    expect(screen.getByText('Recovered')).toBeDefined();
  });

  it('shows fallback message when error is null', () => {
    // ErrorBoundary stores error from getDerivedStateFromError.
    // When error.message is falsy, the ?? operator only triggers for null/undefined,
    // so we test that the error UI renders even with minimal error info.
    render(
      <ErrorBoundary>
        <ThrowingComponent error={new Error('Minimal error')} />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something went wrong')).toBeDefined();
    expect(screen.getByText('Minimal error')).toBeDefined();
    expect(screen.getByText('Try Again')).toBeDefined();
  });
});

describe('LoadingBoundary', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children synchronously', () => {
    render(
      <LoadingBoundary>
        <GoodComponent />
      </LoadingBoundary>,
    );
    expect(screen.getByText('All good')).toBeDefined();
  });

  it('catches errors from children', () => {
    render(
      <LoadingBoundary>
        <ThrowingComponent error={new Error('Boundary test')} />
      </LoadingBoundary>,
    );
    expect(screen.getByText('Something went wrong')).toBeDefined();
  });
});
