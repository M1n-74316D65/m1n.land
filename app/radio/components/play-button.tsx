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
        'relative flex h-24 w-24 items-center justify-center rounded-full outline-none transition-colors',
        isPlaying
          ? 'bg-primary/10 backdrop-blur-xl border-2 border-primary/40'
          : 'bg-background border-2 border-border/60 shadow-lg shadow-black/10',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
      animate={
        isPlaying
          ? {
              boxShadow: '0 0 60px rgba(99, 102, 241, 0.3)',
            }
          : {
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }
      }
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            <LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" />
          </motion.span>
        ) : isPlaying ? (
          <motion.span
            key="pause"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            <Pause className="h-8 w-8" />
          </motion.span>
        ) : (
          <motion.span
            key="play"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            <Play className="ml-1 h-8 w-8 fill-current" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default PlayButton
