import { useState, useEffect } from 'react';

interface PerformanceProfile {
  isHighPerformance: boolean;
  isMobile: boolean;
  supportsWebGL: boolean;
  supportsBackdropFilter: boolean;
  fps: number;
  memoryInfo?: {
    totalJSHeapSize: number;
    usedJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

export function usePerformanceDetection(): PerformanceProfile {
  const [profile, setProfile] = useState<PerformanceProfile>({
    isHighPerformance: true,
    isMobile: false,
    supportsWebGL: false,
    supportsBackdropFilter: false,
    fps: 60,
  });

  useEffect(() => {
    const detectPerformance = async () => {
      // Device detection
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // WebGL support
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      const supportsWebGL = !!gl;
      
      // Backdrop filter support
      const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(10px)');
      
      // Performance detection
      let fps = 60;
      let isHighPerformance = true;
      
      // FPS detection
      let frameCount = 0;
      let lastTime = performance.now();
      
      const measureFPS = () => {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
          fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
          frameCount = 0;
          lastTime = currentTime;
          
          // Adjust performance profile based on FPS
          if (fps < 30) {
            isHighPerformance = false;
          }
        }
        
        requestAnimationFrame(measureFPS);
      };
      
      // Memory detection (if available)
      let memoryInfo;
      if ('memory' in performance) {
        memoryInfo = (performance as any).memory;
      }
      
      // Hardware concurrency
      const cores = navigator.hardwareConcurrency || 4;
      
      // Adjust performance profile
      if (isMobile || fps < 30 || cores < 4) {
        isHighPerformance = false;
      }
      
      // Battery detection (if available)
      if ('getBattery' in navigator) {
        try {
          const battery = await (navigator as any).getBattery();
          if (battery.level < 0.2) {
            isHighPerformance = false;
          }
        } catch (e) {
          // Battery API not supported
        }
      }
      
      setProfile({
        isHighPerformance,
        isMobile,
        supportsWebGL,
        supportsBackdropFilter,
        fps,
        memoryInfo,
      });
      
      // Start FPS monitoring
      requestAnimationFrame(measureFPS);
    };
    
    detectPerformance();
  }, []);

  return profile;
}

// Performance optimization utilities
export const performanceUtils = {
  // Debounce function for scroll events
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },
  
  // Throttle function for frequent events
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // Check if element is in viewport
  isInViewport: (element: Element): boolean => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  
  // Intersection Observer wrapper
  createIntersectionObserver: (
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {}
  ): IntersectionObserver => {
    return new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    });
  },
};
