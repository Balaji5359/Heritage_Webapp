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
        className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-lg p-4 flex justify-between items-center z-50"
      >
        <motion.h1 
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          Heritage India
        </motion.h1>
        <nav className="flex space-x-6">
          {['Login', 'Sign Up', 'Explore States'].map((item, i) => (
            <motion.div key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to={item === 'Explore States' ? '/states' : `/${item.toLowerCase().replace(' ', '')}`}
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-indigo-900/70"></div>

        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white max-w-4xl px-6"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Explore India's
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Cultural Heritage
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl mb-8 text-gray-200"
          >
            Discover ancient temples and monuments through immersive 3D & AR experiences
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/states" 
                className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all"
              >
                Explore Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className="inline-flex items-center bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-full font-semibold border border-white/30 transition-all">
                <Play className="mr-2 w-5 h-5" /> Watch Demo
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Heritage Discovery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="/image/langing_page_image01.png" 
                alt="Heritage Discovery" 
                className="rounded-3xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-3xl"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-gray-800">Discover Ancient Wonders</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Explore over 5,000 years of Indian heritage through cutting-edge 3D technology. 
                From the majestic temples of Hampi to the intricate carvings of Khajuraho.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <h3 className="text-2xl font-bold text-blue-600">1000+</h3>
                  <p className="text-gray-600">Heritage Sites</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-2xl">
                  <h3 className="text-2xl font-bold text-indigo-600">50+</h3>
                  <p className="text-gray-600">3D Models</p>
                </div>
                <div className="bg-cyan-50 p-4 rounded-2xl">
                  <h3 className="text-2xl font-bold text-cyan-600">25</h3>
                  <p className="text-gray-600">States Covered</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-2xl">
                  <h3 className="text-2xl font-bold text-purple-600">AR Ready</h3>
                  <p className="text-gray-600">Experience</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Innovation Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 order-2 lg:order-1"
            >
              <h2 className="text-4xl font-bold text-gray-800">Next-Gen Heritage Experience</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Immerse yourself in history with our advanced AR/VR technology. 
                Walk through ancient temples, interact with historical artifacts, and learn from expert guides.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">3D</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Interactive 3D Models</h4>
                    <p className="text-gray-600">Rotate, zoom, and explore every detail</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">AR</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Augmented Reality</h4>
                    <p className="text-gray-600">Place monuments in your space</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">AI</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">AI-Powered Insights</h4>
                    <p className="text-gray-600">Learn with intelligent recommendations</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-1 lg:order-2"
            >
              <img 
                src="/image/langing_page_image02.png" 
                alt="Technology Innovation" 
                className="rounded-3xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent rounded-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured 3D Models */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured 3D Heritage Models</h2>
            <p className="text-gray-600 text-lg">Experience India's architectural marvels in stunning 3D detail</p>
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
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to 3D and AR World</h2>
            <p className="text-gray-600 text-lg">Experience heritage monuments in interactive 3D</p>
          </motion.div>
          
          <Hampi3DShowcase />
        </div>
      </section>
    </div>
  )
}