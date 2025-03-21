"use client";

import { useEffect, useRef, ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  animation: 'fade-in' | 'fade-in-left' | 'fade-in-right' | 'fade-in-up';
  delay?: 0 | 100 | 200 | 300 | 400 | 500;
  threshold?: number;
  className?: string;
}

const ScrollAnimation = ({ 
  children, 
  animation, 
  delay = 0, 
  threshold = 0.2,
  className = '' 
}: ScrollAnimationProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation classes when element is visible
            element.classList.add(`vox-fade-in-${animation.replace('fade-in-', '')}`);
            if (delay > 0) {
              element.classList.add(`vox-delay-${delay}`);
            }
            // Unobserve after animation is triggered
            observer.unobserve(element);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -100px 0px' }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [animation, delay, threshold]);
  
  return (
    <div ref={elementRef} className={`vox-animate ${className}`}>
      {children}
    </div>
  );
};

export default ScrollAnimation; 