import { Metadata } from 'next';
import Contact from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'Contact Us - Oaza Software',
  description: 'Get in touch with Oaza Software. We\'re here to help with your software development and digital marketing needs. Contact us today for a free consultation.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your next project? Let's discuss how we can help 
            bring your vision to life and drive your business forward.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />
    </div>
  );
}
