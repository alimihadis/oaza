'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles, Zap, Code, Globe, SkipForward, Cpu, Atom, Layers } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
  duration?: number;
}

export default function Preloader({ onComplete, duration = 4000 }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; life: number }>>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 700 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 700 });

  const loadingPhases = [
    "Initializing Neural Networks...",
    "Calibrating Quantum Systems...",
    "Synchronizing Dimensions...",
    "Establishing Reality Matrix...",
    "Welcome to the Future"
  ];

  // Mouse tracking for interactive effects
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    }
  }, [mouseX, mouseY]);

  // Particle system
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
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
        life: p.life - 0.5,
        vx: p.vx * 0.99,
        vy: p.vy * 0.99
      })).filter(p => p.life > 0));

      if (particles.length < 30) {
        generateParticles();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [particles.length]);

  // Loading progress and phases
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 100);

    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => (prev + 1) % loadingPhases.length);
    }, 800);

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
  }, [duration, onComplete]);

  const handleSkip = () => {
    setProgress(100);
    setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        onComplete?.();
      }, 1500);
    }, 500);
  };

  if (isComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-[9999] overflow-hidden perspective-1000 bg-black"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(6, 182, 212, 0.2) 0%, transparent 70%),
            linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)
          `
        }}
      >
        {/* Debug info */}
        <div className="absolute top-4 left-4 z-50 text-white text-sm bg-black/50 p-2 rounded">
          Preloader Active - Progress: {Math.floor(progress)}%
        </div>

        {/* Advanced Skip Button */}
        <motion.button
          onClick={handleSkip}
          className="absolute top-6 right-6 z-50 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white/90 hover:text-white transition-all duration-500 flex items-center space-x-3 group"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <SkipForward size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          <span className="text-sm font-medium tracking-wider">SKIP</span>
        </motion.button>

        {/* Dynamic Particle System */}
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

        {/* 3D Geometric Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Rotating 3D Cube */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{
              rotateX: [0, 360],
              rotateY: [0, 360],
              rotateZ: [0, 360],
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
              { rotate: 'rotateX(90deg)', color: 'from-indigo-500/20 to-blue-500/20' },
              { rotate: 'rotateX(-90deg)', color: 'from-blue-500/20 to-indigo-500/20' },
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

          {/* Floating Holographic Rings */}
          <motion.div
            className="absolute top-1/3 right-1/4 w-40 h-40"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="w-full h-full border-2 border-blue-400/30 rounded-full backdrop-blur-sm" />
            <div className="absolute inset-4 border border-cyan-400/20 rounded-full" />
            <div className="absolute inset-8 border border-purple-400/10 rounded-full" />
          </motion.div>

          {/* Morphing DNA Helix */}
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-24 h-32"
            animate={{
              rotateZ: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotateZ: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                style={{
                  left: `${12 + Math.sin(i * 0.8) * 8}px`,
                  top: `${i * 16}px`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Main Content with 3D Effects */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          {/* 3D Logo with Advanced Effects */}
          <motion.div
            initial={{ scale: 0, rotateX: -90, opacity: 0 }}
            animate={{ scale: 1, rotateX: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-12 perspective-1000"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative">
              {/* Main 3D Logo */}
              <motion.div
                className="relative w-32 h-32"
                animate={{
                  rotateY: [0, 360],
                  rotateX: [0, 15, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotateY: { duration: 15, repeat: Infinity, ease: "linear" },
                  rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front Face */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl"
                  style={{ transform: 'translateZ(32px)' }}
                >
                  <span className="text-white font-bold text-5xl">O</span>
                </motion.div>

                {/* Back Face */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center"
                  style={{ transform: 'translateZ(-32px) rotateY(180deg)' }}
                >
                  <span className="text-white font-bold text-5xl">O</span>
                </motion.div>

                {/* Side Faces */}
                {[0, 90, 180, 270].map((rotation, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl"
                    style={{
                      transform: `rotateY(${rotation}deg) translateZ(32px)`,
                      width: '64px',
                      left: '32px',
                    }}
                  />
                ))}
              </motion.div>

              {/* Orbiting Energy Rings */}
              <motion.div
                className="absolute inset-0 w-32 h-32"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <div className="w-full h-full border border-blue-400/40 rounded-full" />
                <div className="absolute inset-4 border border-cyan-400/30 rounded-full" />
                <div className="absolute inset-8 border border-purple-400/20 rounded-full" />
              </motion.div>

              {/* Floating Tech Icons */}
              {[
                { icon: Sparkles, position: '-top-4 -right-4', color: 'text-blue-300' },
                { icon: Zap, position: '-bottom-4 -left-4', color: 'text-cyan-300' },
                { icon: Cpu, position: 'top-1/2 -right-8', color: 'text-purple-300' },
                { icon: Atom, position: 'top-1/2 -left-8', color: 'text-indigo-300' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`absolute ${item.position} ${item.color}`}
                  animate={{
                    rotate: [0, 360],
                    scale: [0.8, 1.2, 0.8],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    rotate: { duration: 6 + index, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }
                  }}
                >
                  <item.icon size={24} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Company Name with Glitch Effect */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="mb-8 text-center relative"
          >
            <motion.span
              className="text-5xl md:text-6xl font-black tracking-wider"
              animate={{
                textShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.8)",
                  "0 0 30px rgba(59, 130, 246, 1)",
                  "0 0 40px rgba(59, 130, 246, 0.8)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
                OAZA
              </span>
              <span className="text-white ml-4">SOFTWARE</span>
            </motion.span>
            
            {/* Glitch Effect Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent opacity-0"
              animate={{
                opacity: [0, 1, 0],
                x: [0, -2, 2, 0],
                y: [0, 1, -1, 0],
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            >
              OAZA SOFTWARE
            </motion.div>
          </motion.h1>

          {/* Advanced Loading Text with Typewriter Effect */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
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

          {/* Advanced 3D Progress Section */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
            className="w-full max-w-lg px-8"
          >
            {/* 3D Percentage Display */}
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

            {/* 3D Circular Progress */}
            <div className="relative w-64 h-64 mx-auto">
              {/* Background Circle */}
              <div className="absolute inset-0 w-full h-full border-4 border-white/10 rounded-full" />
              
              {/* Progress Circle */}
              <motion.div
                className="absolute inset-0 w-full h-full border-4 border-transparent rounded-full"
                style={{
                  background: `conic-gradient(from 0deg, transparent 0deg, #3b82f6 ${progress * 3.6}deg, transparent ${progress * 3.6}deg)`,
                }}
                initial={{ rotate: -90 }}
                animate={{ rotate: -90 + (progress * 3.6) }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              
              {/* Inner Glow */}
              <motion.div
                className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full backdrop-blur-sm"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                    "0 0 40px rgba(59, 130, 246, 0.6)",
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Center Content */}
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

          {/* Bottom Tech Icons with 3D Effects */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 2, ease: "easeOut" }}
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
                  rotateY: [0, 15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut"
                }}
                whileHover={{
                  scale: 1.2,
                  rotateY: 25,
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

        {/* Completion Celebration */}
        <AnimatePresence>
          {progress >= 100 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-emerald-500/30 backdrop-blur-xl"
            >
              {/* Success Animation */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="relative">
                  {/* Main Success Circle */}
                  <motion.div
                    className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        "0 0 20px rgba(34, 197, 94, 0.5)",
                        "0 0 40px rgba(34, 197, 94, 0.8)",
                        "0 0 20px rgba(34, 197, 94, 0.5)",
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <motion.div
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="text-white"
                    >
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                    </motion.div>
                  </motion.div>

                  {/* Orbiting Success Particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-green-400 rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      animate={{
                        x: [0, Math.cos(i * 45 * Math.PI / 180) * 60],
                        y: [0, Math.sin(i * 45 * Math.PI / 180) * 60],
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Success Text */}
              <motion.div
                className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-center"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="text-2xl font-bold text-white mb-2">SYSTEMS ONLINE</div>
                <div className="text-green-300 font-mono">Ready to Launch</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mouse Following Effects */}
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
      </motion.div>
    </AnimatePresence>
  );
}
