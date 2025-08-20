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
    return <div className="h-96 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>;
  }

  return (
    <footer ref={containerRef} className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-10 mt-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Animated Mesh Gradient Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        </div>

        {/* Floating Particles - Simplified to prevent hydration issues */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-pulse"
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
              className="text-lg text-gray-300 max-w-lg leading-relaxed"
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
                  className={`w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:bg-white/20 hover:border-white/40 ${social.color} group`}
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
            <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center space-x-3 mb-4"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Send size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Stay Updated</h3>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-gray-300 mb-6"
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
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  >
                    <ArrowRight size={16} />
                  </motion.button>
                </motion.div>

                {isSubscribed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-2 text-green-400 text-sm"
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
              <Sparkles size={20} className="text-blue-400" />
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
                    className="group flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
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
              <Zap size={20} className="text-purple-400" />
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
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
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
              <Globe size={20} className="text-green-400" />
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
                    className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <contact.icon size={16} className="text-blue-400" />
                  </motion.div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
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
          className="border-t border-white/20 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p 
              className="text-gray-400 text-center md:text-left"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              &copy; 2024 Oaza Software. All rights reserved.
            </motion.p>
            
            <motion.div 
              className="flex items-center space-x-2 text-gray-400"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <span>Made with</span>
              <Heart size={16} className="text-red-400 animate-pulse" />
              <span>by Oaza Team</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
