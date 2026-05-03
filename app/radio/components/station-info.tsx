'use client'

import { motion, AnimatePresence } from 'motion/react'

interface StationInfoProps {
  isPlaying: boolean
  className?: string
}

const StationInfo: React.FC<StationInfoProps> = ({ isPlaying, className }) => {
  return (
    <div
      className={`flex flex-col items-center gap-2 bg-muted border-2 border-border shadow-brutal p-6 ${className ?? ''}`}
    >
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        Deep Space One
      </h2>

      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="live"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5"
            role="status"
            aria-live="polite"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 bg-accent" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
              LIVE
            </span>
          </motion.div>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-sm font-mono text-muted-foreground"
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
