'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, MessageSquare, Map, Globe } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    service: 'web-development'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number>();

  // 3D Scene Setup
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(300, 300);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Create floating 3D elements
    const createFloatingElements = () => {
      const elements: THREE.Mesh[] = [];
      
      // Create floating message bubbles
      for (let i = 0; i < 8; i++) {
        const geometry = new THREE.SphereGeometry(0.1 + Math.random() * 0.2, 16, 16);
        const material = new THREE.MeshPhongMaterial({
          color: new THREE.Color().setHSL(Math.random() * 0.3 + 0.6, 0.7, 0.6),
          transparent: true,
          opacity: 0.6,
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 5
        );
        
        elements.push(mesh);
        scene.add(mesh);
      }

      // Create floating icons
      const iconGeometries = [
        new THREE.BoxGeometry(0.3, 0.3, 0.1), // Mail
        new THREE.CylinderGeometry(0.2, 0.2, 0.1, 8), // Phone
        new THREE.SphereGeometry(0.2, 16, 16), // Map
      ];

      const iconColors = [0x3b82f6, 0x8b5cf6, 0x10b981];
      
      iconGeometries.forEach((geometry, index) => {
        const material = new THREE.MeshPhongMaterial({
          color: iconColors[index],
          transparent: true,
          opacity: 0.8,
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 3
        );
        
        elements.push(mesh);
        scene.add(mesh);
      });

      return elements;
    };

    const elements = createFloatingElements();

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

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      elements.forEach((element, index) => {
        // Rotate elements
        element.rotation.x += 0.01 * (index % 3 + 1);
        element.rotation.y += 0.01 * (index % 2 + 1);
        
        // Floating motion
        element.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        element.position.x += Math.cos(Date.now() * 0.001 + index) * 0.002;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.dispose();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
          service: 'web-development'
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFieldFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleFieldBlur = () => {
    setFocusedField(null);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: ['hello@oazasoftware.com', 'support@oazasoftware.com'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', 'Mon-Fri, 9AM-6PM EST'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: ['123 Business Ave, Suite 100', 'New York, NY 10001'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 2:00 PM'],
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section id="contact" ref={containerRef} className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 opacity-30">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </div>

      {/* Animated background waves */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,600 C300,500 600,700 900,600 C1050,550 1200,650 1200,600 L1200,800 L0,800 Z" fill="url(#wave2)" opacity="0.3">
              <animate attributeName="d" dur="30s" repeatCount="indefinite" values="M0,600 C300,500 600,700 900,600 C1050,550 1200,650 1200,600 L1200,800 L0,800 Z;M0,600 C300,700 600,500 900,600 C1050,650 1200,550 1200,600 L1200,800 L0,800 Z;M0,600 C300,500 600,700 900,600 C1050,550 1200,650 1200,600 L1200,800 L0,800 Z"/>
            </path>
            <defs>
              <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
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
            Get In Touch
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Ready to start your next project? Let's discuss how we can help 
            bring your vision to life.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 hover:from-white hover:to-primary-50 transition-all duration-500">
              {/* Form glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              
              <div className="relative z-10">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-2xl font-semibold text-gray-900 mb-6"
                >
                  Send us a message
                </motion.h3>
                
                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3"
                    >
                      <CheckCircle size={20} className="text-green-600" />
                      <span className="text-green-800">{submitMessage}</span>
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3"
                    >
                      <AlertCircle size={20} className="text-red-600" />
                      <span className="text-red-800">{submitMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFieldFocus('name')}
                        onBlur={handleFieldBlur}
                        required
                        disabled={isSubmitting}
                        className={`transition-all duration-300 ${
                          focusedField === 'name' ? 'scale-105 shadow-lg' : ''
                        }`}
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFieldFocus('email')}
                        onBlur={handleFieldBlur}
                        required
                        disabled={isSubmitting}
                        className={`transition-all duration-300 ${
                          focusedField === 'email' ? 'scale-105 shadow-lg' : ''
                        }`}
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Input
                      label="Company (Optional)"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={() => handleFieldFocus('company')}
                      onBlur={handleFieldBlur}
                      disabled={isSubmitting}
                      className={`transition-all duration-300 ${
                        focusedField === 'company' ? 'scale-105 shadow-lg' : ''
                      }`}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interest
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary-400"
                    >
                      <option value="web-development">Web Development</option>
                      <option value="mobile-development">Mobile Development</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="ui-ux-design">UI/UX Design</option>
                      <option value="ecommerce">E-commerce Solutions</option>
                      <option value="cloud-devops">Cloud & DevOps</option>
                    </select>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFieldFocus('message')}
                      onBlur={handleFieldBlur}
                      rows={5}
                      required
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary-400 ${
                        focusedField === 'message' ? 'scale-105 shadow-lg' : ''
                      }`}
                      placeholder="Tell us about your project..."
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full group hover:scale-105 transition-transform duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          Send Message
                          <Send size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                We'd love to hear from you. Reach out to us through any of these channels 
                and we'll get back to you as soon as possible.
              </p>
            </motion.div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-start space-x-4 group cursor-pointer"
                >
                  <motion.div 
                    className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <info.icon size={24} className="text-white" />
                  </motion.div>
                  <div className="group-hover:translate-x-1 transition-transform duration-300">
                    <h4 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors duration-300">
                      {info.title}
                    </h4>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl border border-primary-200"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Globe size={24} className="text-primary-600" />
                <h4 className="font-semibold text-primary-800">Global Reach</h4>
              </div>
              <p className="text-primary-700 text-sm">
                We work with clients worldwide, providing 24/7 support and flexible timezone accommodations.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
