'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles, Zap, Code, Globe, Cpu, Atom, Layers } from 'lucide-react';
import { usePerformanceDetection } from '@/lib/hooks/usePerformanceDetection';

interface OptimizedPreloaderProps {
  onComplete?: () => void;
  duration?: number;
}

export default function OptimizedPreloader({ onComplete, duration = 4000 }: OptimizedPreloaderProps) {
  const { isHighPerformance, isMobile, supportsBackdropFilter } = usePerformanceDetection();
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; life: number }>>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { 
    damping: isHighPerformance ? 25 : 35, 
    stiffness: isHighPerformance ? 700 : 500 
  });
  const springY = useSpring(mouseY, { 
    damping: isHighPerformance ? 25 : 35, 
    stiffness: isHighPerformance ? 700 : 500 
  });

  // Performance-based configuration
  const config = {
    particleCount: isHighPerformance ? 50 : 20,
    enable3D: isHighPerformance && !isMobile,
    enableParticles: isHighPerformance,
    enableMouseEffects: isHighPerformance,
    animationDuration: isHighPerformance ? 1 : 0.5,
    enableBackdropFilter: supportsBackdropFilter && isHighPerformance,
  };

  const loadingPhases = [
    "Initializing Systems...",
    "Loading Components...",
    "Preparing Interface...",
    "Establishing Connection...",
    "Ready to Launch"
  ];

  // Optimized mouse tracking
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!config.enableMouseEffects) return;
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    }
  }, [config.enableMouseEffects, mouseX, mouseY]);

  // Optimized particle system
  useEffect(() => {
    if (!config.enableParticles) return;

    const generateParticles = () => {
      const newParticles = Array.from({ length: config.particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * (isHighPerformance ? 2 : 1),
        vy: (Math.random() - 0.5) * (isHighPerformance ? 2 : 1),
        life: Math.random() * 100
      }));
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        life: p.life - (isHighPerformance ? 0.5 : 1),
        vx: p.vx * 0.99,
        vy: p.vy * 0.99
      })).filter(p => p.life > 0));

      if (particles.length < config.particleCount / 2) {
        generateParticles();
      }
    }, isHighPerformance ? 50 : 100);

    return () => clearInterval(interval);
  }, [config.enableParticles, config.particleCount, isHighPerformance, particles.length]);

  // Loading progress and phases
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * (isHighPerformance ? 8 : 12) + 2;
      });
    }, isHighPerformance ? 100 : 150);

    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => (prev + 1) % loadingPhases.length);
    }, isHighPerformance ? 800 : 1200);

    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        onComplete?.();
      }, 1500);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(phaseInterval);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete, isHighPerformance, loadingPhases.length]);

  // Removed handleSkip function as requested

  if (isComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: config.animationDuration }}
        className="fixed inset-0 z-[9999] overflow-hidden perspective-1000 bg-black"
        style={{
          background: config.enableBackdropFilter 
            ? `
              radial-gradient(ellipse at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(6, 182, 212, 0.2) 0%, transparent 70%),
              linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)
            `
            : 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          backdropFilter: config.enableBackdropFilter ? 'blur(20px)' : 'none',
        }}
      >
        {/* Debug info - only in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute top-4 left-4 z-50 text-white text-sm bg-black/50 p-2 rounded">
            Performance: {isHighPerformance ? 'High' : 'Low'} | 
            Mobile: {isMobile ? 'Yes' : 'No'} | 
            Progress: {Math.floor(progress)}%
          </div>
        )}

        {/* Skip Button */}
        {/* Removed Skip button as requested */}

        {/* Conditional Particle System */}
        {config.enableParticles && (
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                style={{
                  left: particle.x,
                  top: particle.y,
                  opacity: particle.life / 100,
                }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}

        {/* Conditional 3D Background */}
        {config.enable3D && (
          <div className="absolute inset-0 overflow-hidden">
            {/* Simplified 3D Cube */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 h-32"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[
                { rotate: 'rotateY(0deg)', color: 'from-blue-500/20 to-cyan-500/20' },
                { rotate: 'rotateY(90deg)', color: 'from-purple-500/20 to-pink-500/20' },
                { rotate: 'rotateY(180deg)', color: 'from-cyan-500/20 to-blue-500/20' },
                { rotate: 'rotateY(270deg)', color: 'from-pink-500/20 to-purple-500/20' },
              ].map((face, index) => (
                <div
                  key={index}
                  className={`absolute w-32 h-32 bg-gradient-to-br ${face.color} border border-white/10 backdrop-blur-sm`}
                  style={{
                    transform: `${face.rotate} translateZ(64px)`,
                  }}
                />
              ))}
            </motion.div>
          </div>
        )}

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotateX: -90, opacity: 0 }}
            animate={{ scale: 1, rotateX: 0, opacity: 1 }}
            transition={{ duration: config.animationDuration, ease: "easeOut" }}
            className="mb-12 perspective-1000"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative">
              <motion.div
                className="relative w-32 h-32"
                animate={{
                  rotateY: [0, 360],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotateY: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl"
                  style={{ transform: 'translateZ(32px)' }}
                >
                  <span className="text-white font-bold text-5xl">O</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Company Name */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: config.animationDuration, delay: 0.8, ease: "easeOut" }}
            className="mb-8 text-center relative"
          >
            <motion.span
              className="text-5xl md:text-6xl font-black tracking-wider"
              animate={{
                textShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.8)",
                  "0 0 30px rgba(59, 130, 246, 1)",
                  "0 0 20px rgba(59, 130, 246, 0.8)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
                OAZA
              </span>
              <span className="text-white ml-4">SOFTWARE</span>
            </motion.span>
          </motion.h1>

          {/* Loading Text */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: config.animationDuration, delay: 1.2, ease: "easeOut" }}
            className="mb-10"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPhase}
                initial={{ y: 20, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl text-blue-200 text-center font-mono tracking-wider"
              >
                {loadingPhases[currentPhase]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Progress Section */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: config.animationDuration, delay: 1.5, ease: "easeOut" }}
            className="w-full max-w-lg px-8"
          >
            <motion.div
              className="text-center mb-6"
              initial={{ scale: 0.8, rotateX: -15 }}
              animate={{ scale: 1, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <motion.span
                className="text-7xl md:text-8xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
                key={Math.floor(progress)}
                initial={{ scale: 1.3, opacity: 0.7, rotateY: -15 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ textShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
              >
                {Math.floor(progress)}%
              </motion.span>
            </motion.div>

            {/* Progress Circle */}
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 w-full h-full border-4 border-white/10 rounded-full" />
              
              <motion.div
                className="absolute inset-0 w-full h-full border-4 border-transparent rounded-full"
                style={{
                  background: `conic-gradient(from 0deg, transparent 0deg, #3b82f6 ${progress * 3.6}deg, transparent ${progress * 3.6}deg)`,
                }}
                initial={{ rotate: -90 }}
                animate={{ rotate: -90 + (progress * 3.6) }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              
              <div className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full backdrop-blur-sm" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-center"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="text-2xl font-bold text-white mb-2">LOADING</div>
                  <div className="text-sm text-blue-200 font-mono">SYSTEMS</div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Tech Icons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: config.animationDuration, delay: 2, ease: "easeOut" }}
            className="flex items-center space-x-12 mt-16"
          >
            {[
              { icon: Code, color: "text-blue-400", label: "DEV" },
              { icon: Globe, color: "text-cyan-400", label: "WEB" },
              { icon: Layers, color: "text-purple-400", label: "AI" },
              { icon: Cpu, color: "text-indigo-400", label: "TECH" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`${item.color} text-center group`}
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut"
                }}
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  className="mb-2"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut"
                  }}
                >
                  <item.icon size={32} />
                </motion.div>
                <div className="text-xs font-mono tracking-wider opacity-80">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Conditional Mouse Following Effects */}
        {config.enableMouseEffects && (
          <motion.div
            className="fixed pointer-events-none z-40"
            style={{
              x: springX,
              y: springY,
            }}
          >
            <motion.div
              className="w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
