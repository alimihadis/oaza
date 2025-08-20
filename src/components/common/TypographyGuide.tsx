'use client';

import { motion } from 'framer-motion';

export default function TypographyGuide() {
  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-exo2-800 text-gray-900 mb-6 tracking-wide">
            EXO 2 Typography
          </h1>
          <p className="text-xl font-exo2-400 text-gray-600 max-w-3xl mx-auto leading-relaxed tracking-wide">
            Complete typography system for Oaza Software website
          </p>
        </motion.div>

        {/* Font Weights Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column - Font Weights */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-exo2-700 text-gray-800 mb-6 tracking-wide">
                Font Weights
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-4xl font-exo2-800 text-gray-900 mb-2 tracking-wide">
                    EXO 2 Extra Bold (800)
                  </h3>
                  <p className="text-sm font-exo2-400 text-gray-500">
                    Hero titles, main headings, impact statements
                  </p>
                </div>
                
                <div>
                  <h3 className="text-3xl font-exo2-700 text-gray-800 mb-2 tracking-wide">
                    EXO 2 Bold (700)
                  </h3>
                  <p className="text-sm font-exo2-400 text-gray-500">
                    Section headings, important text, emphasis
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-exo2-600 text-gray-700 mb-2 tracking-wide">
                    EXO 2 Semi Bold (600)
                  </h3>
                  <p className="text-sm font-exo2-400 text-gray-500">
                    Buttons, labels, subheadings
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-exo2-500 text-gray-600 mb-2 tracking-wide">
                    EXO 2 Medium (500)
                  </h3>
                  <p className="text-sm font-exo2-400 text-gray-500">
                    Navigation items, highlighted text
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-exo2-400 text-gray-600 mb-2 tracking-wide">
                    EXO 2 Regular (400)
                  </h3>
                  <p className="text-sm font-exo2-400 text-gray-500">
                    Body text, descriptions, general content
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Gradient Examples */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-exo2-700 text-gray-800 mb-6 tracking-wide">
                Gradient Text Examples
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-4xl gradient-text-hero mb-2 tracking-wide">
                    Hero Gradient Text
                  </h3>
                  <p className="text-sm font-exo2-400 text-gray-500">
                    font-exo2-800 with enhanced gradient and glow
                  </p>
                </div>
                
                <div>
                  <h3 className="text-3xl gradient-text-bold mb-2 tracking-wide">
                    Bold Gradient Text
                  </h3>
                  <p className="text-sm font-exo2-400 text-gray-500">
                    font-exo2-700 with primary gradient
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl gradient-text-medium mb-2 tracking-wide">
                    Medium Gradient Text
                  </h3>
                  <p className="text-sm font-exo2-400 text-gray-500">
                    font-exo2-600 with balanced gradient
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl gradient-text mb-2 tracking-wide">
                    Standard Gradient Text
                  </h3>
                  <p className="text-sm font-exo2-400 text-gray-500">
                    font-exo2-700 with classic gradient
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Usage Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100"
        >
          <h2 className="text-3xl font-exo2-700 text-gray-800 mb-8 tracking-wide text-center">
            Usage Examples
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Hero Section */}
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
              <h3 className="text-2xl font-exo2-700 text-gray-800 mb-4 tracking-wide">
                Hero Section
              </h3>
              <h1 className="text-3xl font-exo2-800 gradient-text-hero mb-3 tracking-wide">
                Main Title
              </h1>
              <p className="text-base font-exo2-400 text-gray-600 tracking-wide">
                Supporting description text
              </p>
            </div>
            
            {/* Section Heading */}
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl">
              <h3 className="text-2xl font-exo2-700 text-gray-800 mb-4 tracking-wide">
                Section Heading
              </h3>
              <h2 className="text-2xl font-exo2-700 gradient-text-bold mb-3 tracking-wide">
                Section Title
              </h2>
              <p className="text-base font-exo2-400 text-gray-600 tracking-wide">
                Section description
              </p>
            </div>
            
            {/* Button */}
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
              <h3 className="text-2xl font-exo2-700 text-gray-800 mb-4 tracking-wide">
                Button Text
              </h3>
              <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-blue-600 text-white font-exo2-600 rounded-xl tracking-wide hover:from-primary-700 hover:to-blue-700 transition-all duration-300">
                Call to Action
              </button>
            </div>
          </div>
        </motion.div>

        {/* CSS Classes Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 bg-gray-900 rounded-3xl p-8 text-white"
        >
          <h2 className="text-3xl font-exo2-700 text-white mb-8 tracking-wide text-center">
            CSS Classes Reference
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-exo2-600 text-blue-300 mb-4 tracking-wide">
                Font Weight Classes
              </h3>
              <div className="space-y-2 font-mono text-sm">
                <div><code className="text-green-400">font-exo2-400</code> <span className="text-gray-300">- Regular weight</span></div>
                <div><code className="text-green-400">font-exo2-500</code> <span className="text-gray-300">- Medium weight</span></div>
                <div><code className="text-green-400">font-exo2-600</code> <span className="text-gray-300">- Semi Bold weight</span></div>
                <div><code className="text-green-400">font-exo2-700</code> <span className="text-gray-300">- Bold weight</span></div>
                <div><code className="text-green-400">font-exo2-800</code> <span className="text-gray-300">- Extra Bold weight</span></div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-exo2-600 text-blue-300 mb-4 tracking-wide">
                Gradient Text Classes
              </h3>
              <div className="space-y-2 font-mono text-sm">
                <div><code className="text-green-400">gradient-text-hero</code> <span className="text-gray-300">- Hero titles</span></div>
                <div><code className="text-green-400">gradient-text-bold</code> <span className="text-gray-300">- Bold headings</span></div>
                <div><code className="text-green-400">gradient-text-medium</code> <span className="text-gray-300">- Medium emphasis</span></div>
                <div><code className="text-green-400">gradient-text</code> <span className="text-gray-300">- Standard gradient</span></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
