import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, MapPin, Clock, Camera, Play, Eye } from 'lucide-react'

// Import Hampi images
import AchyutaDevaRaya from './HampiImages/Achyuta_Deva_Raya.jpg'
import HampiElephantStable from './HampiImages/Hampi_Elephant_Stable.jpg'
import HampiHazaraRamaTemple from './HampiImages/Hampi_Hazara_Rama_Temple.jpg'
import HampiNarashimaSwami from './HampiImages/Hampi_Narashima_Swami_Temple.jpg'
import HampiShivaTemple from './HampiImages/Hampi_Shiva_Temple.jpg'
import HampiStoneChariot from './HampiImages/Hampi_Stone_Chariot.jpg'
import HampiVirupakshaHills from './HampiImages/Hampi_Virupaksha_Hills.jpg'
import SriKrishnadevaraya from './HampiImages/Sri_Krishnadevaraya.jpg'
import VirupakshaTempleTower from './HampiImages/Virupaksha_Temple_Tower.jpg'

const templesData = {
  'karnataka': [
    { 
      name: 'Hampi', 
      description: 'Ancient temple complex and UNESCO World Heritage Site with stunning Vijayanagara architecture',
      image: VirupakshaTempleTower,
      rating: 4.4,
      visitTime: '2-3 hours',
      highlights: ['UNESCO Site', 'Ancient Ruins', '3D Models Available']
    },
    { 
      name: 'Mysore Palace', 
      description: 'Magnificent royal palace showcasing Indo-Saracenic architecture',
      image: '/pages/karanataka.webp',
      rating: 4.6,
      visitTime: '1-2 hours',
      highlights: ['Royal Heritage', 'Architecture', 'Light Show']
    },
  ],
  'andhra-pradesh': [
    { 
      name: 'Tirupati', 
      description: 'One of the most visited pilgrimage sites dedicated to Lord Venkateswara',
      image: '/pages/andhra_pradesh.jpg',
      rating: 4.9,
      visitTime: '3-4 hours',
      highlights: ['Sacred Temple', 'Pilgrimage', 'Spiritual']
    },
    { 
      name: 'Lepakshi', 
      description: 'Famous for its hanging pillar and exquisite Vijayanagara paintings',
      image: '/pages/andhra_pradesh.jpg',
      rating: 4.5,
      visitTime: '2 hours',
      highlights: ['Hanging Pillar', 'Ancient Art', 'Architecture']
    },
  ],
  'tamil-nadu': [
    { 
      name: 'Meenakshi Temple', 
      description: 'Stunning Dravidian architecture temple dedicated to Goddess Meenakshi',
      image: '/pages/tamil_nadu.webp',
      rating: 4.7,
      visitTime: '2-3 hours',
      highlights: ['Dravidian Style', 'Colorful Towers', 'Ancient']
    },
    { 
      name: 'Brihadeeswara Temple', 
      description: 'UNESCO World Heritage Site showcasing Chola dynasty architecture',
      image: '/pages/tamil_nadu.webp',
      rating: 4.8,
      visitTime: '2 hours',
      highlights: ['UNESCO Site', 'Chola Architecture', 'Ancient']
    },
  ],
  'kerala': [
    { 
      name: 'Padmanabhaswamy Temple', 
      description: 'Ancient temple known for its intricate architecture and spiritual significance',
      image: '/pages/kerala.webp',
      rating: 4.6,
      visitTime: '1-2 hours',
      highlights: ['Ancient Temple', 'Gold Treasures', 'Spiritual']
    },
    { 
      name: 'Guruvayur Temple', 
      description: 'Sacred Krishna temple with traditional Kerala architecture',
      image: '/pages/kerala.webp',
      rating: 4.7,
      visitTime: '1-2 hours',
      highlights: ['Krishna Temple', 'Traditional Style', 'Pilgrimage']
    },
  ],
}

// Hampi heritage sites with images
const hampiSites = [
  { name: 'Achyuta Deva Raya Temple', image: AchyutaDevaRaya, description: 'Ancient temple complex dedicated to Lord Tiruvengalanatha' },
  { name: 'Hampi Elephant Stable', image: HampiElephantStable, description: 'Indo-Islamic architecture housing royal elephants' },
  { name: 'Hazara Rama Temple', image: HampiHazaraRamaTemple, description: 'Private temple of the royal family with intricate carvings' },
  { name: 'Narasimha Swami Temple', image: HampiNarashimaSwami, description: 'Monolithic statue of Lord Narasimha carved from single boulder' },
  { name: 'Hampi Shiva Temple', image: HampiShivaTemple, description: 'Sacred temple dedicated to Lord Shiva with ancient architecture' },
  { name: 'Stone Chariot', image: HampiStoneChariot, description: 'Iconic stone chariot representing the pinnacle of Vijayanagara art' },
  { name: 'Virupaksha Hills', image: HampiVirupakshaHills, description: 'Sacred hills surrounding the ancient Virupaksha temple complex' },
  { name: 'Sri Krishnadevaraya Statue', image: SriKrishnadevaraya, description: 'Memorial statue of the great Vijayanagara emperor' },
  { name: 'Virupaksha Temple Tower', image: VirupakshaTempleTower, description: 'Towering gopuram of the main Virupaksha temple complex' }
]

export default function TemplesPage() {
  const { stateName } = useParams()
  const temples = templesData[stateName] || []
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState(null)
  const [showARViewer, setShowARViewer] = useState(false)

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
        className="bg-white/90 backdrop-blur-md shadow-lg p-3 md:p-4 flex justify-between items-center"
      >
        <Link to="/" className="text-lg md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
          Heritage India
        </Link>
        <nav className="flex space-x-3 md:space-x-6">
          <Link to="/states" className="flex items-center text-gray-700 hover:text-orange-600 transition-colors text-sm md:text-base">
            <ArrowLeft className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" /> 
            <span className="hidden sm:inline">Back to States</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </nav>
      </motion.header>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-16"
        >
          <h1 className="text-2xl md:text-5xl font-bold text-gray-800 mb-3 md:mb-6 capitalize">
            {stateName.replace('-', ' ')} Temples
          </h1>
          <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the magnificent temples and heritage sites of {stateName.replace('-', ' ')}
          </p>
        </motion.div>

        {/* Temples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-20">
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
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-48 md:h-64 overflow-hidden">
                    <img 
                      src={temple.image} 
                      alt={temple.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 md:px-3 py-1 md:py-2 flex items-center">
                      <Star className="w-3 md:w-4 h-3 md:h-4 text-yellow-500 mr-1" />
                      <span className="text-xs md:text-sm font-medium">{temple.rating}</span>
                    </div>

                    {/* Temple Name Overlay */}
                    <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
                      <h2 className="text-lg md:text-2xl font-bold text-white group-hover:text-orange-300 transition-colors">
                        {temple.name}
                      </h2>
                    </div>
                  </div>
                  
                  <div className="p-4 md:p-6">
                    <p className="text-gray-600 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                      {temple.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 md:mb-4 gap-2">
                      <div className="flex items-center text-gray-500">
                        <Clock className="w-3 md:w-4 h-3 md:h-4 mr-2" />
                        <span className="text-xs md:text-sm">{temple.visitTime}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <MapPin className="w-3 md:w-4 h-3 md:h-4 mr-2" />
                        <span className="text-xs md:text-sm capitalize">{stateName.replace('-', ' ')}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {temple.highlights.map((highlight, i) => (
                        <span 
                          key={i}
                          className="bg-orange-100 text-orange-700 px-2 md:px-3 py-1 rounded-full text-xs font-medium"
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

        {/* Hampi Heritage Gallery - Only for Karnataka */}
        {stateName === 'karnataka' && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-8 mb-12 md:mb-20"
          >
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4">Hampi Heritage Gallery</h2>
              <p className="text-gray-600 text-sm md:text-lg">Explore the magnificent monuments of Hampi with interactive 3D models</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {hampiSites.map((site, index) => (
                <motion.div
                  key={site.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden group"
                >
                  <div className="relative h-40 md:h-48 overflow-hidden">
                    <img 
                      src={site.image} 
                      alt={site.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* 3D/AR Button */}
                    <div className="absolute top-2 md:top-3 right-2 md:right-3 flex gap-1 md:gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          loadHampiModels()
                          setShowARViewer(true)
                        }}
                        className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-1.5 md:p-2 rounded-full shadow-lg hover:shadow-xl transition-all"
                      >
                        <Eye className="w-3 md:w-4 h-3 md:h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          loadHampiModels()
                        }}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-1.5 md:p-2 rounded-full shadow-lg hover:shadow-xl transition-all"
                      >
                        <Play className="w-3 md:w-4 h-3 md:h-4" />
                      </motion.button>
                    </div>

                    {/* Site Name Overlay */}
                    <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 right-2 md:right-3">
                      <h3 className="text-sm md:text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
                        {site.name}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-3 md:p-4">
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                      {site.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2 md:mt-3">
                      <div className="flex items-center text-orange-600">
                        <Camera className="w-3 md:w-4 h-3 md:h-4 mr-1" />
                        <span className="text-xs font-medium">3D & AR</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        Heritage Site
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 3D Models Section for Hampi */}
        {stateName === 'karnataka' && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-8 mb-12 md:mb-20"
          >
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4">Welcome to 3D and AR World</h2>
              <p className="text-gray-600 text-sm md:text-lg">Experience Hampi's heritage in stunning 3D detail</p>
              
              {!models.length && !loading && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={loadHampiModels}
                  className="mt-4 md:mt-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold shadow-lg transition-all text-sm md:text-base"
                >
                  Load 3D Models
                </motion.button>
              )}
            </div>

            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-200 animate-pulse rounded-xl md:rounded-2xl h-64 md:h-96"></div>
                ))}
              </div>
            )}

            {models.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {models.map((model, index) => (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl md:rounded-2xl shadow-lg overflow-hidden group"
                  >
                    <div className="relative h-48 md:h-64 bg-gradient-to-br from-orange-100 to-amber-100">
                      <model-viewer
                        src={model.url}
                        alt={model.name}
                        camera-controls
                        auto-rotate
                        loading="eager"
                        className="w-full h-full"
                        ar
                        ar-modes="webxr scene-viewer quick-look"
                      ></model-viewer>
                      
                      <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 md:px-3 py-1 flex items-center">
                        <Star className="w-3 md:w-4 h-3 md:h-4 text-yellow-500 mr-1" />
                        <span className="text-xs md:text-sm font-medium">{model.rating}</span>
                      </div>
                    </div>
                    
                    <div className="p-3 md:p-6">
                      <h3 className="font-bold text-sm md:text-lg text-gray-800 mb-1 md:mb-2 group-hover:text-orange-600 transition-colors">
                        {model.name}
                      </h3>
                      <div className="flex items-center text-gray-500 mb-2 md:mb-3">
                        <MapPin className="w-3 md:w-4 h-3 md:h-4 mr-1" />
                        <span className="text-xs md:text-sm">{model.location}</span>
                      </div>
                      <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-3">
                        {model.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-orange-600">
                          <Camera className="w-3 md:w-4 h-3 md:h-4 mr-1" />
                          <span className="text-xs md:text-sm font-medium">3D & AR Ready</span>
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