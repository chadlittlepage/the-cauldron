import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect } from 'vitest';
import App from './App';

function renderApp() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>,
  );
}

describe('App', () => {
  it('renders the site title', () => {
    renderApp();
    expect(screen.getByText("The Witches' Cauldron")).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderApp();
    expect(screen.getByText('Submit Music')).toBeInTheDocument();
    expect(screen.getByText('Featured Tracks')).toBeInTheDocument();
    expect(screen.getByText('Curators')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('renders the hero section', () => {
    renderApp();
    expect(screen.getByText('Mystical Curation')).toBeInTheDocument();
    expect(screen.getByText('Submit Your Track')).toBeInTheDocument();
  });
});
