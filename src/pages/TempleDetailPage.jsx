import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, MapPin, Clock, Camera, Play, Users, Calendar } from 'lucide-react'

const templeDetails = {
  'hampi': {
    name: 'Hampi',
    fullName: 'Hampi - UNESCO World Heritage Site',
    description: 'Hampi, the ancient capital of the Vijayanagara Empire, is a mesmerizing archaeological site in Karnataka. This UNESCO World Heritage Site spans over 4,100 hectares and contains more than 1,600 surviving remains of the last great Hindu kingdom in South India.',
    images: [
      '/image/hampi_virupaksha.jpg',
      '/image/hampi_elephant_stand.jpg',
      '/image/hampi_narashima.jpg',
      '/image/virsupaksha.jpg'
    ],
    rating: 4.8,
    visitTime: '2-3 days',
    bestTime: 'October to March',
    location: 'Hampi, Karnataka, India',
    highlights: [
      'UNESCO World Heritage Site',
      'Vijayanagara Empire Capital',
      'Ancient Temple Complex',
      '3D & AR Experience Available',
      'Archaeological Marvel',
      'Stone Chariot'
    ],
    history: 'Founded in the 14th century, Hampi served as the capital of the mighty Vijayanagara Empire for over 200 years. At its peak, it was one of the largest cities in the world, rivaling Rome in grandeur and prosperity.',
    architecture: 'The architecture of Hampi represents the pinnacle of Vijayanagara style, featuring intricate stone carvings, massive gopurams, and innovative engineering techniques that have withstood the test of time.',
    significance: 'Hampi is not just an archaeological site but a living testament to India\'s rich cultural heritage, showcasing the artistic, architectural, and cultural achievements of medieval South India.'
  }
}

export default function TempleDetailPage() {
  const { templeName } = useParams()
  const temple = templeDetails[templeName]
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (templeName === 'hampi') {
      loadHampiModels()
    }
  }, [templeName])

  const loadHampiModels = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://ok1ab3856l.execute-api.ap-south-1.amazonaws.com/dev/temple-ar1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
      const result = await response.json()
      const allModels = JSON.parse(result.body)
      const hampiModels = allModels.filter(m => m.location.toLowerCase().includes('hampi'))
      setModels(hampiModels)
    } catch (error) {
      console.error('Failed to load models:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!temple) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Temple Not Found</h1>
          <Link to="/states" className="text-orange-600 hover:text-orange-700">
            Back to States
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/90 backdrop-blur-md shadow-lg p-4 flex justify-between items-center sticky top-0 z-50"
      >
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
          Heritage India
        </Link>
        <nav className="flex space-x-6">
          <Link to="/states/karnataka" className="flex items-center text-gray-700 hover:text-orange-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Karnataka
          </Link>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        <motion.div 
          key={currentImageIndex}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${temple.images[currentImageIndex]}')` }}
        ></motion.div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              {temple.fullName}
            </h1>
            <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
              {temple.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="font-semibold">{temple.rating}</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="w-5 h-5 mr-2" />
                <span>{temple.visitTime}</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{temple.bestTime}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all inline-flex items-center"
            >
              <Play className="mr-2 w-5 h-5" />
              Virtual Tour
            </motion.button>
          </motion.div>
        </div>

        {/* Image Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {temple.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-6 py-20">
        {/* Highlights */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Highlights</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {temple.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-800">{highlight}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">History</h3>
            <p className="text-gray-600 leading-relaxed">{temple.history}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Architecture</h3>
            <p className="text-gray-600 leading-relaxed">{temple.architecture}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Significance</h3>
            <p className="text-gray-600 leading-relaxed">{temple.significance}</p>
          </motion.div>
        </div>

        {/* 3D Models Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to 3D and AR World</h2>
            <p className="text-gray-600 text-lg mb-8">Experience Hampi's monuments in stunning 3D detail</p>
            
            {!models.length && !loading && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadHampiModels}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all inline-flex items-center"
              >
                <Camera className="mr-2 w-5 h-5" />
                Load 3D Models
              </motion.button>
            )}
          </div>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-96"></div>
              ))}
            </div>
          )}

          {models.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {models.map((model, index) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-lg overflow-hidden group"
                >
                  <div className="relative h-64 bg-gradient-to-br from-orange-100 to-amber-100">
                    <model-viewer
                      src={model.url}
                      alt={model.name}
                      ar
                      ar-modes="webxr scene-viewer quick-look"
                      camera-controls
                      auto-rotate
                      loading="eager"
                      className="w-full h-full"
                    ></model-viewer>
                    
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{model.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                      {model.name}
                    </h3>
                    <div className="flex items-center text-gray-500 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{model.location}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {model.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-orange-600">
                        <Camera className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">AR Ready</span>
                      </div>
                      {model.reviews && model.reviews.length > 0 && (
                        <div className="flex items-center text-gray-500">
                          <Users className="w-4 h-4 mr-1" />
                          <span className="text-sm">{model.reviews.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </div>
  )
}