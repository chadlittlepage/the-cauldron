import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import type { ReactNode } from 'react';

const { mockRpc, mockFrom } = vi.hoisted(() => ({
  mockRpc: vi.fn(),
  mockFrom: vi.fn(),
}));

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: mockFrom,
    rpc: mockRpc,
  },
}));

import {
  useSubmissions,
  useSubmission,
  useArtistSubmissions,
  useReviewQueue,
} from './use-submissions';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
}

/** Creates a chainable mock that mimics the Supabase query builder.
 * The Supabase query builder is a thenable — every method returns the same
 * builder, and `await builder` resolves the query. */
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
  for (const m of ['select', 'insert', 'eq', 'in', 'order', 'range', 'single']) {
    builder[m] = vi.fn(() => builder);
  }
  mockFrom.mockReturnValue(builder);
  return builder;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useSubmissions', () => {
  it('fetches paginated submissions', async () => {
    const mockData = [
      { id: '1', track_title: 'Track 1', genre: 'electronic' },
      { id: '2', track_title: 'Track 2', genre: 'rock' },
    ];
    mockQueryBuilder({ data: mockData, error: null, count: 2 });

    const { result } = renderHook(() => useSubmissions({ page: 1 }), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({
      data: mockData,
      totalCount: 2,
      totalPages: 1,
    });
  });

  it('applies genre filter and returns filtered results', async () => {
    const filtered = [{ id: '1', track_title: 'Electronic Track', genre: 'electronic' }];
    mockQueryBuilder({ data: filtered, error: null, count: 1 });

    const { result } = renderHook(() => useSubmissions({ genre: 'electronic', page: 1 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.data).toEqual(filtered);
    expect(result.current.data?.totalCount).toBe(1);
  });

  it('applies status filter and returns filtered results', async () => {
    const filtered = [{ id: '2', track_title: 'Pending Track', status: 'pending' }];
    mockQueryBuilder({ data: filtered, error: null, count: 1 });

    const { result } = renderHook(() => useSubmissions({ status: 'pending', page: 1 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.data).toEqual(filtered);
  });

  it('propagates Supabase errors', async () => {
    mockQueryBuilder({ data: null, error: new Error('DB error'), count: null });

    const { result } = renderHook(() => useSubmissions({}), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('DB error');
  });
});

describe('useSubmission', () => {
  it('fetches a single submission by id via RPC', async () => {
    const mockDetail = { id: '1', track_title: 'Track 1' };
    mockRpc.mockResolvedValue({ data: [mockDetail], error: null });

    const { result } = renderHook(() => useSubmission('1'), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockDetail);
    expect(mockRpc).toHaveBeenCalledWith('get_submission_details', { p_submission_id: '1' });
  });

  it('returns null for empty RPC result', async () => {
    mockRpc.mockResolvedValue({ data: [], error: null });

    const { result } = renderHook(() => useSubmission('nonexistent'), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeNull();
  });

  it('is disabled when id is undefined', () => {
    const { result } = renderHook(() => useSubmission(undefined), { wrapper: createWrapper() });
    expect(result.current.fetchStatus).toBe('idle');
  });
});

describe('useArtistSubmissions', () => {
  it('fetches submissions for an artist', async () => {
    const mockData = [{ id: '1', track_title: 'My Track', artist_id: 'user-1' }];
    mockQueryBuilder({ data: mockData, error: null });

    const { result } = renderHook(() => useArtistSubmissions('user-1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });

  it('is disabled when artistId is undefined', () => {
    const { result } = renderHook(() => useArtistSubmissions(undefined), {
      wrapper: createWrapper(),
    });
    expect(result.current.fetchStatus).toBe('idle');
  });
});

describe('useReviewQueue', () => {
  it('fetches paginated review queue', async () => {
    const mockData = [{ id: '1', status: 'pending', track_title: 'Queued Track' }];
    mockQueryBuilder({ data: mockData, error: null, count: 1 });

    const { result } = renderHook(() => useReviewQueue({ page: 1 }), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.totalCount).toBe(1);
  });
});
