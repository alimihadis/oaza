import { Metadata } from 'next';
import Contact from '@/components/sections/Contact';
import ContactHero from '@/components/sections/ContactHero';

export const metadata: Metadata = {
  title: 'Contact Us - Oaza Software',
  description: 'Get in touch with Oaza Software. We\'re here to help with your software development and digital marketing needs. Contact us today for a free consultation.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-950 transition-colors duration-300">
      {/* Enhanced Hero Section */}
      <ContactHero />

      {/* Contact Section */}
      <Contact />
    </div>
  );
}
