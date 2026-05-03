'use client'

import { motion, AnimatePresence } from 'motion/react'
import React from 'react'

interface WaveformVisualizerProps {
  isPlaying: boolean
  isLoading: boolean
  className?: string
}

const BAR_COUNT = 7

const playingKeyframes = [0.3, 1, 0.5, 0.9, 0.4, 0.8, 0.3]
const loadingKeyframes = [0.2, 0.5, 0.2]

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  isPlaying,
  isLoading,
  className,
}) => {
  const state = isPlaying ? 'playing' : isLoading ? 'loading' : 'idle'

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={state}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`flex items-end justify-center gap-1.5 h-32 sm:h-40 ${className ?? ''}`}
      >
        {Array.from({ length: BAR_COUNT }).map((_, index) => (
          <motion.div
            key={index}
            className={`w-1.5 bg-foreground origin-bottom ${isPlaying ? 'bg-accent' : 'bg-foreground'}`}
            style={{ height: '100%' }}
            animate={
              state === 'playing'
                ? {
                    scaleY: playingKeyframes,
                  }
                : state === 'loading'
                  ? {
                      scaleY: loadingKeyframes,
                    }
                  : {
                      scaleY: 0.15,
                    }
            }
            transition={
              state === 'playing'
                ? {
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                    delay: index * 0.08,
                  }
                : state === 'loading'
                  ? {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                      delay: index * 0.08,
                    }
                  : {
                      duration: 0.6,
                      ease: 'easeOut',
                    }
            }
          />
        ))}
      </motion.div>
    </AnimatePresence>
  )
}

export default WaveformVisualizer
