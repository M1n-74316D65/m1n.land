'use client'

import { AnimatePresence, motion } from 'motion/react'
import { LoaderCircle, WifiOff } from 'lucide-react'

interface ConnectionStatusProps {
  isLoading: boolean
  error: string | null
  onRetry: () => void
  className?: string
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  isLoading,
  error,
  onRetry,
  className,
}) => {
  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={`flex items-center justify-center gap-2 bg-muted border-2 border-border shadow-brutal px-4 py-3 ${className ?? ''}`}
        >
          <LoaderCircle className="h-4 w-4 animate-spin text-muted-foreground" />
          <span className="text-sm font-mono text-muted-foreground">Connecting to stream...</span>
        </motion.div>
      )}
      {error && (
        <motion.div
          key="error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={`flex flex-col items-center justify-center gap-2 bg-muted border-2 border-destructive shadow-brutal px-4 py-3 ${className ?? ''}`}
          role="alert"
          aria-live="assertive"
        >
          <WifiOff className="h-5 w-5 text-destructive" aria-hidden="true" />
          <span className="text-sm font-mono text-destructive" id="error-message">
            Unable to connect
          </span>
          <button
            onClick={onRetry}
            className="text-xs font-mono text-muted-foreground underline underline-offset-4 hover:text-accent transition-colors duration-100 cursor-pointer"
            aria-describedby="error-message"
          >
            Retry
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ConnectionStatus
