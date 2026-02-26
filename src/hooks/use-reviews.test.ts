import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import type { ReactNode } from 'react';

const { mockSelect, mockInsert, mockEq, mockOrder, mockSingle, mockFrom } = vi.hoisted(() => ({
  mockSelect: vi.fn(),
  mockInsert: vi.fn(),
  mockEq: vi.fn(),
  mockOrder: vi.fn(),
  mockSingle: vi.fn(),
  mockFrom: vi.fn(),
}));

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: mockFrom,
  },
}));

import { useSubmissionReviews, useCuratorReviews, useCreateReview } from './use-reviews';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
}

beforeEach(() => {
  vi.clearAllMocks();
  mockFrom.mockReturnValue({ select: mockSelect, insert: mockInsert });
});

describe('useSubmissionReviews', () => {
  it('fetches reviews for a submission', async () => {
    const mockData = [
      { id: 'r1', rating: 4, feedback: 'Great track', profiles: { display_name: 'Curator A' } },
    ];
    mockOrder.mockReturnValue({
      returns: vi.fn().mockResolvedValue({ data: mockData, error: null }),
    });
    mockEq.mockReturnValue({ order: mockOrder });
    mockSelect.mockReturnValue({ eq: mockEq });

    const { result } = renderHook(() => useSubmissionReviews('sub-1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });

  it('returns empty array when no reviews', async () => {
    mockOrder.mockReturnValue({ returns: vi.fn().mockResolvedValue({ data: [], error: null }) });
    mockEq.mockReturnValue({ order: mockOrder });
    mockSelect.mockReturnValue({ eq: mockEq });

    const { result } = renderHook(() => useSubmissionReviews('sub-empty'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([]);
  });

  it('is disabled when submissionId is undefined', () => {
    const { result } = renderHook(() => useSubmissionReviews(undefined), {
      wrapper: createWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
  });

  it('propagates errors', async () => {
    mockOrder.mockReturnValue({
      returns: vi.fn().mockResolvedValue({ data: null, error: new Error('DB error') }),
    });
    mockEq.mockReturnValue({ order: mockOrder });
    mockSelect.mockReturnValue({ eq: mockEq });

    const { result } = renderHook(() => useSubmissionReviews('sub-1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('DB error');
  });
});

describe('useCuratorReviews', () => {
  it('fetches reviews by curator', async () => {
    const mockData = [{ id: 'r1', rating: 5, submissions: { track_title: 'Cool Song' } }];
    mockOrder.mockReturnValue({
      returns: vi.fn().mockResolvedValue({ data: mockData, error: null }),
    });
    mockEq.mockReturnValue({ order: mockOrder });
    mockSelect.mockReturnValue({ eq: mockEq });

    const { result } = renderHook(() => useCuratorReviews('curator-1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });

  it('is disabled when curatorId is undefined', () => {
    const { result } = renderHook(() => useCuratorReviews(undefined), { wrapper: createWrapper() });

    expect(result.current.fetchStatus).toBe('idle');
  });
});

describe('useCreateReview', () => {
  it('inserts a review and returns data', async () => {
    const newReview = {
      submission_id: 'sub-1',
      curator_id: 'curator-1',
      rating: 4,
      feedback: 'This is a really great production quality track.',
    };
    const insertedReview = { id: 'r-new', ...newReview, created_at: '2025-01-01' };

    mockSingle.mockReturnValue({
      returns: vi.fn().mockResolvedValue({ data: insertedReview, error: null }),
    });
    mockSelect.mockReturnValue({ single: mockSingle });
    mockInsert.mockReturnValue({ select: mockSelect });

    const { result } = renderHook(() => useCreateReview(), { wrapper: createWrapper() });

    await result.current.mutateAsync(newReview);

    expect(mockInsert).toHaveBeenCalledWith(newReview);
  });

  it('throws on insert error', async () => {
    mockSingle.mockReturnValue({
      returns: vi.fn().mockResolvedValue({ data: null, error: new Error('Insert failed') }),
    });
    mockSelect.mockReturnValue({ single: mockSingle });
    mockInsert.mockReturnValue({ select: mockSelect });

    const { result } = renderHook(() => useCreateReview(), { wrapper: createWrapper() });

    await expect(
      result.current.mutateAsync({
        submission_id: 'sub-1',
        curator_id: 'c-1',
        rating: 3,
        feedback: 'Some detailed feedback text here.',
      }),
    ).rejects.toThrow('Insert failed');
  });
});
