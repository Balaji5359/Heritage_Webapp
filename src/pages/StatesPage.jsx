import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Users } from 'lucide-react'

const states = [
  { 
    name: 'Karnataka', 
    image: 'src/pages/image/karanataka.webp',
    temples: 12,
    description: 'Home to the magnificent Hampi ruins and Vijayanagara Empire heritage'
  },
  { 
    name: 'Andhra Pradesh', 
    image: 'src/pages/image/andhra_pradesh.jpg',
    temples: 8,
    description: 'Sacred land of Tirupati and ancient Buddhist heritage sites'
  },
  { 
    name: 'Tamil Nadu', 
    image: 'src/pages/image/tamil_nadu.webp',
    temples: 15,
    description: 'Dravidian architecture masterpieces and UNESCO World Heritage temples'
  },
  { 
    name: 'Kerala', 
    image: 'src/pages/image/kerala.webp',
    temples: 6,
    description: 'Traditional Kerala temple architecture and spiritual heritage'
  },
]

export default function StatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/90 backdrop-blur-md shadow-lg p-3 md:p-4 flex justify-between items-center"
      >
        <Link to="/" className="text-lg md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
          Heritage India
        </Link>
        <nav className="flex space-x-3 md:space-x-6">
          <Link to="/" className="text-gray-700 hover:text-orange-600 transition-colors text-sm md:text-base">Home</Link>
          <Link to="/login" className="text-gray-700 hover:text-orange-600 transition-colors text-sm md:text-base">Login</Link>
        </nav>
      </motion.header>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-16"
        >
          <h1 className="text-2xl md:text-5xl font-bold text-gray-800 mb-3 md:mb-6">Explore Indian States</h1>
          <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the rich cultural heritage and magnificent temples across different states of India
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
          {states.map((state, index) => (
            <motion.div
              key={state.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Link to={`/states/${state.name.toLowerCase().replace(' ', '-')}`}>
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-48 md:h-80 overflow-hidden">
                    <img 
                      src={state.image} 
                      alt={state.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Floating Stats */}
                    <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 md:px-4 py-1 md:py-2 flex items-center">
                      <Users className="w-3 md:w-4 h-3 md:h-4 text-orange-600 mr-1 md:mr-2" />
                      <span className="text-xs md:text-sm font-medium">{state.temples} Temples</span>
                    </div>

                    {/* State Name Overlay */}
                    <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 right-3 md:right-6">
                      <h2 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 group-hover:text-orange-300 transition-colors">
                        {state.name}
                      </h2>
                      <div className="flex items-center text-white/80 mb-1 md:mb-3">
                        <MapPin className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
                        <span className="text-xs md:text-sm">India</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 md:p-8">
                    <p className="text-gray-600 text-sm md:text-lg mb-4 md:mb-6 leading-relaxed">
                      {state.description}
                    </p>
                    
                    <motion.div 
                      whileHover={{ x: 10 }}
                      className="flex items-center text-orange-600 font-semibold group-hover:text-orange-700 transition-colors text-sm md:text-base"
                    >
                      <span>Explore Temples</span>
                      <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 md:mt-20"
        >
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-4">Ready to Explore?</h3>
            <p className="text-gray-600 text-sm md:text-lg mb-6 md:mb-8">
              Start your journey through India's magnificent heritage sites and temples
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/login"
                className="inline-flex items-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold shadow-lg transition-all text-sm md:text-base"
              >
                Get Started <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}