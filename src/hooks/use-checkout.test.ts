import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import type { ReactNode } from 'react';

const { mockAuth, mockFunctions } = vi.hoisted(() => ({
  mockAuth: { getSession: vi.fn() },
  mockFunctions: { invoke: vi.fn() },
}));

vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: mockAuth,
    functions: mockFunctions,
  },
}));

import { useCheckout } from './use-checkout';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useCheckout', () => {
  it('returns checkout URL on success', async () => {
    mockAuth.getSession.mockResolvedValue({ data: { session: { access_token: 'tok' } } });
    mockFunctions.invoke.mockResolvedValue({ data: { url: 'https://checkout.stripe.com/pay' }, error: null });

    const { result } = renderHook(() => useCheckout(), { wrapper: createWrapper() });

    result.current.mutate('sub-1');

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBe('https://checkout.stripe.com/pay');
  });

  it('throws when not authenticated', async () => {
    mockAuth.getSession.mockResolvedValue({ data: { session: null } });

    const { result } = renderHook(() => useCheckout(), { wrapper: createWrapper() });

    result.current.mutate('sub-1');

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('Not authenticated');
  });

  it('throws on edge function error', async () => {
    mockAuth.getSession.mockResolvedValue({ data: { session: { access_token: 'tok' } } });
    mockFunctions.invoke.mockResolvedValue({ data: null, error: { message: 'Function failed' } });

    const { result } = renderHook(() => useCheckout(), { wrapper: createWrapper() });

    result.current.mutate('sub-1');

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('Function failed');
  });

  it('throws when no URL returned', async () => {
    mockAuth.getSession.mockResolvedValue({ data: { session: { access_token: 'tok' } } });
    mockFunctions.invoke.mockResolvedValue({ data: {}, error: null });

    const { result } = renderHook(() => useCheckout(), { wrapper: createWrapper() });

    result.current.mutate('sub-1');

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('No checkout URL returned');
  });
});
