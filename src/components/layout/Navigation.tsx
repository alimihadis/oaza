'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavigationItem } from '@/lib/types';

const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePage, setActivePage] = useState('/');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const navbarOpacity = useTransform(scrollYProgress, [0, 0.1], [0.8, 1]);
  const navbarBlur = useTransform(scrollYProgress, [0, 0.1], [8, 12]);
  const navbarScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set active page based on current path
  useEffect(() => {
    setActivePage(window.location.pathname);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (href: string) => {
    setActivePage(href);
    setIsOpen(false);
  };

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation Bar */}
      <motion.header
        ref={navbarRef}
        style={{
          opacity: navbarOpacity,
          backdropFilter: `blur(${navbarBlur.get()}px)`,
          scale: navbarScale,
        }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isScrolled 
            ? "bg-white/90 backdrop-blur-xl shadow-2xl shadow-black/5 border-b border-white/20" 
            : "bg-white/70 backdrop-blur-md"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            
            {/* Logo Section */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/" className="flex items-center space-x-3 group">
                {/* Animated Logo Icon */}
                <motion.div
                  className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500"
                  whileHover={{ 
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-white font-bold text-xl">O</span>
                  
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                
                {/* Company Name */}
                <motion.div
                  className="hidden sm:block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Oaza Software
                  </span>
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="relative"
                  onHoverStart={() => setHoveredItem(item.href)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300 rounded-lg group",
                      activePage === item.href && "text-blue-600 font-semibold"
                    )}
                  >
                    {item.label}
                    
                    {/* Hover Underline Effect */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ 
                        scaleX: hoveredItem === item.href ? 1 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Active Page Indicator */}
                    {activePage === item.href && (
                      <motion.div
                        className="absolute inset-0 bg-blue-50 rounded-lg -z-10"
                        layoutId="activePage"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* CTA Button */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.button
                className="relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button Background Animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                {/* Button Content */}
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Get Started</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight size={16} />
                  </motion.div>
                </span>
                
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className="lg:hidden relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        "block px-4 py-3 text-lg font-medium rounded-xl transition-all duration-300 group",
                        activePage === item.href
                          ? "text-blue-600 bg-blue-50 border border-blue-200"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.label}</span>
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ChevronRight size={16} />
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="pt-4"
                >
                  <motion.button
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed navbar */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
