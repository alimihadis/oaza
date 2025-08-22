'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Logo from '@/components/common/Logo';
import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Send, 
  ArrowRight,
  Heart,
  Sparkles,
  Globe,
  Zap
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub", color: "hover:text-gray-300" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-400" }
  ];

  const quickLinks = [
    { href: "/about", label: "About Us", delay: 0.1 },
    { href: "/services", label: "Services", delay: 0.2 },
    { href: "/portfolio", label: "Portfolio", delay: 0.3 },
    { href: "/contact", label: "Contact", delay: 0.4 }
  ];

  const contactInfo = [
    { icon: Mail, text: "hello@oazasoftware.com", delay: 0.1 },
    { icon: Phone, text: "+1 (555) 123-4567", delay: 0.2 },
    { icon: MapPin, text: "New York, NY", delay: 0.3 }
  ];

  // Don't render until client-side to prevent hydration issues
  if (!isClient) {
    return <div className="h-96 bg-gradient-to-br from-slate-900 via-lavender-800 to-slate-900 dark:from-dark-950 dark:via-dark-800 dark:to-dark-950"></div>;
  }

  return (
    <footer ref={containerRef} className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-lavender-800 to-slate-900 dark:from-dark-950 dark:via-dark-800 dark:to-dark-950 z-10 mt-20 transition-colors duration-300">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Animated Mesh Gradient Overlay */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-pastel-600/20 via-lavender-600/20 to-sky-600/20 dark:from-pastel-dark-500/20 dark:via-lavender-dark-500/20 dark:to-sky-dark-500/20 animate-pulse"></div>
        </div>

        {/* Floating Particles - Simplified to prevent hydration issues */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full opacity-60 animate-pulse ${
                i % 3 === 0 ? 'bg-pastel-400 dark:bg-pastel-dark-400' : i % 3 === 1 ? 'bg-lavender-400 dark:bg-lavender-dark-400' : 'bg-sky-400 dark:bg-sky-dark-400'
              }`}
              style={{
                left: `${20 + (i * 8)}%`,
                top: `${30 + (i * 5)}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Company Info with Floating Logo */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="inline-block"
            >
              <Logo />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-300 dark:text-gray-200 max-w-lg leading-relaxed transition-colors duration-300"
            >
              We specialize in building modern web applications and providing digital marketing solutions 
              that help businesses grow and succeed in the digital world.
            </motion.p>

            {/* Social Links with Hover Effects */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex space-x-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 360,
                    y: -5
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`w-12 h-12 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/10 hover:border-white/40 dark:hover:border-white/20 ${social.color} group`}
                >
                  <social.icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="bg-white/5 dark:bg-white/3 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-8 hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-500 group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center space-x-3 mb-4"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-pastel-500 to-dream-end dark:from-pastel-dark-500 dark:to-lavender-dark-500 rounded-full flex items-center justify-center transition-colors duration-300">
                  <Send size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Stay Updated</h3>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-gray-300 dark:text-gray-200 mb-6 transition-colors duration-300"
              >
                Get the latest insights, tips, and updates delivered to your inbox.
              </motion.p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="relative"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pastel-500 dark:focus:ring-pastel-dark-400 focus:border-transparent transition-all duration-300"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-2 w-8 h-8 bg-gradient-to-r from-pastel-500 to-dream-end dark:from-pastel-dark-500 dark:to-lavender-dark-500 rounded-md flex items-center justify-center text-white hover:from-pastel-600 hover:to-dream-end/90 dark:hover:from-pastel-dark-600 dark:hover:to-lavender-dark-600 transition-all duration-300"
                  >
                    <ArrowRight size={16} />
                  </motion.button>
                </motion.div>

                {isSubscribed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-2 text-green-400 dark:text-green-300 text-sm transition-colors duration-300"
                  >
                    <Heart size={16} className="animate-pulse" />
                    <span>Successfully subscribed!</span>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>

        {/* Middle Section - Links and Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
              <Sparkles size={20} className="text-pastel-400 dark:text-pastel-dark-400 transition-colors duration-300" />
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: link.delay }}
                >
                  <Link 
                    href={link.href}
                    className="group flex items-center space-x-2 text-gray-300 dark:text-gray-200 hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" />
                    <span>{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
              <Zap size={20} className="text-lavender-400 dark:text-lavender-dark-400 transition-colors duration-300" />
              <span>Services</span>
            </h3>
            <ul className="space-y-3">
              {['Web Development', 'Mobile Apps', 'Digital Marketing', 'UI/UX Design'].map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <span className="text-gray-300 dark:text-gray-200 hover:text-white transition-colors duration-300 cursor-pointer">
                    {service}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
              <Globe size={20} className="text-sky-400 dark:text-sky-dark-400 transition-colors duration-300" />
              <span>Contact Info</span>
            </h3>
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={contact.text}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: contact.delay }}
                  className="flex items-center space-x-3 group"
                >
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-br from-pastel-500/20 to-dream-end/20 dark:from-pastel-dark-500/20 dark:to-lavender-dark-500/20 border border-pastel-400/30 dark:border-pastel-dark-400/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <contact.icon size={16} className="text-pastel-400 dark:text-pastel-dark-400 transition-colors duration-300" />
                  </motion.div>
                  <span className="text-gray-300 dark:text-gray-200 group-hover:text-white transition-colors duration-300">
                    {contact.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-white/20 dark:border-white/10 pt-8 transition-colors duration-300"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p 
              className="text-gray-400 dark:text-gray-500 text-center md:text-left transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              &copy; 2024 Oaza Software. All rights reserved.
            </motion.p>
            
            <motion.div 
              className="flex items-center space-x-2 text-gray-400 dark:text-gray-500 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <span>Made with</span>
              <Heart size={16} className="text-red-400 dark:text-red-300 animate-pulse transition-colors duration-300" />
              <span>by Oaza Team</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
