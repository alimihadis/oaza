'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Card from '@/components/ui/Card';
import { Users, Award, Clock, Target, Zap, Heart, Shield, Star } from 'lucide-react';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ValueCard = ({ icon, title, description, index }: ValueCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 0 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        rotateX: 15, 
        rotateY: 15, 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      className="perspective-1000 touch-manipulation"
    >
      <Card className="h-full transform-gpu transition-all duration-300 hover:shadow-2xl hover:shadow-primary-200/50 mobile-card overflow-hidden">
        <div className="relative w-full h-full transition-all duration-300">
          {/* Front of card */}
          {!isFlipped && (
            <motion.div 
              className="text-center p-4 md:p-6 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                {icon}
              </div>
              <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-2">{title}</h4>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{description}</p>
            </motion.div>
          )}

          {/* Back of card */}
          {isFlipped && (
            <motion.div 
              className="text-center p-4 md:p-6 transition-all duration-300 rounded-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                {icon}
              </div>
              <h4 className="text-base md:text-lg font-semibold text-white mb-2">{title}</h4>
              <p className="text-xs md:text-sm text-white/90 leading-relaxed">{description}</p>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const values = [
    {
      icon: <Zap className="w-6 h-6 md:w-8 md:h-8 text-primary-600" />,
      title: "Innovation",
      description: "Cutting-edge solutions that push boundaries"
    },
    {
      icon: <Heart className="w-6 h-6 md:w-8 md:h-8 text-primary-600" />,
      title: "Passion",
      description: "We love what we do and it shows in our work"
    },
    {
      icon: <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary-600" />,
      title: "Quality",
      description: "Uncompromising standards in every project"
    },
    {
      icon: <Star className="w-6 h-6 md:w-8 md:h-8 text-primary-600" />,
      title: "Excellence",
      description: "We strive for perfection in everything we do"
    },
    {
      icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-primary-600" />,
      title: "Collaboration",
      description: "Working together to achieve great results"
    },
    {
      icon: <Target className="w-6 h-6 md:w-8 md:h-8 text-primary-600" />,
      title: "Results",
      description: "Focused on delivering measurable outcomes"
    }
  ];

  return (
    <section ref={containerRef} className="py-section md:py-section-md lg:py-section-lg bg-white relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-0 left-1/4 w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-bounce-gentle"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-pink-100 to-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-container md:px-container-md lg:px-container-lg relative z-10">
        {/* Header Section */}
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
            className="text-title md:text-title-md lg:text-title-lg font-bold text-gray-900 mb-4 md:mb-6"
          >
            About Oaza Software
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-subtitle md:text-subtitle-md lg:text-subtitle-lg text-gray-600 max-w-3xl mx-auto px-4 md:px-0 leading-relaxed"
          >
            We are a passionate team of developers, designers, and digital marketers 
            dedicated to creating exceptional digital experiences that drive business growth.
          </motion.p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-4 md:px-0">
          {values.map((value, index) => (
            <ValueCard key={index} {...value} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 md:mt-20 lg:mt-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4"
              >
                <Award className="w-6 h-6 md:w-8 md:h-8 text-primary-600" />
              </motion.div>
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 md:mb-2">5+</div>
              <div className="text-sm md:text-base text-gray-600">Years Experience</div>
            </div>
            
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4"
              >
                <Users className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </motion.div>
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 md:mb-2">50+</div>
              <div className="text-sm md:text-base text-gray-600">Happy Clients</div>
            </div>
            
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4"
              >
                <Clock className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
              </motion.div>
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 md:mb-2">24/7</div>
              <div className="text-sm md:text-base text-gray-600">Support Available</div>
            </div>
            
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4"
              >
                <Target className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
              </motion.div>
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 md:mb-2">100%</div>
              <div className="text-sm md:text-base text-gray-600">Success Rate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
