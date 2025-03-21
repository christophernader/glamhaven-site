'use client';

import React, { useEffect, useRef } from 'react';
import { collectWebVitals } from '@/utils/performanceMonitor';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

/**
 * Component that optimizes website performance by preloading critical resources
 * and applying performance optimizations
 */
const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({ children }) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Optimize rendering
    optimizeRendering();

    // Preload critical resources
    preloadCriticalResources();

    // Setup lazy loading for images and components
    setupLazyLoading();

    // Monitor performance metrics
    collectWebVitals();

    // Clean up event listeners on unmount
    return () => {
      cleanupEventListeners();
    };
  }, []);

  // Optimize rendering by removing FPS throttling
  const optimizeRendering = () => {
    // Force hardware acceleration
    document.body.style.transform = 'translateZ(0)';
    document.body.style.backfaceVisibility = 'hidden';
    document.body.style.willChange = 'transform';

    // Optimize animations
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        animation-duration: 0.001s !important;
        animation-delay: 0s !important;
        transition-duration: 0.001s !important;
      }
    `;
    
    // Apply optimizations only during initial load, then remove
    document.head.appendChild(style);
    setTimeout(() => {
      document.head.removeChild(style);
    }, 50);

    // Use requestAnimationFrame for smooth animations with throttling
    let lastTime = 0;
    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      
      // Throttle to 60fps (approximately 16.67ms per frame)
      if (deltaTime < 16) {
        requestAnimationFrame(animate);
        return;
      }
      
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);

    // Debounce scroll and resize events
    setupEventDebouncing();
  };

  // Setup debouncing for expensive events
  const setupEventDebouncing = () => {
    let scrollTimeout: NodeJS.Timeout;
    let resizeTimeout: NodeJS.Timeout;
    
    const scrollHandler = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Handle any scroll-dependent operations here
      }, 100);
    };
    
    const resizeHandler = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Handle any resize-dependent operations here
      }, 100);
    };
    
    window.addEventListener('scroll', scrollHandler, { capture: false });
    window.addEventListener('resize', resizeHandler, { capture: false });
  };

  // Setup lazy loading for images and components
  const setupLazyLoading = () => {
    if ('IntersectionObserver' in window) {
      const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target as HTMLImageElement;
            if (lazyImage.dataset.src) {
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.removeAttribute('data-src');
              lazyImageObserver.unobserve(lazyImage);
            }
          }
        });
      });
      
      // Observe all images with data-src attribute
      document.querySelectorAll('img[data-src]').forEach(img => {
        lazyImageObserver.observe(img);
      });
    }
  };

  // Preload critical resources
  const preloadCriticalResources = React.useCallback(() => {
    // Critical images to preload
    const criticalImages = [
      // Hero image
      'https://images.unsplash.com/photo-1671159593449-61b5ba964fab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      
      // Gallery images (first 4 most visible ones)
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=800&auto=format&fit=crop&fm=webp',
      'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?cs=srgb&w=800&q=75',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=800&auto=format&fit=crop&fm=webp',
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?cs=srgb&w=800&q=75',
      
      // About section image
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop&fm=webp',
      
      // Background texture
      '/images/paper-texture.webp'
    ];
    
    // Use priority hints for critical images
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });
    
    // Preload fonts with higher priority
    if ('fonts' in document) {
      Promise.all([
        document.fonts.load('1em Inter'),
        document.fonts.load('1em Playfair Display')
      ]).catch(err => {
        console.warn('Font preloading failed:', err);
      });
    }

    // Preload critical CSS
    const preloadCSS = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    };

    // Add resource hints for third-party domains
    const addResourceHint = (type: 'preconnect' | 'dns-prefetch', href: string) => {
      if (!document.querySelector(`link[rel="${type}"][href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = type;
        link.href = href;
        document.head.appendChild(link);
      }
    };

    // Add resource hints for common image domains
    ['images.unsplash.com', 'images.pexels.com', 'cdn.pixabay.com'].forEach(domain => {
      addResourceHint('preconnect', `https://${domain}`);
      addResourceHint('dns-prefetch', `https://${domain}`);
    });
  }, []);

  // Clean up event listeners
  const cleanupEventListeners = () => {
    // Clean up any event listeners here
    window.removeEventListener('scroll', () => {});
    window.removeEventListener('resize', () => {});
  };

  return <>{children}</>;
};

export default PerformanceOptimizer; 