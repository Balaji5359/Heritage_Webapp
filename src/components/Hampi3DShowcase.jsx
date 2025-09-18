import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Camera, Loader, AlertCircle } from 'lucide-react'

export default function Hampi3DShowcase() {
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadHampiModels = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://ok1ab3856l.execute-api.ap-south-1.amazonaws.com/dev/temple-ar1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const result = await response.json()
      const allModels = JSON.parse(result.body)
      const hampiModels = allModels.filter(m => m.location.toLowerCase().includes('hampi'))
      setModels(hampiModels)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Hampi 3D Heritage Models</h3>
        <p className="text-gray-600 mb-6">Explore ancient Hampi monuments in interactive 3D</p>
        
        {!models.length && !loading && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadHampiModels}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all flex items-center mx-auto"
          >
            <Camera className="mr-2 w-5 h-5" />
            Load 3D Models from API
          </motion.button>
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader className="w-8 h-8 text-orange-500 animate-spin mb-4" />
          <p className="text-gray-600">Loading 3D models...</p>
        </div>
      )}

      {error && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center mb-3">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <h3 className="text-red-800 font-semibold">Failed to load Hampi models</h3>
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadHampiModels} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-medium transition-colors"
          >
            Retry Loading
          </motion.button>
        </motion.div>
      )}

      {models.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {models.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 30 }}
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
                  shadow-intensity="1"
                  loading="eager"
                  reveal="auto"
                  environment-image="neutral"
                  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%23666' font-size='12'%3ELoading 3D...%3C/text%3E%3C/svg%3E"
                  className="w-full h-full rounded-t-2xl"
                >
                  <div slot="progress-bar" className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Loader className="w-6 h-6 text-orange-500 animate-spin mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Loading 3D model...</p>
                    </div>
                  </div>
                  <div slot="error" className="flex items-center justify-center h-full">
                    <div className="text-center text-red-500">
                      <AlertCircle className="w-6 h-6 mx-auto mb-2" />
                      <p className="text-sm">Failed to load 3D model</p>
                    </div>
                  </div>
                </model-viewer>
                

              </div>
              

            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}