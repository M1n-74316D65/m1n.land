'use client'

import { motion, AnimatePresence } from 'motion/react'

interface StationInfoProps {
  isPlaying: boolean
  className?: string
}

const StationInfo: React.FC<StationInfoProps> = ({ isPlaying, className }) => {
  return (
    <div className={`flex flex-col items-center gap-2 ${className ?? ''}`}>
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
        Deep Space One
      </h2>

      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="live"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="flex items-center gap-1.5"
            role="status"
            aria-live="polite"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-500">
              LIVE
            </span>
          </motion.div>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="text-sm text-muted-foreground"
          >
            SomaFM
          </motion.span>
        )}
      </AnimatePresence>

      <p className="mt-1 max-w-xs text-center text-sm leading-relaxed text-muted-foreground">
        Deep ambient electronic, experimental and space music.
      </p>
    </div>
  )
}

export default StationInfo
