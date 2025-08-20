import { Metadata } from 'next';
import AnimatedSection from '@/components/common/AnimatedSection';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Check, Code, Smartphone, BarChart3, Palette, Globe, Zap, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services - Oaza Software',
  description: 'Explore our comprehensive range of software development and digital marketing services. From web development to digital marketing, we have the expertise to help your business grow.',
};

const services = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Modern, responsive web applications built with cutting-edge technologies.',
    icon: Code,
    features: [
      'Custom Web Applications',
      'E-commerce Platforms',
      'Progressive Web Apps (PWA)',
      'API Development & Integration',
      'Performance Optimization',
      'SEO-friendly Architecture',
      'Cross-browser Compatibility',
      'Responsive Design'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'MongoDB']
  },
  {
    id: 'mobile-development',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    icon: Smartphone,
    features: [
      'Native iOS Development',
      'Native Android Development',
      'Cross-platform Solutions',
      'App Store Optimization',
      'Push Notifications',
      'Offline Functionality',
      'Performance Optimization',
      'Security Implementation'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase']
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies to grow your business.',
    icon: BarChart3,
    features: [
      'Search Engine Optimization (SEO)',
      'Social Media Marketing',
      'Content Marketing Strategy',
      'Email Marketing Campaigns',
      'Google Ads Management',
      'Analytics & Reporting',
      'Conversion Rate Optimization',
      'Brand Development'
    ],
    technologies: ['Google Analytics', 'Google Ads', 'Facebook Ads', 'Mailchimp', 'HubSpot']
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive user interfaces that enhance user experience.',
    icon: Palette,
    features: [
      'User Research & Analysis',
      'Wireframing & Prototyping',
      'Visual Design & Branding',
      'User Experience Design',
      'Design Systems',
      'Accessibility Compliance',
      'Interactive Prototypes',
      'Design Handoff'
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'Sketch', 'InVision', 'Principle']
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Solutions',
    description: 'Complete e-commerce platforms that drive sales and growth.',
    icon: Globe,
    features: [
      'Custom E-commerce Development',
      'Shopify Development',
      'WooCommerce Solutions',
      'Payment Gateway Integration',
      'Inventory Management',
      'Order Processing Systems',
      'Customer Management',
      'Analytics & Reporting'
    ],
    technologies: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'Magento']
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    description: 'Scalable cloud infrastructure and efficient development workflows.',
    icon: Zap,
    features: [
      'Cloud Infrastructure Setup',
      'CI/CD Pipeline Development',
      'Monitoring & Logging',
      'Security Implementation',
      'Performance Optimization',
      'Backup & Recovery',
      'Auto-scaling Solutions',
      'Cost Optimization'
    ],
    technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins']
  }
];

const pricingPlans = [
  {
    name: 'Starter',
    price: '$2,999',
    description: 'Perfect for small businesses and startups',
    features: [
      'Basic Website Development',
      'Responsive Design',
      'SEO Optimization',
      '3 Months Support',
      'Basic Analytics'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: '$7,999',
    description: 'Ideal for growing businesses',
    features: [
      'Custom Web Application',
      'Advanced Features',
      'Database Integration',
      '6 Months Support',
      'Performance Optimization',
      'Security Implementation'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$19,999',
    description: 'For large-scale projects',
    features: [
      'Full-stack Development',
      'Custom Features',
      'Advanced Integrations',
      '12 Months Support',
      '24/7 Monitoring',
      'Scalability Planning',
      'Team Training'
    ],
    popular: false
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive software development and digital marketing solutions 
              tailored to your business needs.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to deployment, we handle every aspect of your digital project 
              with expertise and precision.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <AnimatedSection key={service.id} delay={index * 0.1}>
                <Card hover className="h-full">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
                      <service.icon size={32} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <Check size={16} className="text-primary-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pricing Plans
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent pricing for our development services. Choose the plan that 
              best fits your project requirements.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <AnimatedSection key={plan.name} delay={index * 0.1}>
                <Card 
                  hover 
                  className={`relative h-full ${plan.popular ? 'ring-2 ring-primary-500' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                        <Star size={16} className="mr-1" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <div className="text-4xl font-bold text-primary-600 mb-2">
                      {plan.price}
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <Check size={16} className="text-primary-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={plan.popular ? 'primary' : 'outline'} 
                    className="w-full"
                    size="lg"
                  >
                    Get Started
                  </Button>
                </Card>
              </AnimatedSection>
            ))}
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
              Let's discuss your requirements and create a custom solution that 
              perfectly fits your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Schedule a Consultation</Button>
              <Button variant="outline" size="lg">View Portfolio</Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
