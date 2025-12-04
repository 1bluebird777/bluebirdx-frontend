'use client'

import { motion } from 'framer-motion'

interface Driver {
  id: string
  name: string
  rating: number
  vehicle: string
  price: number
  eta: string
  photo?: string
}

export default function DriverCards({ drivers }: { drivers: Driver[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {drivers.map((driver, index) => (
        <motion.div
          key={driver.id}
          initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: index * 0.2 }}
          className="bg-gradient-to-br from-deep-navy to-midnight-blue border-2 border-golden-glow/30 rounded-2xl p-6 hover:scale-105 transition-transform cursor-pointer"
        >
          <div className="flex flex-col items-center space-y-4">
            {/* Driver Photo */}
            <div className="w-20 h-20 bg-gradient-to-br from-electric-blue to-golden-glow rounded-full flex items-center justify-center text-4xl">
              {driver.photo || '👤'}
            </div>

            {/* Driver Info */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-golden-glow">{driver.name}</h3>
              <p className="text-sm text-soft-white/70">{driver.vehicle}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span>⭐</span>
              <span className="font-semibold">{driver.rating}</span>
            </div>

            {/* Price & ETA */}
            <div className="flex gap-4 text-sm">
              <span className="text-golden-glow font-bold">${driver.price}</span>
              <span className="text-soft-white/70">⏱️ {driver.eta}</span>
            </div>

            {/* Book Button */}
            <button className="w-full py-3 bg-golden-glow text-midnight-blue rounded-full font-bold hover:scale-105 transition-transform">
              Book {driver.name}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
