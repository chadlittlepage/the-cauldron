import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import type { ReactNode } from 'react';

const { mockFrom } = vi.hoisted(() => ({
  mockFrom: vi.fn(),
}));

vi.mock('@/lib/supabase', () => ({
  supabase: { from: mockFrom },
}));

import { useProfile, useCurators, useUpdateProfile } from './use-profile';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
}

function mockQueryBuilder(result: { data: unknown; error: unknown; count?: number | null }) {
  const resolvedResult = { ...result, count: result.count ?? null };
  const builder: Record<string, unknown> = {
    then: (resolve: (v: unknown) => void, reject?: (e: unknown) => void) =>
      Promise.resolve(resolvedResult).then(resolve, reject),
  };
  for (const m of ['select', 'update', 'eq', 'order', 'range', 'single']) {
    builder[m] = vi.fn(() => builder);
  }
  mockFrom.mockReturnValue(builder);
  return builder;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useProfile', () => {
  it('fetches profile by userId', async () => {
    const mockProfile = { id: 'user-1', display_name: 'Test User', role: 'artist' };
    mockQueryBuilder({ data: mockProfile, error: null });

    const { result } = renderHook(() => useProfile('user-1'), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockProfile);
  });

  it('is disabled when userId is undefined', () => {
    const { result } = renderHook(() => useProfile(undefined), { wrapper: createWrapper() });
    expect(result.current.fetchStatus).toBe('idle');
  });

  it('propagates errors', async () => {
    mockQueryBuilder({ data: null, error: new Error('Profile not found') });

    const { result } = renderHook(() => useProfile('bad-id'), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('Profile not found');
  });
});

describe('useCurators', () => {
  it('fetches all curators sorted by listener count', async () => {
    const mockData = [
      { id: 'c-1', display_name: 'Top Curator', listener_count: 5000 },
      { id: 'c-2', display_name: 'New Curator', listener_count: 1200 },
    ];
    mockQueryBuilder({ data: mockData, error: null });

    const { result } = renderHook(() => useCurators(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });

  it('propagates errors', async () => {
    mockQueryBuilder({ data: null, error: new Error('Fetch failed') });

    const { result } = renderHook(() => useCurators(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe('useUpdateProfile', () => {
  it('updates profile and returns updated data', async () => {
    const updatedProfile = { id: 'user-1', display_name: 'Updated Name' };
    mockQueryBuilder({ data: updatedProfile, error: null });

    const { result } = renderHook(() => useUpdateProfile(), { wrapper: createWrapper() });

    result.current.mutate({ userId: 'user-1', updates: { display_name: 'Updated Name' } });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(updatedProfile);
  });
});
