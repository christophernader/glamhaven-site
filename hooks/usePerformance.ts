import { useEffect, useRef } from 'react';

interface PerformanceOptions {
  debugMode?: boolean;
  logThreshold?: number; // in milliseconds
}

/**
 * Custom hook for monitoring component performance
 * @param componentName Name of the component to monitor
 * @param options Performance monitoring options
 */
export function usePerformance(componentName: string, options: PerformanceOptions = {}) {
  const { debugMode = false, logThreshold = 16 } = options;
  const renderCount = useRef(0);
  const lastRenderTime = useRef(performance.now());
  const frameID = useRef<number | null>(null);

  // Monitor render performance
  useEffect(() => {
    renderCount.current += 1;
    const currentTime = performance.now();
    const timeSinceLastRender = currentTime - lastRenderTime.current;
    
    if (debugMode) {
      console.log(`[Performance] ${componentName} rendered (${renderCount.current})`);
      
      if (timeSinceLastRender > logThreshold) {
        console.warn(
          `[Performance] ${componentName} render took ${timeSinceLastRender.toFixed(2)}ms, ` +
          `which is above the threshold of ${logThreshold}ms`
        );
      }
    }
    
    lastRenderTime.current = currentTime;
    
    return () => {
      if (frameID.current !== null) {
        cancelAnimationFrame(frameID.current);
      }
    };
  });

  // Optimize animations with requestAnimationFrame
  const scheduleUpdate = (callback: () => void) => {
    if (frameID.current !== null) {
      cancelAnimationFrame(frameID.current);
    }
    
    frameID.current = requestAnimationFrame(() => {
      frameID.current = null;
      callback();
    });
  };

  // Force hardware acceleration for an element
  const enableHardwareAcceleration = (element: HTMLElement | null) => {
    if (!element) return;
    
    element.style.transform = 'translateZ(0)';
    element.style.backfaceVisibility = 'hidden';
    element.style.willChange = 'transform';
  };

  return {
    renderCount: renderCount.current,
    scheduleUpdate,
    enableHardwareAcceleration,
  };
} 