import { Metadata } from 'next';
import AnimatedSection from '@/components/common/AnimatedSection';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ExternalLink, Github, Filter, Code, Smartphone, BarChart3 } from 'lucide-react';
import { PortfolioItem } from '@/lib/types';
import PortfolioHero from '@/components/sections/PortfolioHero';

export const metadata: Metadata = {
  title: 'Our Portfolio - Oaza Software',
  description: 'Explore our portfolio of successful projects across web development, mobile apps, and digital marketing. See how we help businesses achieve their digital goals.',
};

const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A modern e-commerce platform built with Next.js and Stripe integration, featuring advanced product management and analytics.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    category: 'web',
    link: 'https://example.com'
  },
  {
    id: '2',
    title: 'Food Delivery App',
    description: 'Cross-platform mobile application for food delivery with real-time tracking and payment processing.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
    technologies: ['React Native', 'Firebase', 'Google Maps API', 'Stripe'],
    category: 'mobile',
    link: 'https://example.com'
  },
  {
    id: '3',
    title: 'SaaS Dashboard',
    description: 'Comprehensive business dashboard with real-time analytics, user management, and reporting features.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c072?w=800&h=600&fit=crop',
    technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'AWS'],
    category: 'web',
    link: 'https://example.com'
  },
  {
    id: '4',
    title: 'Fitness Tracking App',
    description: 'Mobile application for tracking workouts, nutrition, and health metrics with social features.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    technologies: ['Flutter', 'Firebase', 'HealthKit', 'Google Fit API'],
    category: 'mobile',
    link: 'https://example.com'
  },
  {
    id: '5',
    title: 'Digital Marketing Campaign',
    description: 'Comprehensive digital marketing strategy that increased client revenue by 300% in 6 months.',
    image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop',
    technologies: ['Google Ads', 'Facebook Ads', 'SEO', 'Content Marketing'],
    category: 'marketing',
    link: 'https://example.com'
  },
  {
    id: '6',
    title: 'Real Estate Platform',
    description: 'Property listing and management platform with advanced search filters and virtual tour capabilities.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS S3', 'Google Maps'],
    category: 'web',
    link: 'https://example.com'
  },
  {
    id: '7',
    title: 'Banking App',
    description: 'Secure mobile banking application with biometric authentication and real-time transaction monitoring.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    technologies: ['Swift', 'Kotlin', 'Spring Boot', 'PostgreSQL', 'Redis'],
    category: 'mobile',
    link: 'https://example.com'
  },
  {
    id: '8',
    title: 'E-learning Platform',
    description: 'Interactive learning management system with video streaming, quizzes, and progress tracking.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    technologies: ['Angular', 'Node.js', 'MongoDB', 'WebRTC', 'AWS'],
    category: 'web',
    link: 'https://example.com'
  }
];

const categories = [
  { id: 'all', label: 'All Projects', icon: Filter },
  { id: 'web', label: 'Web Development', icon: Code },
  { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
  { id: 'marketing', label: 'Digital Marketing', icon: BarChart3 }
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <PortfolioHero />

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Featured Projects
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="flex items-center space-x-2 px-6 py-3 rounded-full border border-gray-300 hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 text-gray-700 hover:text-primary-700"
                >
                  <category.icon size={20} />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <AnimatedSection key={item.id} delay={index * 0.1}>
                <Card hover className="h-full overflow-hidden">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
                        >
                          <ExternalLink size={16} className="text-gray-700" />
                        </a>
                      )}
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                        <Github size={16} className="text-gray-700" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        item.category === 'web' ? 'bg-blue-100 text-blue-800' :
                        item.category === 'mobile' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {item.category === 'web' ? 'Web Development' :
                         item.category === 'mobile' ? 'Mobile App' : 'Digital Marketing'}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 flex-grow">
                      {item.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      {item.link && (
                        <Button size="sm" className="flex-1">
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <AnimatedSection delay={0.1}>
              <div className="text-4xl font-bold text-primary-600 mb-2">200+</div>
              <div className="text-gray-600">Projects Completed</div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600">Happy Clients</div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3}>
              <div className="text-4xl font-bold text-primary-600 mb-2">95%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.4}>
              <div className="text-4xl font-bold text-primary-600 mb-2">5+</div>
              <div className="text-gray-600">Years Experience</div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Let's create something amazing together. Our team is ready to bring 
              your vision to life with the same quality and dedication shown in our portfolio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Start Your Project</Button>
              <Button variant="outline" size="lg">Schedule a Call</Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
