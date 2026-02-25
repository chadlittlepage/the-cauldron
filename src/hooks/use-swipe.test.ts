import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSwipe } from './use-swipe';

beforeEach(() => {
  vi.clearAllMocks();
});

function createTouchEvent(type: string, clientX: number, clientY: number) {
  const touch = { clientX, clientY };
  return new TouchEvent(type, {
    [type === 'touchend' ? 'changedTouches' : 'touches']: [touch] as unknown as Touch[],
    bubbles: true,
  });
}

describe('useSwipe', () => {
  it('returns a ref callback', () => {
    const { result } = renderHook(() => useSwipe());
    expect(typeof result.current).toBe('function');
  });

  it('fires onLeft for a left swipe beyond threshold', async () => {
    const onLeft = vi.fn();
    const onRight = vi.fn();
    const div = document.createElement('div');

    const { result } = renderHook(() => useSwipe(onLeft, onRight));

    act(() => result.current(div));

    // Swipe left: start at 200, move to 100 (dx = -100, well beyond 50px threshold)
    act(() => {
      div.dispatchEvent(createTouchEvent('touchstart', 200, 100));
      div.dispatchEvent(createTouchEvent('touchmove', 150, 100)); // locks horizontal
      div.dispatchEvent(createTouchEvent('touchend', 100, 100));
    });

    expect(onLeft).toHaveBeenCalledTimes(1);
    expect(onRight).not.toHaveBeenCalled();
  });

  it('fires onRight for a right swipe beyond threshold', () => {
    const onLeft = vi.fn();
    const onRight = vi.fn();
    const div = document.createElement('div');

    const { result } = renderHook(() => useSwipe(onLeft, onRight));

    act(() => result.current(div));

    act(() => {
      div.dispatchEvent(createTouchEvent('touchstart', 100, 100));
      div.dispatchEvent(createTouchEvent('touchmove', 150, 100));
      div.dispatchEvent(createTouchEvent('touchend', 200, 100));
    });

    expect(onRight).toHaveBeenCalledTimes(1);
    expect(onLeft).not.toHaveBeenCalled();
  });

  it('ignores swipe below threshold', () => {
    const onLeft = vi.fn();
    const onRight = vi.fn();
    const div = document.createElement('div');

    const { result } = renderHook(() => useSwipe(onLeft, onRight));

    act(() => result.current(div));

    // Move only 30px — below 50px threshold
    act(() => {
      div.dispatchEvent(createTouchEvent('touchstart', 100, 100));
      div.dispatchEvent(createTouchEvent('touchmove', 115, 100));
      div.dispatchEvent(createTouchEvent('touchend', 130, 100));
    });

    expect(onLeft).not.toHaveBeenCalled();
    expect(onRight).not.toHaveBeenCalled();
  });

  it('ignores vertical swipes', () => {
    const onLeft = vi.fn();
    const onRight = vi.fn();
    const div = document.createElement('div');

    const { result } = renderHook(() => useSwipe(onLeft, onRight));

    act(() => result.current(div));

    // Vertical movement locks to vertical — horizontal swipe ignored
    act(() => {
      div.dispatchEvent(createTouchEvent('touchstart', 100, 100));
      div.dispatchEvent(createTouchEvent('touchmove', 100, 200)); // locks vertical
      div.dispatchEvent(createTouchEvent('touchend', 30, 200));
    });

    expect(onLeft).not.toHaveBeenCalled();
    expect(onRight).not.toHaveBeenCalled();
  });
});
