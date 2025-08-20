'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Code, Smartphone, BarChart3, Palette, Globe, Zap } from 'lucide-react';
import { usePerformanceDetection } from '@/lib/hooks/usePerformanceDetection';
import { useOptimizedThreeScene } from '@/lib/hooks/useOptimizedThreeScene';
import { performanceUtils } from '@/lib/hooks/usePerformanceDetection';

const serviceIcons = [Code, Smartphone, BarChart3, Palette, Globe, Zap];

export default function OptimizedServicesHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  const { isHighPerformance, isMobile, supportsWebGL } = usePerformanceDetection();
  
  // Performance-based configuration
  const config = {
    enable3D: isHighPerformance && supportsWebGL && !isMobile,
    enableParticles: isHighPerformance,
    enableParallax: isHighPerformance,
    enableMouseEffects: isHighPerformance,
    animationDuration: isHighPerformance ? 0.8 : 0.5,
    enableBackdropFilter: isHighPerformance,
  };

  // Intersection Observer for visibility
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = performanceUtils.createIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Use optimized Three.js scene
  const { scene, renderer } = useOptimizedThreeScene(canvasRef, isVisible && config.enable3D);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Conditional parallax effects
  const y = config.enableParallax 
    ? useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    : useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
    
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const fullText = "Professional Services";

  // Typing animation effect
  useEffect(() => {
    if (isTyping && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else if (currentIndex >= fullText.length) {
      setIsTyping(false);
      setTimeout(() => {
        setTypedText('');
        setCurrentIndex(0);
        setIsTyping(true);
      }, 2000);
    }
  }, [currentIndex, isTyping, fullText]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Conditional 3D Canvas Background */}
      {config.enable3D && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        />
      )}

      {/* Conditional Parallax Background Layers */}
      {config.enableParallax && (
        <motion.div 
          style={{ y, opacity, zIndex: 2 }}
          className="absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-gentle"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ zIndex: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: config.animationDuration }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-exo2-800 text-gray-900 mb-6 tracking-wide">
            Our
            <span className="block gradient-text-hero">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
            Solutions
          </h1>
          
          <p className="text-xl md:text-2xl font-exo2-400 text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed tracking-wide">
            Comprehensive software development and digital marketing services. 
            We transform ideas into powerful digital experiences that help businesses succeed.
          </p>

          {/* Service Icons Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: config.animationDuration, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-6 gap-6 max-w-4xl mx-auto"
          >
            {serviceIcons.map((IconComponent, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ 
                  scale: config.enableMouseEffects ? 1.1 : 1.05, 
                  y: config.enableMouseEffects ? -5 : -2 
                }}
                className="flex flex-col items-center space-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg">
                  <IconComponent size={32} className="text-blue-600" />
                </div>
                <span className="text-sm text-gray-600 font-medium">Service {index + 1}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Conditional Scroll Indicator */}
      {config.enableMouseEffects && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          style={{ zIndex: 3 }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      )}

      {/* Performance Debug Info - Development Only */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 left-4 z-50 bg-black/50 text-white text-xs p-2 rounded">
          <div>3D: {config.enable3D ? 'ON' : 'OFF'}</div>
          <div>Performance: {isHighPerformance ? 'High' : 'Low'}</div>
          <div>Visible: {isVisible ? 'Yes' : 'No'}</div>
          <div>WebGL: {supportsWebGL ? 'Yes' : 'No'}</div>
        </div>
      )}
    </section>
  );
}
