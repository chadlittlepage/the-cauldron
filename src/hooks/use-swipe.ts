import { useCallback, useEffect, useState } from 'react';

const SWIPE_THRESHOLD = 50;

export function useSwipe(onLeft?: () => void, onRight?: () => void) {
  const [el, setEl] = useState<HTMLDivElement | null>(null);

  const ref = useCallback((node: HTMLDivElement | null) => {
    setEl(node);
  }, []);

  useEffect(() => {
    if (!el) return;

    let startX = 0;
    let startY = 0;

    function handleTouchStart(e: TouchEvent) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }

    function handleTouchEnd(e: TouchEvent) {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dy) > Math.abs(dx)) return;
      if (dx < -SWIPE_THRESHOLD) onLeft?.();
      else if (dx > SWIPE_THRESHOLD) onRight?.();
    }

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [el, onLeft, onRight]);

  return ref;
}
