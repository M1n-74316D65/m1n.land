'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Pause, Volume2, Volume1, VolumeX, Radio } from 'lucide-react'
import { Button } from 'app/components/ui/button'
import { motion, AnimatePresence } from 'motion/react'
import Equalizer from 'app/components/equalizer'

export default function RadioPlayerClient() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [previousVolume, setPreviousVolume] = useState(0.5)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const radioUrl = 'https://ice6.somafm.com/deepspaceone-128-mp3'

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onLoadStart = () => {
      if (isPlaying || audio.readyState > 0) setIsLoading(true)
      setError(null)
    }
    const onCanPlay = () => setIsLoading(false)
    const onError = () => {
      setIsLoading(false)
      setIsPlaying(false)
      setError('Error loading stream')
    }
    const onAbort = () => setIsLoading(false)

    audio.addEventListener('loadstart', onLoadStart)
    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('error', onError)
    audio.addEventListener('abort', onAbort)

    return () => {
      audio.removeEventListener('loadstart', onLoadStart)
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('error', onError)
      audio.removeEventListener('abort', onAbort)
    }
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      setIsLoading(false)
    } else {
      try {
        setIsLoading(true)
        setError(null)
        await audio.play()
        setIsPlaying(true)
      } catch (e) {
        setError('Unable to play')
        setIsPlaying(false)
      } finally {
        setIsLoading(false)
      }
    }
  }, [isPlaying])

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false)
      setVolume(previousVolume || 0.5)
    } else {
      setPreviousVolume(volume)
      setIsMuted(true)
    }
  }, [isMuted, volume, previousVolume])

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (newVolume > 0 && isMuted) {
      setIsMuted(false)
    }
  }

  const retry = useCallback(() => {
    setError(null)
    togglePlay()
  }, [togglePlay])

  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2

  const sliderColor = 'var(--primary)'
  const trackColor = 'var(--muted)'

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Main Player Controls */}
      <div className="flex items-center gap-6">
        <motion.div
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className="relative"
        >
          {/* Glow effect when playing */}
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <Button
            onClick={togglePlay}
            variant="outline"
            size="icon"
            className="h-16 w-16 rounded-full relative bg-background"
            disabled={isLoading}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="animate-spin rounded-full h-5 w-5 border-2 border-muted-foreground/30 border-t-foreground"
                />
              ) : isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-2"
                >
                  <Pause className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>

        {/* Equalizer */}
        <Equalizer isPlaying={isPlaying} />
      </div>

      {/* Volume Controls */}
      <div className="flex items-center gap-3 w-full max-w-[200px]">
        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={toggleMute}>
          <VolumeIcon className="h-4 w-4" />
        </Button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer bg-muted
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-3
            [&::-webkit-slider-thumb]:h-3
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-125"
          style={{
            background: `linear-gradient(to right, ${sliderColor} 0%, ${sliderColor} ${(isMuted ? 0 : volume) * 100}%, ${trackColor} ${(isMuted ? 0 : volume) * 100}%, ${trackColor} 100%)`,
          }}
        />

        <span className="text-xs text-muted-foreground w-8 text-right">
          {Math.round((isMuted ? 0 : volume) * 100)}%
        </span>
      </div>

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20"
          >
            <div className="flex items-center gap-2 text-destructive">
              <Radio className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
            <Button variant="outline" size="sm" onClick={retry} className="text-xs">
              Retry
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} src={radioUrl} preload="none" />
    </div>
  )
}
