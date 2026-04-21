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
          className={`flex items-center justify-center gap-2 ${className ?? ''}`}
        >
          <LoaderCircle className="h-4 w-4 animate-spin text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Connecting to stream...</span>
        </motion.div>
      )}
      {error && (
        <motion.div
          key="error"
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          className={`flex flex-col items-center justify-center gap-2 ${className ?? ''}`}
        >
          <WifiOff className="h-5 w-5 text-destructive" />
          <span className="text-sm text-destructive">Unable to connect</span>
          <button
            onClick={onRetry}
            className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors cursor-pointer"
          >
            Retry
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ConnectionStatus
