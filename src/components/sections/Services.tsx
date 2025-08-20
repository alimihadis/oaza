'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { Code, Smartphone, BarChart3, Palette, Globe, Zap } from 'lucide-react';
import { Service } from '@/lib/types';

const services: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Modern, responsive web applications built with cutting-edge technologies.',
    icon: 'Code',
    features: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'API Integration']
  },
  {
    id: '2',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    icon: 'Smartphone',
    features: ['React Native', 'Flutter', 'Native iOS/Android', 'App Store Optimization']
  },
  {
    id: '3',
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies to grow your business.',
    icon: 'BarChart3',
    features: ['SEO Optimization', 'Social Media Marketing', 'Content Strategy', 'Analytics']
  },
  {
    id: '4',
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive user interfaces that enhance user experience.',
    icon: 'Palette',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
  },
  {
    id: '5',
    title: 'E-commerce Solutions',
    description: 'Complete e-commerce platforms that drive sales and growth.',
    icon: 'Globe',
    features: ['Shopify Development', 'Custom Platforms', 'Payment Integration', 'Inventory Management']
  },
  {
    id: '6',
    title: 'Cloud & DevOps',
    description: 'Scalable cloud infrastructure and efficient development workflows.',
    icon: 'Zap',
    features: ['AWS/Azure Setup', 'CI/CD Pipelines', 'Monitoring', 'Security']
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

export default function Services() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive software development and digital marketing services 
            to help your business thrive in the digital landscape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-6">
                      {IconComponent && <IconComponent size={32} className="text-primary-600" />}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 flex-grow">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
