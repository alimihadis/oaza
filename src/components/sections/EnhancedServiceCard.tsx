'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import Card from '@/components/ui/Card';
import { Check } from 'lucide-react';

interface EnhancedServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    icon: string;
    features: string[];
    technologies: string[];
    modelType: string;
  };
  index: number;
}

export default function EnhancedServiceCard({ service, index }: EnhancedServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [is3DVisible, setIs3DVisible] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const springScale = useSpring(isHovered ? 1.05 : 1, springConfig);
  const springZ = useSpring(isHovered ? 20 : 0, springConfig);

  // 3D Model Setup
  const setup3DModel = () => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true 
    });
    
    renderer.setSize(200, 200);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create different 3D models based on service type
    let model: THREE.Mesh;
    
    switch (service.modelType) {
      case 'laptop':
        // Laptop model
        const laptopGeometry = new THREE.BoxGeometry(1.2, 0.1, 0.8);
        const laptopMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x2563eb,
          shininess: 100
        });
        model = new THREE.Mesh(laptopGeometry, laptopMaterial);
        
        // Add screen
        const screenGeometry = new THREE.BoxGeometry(1.1, 0.05, 0.7);
        const screenMaterial = new THREE.MeshPhongMaterial({ color: 0x1e40af });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.y = 0.075;
        model.add(screen);
        
        // Add keyboard
        const keyboardGeometry = new THREE.BoxGeometry(1.1, 0.02, 0.7);
        const keyboardMaterial = new THREE.MeshPhongMaterial({ color: 0x1e293b });
        const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
        keyboard.position.y = -0.06;
        model.add(keyboard);
        break;
        
      case 'phone':
        // Phone model
        const phoneGeometry = new THREE.BoxGeometry(0.4, 0.8, 0.05);
        const phoneMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x7c3aed,
          shininess: 100
        });
        model = new THREE.Mesh(phoneGeometry, phoneMaterial);
        
        // Add screen
        const phoneScreenGeometry = new THREE.BoxGeometry(0.35, 0.7, 0.02);
        const phoneScreenMaterial = new THREE.MeshPhongMaterial({ color: 0x5b21b6 });
        const phoneScreen = new THREE.Mesh(phoneScreenGeometry, phoneScreenMaterial);
        phoneScreen.position.z = 0.035;
        model.add(phoneScreen);
        
        // Add home button
        const buttonGeometry = new THREE.CircleGeometry(0.05, 16);
        const buttonMaterial = new THREE.MeshPhongMaterial({ color: 0x1e1b4b });
        const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
        button.position.set(0, -0.3, 0.035);
        button.rotation.x = -Math.PI / 2;
        model.add(button);
        break;
        
      case 'chart':
        // Chart model
        const chartGeometry = new THREE.BoxGeometry(1, 0.8, 0.1);
        const chartMaterial = new THREE.MeshPhongMaterial({ color: 0x059669 });
        model = new THREE.Mesh(chartGeometry, chartMaterial);
        
        // Add bars
        for (let i = 0; i < 5; i++) {
          const barHeight = 0.1 + Math.random() * 0.6;
          const barGeometry = new THREE.BoxGeometry(0.12, barHeight, 0.08);
          const barMaterial = new THREE.MeshPhongMaterial({ color: 0x10b981 });
          const bar = new THREE.Mesh(barGeometry, barMaterial);
          bar.position.set((i - 2) * 0.2, barHeight / 2, 0.09);
          model.add(bar);
        }
        break;
        
      case 'palette':
        // Palette model
        const paletteGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.1);
        const paletteMaterial = new THREE.MeshPhongMaterial({ color: 0xf59e0b });
        model = new THREE.Mesh(paletteGeometry, paletteMaterial);
        
        // Add color circles
        const colors = [0xef4444, 0x3b82f6, 0x10b981, 0xfbbf24, 0x8b5cf6];
        colors.forEach((color, i) => {
          const circleGeometry = new THREE.CircleGeometry(0.08, 16);
          const circleMaterial = new THREE.MeshPhongMaterial({ color });
          const circle = new THREE.Mesh(circleGeometry, circleMaterial);
          circle.position.set((i - 2) * 0.15, 0, 0.06);
          circle.rotation.x = -Math.PI / 2;
          model.add(circle);
        });
        break;
        
      case 'shop':
        // Shop model
        const shopGeometry = new THREE.BoxGeometry(1, 0.8, 0.8);
        const shopMaterial = new THREE.MeshPhongMaterial({ color: 0x06b6d4 });
        model = new THREE.Mesh(shopGeometry, shopMaterial);
        
        // Add roof
        const roofGeometry = new THREE.ConeGeometry(0.7, 0.4, 4);
        const roofMaterial = new THREE.MeshPhongMaterial({ color: 0x0891b2 });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.y = 0.6;
        roof.rotation.y = Math.PI / 4;
        model.add(roof);
        
        // Add door
        const doorGeometry = new THREE.BoxGeometry(0.3, 0.5, 0.05);
        const doorMaterial = new THREE.MeshPhongMaterial({ color: 0x0e7490 });
        const door = new THREE.Mesh(doorGeometry, doorMaterial);
        door.position.set(0, -0.15, 0.425);
        model.add(door);
        break;
        
      case 'cloud':
        // Cloud model
        const cloudGeometry = new THREE.SphereGeometry(0.4, 16, 16);
        const cloudMaterial = new THREE.MeshPhongMaterial({ color: 0xfbbf24 });
        model = new THREE.Mesh(cloudGeometry, cloudMaterial);
        
        // Add smaller spheres for cloud shape
        for (let i = 0; i < 6; i++) {
          const sphereGeometry = new THREE.SphereGeometry(0.2 + Math.random() * 0.2, 16, 16);
          const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xfbbf24 });
          const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
          sphere.position.set(
            (Math.random() - 0.5) * 0.8,
            (Math.random() - 0.5) * 0.4,
            (Math.random() - 0.5) * 0.4
          );
          model.add(sphere);
        }
        break;
        
      default:
        const defaultGeometry = new THREE.SphereGeometry(0.5, 16, 16);
        const defaultMaterial = new THREE.MeshPhongMaterial({ color: 0xdc2626 });
        model = new THREE.Mesh(defaultGeometry, defaultMaterial);
    }

    scene.add(model);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add point light for glow effect
    const pointLight = new THREE.PointLight(0x3b82f6, 1, 10);
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);

    camera.position.z = 3;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (isHovered) {
        model.rotation.y += 0.02;
        model.rotation.x += 0.01;
      }
      
      // Gentle floating animation
      model.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseXFromCenter = event.clientX - centerX;
    const mouseYFromCenter = event.clientY - centerY;
    
    mouseX.set(mouseXFromCenter / (rect.width / 2));
    mouseY.set(mouseYFromCenter / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handle3DToggle = () => {
    setIs3DVisible(!is3DVisible);
    if (!is3DVisible) {
      setTimeout(() => {
        setup3DModel();
      }, 100);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: 0, rotateY: 0 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      className="group"
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          scale: springScale,
          z: springZ,
        }}
        transition={{ duration: 0.3 }}
        className="transform-gpu"
      >
        <Card className="h-full relative overflow-hidden bg-gradient-to-br from-white to-gray-50 hover:from-white hover:to-primary-50 transition-all duration-500">
          {/* 3D Model Canvas */}
          {is3DVisible && (
            <div className="absolute top-4 right-4 w-50 h-50 opacity-100 transition-opacity duration-500 z-20">
              <canvas
                ref={canvasRef}
                className="w-full h-full"
              />
            </div>
          )}

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

          {/* Header with 3D Toggle */}
          <div className="relative p-6 pb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-primary-600">{service.icon}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              </div>
              
              {/* 3D Toggle Button */}
              <button
                onClick={handle3DToggle}
                className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200 shadow-lg opacity-0 group-hover:opacity-100"
              >
                <span className="text-xs font-bold text-gray-700">3D</span>
              </button>
            </div>
          </div>

          <div className="px-6 pb-6 relative z-10">
            {/* Features */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors duration-300">
                Key Features:
              </h4>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    <Check size={16} className="text-primary-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors duration-300">
                Technologies:
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full group-hover:bg-primary-100 group-hover:text-primary-700 transition-colors duration-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>


          </div>

          {/* Depth shadow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
        </Card>
      </motion.div>
    </motion.div>
  );
}
