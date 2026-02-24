import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryError } from './query-error';

describe('QueryError', () => {
  it('renders error message from Error instance', () => {
    render(<QueryError error={new Error('Network failed')} />);
    expect(screen.getByText('Network failed')).toBeInTheDocument();
  });

  it('renders fallback message for non-Error values', () => {
    render(<QueryError error="string error" fallbackMessage="Custom fallback" />);
    expect(screen.getByText('Custom fallback')).toBeInTheDocument();
  });

  it('renders default fallback when no fallbackMessage', () => {
    render(<QueryError error={null} />);
    expect(screen.getAllByText('Something went wrong')).toHaveLength(2); // title + description
  });

  it('renders retry button when onRetry provided', () => {
    const onRetry = vi.fn();
    render(<QueryError error={new Error('fail')} onRetry={onRetry} />);
    const button = screen.getByText('Try Again');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('does not render retry button when no onRetry', () => {
    render(<QueryError error={new Error('fail')} />);
    expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
  });
});
