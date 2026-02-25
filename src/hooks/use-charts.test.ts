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

import { useCharts, useChartPeriods } from './use-charts';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
}

function mockQueryBuilder(result: { data: unknown; error: unknown }) {
  const builder: Record<string, unknown> = {
    then: (resolve: (v: unknown) => void, reject?: (e: unknown) => void) =>
      Promise.resolve(result).then(resolve, reject),
  };
  for (const m of ['select', 'eq', 'order', 'range', 'single']) {
    builder[m] = vi.fn(() => builder);
  }
  mockFrom.mockReturnValue(builder);
  return builder;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useCharts', () => {
  it('fetches charts by type and period', async () => {
    const mockData = [
      { id: '1', rank: 1, vote_count: 10, chart_type: 'monthly', period: '2025-01' },
      { id: '2', rank: 2, vote_count: 5, chart_type: 'monthly', period: '2025-01' },
    ];
    mockQueryBuilder({ data: mockData, error: null });

    const { result } = renderHook(() => useCharts('monthly' as const, '2025-01'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });

  it('propagates errors', async () => {
    mockQueryBuilder({ data: null, error: new Error('Charts error') });

    const { result } = renderHook(() => useCharts('monthly' as const, '2025-01'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('Charts error');
  });
});

describe('useChartPeriods', () => {
  it('groups periods by chart type', async () => {
    const mockData = [
      { chart_type: 'monthly', period: '2025-01' },
      { chart_type: 'monthly', period: '2025-02' },
      { chart_type: 'yearly', period: '2025' },
      { chart_type: 'monthly', period: '2025-01' }, // duplicate
    ];
    mockQueryBuilder({ data: mockData, error: null });

    const { result } = renderHook(() => useChartPeriods(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.monthly).toEqual(['2025-01', '2025-02']);
    expect(result.current.data?.yearly).toEqual(['2025']);
  });

  it('returns empty arrays for no data', async () => {
    mockQueryBuilder({ data: [], error: null });

    const { result } = renderHook(() => useChartPeriods(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.monthly).toEqual([]);
    expect(result.current.data?.yearly).toEqual([]);
  });
});
