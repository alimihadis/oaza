'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { Users, Award, Clock, Target } from 'lucide-react';

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Oaza Software
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We are a passionate team of developers, designers, and marketers dedicated to 
              creating exceptional digital experiences. Since our founding, we've helped 
              hundreds of businesses transform their ideas into powerful digital solutions.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our mission is to bridge the gap between technology and business growth, 
              delivering innovative solutions that not only look great but also drive 
              measurable results for our clients.
            </p>

            {/* Key Points */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                  <Target size={16} className="text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Results-Driven Approach</h4>
                  <p className="text-gray-600 text-sm">We focus on delivering measurable business outcomes</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                  <Users size={16} className="text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Expert Team</h4>
                  <p className="text-gray-600 text-sm">Skilled professionals with years of industry experience</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                  <Clock size={16} className="text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Timely Delivery</h4>
                  <p className="text-gray-600 text-sm">We respect deadlines and deliver projects on time</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats & Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">5+</div>
                <div className="text-gray-600">Years Experience</div>
              </Card>
              
              <Card className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
                <div className="text-gray-600">Team Members</div>
              </Card>
              
              <Card className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">200+</div>
                <div className="text-gray-600">Projects Delivered</div>
              </Card>
              
              <Card className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">98%</div>
                <div className="text-gray-600">Client Retention</div>
              </Card>
            </div>

            {/* Company Values */}
            <Card>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Values</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-600">Innovation at the core</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-600">Quality without compromise</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-600">Client success first</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-600">Continuous learning</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
