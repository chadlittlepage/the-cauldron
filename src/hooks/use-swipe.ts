import { useCallback, useEffect, useRef, useState } from 'react';

const SWIPE_THRESHOLD = 50;
const MIN_MOVE_BEFORE_LOCK = 10;

export function useSwipe(onLeft?: () => void, onRight?: () => void) {
  const [el, setEl] = useState<HTMLElement | null>(null);
  const onLeftRef = useRef(onLeft);
  const onRightRef = useRef(onRight);

  // Keep refs in sync so effect doesn't re-run on callback changes
  useEffect(() => {
    onLeftRef.current = onLeft;
    onRightRef.current = onRight;
  });

  const ref = useCallback((node: HTMLElement | null) => {
    setEl(node);
  }, []);

  useEffect(() => {
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let locked: 'horizontal' | 'vertical' | null = null;

    function handleTouchStart(e: TouchEvent) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      locked = null;
    }

    function handleTouchMove(e: TouchEvent) {
      if (locked) return;
      const dx = Math.abs(e.touches[0].clientX - startX);
      const dy = Math.abs(e.touches[0].clientY - startY);
      if (dx + dy < MIN_MOVE_BEFORE_LOCK) return;
      locked = dx >= dy ? 'horizontal' : 'vertical';
    }

    function handleTouchEnd(e: TouchEvent) {
      if (locked !== 'horizontal') return;
      const dx = e.changedTouches[0].clientX - startX;
      if (dx < -SWIPE_THRESHOLD) onLeftRef.current?.();
      else if (dx > SWIPE_THRESHOLD) onRightRef.current?.();
    }

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [el]);

  return ref;
}
