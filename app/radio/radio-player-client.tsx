'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Pause } from 'lucide-react'
import { Button } from 'app/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

export default function RadioPlayerClient() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDark, setIsDark] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const radioUrl = 'https://ice6.somafm.com/deepspaceone-128-mp3'

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

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
    if (audio) audio.volume = volume
  }, [volume])

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

  const sliderColor = isDark ? 'white' : 'black'
  const trackColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'

  return (
    <div className="flex items-center justify-center gap-6">
      <motion.div
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <Button
          onClick={togglePlay}
          variant="outline"
          size="icon"
          className="h-16 w-16 rounded-full relative"
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

      <div className="flex items-center gap-3">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-32 h-1.5 bg-black/20 dark:bg-white/20 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-3
            [&::-webkit-slider-thumb]:h-3
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-black dark:[&::-webkit-slider-thumb]:bg-white"
          style={{
            background: `linear-gradient(to right, ${sliderColor} 0%, ${sliderColor} ${volume * 100}%, ${trackColor} ${volume * 100}%, ${trackColor} 100%)`,
          }}
        />
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      <audio ref={audioRef} src={radioUrl} preload="none" />
    </div>
  )
}
