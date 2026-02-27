import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MainLayout } from './main-layout';

vi.mock('./header', () => ({
  Header: () => <header data-testid="header">Header</header>,
}));

vi.mock('./footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

function renderLayout(children?: React.ReactNode) {
  return render(
    <MemoryRouter>
      <MainLayout>{children ?? <div>Page content</div>}</MainLayout>
    </MemoryRouter>,
  );
}

describe('MainLayout', () => {
  it('renders header, main, and footer', () => {
    renderLayout();
    expect(screen.getByTestId('header')).toBeDefined();
    expect(screen.getByTestId('footer')).toBeDefined();
    expect(screen.getByText('Page content')).toBeDefined();
  });

  it('has a skip-to-content link', () => {
    renderLayout();
    const skipLink = screen.getByText('Skip to content');
    expect(skipLink.tagName).toBe('A');
    expect(skipLink.getAttribute('href')).toBe('#main-content');
  });

  it('main element has id=main-content for skip link target', () => {
    renderLayout();
    const main = document.getElementById('main-content');
    expect(main).toBeDefined();
    expect(main?.tagName).toBe('MAIN');
  });

  it('renders children inside main', () => {
    renderLayout(<span>Custom child</span>);
    const main = document.getElementById('main-content');
    expect(main?.textContent).toContain('Custom child');
  });
});
