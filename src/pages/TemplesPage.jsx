import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, MapPin, Clock, Camera } from 'lucide-react'

const templesData = {
  'karnataka': [
    { 
      name: 'Hampi', 
      description: 'Ancient temple complex and UNESCO World Heritage Site with stunning Vijayanagara architecture',
      image: '/image/hampi_virupaksha.jpg',
      rating: 4.8,
      visitTime: '2-3 hours',
      highlights: ['UNESCO Site', 'Ancient Ruins', '3D Models Available']
    },
    { 
      name: 'Mysore Palace', 
      description: 'Magnificent royal palace showcasing Indo-Saracenic architecture',
      image: '/image/karanataka.webp',
      rating: 4.6,
      visitTime: '1-2 hours',
      highlights: ['Royal Heritage', 'Architecture', 'Light Show']
    },
  ],
  'andhra-pradesh': [
    { 
      name: 'Tirupati', 
      description: 'One of the most visited pilgrimage sites dedicated to Lord Venkateswara',
      image: '/image/andhra_pradesh.jpg',
      rating: 4.9,
      visitTime: '3-4 hours',
      highlights: ['Sacred Temple', 'Pilgrimage', 'Spiritual']
    },
    { 
      name: 'Lepakshi', 
      description: 'Famous for its hanging pillar and exquisite Vijayanagara paintings',
      image: '/image/andhra_pradesh.jpg',
      rating: 4.5,
      visitTime: '2 hours',
      highlights: ['Hanging Pillar', 'Ancient Art', 'Architecture']
    },
  ],
  'tamil-nadu': [
    { 
      name: 'Meenakshi Temple', 
      description: 'Stunning Dravidian architecture temple dedicated to Goddess Meenakshi',
      image: '/image/tamil_nadu.webp',
      rating: 4.7,
      visitTime: '2-3 hours',
      highlights: ['Dravidian Style', 'Colorful Towers', 'Ancient']
    },
    { 
      name: 'Brihadeeswara Temple', 
      description: 'UNESCO World Heritage Site showcasing Chola dynasty architecture',
      image: '/image/tamil_nadu.webp',
      rating: 4.8,
      visitTime: '2 hours',
      highlights: ['UNESCO Site', 'Chola Architecture', 'Ancient']
    },
  ],
  'kerala': [
    { 
      name: 'Padmanabhaswamy Temple', 
      description: 'Ancient temple known for its intricate architecture and spiritual significance',
      image: '/image/kerala.webp',
      rating: 4.6,
      visitTime: '1-2 hours',
      highlights: ['Ancient Temple', 'Gold Treasures', 'Spiritual']
    },
    { 
      name: 'Guruvayur Temple', 
      description: 'Sacred Krishna temple with traditional Kerala architecture',
      image: '/image/kerala.webp',
      rating: 4.7,
      visitTime: '1-2 hours',
      highlights: ['Krishna Temple', 'Traditional Style', 'Pilgrimage']
    },
  ],
}

export default function TemplesPage() {
  const { stateName } = useParams()
  const temples = templesData[stateName] || []
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (stateName === 'karnataka') {
      loadHampiModels()
    }
  }, [stateName])

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/90 backdrop-blur-md shadow-lg p-4 flex justify-between items-center"
      >
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
          Heritage India
        </Link>
        <nav className="flex space-x-6">
          <Link to="/states" className="flex items-center text-gray-700 hover:text-orange-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to States
          </Link>
        </nav>
      </motion.header>

      <div className="container mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-6 capitalize">
            {stateName.replace('-', ' ')} Temples
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the magnificent temples and heritage sites of {stateName.replace('-', ' ')}
          </p>
        </motion.div>

        {/* Temples Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {temples.map((temple, index) => (
            <motion.div
              key={temple.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Link to={`/temple/${temple.name.toLowerCase().replace(' ', '-')}`}>
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={temple.image} 
                      alt={temple.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{temple.rating}</span>
                    </div>

                    {/* Temple Name Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-2xl font-bold text-white group-hover:text-orange-300 transition-colors">
                        {temple.name}
                      </h2>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {temple.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{temple.visitTime}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm capitalize">{stateName.replace('-', ' ')}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {temple.highlights.map((highlight, i) => (
                        <span 
                          key={i}
                          className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 3D Models Section for Hampi */}
        {stateName === 'karnataka' && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to 3D and AR World</h2>
              <p className="text-gray-600 text-lg">Experience Hampi's heritage in stunning 3D detail</p>
              
              {!models.length && !loading && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={loadHampiModels}
                  className="mt-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all"
                >
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
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-lg overflow-hidden group"
                  >
                    <div className="relative h-64 bg-gradient-to-br from-orange-100 to-amber-100">
                      <model-viewer
                        src={model.url}
                        alt={model.name}
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
                          <span className="text-sm font-medium">3D & AR Ready</span>
                        </div>
                        {model.reviews && model.reviews.length > 0 && (
                          <span className="text-xs text-gray-500">
                            {model.reviews.length} reviews
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}