import { Metadata } from 'next';
import AnimatedSection from '@/components/common/AnimatedSection';
import Card from '@/components/ui/Card';
import { Users, Target, Award, Clock, Globe, Zap } from 'lucide-react';
import AboutHero from '@/components/sections/AboutHero';

export const metadata: Metadata = {
  title: 'About Us - Oaza Software',
  description: 'Learn more about Oaza Software, our team, mission, and values. Discover how we help businesses succeed through innovative technology solutions.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <AboutHero />

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To empower businesses with cutting-edge technology solutions that drive growth, 
                efficiency, and innovation. We believe that every business deserves access to 
                world-class digital tools and expertise.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our commitment goes beyond just delivering code – we become strategic partners 
                in our clients' digital transformation journey, ensuring long-term success 
                and sustainable growth.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To be the leading technology partner for businesses worldwide, known for 
                delivering exceptional value, innovative solutions, and unwavering commitment 
                to client success.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We envision a future where technology seamlessly enhances human potential 
                and creates opportunities for businesses of all sizes to thrive in the 
                digital economy.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we work with our clients.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <Card hover className="text-center h-full">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <Target size={32} className="text-primary-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in everything we do, from code quality to client 
                  communication, ensuring the highest standards in our deliverables.
                </p>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <Card hover className="text-center h-full">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users size={32} className="text-primary-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Collaboration</h3>
                <p className="text-gray-600">
                  We believe in the power of teamwork and collaboration, both within our 
                  team and with our clients, to achieve the best possible outcomes.
                </p>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <Card hover className="text-center h-full">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <Zap size={32} className="text-primary-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We constantly explore new technologies and approaches to deliver 
                  cutting-edge solutions that give our clients a competitive advantage.
                </p>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <Card hover className="text-center h-full">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <Award size={32} className="text-primary-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrity</h3>
                <p className="text-gray-600">
                  We conduct business with honesty, transparency, and ethical practices, 
                  building trust with our clients and partners.
                </p>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <Card hover className="text-center h-full">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <Globe size={32} className="text-primary-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Impact</h3>
                <p className="text-gray-600">
                  We're committed to creating solutions that not only benefit our clients 
                  but also contribute positively to the global technology ecosystem.
                </p>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <Card hover className="text-center h-full">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <Clock size={32} className="text-primary-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Reliability</h3>
                <p className="text-gray-600">
                  We deliver on our promises, meeting deadlines and exceeding expectations 
                  to ensure our clients can always count on us.
                </p>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team brings together expertise from various domains to deliver 
              comprehensive solutions for our clients.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <Card className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">JD</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">John Doe</h3>
                <p className="text-primary-600 mb-3">CEO & Founder</p>
                <p className="text-gray-600 text-sm">
                  Visionary leader with 15+ years in software development and business strategy.
                </p>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <Card className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">JS</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Jane Smith</h3>
                <p className="text-primary-600 mb-3">CTO</p>
                <p className="text-gray-600 text-sm">
                  Technology expert specializing in scalable architecture and emerging technologies.
                </p>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <Card className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">MJ</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Mike Johnson</h3>
                <p className="text-primary-600 mb-3">Head of Design</p>
                <p className="text-gray-600 text-sm">
                  Creative director with expertise in user experience and visual design.
                </p>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
