'use client'

import React from 'react'
import { motion } from 'motion/react'

interface EqualizerProps {
  isPlaying: boolean
  className?: string
}

const Equalizer: React.FC<EqualizerProps> = ({ isPlaying, className }) => {
  return (
    <div className={`flex items-end gap-0.5 h-4 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1 bg-primary rounded-full"
          animate={
            isPlaying
              ? {
                  height: ['20%', '80%', '40%', '100%', '30%'],
                }
              : { height: '20%' }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }
              : { duration: 0.2 }
          }
          style={{ height: '20%' }}
        />
      ))}
    </div>
  )
}

export default Equalizer
