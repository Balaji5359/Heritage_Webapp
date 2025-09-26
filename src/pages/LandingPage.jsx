import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Star, MapPin } from 'lucide-react'
import Hampi3DShowcase from '../components/Hampi3DShowcase.jsx'

export default function LandingPage() {
  const [featuredModels, setFeaturedModels] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    loadFeaturedModels()
  }, [])

  useEffect(() => {
    if (featuredModels.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % Math.min(featuredModels.length, 3))
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [featuredModels])

  const loadFeaturedModels = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://ok1ab3856l.execute-api.ap-south-1.amazonaws.com/dev/temple-ar1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
      const result = await response.json()
      const models = JSON.parse(result.body)
      setFeaturedModels(models.slice(0, 3))
    } catch (error) {
      console.error('Failed to load models:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-lg p-3 md:p-4 flex justify-between items-center z-50"
      >
        <motion.h1 
          whileHover={{ scale: 1.05 }}
          className="text-lg md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent"
        >
          Heritage India
        </motion.h1>
        <nav className="flex space-x-3 md:space-x-6">
          {['Login', 'Sign Up', 'Explore States'].map((item, i) => (
            <motion.div key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to={item === 'Explore States' ? '/states' : `/${item.toLowerCase().replace(' ', '')}`}
                className="text-gray-700 font-medium hover:text-orange-600 transition-colors text-xs md:text-base"
              >
                {item === 'Explore States' ? 'Explore' : item}
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/image/langing_page_image02.png" 
            alt="Heritage Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white max-w-4xl px-4 md:px-6"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight"
          >
            
            <span className="block bg-gradient-to-r from-orange-300 via-amber-300 to-yellow-300 bg-clip-text text-transparent drop-shadow-lg">
              
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl mb-6 md:mb-8 text-orange-100 font-medium"
          >
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/states" 
                className="inline-flex items-center bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold shadow-2xl transition-all text-sm md:text-base"
              >
              <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className="inline-flex items-center bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold border border-orange-300/50 hover:border-orange-300 transition-all text-sm md:text-base">
                <Play className="mr-2 w-4 md:w-5 h-4 md:h-5" /> 
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Welcome Section with Landing Image */}
      <section className="py-12 md:py-20 relative">
        <div className="absolute inset-0">
          <img 
            src="/image/langing_page_image02.png" 
            alt="Welcome Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/80"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent mb-3 md:mb-6">
              Welcome to Heritage India
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Embark on a journey through time and discover India's magnificent cultural treasures
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <img 
                src="/image/langing_page_image02.png" 
                alt="Heritage Discovery" 
                className="relative rounded-2xl md:rounded-3xl shadow-2xl w-full h-64 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 via-transparent to-transparent rounded-2xl md:rounded-3xl"></div>
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-4">
                  <h3 className="text-sm md:text-lg font-bold text-orange-800 mb-1">Ancient Wonders Await</h3>
                  <p className="text-xs md:text-sm text-gray-700">Experience 5000+ years of heritage</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 md:space-y-6"
            >
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800">Discover Ancient Wonders</h2>
              <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
                Explore over 5,000 years of Indian heritage through cutting-edge 3D technology. 
                From the majestic temples of Hampi to the intricate carvings of ancient monuments.
              </p>
              
              <div className="grid grid-cols-2 gap-3 md:gap-6">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="bg-gradient-to-br from-orange-100 to-orange-200 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg"
                >
                  <h3 className="text-lg md:text-2xl font-bold text-orange-600">1000+</h3>
                  <p className="text-gray-700 text-xs md:text-base">Heritage Sites</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  className="bg-gradient-to-br from-amber-100 to-amber-200 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg"
                >
                  <h3 className="text-lg md:text-2xl font-bold text-amber-600">50+</h3>
                  <p className="text-gray-700 text-xs md:text-base">3D Models</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg"
                >
                  <h3 className="text-lg md:text-2xl font-bold text-yellow-600">25</h3>
                  <p className="text-gray-700 text-xs md:text-base">States Covered</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  className="bg-gradient-to-br from-red-100 to-red-200 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg"
                >
                  <h3 className="text-lg md:text-2xl font-bold text-red-600">AR Ready</h3>
                  <p className="text-gray-700 text-xs md:text-base">Experience</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Innovation Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 md:space-y-6 order-2 lg:order-1"
            >
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800">Next-Gen Heritage Experience</h2>
              <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
                Immerse yourself in history with our advanced AR/VR technology. 
                Walk through ancient temples, interact with historical artifacts, and learn from expert guides.
              </p>
              
              <div className="space-y-3 md:space-y-4">
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-3 md:space-x-4 bg-white/70 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg"
                >
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm md:text-base">3D</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm md:text-base">Interactive 3D Models</h4>
                    <p className="text-gray-600 text-xs md:text-sm">Rotate, zoom, and explore every detail</p>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-3 md:space-x-4 bg-white/70 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg"
                >
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm md:text-base">AR</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm md:text-base">Augmented Reality</h4>
                    <p className="text-gray-600 text-xs md:text-sm">Place monuments in your space</p>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-3 md:space-x-4 bg-white/70 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg"
                >
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm md:text-base">AI</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm md:text-base">AI-Powered Insights</h4>
                    <p className="text-gray-600 text-xs md:text-sm">Learn with intelligent recommendations</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-1 lg:order-2 group"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <img 
                src="/image/langing_page_image01.png" 
                alt="Technology Innovation" 
                className="relative rounded-2xl md:rounded-3xl shadow-2xl w-full h-64 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/50 to-transparent rounded-2xl md:rounded-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured 3D Models */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4">Featured 3D Heritage Models</h2>
            <p className="text-gray-600 text-sm md:text-lg">Experience India's architectural marvels in stunning 3D detail</p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center">
              <div className="bg-gray-200 animate-pulse rounded-3xl w-96 h-96"></div>
            </div>
          ) : (
            <div className="relative max-w-7xl mx-auto overflow-hidden">
              <motion.div 
                className="flex gap-6"
                animate={{ x: `-${currentIndex * 420}px` }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                {featuredModels.slice(0, 3).map((model, index) => (
                  <motion.div
                    key={model.id}
                    className="flex-shrink-0 w-96 md:w-[400px] bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-3xl shadow-2xl overflow-hidden group"
                    whileHover={{ 
                      scale: 1.08, 
                      rotateY: 5,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                    }}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                  >
                    <div className="relative h-64 bg-gradient-to-br from-blue-200 to-indigo-200 overflow-hidden">
                      <motion.div 
                        className="absolute inset-0"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <model-viewer
                          src={model.url}
                          alt={model.name}
                          camera-controls
                          auto-rotate
                          loading="eager"
                          className="w-full h-full"
                        ></model-viewer>
                      </motion.div>
                      
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full px-3 py-1 flex items-center shadow-lg">
                        <Star className="w-4 h-4 mr-1" />
                        <span className="text-sm font-bold">{model.rating}</span>
                      </div>
                      
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      />
                    </div>
                    
                    <motion.div 
                      className="p-6 space-y-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.3 + 0.5 }}
                    >
                      <motion.h3 
                        className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {model.name}
                      </motion.h3>
                      
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="text-sm font-medium">{model.location}</span>
                      </div>
                      
                      <motion.p 
                        className="text-gray-600 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-800 transition-colors"
                        whileHover={{ scale: 1.02 }}
                      >
                        {model.description}
                      </motion.p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-blue-100">
                        <motion.div 
                          className="flex items-center text-blue-600 font-semibold"
                          whileHover={{ scale: 1.1 }}
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                          <span className="text-sm">AR Ready</span>
                        </motion.div>
                        
                        {model.reviews && model.reviews.length > 0 && (
                          <motion.div 
                            className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
                            whileHover={{ scale: 1.05, backgroundColor: "#3b82f6", color: "white" }}
                          >
                            {model.reviews.length} review{model.reviews.length !== 1 ? 's' : ''}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Navigation Dots */}
              <div className="flex justify-center mt-8 space-x-3">
                {Array.from({ length: Math.min(featuredModels.length, 3) }, (_, i) => i).map((dot) => (
                  <motion.button
                    key={dot}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentIndex === dot 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 scale-125' 
                        : 'bg-gray-300 hover:bg-blue-300'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentIndex(dot)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3D Models Showcase */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent mb-2 md:mb-4">Welcome to 3D and AR World</h2>
            <p className="text-gray-600 text-sm md:text-lg">Experience heritage monuments in interactive 3D</p>
          </motion.div>
          
          <Hampi3DShowcase />
        </div>
      </section>
    </div>
  )
}