import * as Sentry from '@sentry/react';

/**
 * Report Core Web Vitals to Sentry as custom measurements.
 * Sentry's browserTracingIntegration already captures LCP, FID, CLS, TTFB, and INP
 * automatically. This module provides an explicit opt-in via the web-vitals library
 * for cases where finer control is needed.
 *
 * Since @sentry/react already instruments these via its Performance integration,
 * this helper exists to ensure metrics are captured even if tracing sample rate is low.
 */
export function reportWebVitals() {
  if (typeof window === 'undefined') return;

  // Use Performance Observer API directly — no extra dependency needed
  try {
    // CLS
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        Sentry.metrics.distribution('web_vital.cls', (entry as PerformanceEntry & { value: number }).value ?? 0, {
          unit: 'none',
        });
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) {
        Sentry.metrics.distribution('web_vital.lcp', last.startTime, { unit: 'millisecond' });
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // FID / INP
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const dur = (entry as PerformanceEventTiming).processingStart - entry.startTime;
        Sentry.metrics.distribution('web_vital.fid', dur, { unit: 'millisecond' });
      }
    });
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch {
    // PerformanceObserver not supported — silently ignore
  }
}
