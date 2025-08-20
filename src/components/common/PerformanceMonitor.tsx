'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, HardDrive, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import { usePerformanceDetection } from '@/lib/hooks/usePerformanceDetection';

interface PerformanceMetrics {
  fps: number;
  memory: number;
  loadTime: number;
  animationFrameTime: number;
  scrollPerformance: number;
  timestamp: number;
}

interface PerformanceWarning {
  type: 'fps' | 'memory' | 'loadTime' | 'animationFrame' | 'scrollPerformance';
  message: string;
  severity: 'warning' | 'error';
  timestamp: number;
}

export default function PerformanceMonitor() {
  const { isHighPerformance, isMobile, supportsWebGL, fps, memoryInfo } = usePerformanceDetection();
  const [metrics, setMetrics] = useState<PerformanceMetrics[]>([]);
  const [warnings, setWarnings] = useState<PerformanceWarning[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const frameTimeRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const scrollStartTimeRef = useRef<number>(0);
  const scrollEndTimeRef = useRef<number>(0);

  // Performance thresholds
  const thresholds = {
    fps: { warning: 45, error: 30 },
    memory: { warning: 100 * 1024 * 1024, error: 200 * 1024 * 1024 }, // 100MB, 200MB
    loadTime: { warning: 2000, error: 5000 }, // 2s, 5s
    animationFrame: { warning: 16, error: 33 }, // 60fps, 30fps
  };

  // Measure animation frame time
  useEffect(() => {
    let animationId: number;
    
    const measureFrameTime = (timestamp: number) => {
      if (lastFrameTimeRef.current > 0) {
        const frameTime = timestamp - lastFrameTimeRef.current;
        frameTimeRef.current = frameTime;
        
        // Check for performance warnings
        if (frameTime > thresholds.animationFrame.error) {
          addWarning('animationFrame', `Frame time: ${frameTime.toFixed(2)}ms (very slow)`, 'error');
        } else if (frameTime > thresholds.animationFrame.warning) {
          addWarning('animationFrame', `Frame time: ${frameTime.toFixed(2)}ms (slow)`, 'warning');
        }
      }
      
      lastFrameTimeRef.current = timestamp;
      animationId = requestAnimationFrame(measureFrameTime);
    };
    
    animationId = requestAnimationFrame(measureFrameTime);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Measure scroll performance
  useEffect(() => {
    const handleScrollStart = () => {
      scrollStartTimeRef.current = performance.now();
    };
    
    const handleScrollEnd = () => {
      scrollEndTimeRef.current = performance.now();
      const scrollTime = scrollEndTimeRef.current - scrollStartTimeRef.current;
      
      if (scrollTime > 16) { // More than 60fps threshold
        addWarning('scrollPerformance', `Scroll lag detected: ${scrollTime.toFixed(2)}ms`, 'warning');
      }
    };
    
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollEnd, 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleScrollStart, { passive: true });
    window.addEventListener('touchend', handleScrollEnd, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleScrollStart);
      window.removeEventListener('touchend', handleScrollEnd);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  // Update metrics
  useEffect(() => {
    const updateMetrics = () => {
      const newMetrics: PerformanceMetrics = {
        fps,
        memory: memoryInfo?.usedJSHeapSize || 0,
        loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
        animationFrameTime: frameTimeRef.current,
        scrollPerformance: scrollEndTimeRef.current - scrollStartTimeRef.current,
        timestamp: Date.now(),
      };
      
      setMetrics(prev => {
        const updated = [...prev, newMetrics].slice(-10); // Keep last 10 measurements
        return updated;
      });
      
      // Check for warnings
      checkPerformanceWarnings(newMetrics);
    };
    
    const interval = setInterval(updateMetrics, 1000);
    return () => clearInterval(interval);
  }, [fps, memoryInfo]);

  // Check for performance warnings
  const checkPerformanceWarnings = (metrics: PerformanceMetrics) => {
    if (metrics.fps < thresholds.fps.error) {
      addWarning('fps', `FPS very low: ${metrics.fps}`, 'error');
    } else if (metrics.fps < thresholds.fps.warning) {
      addWarning('fps', `FPS low: ${metrics.fps}`, 'warning');
    }
    
    if (metrics.memory > thresholds.memory.error) {
      addWarning('memory', `Memory usage very high: ${(metrics.memory / 1024 / 1024).toFixed(1)}MB`, 'error');
    } else if (metrics.memory > thresholds.memory.warning) {
      addWarning('memory', `Memory usage high: ${(metrics.memory / 1024 / 1024).toFixed(1)}MB`, 'warning');
    }
    
    if (metrics.loadTime > thresholds.loadTime.error) {
      addWarning('loadTime', `Load time very slow: ${(metrics.loadTime / 1000).toFixed(1)}s`, 'error');
    } else if (metrics.loadTime > thresholds.loadTime.warning) {
      addWarning('loadTime', `Load time slow: ${(metrics.loadTime / 1000).toFixed(1)}s`, 'warning');
    }
  };

  // Add performance warning
  const addWarning = (type: PerformanceWarning['type'], message: string, severity: PerformanceWarning['severity']) => {
    const warning: PerformanceWarning = {
      type,
      message,
      severity,
      timestamp: Date.now(),
    };
    
    setWarnings(prev => {
      const updated = [...prev, warning].slice(-5); // Keep last 5 warnings
      return updated;
    });
  };

  // Calculate average metrics
  const averageMetrics = metrics.length > 0 ? {
    fps: metrics.reduce((sum, m) => sum + m.fps, 0) / metrics.length,
    memory: metrics.reduce((sum, m) => sum + m.memory, 0) / metrics.length,
    animationFrameTime: metrics.reduce((sum, m) => sum + m.animationFrameTime, 0) / metrics.length,
  } : null;

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Performance Status Indicator */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`relative p-3 rounded-full shadow-lg transition-all duration-300 ${
          isHighPerformance 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-yellow-500 hover:bg-yellow-600'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsVisible(true)}
        onHoverEnd={() => setIsVisible(false)}
      >
        <Activity size={20} className="text-white" />
        
        {/* Warning indicator */}
        {warnings.some(w => w.severity === 'error') && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        )}
      </motion.button>

      {/* Expanded Performance Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 w-80 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Performance Monitor</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            {/* Device Info */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Cpu size={16} className="text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Device Capabilities</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>Performance: {isHighPerformance ? 'High' : 'Low'}</div>
                <div>Mobile: {isMobile ? 'Yes' : 'No'}</div>
                <div>WebGL: {supportsWebGL ? 'Yes' : 'No'}</div>
                <div>Backdrop: {CSS.supports('backdrop-filter', 'blur(10px)') ? 'Yes' : 'No'}</div>
              </div>
            </div>

            {/* Current Metrics */}
            {averageMetrics && (
              <div className="mb-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap size={16} className="text-green-500" />
                    <span className="text-sm font-medium text-gray-700">FPS</span>
                  </div>
                  <span className={`text-sm font-mono ${
                    averageMetrics.fps >= thresholds.fps.warning ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {averageMetrics.fps.toFixed(1)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                  <HardDrive size={16} className="text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">Memory</span>
                </div>
                  <span className={`text-sm font-mono ${
                    averageMetrics.memory <= thresholds.memory.warning ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {(averageMetrics.memory / 1024 / 1024).toFixed(1)}MB
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity size={16} className="text-purple-500" />
                    <span className="text-sm font-medium text-gray-700">Frame Time</span>
                  </div>
                  <span className={`text-sm font-mono ${
                    averageMetrics.animationFrameTime <= thresholds.animationFrame.warning ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {averageMetrics.animationFrameTime.toFixed(1)}ms
                  </span>
                </div>
              </div>
            )}

            {/* Performance Warnings */}
            {warnings.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Warnings</h4>
                <div className="space-y-2">
                  {warnings.map((warning, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-center space-x-2 p-2 rounded-lg text-xs ${
                        warning.severity === 'error' 
                          ? 'bg-red-50 text-red-700 border border-red-200' 
                          : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                      }`}
                    >
                      {warning.severity === 'error' ? (
                        <AlertTriangle size={14} className="text-red-500" />
                      ) : (
                        <AlertTriangle size={14} className="text-yellow-500" />
                      )}
                      <span>{warning.message}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Performance Tips */}
            <div className="text-xs text-gray-500 space-y-1">
              <div>💡 Use optimized components for better performance</div>
              <div>💡 Disable heavy animations on mobile devices</div>
              <div>💡 Monitor memory usage and FPS</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {isVisible && !isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-16 right-0 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
          >
            Performance: {isHighPerformance ? 'High' : 'Low'}
            {warnings.some(w => w.severity === 'error') && (
              <span className="ml-2 text-red-300">⚠️ Issues detected</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
