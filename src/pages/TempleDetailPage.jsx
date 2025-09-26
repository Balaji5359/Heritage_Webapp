import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, MapPin, Clock, Camera, Play, Users, Calendar, Eye } from 'lucide-react'

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

// Hampi heritage sites with detailed information
const hampiSites = [
  { 
    name: 'Achyuta Deva Raya Temple', 
    image: AchyutaDevaRaya, 
    description: 'Ancient temple complex dedicated to Lord Tiruvengalanatha, showcasing exquisite Vijayanagara architecture with intricate stone carvings and pillared halls.',
    history: 'Built during the reign of Achyuta Deva Raya (1529-1542 CE), this temple complex represents the architectural zenith of the Vijayanagara Empire.'
  },
  { 
    name: 'Hampi Elephant Stable', 
    image: HampiElephantStable, 
    description: 'Indo-Islamic architecture housing royal elephants, featuring a series of domed chambers that once sheltered the ceremonial elephants of the Vijayanagara court.',
    history: 'This unique structure blends Hindu and Islamic architectural elements, reflecting the cosmopolitan nature of the Vijayanagara Empire.'
  },
  { 
    name: 'Hazara Rama Temple', 
    image: HampiHazaraRamaTemple, 
    description: 'Private temple of the royal family with intricate carvings depicting scenes from the Ramayana, serving as the personal shrine of the Vijayanagara kings.',
    history: 'Built in the 15th century, this temple was exclusively used by the royal family for their daily prayers and religious ceremonies.'
  },
  { 
    name: 'Narasimha Swami Temple', 
    image: HampiNarashimaSwami, 
    description: 'Monolithic statue of Lord Narasimha carved from single boulder, standing 6.7 meters tall and representing the fierce avatar of Lord Vishnu.',
    history: 'This magnificent sculpture was carved in 1528 CE and originally had Goddess Lakshmi seated on the lap of Lord Narasimha.'
  },
  { 
    name: 'Hampi Shiva Temple', 
    image: HampiShivaTemple, 
    description: 'Sacred temple dedicated to Lord Shiva with ancient architecture, featuring traditional Dravidian style gopurams and intricate stone work.',
    history: 'One of the oldest temples in Hampi, this shrine has been a center of Shaivite worship for centuries.'
  },
  { 
    name: 'Stone Chariot', 
    image: HampiStoneChariot, 
    description: 'Iconic stone chariot representing the pinnacle of Vijayanagara art, carved entirely from granite and serving as the shrine of Garuda.',
    history: 'Built in the 16th century, this chariot is one of the most photographed monuments in India and a symbol of Hampi.'
  },
  { 
    name: 'Virupaksha Hills', 
    image: HampiVirupakshaHills, 
    description: 'Sacred hills surrounding the ancient Virupaksha temple complex, offering panoramic views of the entire Hampi landscape.',
    history: 'These hills have been considered sacred for over 1,000 years and offer the best vantage point to view the ancient city.'
  },
  { 
    name: 'Sri Krishnadevaraya Statue', 
    image: SriKrishnadevaraya, 
    description: 'Memorial statue of the great Vijayanagara emperor, commemorating the ruler who brought the empire to its golden age.',
    history: 'Krishnadevaraya (1509-1529 CE) was the most powerful ruler of the Vijayanagara Empire and a great patron of arts and literature.'
  },
  { 
    name: 'Virupaksha Temple Tower', 
    image: VirupakshaTempleTower, 
    description: 'Towering gopuram of the main Virupaksha temple complex, standing 50 meters tall and serving as a landmark visible from miles away.',
    history: 'This temple has been continuously active for over 1,300 years, making it one of the oldest functioning temples in India.'
  }
]

const templeDetails = {
  'hampi': {
    name: 'Hampi',
    fullName: 'Hampi - UNESCO World Heritage Site',
    description: 'Hampi, the ancient capital of the Vijayanagara Empire, is a mesmerizing archaeological site in Karnataka. This UNESCO World Heritage Site spans over 4,100 hectares and contains more than 1,600 surviving remains of the last great Hindu kingdom in South India.',
    images: hampiSites.slice(0, 4).map(site => site.image),
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
  const [selectedSite, setSelectedSite] = useState(null)
  const [showModel, setShowModel] = useState(false)

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src={HampiVirupakshaHills} 
          alt="Hampi Background" 
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      <div className="relative z-10">
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

        {/* Hampi Heritage Gallery */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Hampi Heritage Gallery</h2>
            <p className="text-gray-600 text-lg">Explore the magnificent monuments with interactive 3D models</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hampiSites.map((site, index) => (
              <motion.div
                key={site.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={site.image} 
                    alt={site.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* 3D Model Button */}
                  <div className="absolute top-3 right-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setSelectedSite(site)
                        loadHampiModels()
                        setShowModel(true)
                      }}
                      className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Site Name Overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
                      {site.name}
                    </h3>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {site.description}
                  </p>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {site.history}
                  </p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center text-orange-600">
                      <Camera className="w-4 h-4 mr-1" />
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
        </motion.section>

        {/* 3D Models Section */}
        {showModel && (
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-20"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">3D Models for {selectedSite?.name}</h2>
              <p className="text-gray-600">Experience this monument in stunning 3D detail</p>
            </div>

            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-80"></div>
                ))}
              </div>
            )}

            {models.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        )}
      </div>
      </div>
    </div>
  )
}