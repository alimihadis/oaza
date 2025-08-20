'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import Card from '@/components/ui/Card';
import { ExternalLink, Github, Filter, Code, Smartphone, BarChart3, Eye } from 'lucide-react';
import { PortfolioItem } from '@/lib/types';

const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A modern e-commerce platform built with Next.js and Stripe integration, featuring advanced product management and analytics.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    category: 'web',
    link: 'https://example.com'
  },
  {
    id: '2',
    title: 'Food Delivery App',
    description: 'Cross-platform mobile application for food delivery with real-time tracking and payment processing.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
    technologies: ['React Native', 'Firebase', 'Google Maps API', 'Stripe'],
    category: 'mobile',
    link: 'https://example.com'
  },
  {
    id: '3',
    title: 'SaaS Dashboard',
    description: 'Comprehensive business dashboard with real-time analytics, user management, and reporting features.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c072?w=800&h=600&fit=crop',
    technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'AWS'],
    category: 'web',
    link: 'https://example.com'
  },
  {
    id: '4',
    title: 'Fitness Tracking App',
    description: 'Mobile application for tracking workouts, nutrition, and health metrics with social features.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    technologies: ['Flutter', 'Firebase', 'HealthKit', 'Google Fit API'],
    category: 'mobile',
    link: 'https://example.com'
  },
  {
    id: '5',
    title: 'Digital Marketing Campaign',
    description: 'Comprehensive digital marketing strategy that increased client revenue by 300% in 6 months.',
    image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop',
    technologies: ['Google Ads', 'Facebook Ads', 'SEO', 'Content Marketing'],
    category: 'marketing',
    link: 'https://example.com'
  },
  {
    id: '6',
    title: 'Real Estate Platform',
    description: 'Property listing and management platform with advanced search filters and virtual tour capabilities.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS S3', 'Google Maps'],
    category: 'web',
    link: 'https://example.com'
  }
];

const categories = [
  { id: 'all', label: 'All Projects', icon: Filter },
  { id: 'web', label: 'Web Development', icon: Code },
  { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
  { id: 'marketing', label: 'Digital Marketing', icon: BarChart3 }
];

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
}

const PortfolioCard = ({ item, index }: PortfolioCardProps) => {
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

    // Create different 3D models based on category
    let model: THREE.Mesh;
    
    switch (item.category) {
      case 'web':
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
        
      case 'mobile':
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
        
      case 'marketing':
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

          {/* Image with overlay */}
          <div className="relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* 3D Toggle Button */}
            <button
              onClick={handle3DToggle}
              className="absolute top-4 left-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200 shadow-lg"
            >
              <Eye size={16} className="text-gray-700" />
            </button>
            
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200 shadow-lg"
                >
                  <ExternalLink size={16} className="text-gray-700" />
                </a>
              )}
              <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                <Github size={16} className="text-gray-700" />
              </div>
            </div>

            {/* Category Badge */}
            <div className="absolute bottom-4 left-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                item.category === 'web' ? 'bg-blue-100 text-blue-800' :
                item.category === 'mobile' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {item.category === 'web' ? 'Web Development' :
                 item.category === 'mobile' ? 'Mobile App' : 'Digital Marketing'}
              </span>
            </div>
          </div>

          <div className="p-6 relative z-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors duration-300">
              {item.title}
            </h3>
            
            <p className="text-gray-600 mb-4 flex-grow group-hover:text-gray-700 transition-colors duration-300">
              {item.description}
            </p>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded group-hover:bg-primary-100 group-hover:text-primary-700 transition-colors duration-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Buttons removed - cleaner interface */}
          </div>

          {/* Depth shadow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState(portfolioItems);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === 'all') {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === category));
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Animated background mesh */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,400 C300,300 600,500 900,400 C1050,350 1200,450 1200,400 L1200,800 L0,800 Z" fill="url(#mesh1)" opacity="0.3">
              <animate attributeName="d" dur="25s" repeatCount="indefinite" values="M0,400 C300,300 600,500 900,400 C1050,350 1200,450 1200,400 L1200,800 L0,800 Z;M0,400 C300,500 600,300 900,400 C1050,450 1200,350 1200,400 L1200,800 L0,800 Z;M0,400 C300,300 600,500 900,400 C1050,350 1200,450 1200,400 L1200,800 L0,800 Z"/>
            </path>
            <defs>
              <linearGradient id="mesh1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Our Portfolio
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover our successful projects and see how we've helped businesses 
            transform their digital presence and achieve remarkable results.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-16"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'border-primary-500 bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'border-gray-300 text-gray-700 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700'
                }`}
              >
                <category.icon size={20} />
                <span>{category.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
