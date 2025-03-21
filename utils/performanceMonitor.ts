/**
 * Utility for monitoring website performance metrics
 */

// Interface for performance metrics
interface PerformanceMetrics {
  timeToFirstByte: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
  totalBlockingTime: number;
}

// Custom interfaces for performance entries
interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

/**
 * Collects and reports web vital metrics
 */
export const collectWebVitals = (): void => {
  if (typeof window === 'undefined' || !('performance' in window)) return;

  // Report performance metrics when the page is fully loaded
  window.addEventListener('load', () => {
    // Use setTimeout to ensure metrics are collected after page load
    setTimeout(() => {
      const metrics = getPerformanceMetrics();
      logPerformanceMetrics(metrics);
    }, 1000);
  });

  // Monitor for layout shifts
  if ('PerformanceObserver' in window) {
    // Observe Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const lcp = lastEntry.startTime;
          // Store LCP value
          window.__LCP = lcp;
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.warn('LCP monitoring not supported', e);
    }

    // Observe Cumulative Layout Shift
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const layoutShiftEntry = entry as LayoutShiftEntry;
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        }
        // Store CLS value
        window.__CLS = clsValue;
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.warn('CLS monitoring not supported', e);
    }

    // Observe First Input Delay
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const firstEntry = entries[0];
        if (firstEntry) {
          const firstInputEntry = firstEntry as FirstInputEntry;
          const fid = firstInputEntry.processingStart - firstInputEntry.startTime;
          // Store FID value
          window.__FID = fid;
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.warn('FID monitoring not supported', e);
    }
  }
};

/**
 * Gets performance metrics from the browser
 * @returns Object containing performance metrics
 */
const getPerformanceMetrics = (): PerformanceMetrics => {
  // Default values
  const metrics: PerformanceMetrics = {
    timeToFirstByte: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: window.__LCP || 0,
    firstInputDelay: window.__FID || 0,
    cumulativeLayoutShift: window.__CLS || 0,
    timeToInteractive: 0,
    totalBlockingTime: 0,
  };

  // Get navigation timing metrics
  if (performance.getEntriesByType) {
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
      const navEntry = navigationEntries[0] as PerformanceNavigationTiming;
      metrics.timeToFirstByte = navEntry.responseStart - navEntry.requestStart;
    }
  }

  // Get paint metrics
  if (performance.getEntriesByType) {
    const paintEntries = performance.getEntriesByType('paint');
    for (const entry of paintEntries) {
      if (entry.name === 'first-contentful-paint') {
        metrics.firstContentfulPaint = entry.startTime;
      }
    }
  }

  return metrics;
};

/**
 * Logs performance metrics to console (in development)
 * or sends them to an analytics service (in production)
 * @param metrics Performance metrics object
 */
const logPerformanceMetrics = (metrics: PerformanceMetrics): void => {
  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.log('Performance Metrics:', metrics);
  } else {
    // In production, could send to an analytics service
    // This is where you would implement sending to your analytics service
  }
};

// Add custom properties to Window interface
declare global {
  interface Window {
    __LCP?: number;
    __FID?: number;
    __CLS?: number;
  }
} 