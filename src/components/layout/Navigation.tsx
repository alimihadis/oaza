'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavigationItem } from '@/lib/types';
import { useMagneticHover } from '@/lib/hooks/useMagneticHover';

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
  const [isClient, setIsClient] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Magnetic hover effects
  const logoMagnetic = useMagneticHover({ strength: 0.2 });

  // Client-side only scroll effects
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate scroll-based values
  const scrollProgress = Math.min(scrollY / 1000, 1);
  const navbarOpacity = 0.85 + (scrollProgress * 0.1);
  const navbarBlur = 12 + (scrollProgress * 8);
  const navbarScale = 1 - (scrollProgress * 0.02);
  const navbarHeight = 80 - (scrollProgress * 16);

  // Handle scroll effects
  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set active page based on current path
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setActivePage(window.location.pathname);
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (href: string) => {
    setActivePage(href);
    setIsOpen(false);
  };

  // Don't render until client-side
  if (!isClient) {
    return <div className="h-24 lg:h-28" />;
  }

  return (
    <>
      {/* Enhanced Progress Bar */}
      <motion.div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{ scaleX: scrollProgress }}
      >
        <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 shadow-lg" />
        <div className="h-full bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-orange-400 blur-sm opacity-50" />
      </motion.div>

      {/* Enhanced Navigation Bar */}
      <motion.header
        ref={navbarRef}
        style={{
          opacity: navbarOpacity,
          backdropFilter: `blur(${navbarBlur}px)`,
          scale: navbarScale,
          height: navbarHeight,
        }}
        className={cn(
          "fixed top-4 left-4 right-4 z-40 transition-all duration-700 ease-out rounded-2xl",
          isScrolled 
            ? "bg-white/80 backdrop-blur-2xl shadow-2xl shadow-black/10 border border-white/30" 
            : "bg-white/60 backdrop-blur-xl border border-white/20"
        )}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-0 right-1/4 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"
            animate={{ 
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-full">
            
            {/* Enhanced Logo Section with Magnetic Effect */}
            <motion.div
              ref={logoMagnetic.ref}
              style={logoMagnetic.style}
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Link href="/" className="flex items-center space-x-3 group">
                {/* Premium Animated Logo Icon */}
                <motion.div
                  className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-700"
                  whileHover={{ 
                    rotate: [0, -15, 15, 0],
                    scale: [1, 1.15, 1],
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <span className="text-white font-bold text-2xl relative z-10">O</span>
                  
                  {/* Enhanced Glow Effects */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-700"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Sparkle Effect */}
                  <motion.div
                    className="absolute -top-1 -right-1 text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{ 
                      scale: [0, 1, 0],
                      rotate: [0, 180]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <Sparkles size={12} />
                  </motion.div>
                </motion.div>
                
                {/* Enhanced Company Name */}
                <motion.div
                  className="hidden sm:block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                  <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                    Oaza Software
                  </span>
                </motion.div>
              </Link>
            </motion.div>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                  className="relative"
                  onHoverStart={() => setHoveredItem(item.href)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      "relative px-5 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-500 rounded-xl group overflow-hidden",
                      activePage === item.href && "text-blue-600 font-semibold"
                    )}
                  >
                    {/* Hover Background Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Enhanced Hover Underline Effect */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ 
                        scaleX: hoveredItem === item.href ? 1 : 0 
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                    
                    {/* Active Page Indicator */}
                    {activePage === item.href && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl -z-10 border border-blue-200/50"
                        layoutId="activePage"
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Enhanced Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className="lg:hidden relative p-3 text-gray-700 hover:text-blue-600 transition-colors duration-300 rounded-xl hover:bg-white/50 backdrop-blur-sm"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, scaleY: 0 }}
              animate={{ opacity: 1, height: "auto", scaleY: 1 }}
              exit={{ opacity: 0, height: 0, scaleY: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="lg:hidden bg-white/95 backdrop-blur-2xl border-t border-white/30 overflow-hidden"
            >
              <div className="px-6 py-8 space-y-4">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -30, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        "block px-6 py-4 text-lg font-medium rounded-2xl transition-all duration-500 group border border-transparent",
                        activePage === item.href
                          ? "text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200/50 shadow-lg"
                          : "text-gray-700 hover:text-blue-600 hover:bg-white/50 hover:border-white/50"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.label}</span>
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          animate={{ x: [0, 8, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          {/* ChevronRight size={18} /> */}
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed navbar */}
      <div className="h-24 lg:h-28" />
    </>
  );
}
