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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-xl border-b border-white/20 shadow-lg"
        style={{
          background: `rgba(255, 255, 255, ${navbarOpacity})`,
          backdropFilter: `blur(${navbarBlur}px)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-container md:px-container-md lg:px-container-lg">
          <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
            {/* Logo */}
            <motion.div
              ref={logoMagnetic.ref}
              style={logoMagnetic.style}
              className="flex items-center space-x-2"
            >
              <Link href="/" className="flex items-center space-x-2 group">
                <motion.div
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white font-bold text-sm md:text-base lg:text-lg">O</span>
                </motion.div>
                <span className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  Oaza Software
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      "relative px-4 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-xl group font-medium",
                      activePage === item.href && "text-blue-600"
                    )}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.label}
                    {hoveredItem === item.href && (
                      <motion.div
                        className="absolute inset-0 bg-blue-50 rounded-xl -z-10"
                        layoutId="hoveredItem"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    )}
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

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="hidden lg:block"
            >
              <Link
                href="/contact"
                onClick={() => handleNavClick('/contact')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
              >
                Get Started
              </Link>
            </motion.div>

            {/* Enhanced Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className="lg:hidden relative p-2.5 md:p-3 text-gray-700 hover:text-blue-600 transition-colors duration-300 rounded-xl hover:bg-white/50 backdrop-blur-sm touch-manipulation active:scale-95"
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
                    <X size={22} className="md:w-6 md:h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Menu size={22} className="md:w-6 md:h-6" />
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
              className="lg:hidden bg-white/95 backdrop-blur-2xl border-t border-white/30 overflow-hidden shadow-mobile-xl"
            >
              <div className="px-4 md:px-6 py-6 md:py-8 space-y-2 md:space-y-4">
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
                        "block px-4 md:px-6 py-3 md:py-4 text-base md:text-lg font-medium rounded-2xl transition-all duration-500 group border border-transparent touch-manipulation",
                        activePage === item.href
                          ? "text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200/50 shadow-mobile-lg"
                          : "text-gray-700 hover:text-blue-600 hover:bg-white/50 hover:border-white/50 active:bg-gray-50 active:scale-95"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.label}</span>
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
                
                {/* Mobile CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
                  className="pt-4 md:pt-6 border-t border-gray-100"
                >
                  <Link
                    href="/contact"
                    onClick={() => handleNavClick('/contact')}
                    className="block w-full px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl text-center transition-all duration-300 hover:from-blue-700 hover:to-purple-700 active:scale-95 shadow-mobile-lg touch-manipulation"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20 lg:h-24" />
    </>
  );
}
