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
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      className="perspective-1000"
    >
      <Card className="h-full transform-gpu transition-all duration-300 hover:shadow-2xl hover:shadow-primary-200/50">
        <motion.div
          animate={{ 
            rotateY: isFlipped ? 180 : 0,
            scale: isFlipped ? 1.1 : 1
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          {/* Front of card */}
          <div className={`text-center p-6 ${isFlipped ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
            <motion.div
              animate={{ 
                rotate: isFlipped ? 360 : 0,
                scale: isFlipped ? 1.2 : 1
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              {icon}
            </motion.div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
          
          {/* Back of card */}
          <div className={`absolute inset-0 text-center p-6 ${isFlipped ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Excellence</h4>
            <p className="text-white/90 text-sm">We strive for perfection in everything we do</p>
          </div>
        </motion.div>
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
      icon: <Zap className="w-8 h-8 text-primary-600" />,
      title: "Innovation",
      description: "Cutting-edge solutions that push boundaries"
    },
    {
      icon: <Heart className="w-8 h-8 text-primary-600" />,
      title: "Passion",
      description: "We love what we do and it shows in our work"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-600" />,
      title: "Quality",
      description: "Uncompromising standards in every project"
    },
    {
      icon: <Star className="w-8 h-8 text-primary-600" />,
      title: "Excellence",
      description: "Striving for perfection in everything we do"
    }
  ];

  return (
    <section ref={containerRef} className="py-20 bg-white relative overflow-hidden">
      {/* Animated background mesh gradient */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            >
              About Oaza Software
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-gray-600 mb-6 leading-relaxed"
            >
              We are a passionate team of developers, designers, and marketers dedicated to 
              creating exceptional digital experiences. Since our founding, we've helped 
              hundreds of businesses transform their ideas into powerful digital solutions.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-600 mb-8 leading-relaxed"
            >
              Our mission is to bridge the gap between technology and business growth, 
              delivering innovative solutions that not only look great but also drive 
              measurable results for our clients.
            </motion.p>

            {/* Key Points with staggered animation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-4"
            >
              {[
                { icon: Target, text: "Results-Driven Approach", desc: "We focus on delivering measurable business outcomes" },
                { icon: Users, text: "Expert Team", desc: "Skilled professionals with years of industry experience" },
                { icon: Clock, text: "Timely Delivery", desc: "We respect deadlines and deliver projects on time" }
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <motion.div 
                    className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon size={16} className="text-primary-600" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.text}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats & Values */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Stats Grid with staggered reveal */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "5+", label: "Years Experience" },
                { number: "50+", label: "Team Members" },
                { number: "200+", label: "Projects Delivered" },
                { number: "98%", label: "Client Retention" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="transform-gpu transition-all duration-300"
                >
                  <Card className="text-center hover:shadow-lg hover:shadow-primary-200/50 transition-all duration-300">
                    <motion.div 
                      className="text-3xl font-bold text-primary-600 mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-gray-600">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Company Values with 3D flip cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Values</h3>
              <div className="grid grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <ValueCard
                    key={value.title}
                    icon={value.icon}
                    title={value.title}
                    description={value.description}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
