'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import Card from '@/components/ui/Card';
import { Code, Smartphone, BarChart3, Palette, Globe, Zap } from 'lucide-react';
import { Service } from '@/lib/types';

const services: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Modern, responsive web applications built with cutting-edge technologies.',
    icon: 'Code',
    features: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'API Integration'],
    modelType: 'laptop'
  },
  {
    id: '2',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    icon: 'Smartphone',
    features: ['React Native', 'Flutter', 'Native iOS/Android', 'App Store Optimization'],
    modelType: 'phone'
  },
  {
    id: '3',
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies to grow your business.',
    icon: 'BarChart3',
    features: ['SEO Optimization', 'Social Media Marketing', 'Content Strategy', 'Analytics'],
    modelType: 'chart'
  },
  {
    id: '4',
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive user interfaces that enhance user experience.',
    icon: 'Palette',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    modelType: 'palette'
  },
  {
    id: '5',
    title: 'E-commerce Solutions',
    description: 'Complete e-commerce platforms that drive sales and growth.',
    icon: 'Globe',
    features: ['Shopify Development', 'Custom Platforms', 'Payment Integration', 'Inventory Management'],
    modelType: 'shop'
  },
  {
    id: '6',
    title: 'Cloud & DevOps',
    description: 'Scalable cloud infrastructure and efficient development workflows.',
    icon: 'Zap',
    features: ['AWS/Azure Setup', 'CI/CD Pipelines', 'Monitoring', 'Security'],
    modelType: 'cloud'
  }
];

const iconMap = {
  Code,
  Smartphone,
  BarChart3,
  Palette,
  Globe,
  Zap
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const springScale = useSpring(isHovered ? 1.05 : 1, springConfig);

  const IconComponent = iconMap[service.icon as keyof typeof iconMap];

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
    
    renderer.setSize(120, 120);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create different 3D models based on service type
    let model: THREE.Mesh;
    
    switch (service.modelType) {
      case 'laptop':
        const laptopGeometry = new THREE.BoxGeometry(1, 0.1, 0.8);
        const laptopMaterial = new THREE.MeshPhongMaterial({ 
          color: 0xa8edea,
          shininess: 100
        });
        model = new THREE.Mesh(laptopGeometry, laptopMaterial);
        
        // Add screen
        const screenGeometry = new THREE.BoxGeometry(0.9, 0.05, 0.7);
        const screenMaterial = new THREE.MeshPhongMaterial({ color: 0x0d9488 });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.y = 0.075;
        model.add(screen);
        break;
        
      case 'phone':
        const phoneGeometry = new THREE.BoxGeometry(0.3, 0.6, 0.05);
        const phoneMaterial = new THREE.MeshPhongMaterial({ 
          color: 0xa18cd1,
          shininess: 100
        });
        model = new THREE.Mesh(phoneGeometry, phoneMaterial);
        
        // Add screen
        const phoneScreenGeometry = new THREE.BoxGeometry(0.25, 0.5, 0.02);
        const phoneScreenMaterial = new THREE.MeshPhongMaterial({ color: 0x7c3aed });
        const phoneScreen = new THREE.Mesh(phoneScreenGeometry, phoneScreenMaterial);
        phoneScreen.position.z = 0.035;
        model.add(phoneScreen);
        break;
        
      case 'chart':
        const chartGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.1);
        const chartMaterial = new THREE.MeshPhongMaterial({ color: 0x89f7fe });
        model = new THREE.Mesh(chartGeometry, chartMaterial);
        
        // Add bars
        for (let i = 0; i < 4; i++) {
          const barGeometry = new THREE.BoxGeometry(0.1, 0.1 + Math.random() * 0.4, 0.05);
          const barMaterial = new THREE.MeshPhongMaterial({ color: 0x66a6ff });
          const bar = new THREE.Mesh(barGeometry, barMaterial);
          bar.position.set((i - 1.5) * 0.2, 0.35, 0.075);
          model.add(bar);
        }
        break;
        
      default:
        const defaultGeometry = new THREE.SphereGeometry(0.4, 16, 16);
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

    camera.position.z = 3;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (isHovered) {
        model.rotation.y += 0.02;
        model.rotation.x += 0.01;
      }
      
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
        }}
        transition={{ duration: 0.3 }}
        className="transform-gpu"
      >
        <Card className="h-full relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-dark-800 dark:to-dark-700 hover:from-white hover:to-pastel-50 dark:hover:from-dark-800 dark:hover:to-pastel-dark-100 transition-all duration-500 p-6 md:p-8">
          {/* 3D Model Canvas - Hidden on mobile for performance */}
          <div className="absolute top-4 right-4 w-24 h-24 md:w-30 md:h-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              onLoad={setup3DModel}
            />
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-pastel-500/5 dark:from-pastel-dark-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

          <div className="relative z-10">
            <motion.div 
              className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-pastel-100 to-pastel-200 dark:from-pastel-dark-200 dark:to-pastel-dark-300 rounded-xl mb-4 md:mb-6 group-hover:from-pastel-200 group-hover:to-pastel-300 dark:group-hover:from-pastel-dark-300 dark:group-hover:to-pastel-dark-400 transition-all duration-300 mx-auto md:mx-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {IconComponent && <IconComponent size={28} className="text-pastel-600 dark:text-pastel-400 md:w-8 md:h-8 transition-colors duration-300" />}
            </motion.div>
            
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-pastel-700 dark:group-hover:text-pastel-300 transition-colors duration-300 text-center md:text-left">
              {service.title}
            </h3>
            
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 md:mb-6 flex-grow group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 text-center md:text-left leading-relaxed">
              {service.description}
            </p>
            
            <ul className="space-y-2 md:space-y-3">
              {service.features.map((feature, featureIndex) => (
                <motion.li 
                  key={featureIndex} 
                  className="flex items-center text-xs md:text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                >
                  <motion.div 
                    className="w-1.5 h-1.5 md:w-2 md:h-2 bg-pastel-500 dark:bg-pastel-400 rounded-full mr-2 md:mr-3 group-hover:bg-pastel-600 dark:group-hover:bg-pastel-300 transition-colors duration-300 flex-shrink-0"
                    whileHover={{ scale: 1.5 }}
                  />
                  <span className="leading-relaxed">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Depth shadow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default function Services() {
  return (
    <section className="py-section md:py-section-md lg:py-section-lg bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 relative overflow-hidden transition-colors duration-300">
      {/* Animated background waves */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,400 C300,300 600,500 900,400 C1050,350 1200,450 1200,400 L1200,800 L0,800 Z" fill="url(#wave1)" opacity="0.3">
              <animate attributeName="d" dur="20s" repeatCount="indefinite" values="M0,400 C300,300 600,500 900,400 C1050,350 1200,450 1200,400 L1200,800 L0,800 Z;M0,400 C300,500 600,300 900,400 C1050,450 1200,350 1200,400 L1200,800 L0,800 Z;M0,400 C300,300 600,500 900,400 C1050,350 1200,450 1200,400 L1200,800 L0,800 Z"/>
            </path>
            <defs>
              <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#a8edea', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#fed6e3', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-container md:px-container-md lg:px-container-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-dream mb-4 md:mb-6 break-words"
          >
            Our Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4 md:px-0 transition-colors duration-300"
          >
            We offer comprehensive software development and digital marketing services 
            to help your business thrive in the digital landscape.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-4 md:px-0">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
