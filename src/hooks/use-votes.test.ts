import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import type { ReactNode } from 'react';

const { mockRpc, mockDelete, mockInsert, mockEq, mockFrom } = vi.hoisted(() => ({
  mockRpc: vi.fn(),
  mockDelete: vi.fn(),
  mockInsert: vi.fn(),
  mockEq: vi.fn(),
  mockFrom: vi.fn(),
}));

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: mockFrom,
    rpc: mockRpc,
  },
}));

import { useHasVoted, useToggleVote } from './use-votes';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
}

beforeEach(() => {
  vi.clearAllMocks();
  mockFrom.mockReturnValue({ delete: mockDelete, insert: mockInsert });
});

describe('useHasVoted', () => {
  it('returns true when user has voted', async () => {
    mockRpc.mockReturnValue({ returns: vi.fn().mockResolvedValue({ data: true, error: null }) });

    const { result } = renderHook(() => useHasVoted('sub-1', 'user-1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBe(true);
    expect(mockRpc).toHaveBeenCalledWith('has_voted', {
      p_submission_id: 'sub-1',
      p_user_id: 'user-1',
    });
  });

  it('returns false when user has not voted', async () => {
    mockRpc.mockReturnValue({ returns: vi.fn().mockResolvedValue({ data: false, error: null }) });

    const { result } = renderHook(() => useHasVoted('sub-1', 'user-2'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBe(false);
  });

  it('defaults to false on null response', async () => {
    mockRpc.mockReturnValue({ returns: vi.fn().mockResolvedValue({ data: null, error: null }) });

    const { result } = renderHook(() => useHasVoted('sub-1', 'user-3'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBe(false);
  });

  it('is disabled when submissionId is undefined', () => {
    const { result } = renderHook(() => useHasVoted(undefined, 'user-1'), {
      wrapper: createWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
  });

  it('is disabled when userId is undefined', () => {
    const { result } = renderHook(() => useHasVoted('sub-1', undefined), {
      wrapper: createWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
  });

  it('propagates RPC errors', async () => {
    mockRpc.mockReturnValue({
      returns: vi.fn().mockResolvedValue({ data: null, error: new Error('RPC failed') }),
    });

    const { result } = renderHook(() => useHasVoted('sub-1', 'user-1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('RPC failed');
  });
});

describe('useToggleVote', () => {
  it('removes a vote when hasVoted is true', async () => {
    const secondEq = vi
      .fn()
      .mockReturnValue({ returns: vi.fn().mockResolvedValue({ error: null }) });
    mockEq.mockReturnValue({ eq: secondEq });
    mockDelete.mockReturnValue({ eq: mockEq });

    const { result } = renderHook(() => useToggleVote(), { wrapper: createWrapper() });

    await act(async () => {
      const res = await result.current.mutateAsync({
        submissionId: 'sub-1',
        voterId: 'user-1',
        hasVoted: true,
      });
      expect(res.action).toBe('removed');
    });
  });

  it('adds a vote when hasVoted is false', async () => {
    mockInsert.mockReturnValue({ returns: vi.fn().mockResolvedValue({ error: null }) });

    const { result } = renderHook(() => useToggleVote(), { wrapper: createWrapper() });

    await act(async () => {
      const res = await result.current.mutateAsync({
        submissionId: 'sub-1',
        voterId: 'user-1',
        hasVoted: false,
      });
      expect(res.action).toBe('added');
    });
  });

  it('throws on delete error', async () => {
    const secondEq = vi.fn().mockReturnValue({
      returns: vi.fn().mockResolvedValue({ error: new Error('Delete failed') }),
    });
    mockEq.mockReturnValue({ eq: secondEq });
    mockDelete.mockReturnValue({ eq: mockEq });

    const { result } = renderHook(() => useToggleVote(), { wrapper: createWrapper() });

    await expect(
      act(() =>
        result.current.mutateAsync({
          submissionId: 'sub-1',
          voterId: 'user-1',
          hasVoted: true,
        }),
      ),
    ).rejects.toThrow('Delete failed');
  });

  it('throws on insert error', async () => {
    mockInsert.mockReturnValue({
      returns: vi.fn().mockResolvedValue({ error: new Error('Duplicate vote') }),
    });

    const { result } = renderHook(() => useToggleVote(), { wrapper: createWrapper() });

    await expect(
      act(() =>
        result.current.mutateAsync({
          submissionId: 'sub-1',
          voterId: 'user-1',
          hasVoted: false,
        }),
      ),
    ).rejects.toThrow('Duplicate vote');
  });
});
