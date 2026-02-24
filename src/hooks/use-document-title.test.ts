import { describe, it, expect, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDocumentTitle } from './use-document-title';

describe('useDocumentTitle', () => {
  const originalTitle = document.title;

  afterEach(() => {
    document.title = originalTitle;
  });

  it('sets title with page name', () => {
    renderHook(() => useDocumentTitle('Browse Tracks'));
    expect(document.title).toBe('Browse Tracks — hexwave');
  });

  it('sets default title when no page name provided', () => {
    renderHook(() => useDocumentTitle());
    expect(document.title).toBe('hexwave — Music Curation Platform');
  });

  it('sets default title when undefined passed', () => {
    renderHook(() => useDocumentTitle(undefined));
    expect(document.title).toBe('hexwave — Music Curation Platform');
  });

  it('updates title on re-render with new value', () => {
    const { rerender } = renderHook(
      ({ title }: { title?: string }) => useDocumentTitle(title),
      { initialProps: { title: 'Page A' } },
    );
    expect(document.title).toBe('Page A — hexwave');

    rerender({ title: 'Page B' });
    expect(document.title).toBe('Page B — hexwave');
  });
});
