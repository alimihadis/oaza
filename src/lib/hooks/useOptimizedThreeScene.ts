import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { usePerformanceDetection } from './usePerformanceDetection';

interface ThreeSceneConfig {
  particleCount: number;
  objectCount: number;
  enableShadows: boolean;
  enablePostProcessing: boolean;
  targetFPS: number;
}

export function useOptimizedThreeScene(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  isVisible: boolean = true
) {
  const { isHighPerformance, isMobile, supportsWebGL } = usePerformanceDetection();
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number>();
  const lastFrameTime = useRef<number>(0);
  
  // Performance-based configuration
  const getSceneConfig = useCallback((): ThreeSceneConfig => {
    if (!isHighPerformance || isMobile) {
      return {
        particleCount: 200, // Reduced from 800
        objectCount: 3,     // Reduced from 6
        enableShadows: false,
        enablePostProcessing: false,
        targetFPS: 30
      };
    }
    
    return {
      particleCount: 800,
      objectCount: 6,
      enableShadows: true,
      enablePostProcessing: true,
      targetFPS: 60
    };
  }, [isHighPerformance, isMobile]);

  // Optimized render loop with frame limiting
  const renderLoop = useCallback((currentTime: number) => {
    if (!isVisible || !rendererRef.current || !sceneRef.current) {
      return;
    }

    const config = getSceneConfig();
    const frameInterval = 1000 / config.targetFPS;
    
    if (currentTime - lastFrameTime.current >= frameInterval) {
      const camera = (rendererRef.current as any).camera;
      if (camera && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, camera);
      }
      lastFrameTime.current = currentTime;
    }
    
    animationRef.current = requestAnimationFrame(renderLoop);
  }, [isVisible, getSceneConfig]);

  // Initialize scene
  useEffect(() => {
    if (!canvasRef.current || !supportsWebGL) return;

    const config = getSceneConfig();
    
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

    // Renderer setup with optimizations
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: isHighPerformance, // Only enable antialiasing on high-performance devices
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = config.enableShadows;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    
    // Store camera reference for render loop
    (renderer as any).camera = camera;
    rendererRef.current = renderer;

    // Create optimized objects
    const createOptimizedObjects = () => {
      const objects: THREE.Mesh[] = [];
      const serviceIcons = ['code', 'phone', 'chart', 'palette', 'globe', 'zap'];
      
      for (let i = 0; i < config.objectCount; i++) {
        let geometry: THREE.BufferGeometry;
        let material: THREE.Material;
        
        // Use instanced geometries for better performance
        switch (i % 3) {
          case 0:
            geometry = new THREE.BoxGeometry(0.8, 0.1, 0.6);
            break;
          case 1:
            geometry = new THREE.SphereGeometry(0.4, 8, 8); // Reduced segments
            break;
          case 2:
            geometry = new THREE.ConeGeometry(0.3, 0.8, 6); // Reduced segments
            break;
          default:
            geometry = new THREE.BoxGeometry(0.8, 0.1, 0.6);
            break;
        }
        
        material = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(i * 0.1, 0.7, 0.5),
          transparent: true,
          opacity: 0.7,
          wireframe: true,
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          (Math.random() - 0.5) * 10, // Reduced spread
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 5
        );
        
        objects.push(mesh);
        scene.add(mesh);
      }
      
      return objects;
    };

    // Create optimized particle system
    const createOptimizedParticleSystem = () => {
      const positions = new Float32Array(config.particleCount * 3);
      const colors = new Float32Array(config.particleCount * 3);

      for (let i = 0; i < config.particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 15;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

        colors[i * 3] = Math.random() * 0.5 + 0.5;
        colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
        colors[i * 3 + 2] = Math.random() * 0.5 + 0.5;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      
      return particles;
    };

    const objects = createOptimizedObjects();
    const particles = createOptimizedParticleSystem();

    // Start render loop only when visible
    if (isVisible) {
      animationRef.current = requestAnimationFrame(renderLoop);
    }

    // Handle window resize with throttling
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (camera && renderer) {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (renderer) {
        renderer.dispose();
      }
      clearTimeout(resizeTimeout);
    };
  }, [canvasRef, supportsWebGL, getSceneConfig, isVisible, renderLoop]);

  // Start/stop animation based on visibility
  useEffect(() => {
    if (isVisible && rendererRef.current && sceneRef.current) {
      animationRef.current = requestAnimationFrame(renderLoop);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [isVisible, renderLoop]);

  return {
    scene: sceneRef.current,
    renderer: rendererRef.current,
    isVisible,
  };
}
