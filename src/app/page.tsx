import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Portfolio from '@/components/sections/Portfolio';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Contact />

      {/* Test section to ensure footer is visible */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Test Section</h2>
          <p className="text-lg text-gray-600">This section ensures the footer is visible below.</p>
        </div>
      </div>
    </>
  );
}
