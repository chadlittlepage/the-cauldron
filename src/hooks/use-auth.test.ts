import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { createElement } from 'react';
import type { ReactNode } from 'react';

const {
  mockGetSession,
  mockOnAuthStateChange,
  mockSignInWithPassword,
  mockSignUp,
  mockSignOut,
  mockFrom,
} = vi.hoisted(() => ({
  mockGetSession: vi.fn(),
  mockOnAuthStateChange: vi.fn(),
  mockSignInWithPassword: vi.fn(),
  mockSignUp: vi.fn(),
  mockSignOut: vi.fn(),
  mockFrom: vi.fn(),
}));

vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: mockGetSession,
      onAuthStateChange: mockOnAuthStateChange,
      signInWithPassword: mockSignInWithPassword,
      signUp: mockSignUp,
      signOut: mockSignOut,
    },
    from: mockFrom,
  },
}));

import { AuthProvider, useAuth } from './use-auth';

function createWrapper() {
  return ({ children }: { children: ReactNode }) =>
    createElement(AuthProvider, null, children);
}

const mockUser = { id: 'user-1', email: 'test@example.com' };
const mockProfile = {
  id: 'user-1',
  email: 'test@example.com',
  display_name: 'Test User',
  role: 'artist' as const,
  avatar_url: null,
  bio: null,
  listener_count: 0,
  created_at: '2025-01-01',
  updated_at: '2025-01-01',
};
const mockSession = { access_token: 'token', user: mockUser };

beforeEach(() => {
  vi.clearAllMocks();
  // Clear any stored session from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('sb-') && key.endsWith('-auth-token')) {
      localStorage.removeItem(key);
    }
  });

  // Default: no session
  mockGetSession.mockResolvedValue({ data: { session: null }, error: null });
  mockOnAuthStateChange.mockReturnValue({
    data: { subscription: { unsubscribe: vi.fn() } },
  });
});

describe('useAuth', () => {
  it('throws when used outside AuthProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth must be used within an AuthProvider');

    spy.mockRestore();
  });

  it('starts in loading state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    expect(result.current.loading).toBe(true);
  });

  it('resolves to no user when no session exists', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.user).toBeNull();
    expect(result.current.profile).toBeNull();
    expect(result.current.session).toBeNull();
  });

  it('resolves user and profile when session exists', async () => {
    mockGetSession.mockResolvedValue({ data: { session: { ...mockSession } }, error: null });
    mockFrom.mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: mockProfile, error: null }),
        }),
      }),
    });

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.profile).toEqual(mockProfile);
  });

  it('clears state when getSession returns an error', async () => {
    mockGetSession.mockResolvedValue({ data: { session: null }, error: new Error('Auth error') });

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.user).toBeNull();
  });

  it('signs out when profile fetch returns null', async () => {
    mockGetSession.mockResolvedValue({ data: { session: { ...mockSession } }, error: null });
    mockFrom.mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: null, error: null }),
        }),
      }),
    });
    mockSignOut.mockResolvedValue({});

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.user).toBeNull();
    expect(result.current.profile).toBeNull();
  });
});

describe('signIn', () => {
  it('calls supabase signInWithPassword', async () => {
    mockSignInWithPassword.mockResolvedValue({ error: null });

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.signIn('test@example.com', 'Password1');
    });

    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'Password1',
    });
  });

  it('throws on sign in error', async () => {
    mockSignInWithPassword.mockResolvedValue({ error: new Error('Invalid credentials') });

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.loading).toBe(false));

    await expect(
      act(() => result.current.signIn('test@example.com', 'wrong')),
    ).rejects.toThrow('Invalid credentials');
  });
});

describe('signUp', () => {
  it('calls supabase signUp with metadata', async () => {
    mockSignUp.mockResolvedValue({ data: { user: mockUser }, error: null });

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.signUp('test@example.com', 'Password1', {
        display_name: 'New User',
        role: 'artist',
      });
    });

    expect(mockSignUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'Password1',
      options: {
        data: { display_name: 'New User', role: 'artist' },
        emailRedirectTo: expect.stringContaining('/auth/callback'),
      },
    });
  });

  it('throws on sign up error', async () => {
    mockSignUp.mockResolvedValue({ error: new Error('Email taken') });

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.loading).toBe(false));

    await expect(
      act(() =>
        result.current.signUp('taken@example.com', 'Password1', {
          display_name: 'User',
          role: 'artist',
        }),
      ),
    ).rejects.toThrow('Email taken');
  });
});

describe('signOut', () => {
  it('clears state immediately on sign out', async () => {
    mockGetSession.mockResolvedValue({ data: { session: { ...mockSession } }, error: null });
    mockFrom.mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: mockProfile, error: null }),
        }),
      }),
    });
    mockSignOut.mockResolvedValue({});

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.user).toEqual(mockUser));

    await act(async () => {
      await result.current.signOut();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.profile).toBeNull();
    expect(result.current.session).toBeNull();
  });
});
