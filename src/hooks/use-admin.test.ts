import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import type { ReactNode } from 'react';

const { mockRpc, mockFrom, mockAuth } = vi.hoisted(() => ({
  mockRpc: vi.fn(),
  mockFrom: vi.fn(),
  mockAuth: { getUser: vi.fn() },
}));

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: mockFrom,
    rpc: mockRpc,
    auth: mockAuth,
  },
}));

vi.mock('./use-toast', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

import {
  useAdminStats,
  useAdminSubmissions,
  useUpdateSubmissionStatus,
  useAdminCurators,
  useAdminPayouts,
  useAdminAnalytics,
} from './use-admin';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
}

function mockQueryBuilder(result: { data: unknown; error: unknown; count?: number | null }) {
  const resolvedResult = { ...result, count: result.count ?? null };
  const builder: Record<
    string,
    | ReturnType<typeof vi.fn>
    | ((r: (v: unknown) => void, j?: (e: unknown) => void) => Promise<unknown>)
  > = {
    then: (resolve: (v: unknown) => void, reject?: (e: unknown) => void) =>
      Promise.resolve(resolvedResult).then(resolve, reject),
  };
  for (const m of [
    'select',
    'insert',
    'update',
    'eq',
    'in',
    'order',
    'range',
    'single',
    'returns',
  ]) {
    builder[m] = vi.fn(() => builder);
  }
  mockFrom.mockReturnValue(builder);
  return builder;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useAdminStats', () => {
  it('fetches aggregated admin stats', async () => {
    const submissionsResult = { data: null, error: null, count: 42 };
    const curatorsResult = { data: null, error: null, count: 5 };
    const paymentsResult = {
      data: [{ amount_cents: 200 }, { amount_cents: 200 }],
      error: null,
      count: 2,
    };

    // Each Promise.all call gets its own builder, so we return different builders per from() call
    let callCount = 0;
    mockFrom.mockImplementation(() => {
      callCount++;
      const result =
        callCount === 1 ? submissionsResult : callCount === 2 ? curatorsResult : paymentsResult;
      const builder: Record<string, unknown> = {
        then: (resolve: (v: unknown) => void, reject?: (e: unknown) => void) =>
          Promise.resolve(result).then(resolve, reject),
      };
      for (const m of ['select', 'eq', 'order', 'range', 'single', 'returns']) {
        builder[m] = vi.fn(() => builder);
      }
      return builder;
    });

    const { result } = renderHook(() => useAdminStats(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({
      totalSubmissions: 42,
      totalCurators: 5,
      totalPayments: 2,
      totalRevenueCents: 400,
    });
  });
});

describe('useAdminSubmissions', () => {
  it('fetches paginated submissions', async () => {
    const mockData = [{ id: '1', track_title: 'Track 1' }];
    mockQueryBuilder({ data: mockData, error: null, count: 1 });

    const { result } = renderHook(() => useAdminSubmissions({ page: 1 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ data: mockData, totalCount: 1, totalPages: 1 });
  });

  it('applies status filter', async () => {
    const mockData = [{ id: '2', status: 'accepted' }];
    mockQueryBuilder({ data: mockData, error: null, count: 1 });

    const { result } = renderHook(() => useAdminSubmissions({ status: 'accepted', page: 1 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.data).toEqual(mockData);
  });

  it('propagates errors', async () => {
    mockQueryBuilder({ data: null, error: new Error('DB error'), count: null });

    const { result } = renderHook(() => useAdminSubmissions(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('DB error');
  });
});

describe('useUpdateSubmissionStatus', () => {
  it('updates status and logs audit trail', async () => {
    const updated = { id: 'sub-1', status: 'accepted' };
    const builder = mockQueryBuilder({ data: updated, error: null });

    mockAuth.getUser.mockResolvedValue({ data: { user: { id: 'admin-1' } } });

    const { result } = renderHook(() => useUpdateSubmissionStatus(), { wrapper: createWrapper() });

    result.current.mutate({ id: 'sub-1', status: 'accepted' as const, oldStatus: 'pending' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(builder.update).toHaveBeenCalled();
  });

  it('shows error toast on failure', async () => {
    mockQueryBuilder({ data: null, error: new Error('Update failed') });

    const { result } = renderHook(() => useUpdateSubmissionStatus(), { wrapper: createWrapper() });

    result.current.mutate({ id: 'sub-1', status: 'rejected' as const });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe('useAdminCurators', () => {
  it('fetches paginated curators', async () => {
    const mockData = [{ id: 'c-1', display_name: 'Curator 1', role: 'curator' }];
    mockQueryBuilder({ data: mockData, error: null, count: 1 });

    const { result } = renderHook(() => useAdminCurators({ page: 1 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ data: mockData, totalCount: 1, totalPages: 1 });
  });
});

describe('useAdminPayouts', () => {
  it('fetches paginated payouts', async () => {
    const mockData = [{ id: 'p-1', amount_cents: 500, status: 'completed' }];
    mockQueryBuilder({ data: mockData, error: null, count: 1 });

    const { result } = renderHook(() => useAdminPayouts({ page: 1 }), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ data: mockData, totalCount: 1, totalPages: 1 });
  });
});

describe('useAdminAnalytics', () => {
  it('fetches analytics from multiple RPCs', async () => {
    mockRpc.mockImplementation((fn: string) => {
      const results: Record<string, unknown[]> = {
        get_submissions_by_genre: [{ genre: 'electronic', count: 10 }],
        get_submissions_by_month: [{ month: '2025-01', count: 5 }],
        get_top_curators: [{ curator_id: 'c1', reviews: 20 }],
        get_revenue_by_month: [{ month: '2025-01', revenue: 1000 }],
      };
      return { returns: vi.fn().mockResolvedValue({ data: results[fn] ?? [], error: null }) };
    });

    const { result } = renderHook(() => useAdminAnalytics(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({
      genreBreakdown: [{ genre: 'electronic', count: 10 }],
      monthlySubmissions: [{ month: '2025-01', count: 5 }],
      topCurators: [{ curator_id: 'c1', reviews: 20 }],
      monthlyRevenue: [{ month: '2025-01', revenue: 1000 }],
    });
  });

  it('propagates RPC errors', async () => {
    mockRpc.mockImplementation((fn: string) => {
      if (fn === 'get_submissions_by_genre') {
        return {
          returns: vi.fn().mockResolvedValue({ data: null, error: new Error('RPC failed') }),
        };
      }
      return { returns: vi.fn().mockResolvedValue({ data: [], error: null }) };
    });

    const { result } = renderHook(() => useAdminAnalytics(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('RPC failed');
  });
});
