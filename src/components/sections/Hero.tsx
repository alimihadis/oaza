'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { gsap } from 'gsap';
import Button from '@/components/ui/Button';
import { ArrowRight, Code, TrendingUp } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const fullText = "We Build Digital Solutions";

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

  // 3D Scene Setup
  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Create floating geometric shapes
    const createFloatingShapes = () => {
      const shapes: THREE.Mesh[] = [];
      const geometries = [
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.SphereGeometry(0.3, 16, 16),
        new THREE.ConeGeometry(0.3, 0.6, 8),
        new THREE.TorusGeometry(0.2, 0.1, 8, 16),
        new THREE.OctahedronGeometry(0.3),
      ];

      for (let i = 0; i < 15; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(Math.random() * 0.3 + 0.6, 0.7, 0.6),
          transparent: true,
          opacity: 0.6,
          wireframe: true,
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10
        );
        mesh.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        
        shapes.push(mesh);
        scene.add(mesh);
      }
      return shapes;
    };

    // Create particle system
    const createParticleSystem = () => {
      const particleCount = 1000;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

        colors[i * 3] = Math.random() * 0.5 + 0.5;
        colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
        colors[i * 3 + 2] = Math.random() * 0.5 + 0.5;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
      });

      const particles = new THREE.Points(geometry, material);
      particlesRef.current = particles;
      scene.add(particles);
    };

    const shapes = createFloatingShapes();
    createParticleSystem();

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Rotate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01 * (index % 3 + 1);
        shape.rotation.y += 0.01 * (index % 2 + 1);
        shape.rotation.z += 0.01 * (index % 4 + 1);
        
        // Floating motion
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        shape.position.x += Math.cos(Date.now() * 0.001 + index) * 0.002;
      });

      // Particle interaction with mouse
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          const dx = positions[i] - mouseRef.current.x * 10;
          const dy = positions[i + 1] - mouseRef.current.y * 10;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 2) {
            const force = (2 - distance) * 0.1;
            positions[i] += dx * force;
            positions[i + 1] += dy * force;
          }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Parallax Background Layers */}
      <motion.div 
        style={{ y, opacity, zIndex: 2 }}
        className="absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-gentle"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ zIndex: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight break-words">
            We Build
            <span className="block gradient-text mt-2 md:mt-3">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
            That Drive Growth
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4 md:px-0">
            Professional software development and digital marketing services. 
            We transform ideas into powerful digital experiences that help businesses succeed.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-8 md:mb-12 px-4 md:px-0">
            <Button 
              size="lg" 
              className="group w-full sm:w-auto"
              onClick={() => scrollToSection('contact')}
            >
              Start Your Project
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => scrollToSection('portfolio')}
            >
              View Our Work
            </Button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-2xl mx-auto px-4 md:px-0"
          >
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Code size={28} className="text-primary-600 md:w-8 md:h-8" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-gray-900">100+</div>
              <div className="text-sm md:text-base text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <TrendingUp size={28} className="text-primary-600 md:w-8 md:h-8" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-gray-900">95%</div>
              <div className="text-sm md:text-base text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Code size={28} className="text-primary-600 md:w-8 md:h-8" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm md:text-base text-gray-600">Support Available</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2"
        style={{ zIndex: 3 }}
      >
        <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 md:h-3 bg-gray-400 rounded-full mt-1.5 md:mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
