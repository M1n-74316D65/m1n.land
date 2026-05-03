'use client'

import { motion, AnimatePresence } from 'motion/react'
import { Play, Pause, LoaderCircle } from 'lucide-react'
import { cn } from 'app/lib/utils'

interface PlayButtonProps {
  isPlaying: boolean
  isLoading: boolean
  disabled?: boolean
  onToggle: () => void
  className?: string
}

const PlayButton: React.FC<PlayButtonProps> = ({
  isPlaying,
  isLoading,
  disabled = false,
  onToggle,
  className,
}) => {
  const ariaLabel = isLoading ? 'Loading' : isPlaying ? 'Pause' : 'Play'

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={isPlaying}
      className={cn(
        'relative flex h-24 w-24 items-center justify-center outline-none transition-colors duration-100',
        isPlaying
          ? 'bg-accent/10 border-2 border-accent shadow-brutal-accent'
          : 'bg-card border-2 border-border shadow-brutal',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
      }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" />
          </motion.span>
        ) : isPlaying ? (
          <motion.span
            key="pause"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <Pause className="h-8 w-8 text-accent" />
          </motion.span>
        ) : (
          <motion.span
            key="play"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <Play className="ml-1 h-8 w-8 fill-current" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default PlayButton
