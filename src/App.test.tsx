import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi
        .fn()
        .mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
    },
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null }),
    }),
    rpc: vi.fn().mockResolvedValue({ data: null }),
    functions: { invoke: vi.fn() },
  },
}));

vi.mock('@/hooks/use-auth', () => ({
  useAuth: () => ({
    user: null,
    profile: null,
    session: null,
    loading: false,
    signIn: vi.fn(),
    signUp: vi.fn().mockResolvedValue({ data: { session: null, user: null }, error: null }),
    signOut: vi.fn(),
    refreshProfile: vi.fn(),
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

function renderApp(route = '/') {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('App', () => {
  it('renders the site title in header', () => {
    renderApp();
    expect(screen.getAllByText('hex').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('wave').length).toBeGreaterThanOrEqual(1);
  });

  it('renders navigation links', () => {
    renderApp();
    expect(screen.getAllByText('Browse').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Charts').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Curators').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('renders the hero section', () => {
    renderApp();
    expect(screen.getByText('Worth Hearing')).toBeInTheDocument();
    expect(screen.getByText('Submit Your Track')).toBeInTheDocument();
  });

  it('renders login page', () => {
    renderApp('/login');
    expect(screen.getByText('Welcome back')).toBeInTheDocument();
  });

  it('renders signup page', () => {
    renderApp('/signup');
    expect(screen.getByText('Join hexwave as an artist or curator')).toBeInTheDocument();
  });
});
