'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { LoaderCircle, Pause, Play, Volume1, Volume2, VolumeX } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

import Equalizer from 'app/components/equalizer'
import { Button } from 'app/components/ui/button'
import { Separator } from 'app/components/ui/separator'
import { designSystem } from 'app/lib/design-system'

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
    const onPlaying = () => {
      setIsPlaying(true)
      setIsLoading(false)
    }
    const onPause = () => {
      setIsPlaying(false)
      setIsLoading(false)
    }
    const onError = () => {
      setIsLoading(false)
      setIsPlaying(false)
      setError('Error loading stream')
    }
    const onAbort = () => setIsLoading(false)

    audio.addEventListener('loadstart', onLoadStart)
    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('playing', onPlaying)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('error', onError)
    audio.addEventListener('abort', onAbort)

    return () => {
      audio.removeEventListener('loadstart', onLoadStart)
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('playing', onPlaying)
      audio.removeEventListener('pause', onPause)
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
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      await audio.play()
      setIsPlaying(true)
    } catch {
      setError('Unable to play')
      setIsPlaying(false)
      setIsLoading(false)
    }
  }, [isPlaying])

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false)
      setVolume(previousVolume || 0.5)
      return
    }

    setPreviousVolume(volume)
    setIsMuted(true)
  }, [isMuted, previousVolume, volume])

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value)
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
  const statusLabel = error ? 'Error' : isLoading ? 'Connecting' : isPlaying ? 'Live' : 'Idle'
  const statusCopy = error
    ? 'The stream could not be loaded.'
    : isPlaying
      ? 'Continuous live broadcast.'
      : isLoading
        ? 'Opening stream.'
        : 'Ready when you are.'
  const volumeValue = Math.round((isMuted ? 0 : volume) * 100)
  const volumeLabel = isMuted || volumeValue === 0 ? 'Muted' : `${volumeValue}%`

  const sliderColor = 'var(--foreground)'
  const trackColor = 'var(--muted)'

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-base font-medium tracking-tight text-foreground">Deep Space One</p>
        <p className={`${designSystem.typography.body} mt-1 text-muted-foreground`}>
          Deep ambient electronic, experimental and space music.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <motion.div
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 420, damping: 24 }}
          className="relative shrink-0"
        >
          <Button
            onClick={togglePlay}
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-full border-border/60 bg-background shadow-xs"
            disabled={isLoading}
            aria-label={isPlaying ? 'Pause radio stream' : 'Play radio stream'}
            aria-pressed={isPlaying}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.16 }}
                >
                  <LoaderCircle className="h-5 w-5 animate-spin text-muted-foreground" />
                </motion.div>
              ) : isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.16 }}
                >
                  <Pause className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.16 }}
                >
                  <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <Equalizer isPlaying={isPlaying} className="h-5" />
            <div className="min-w-0">
              <p className="text-sm font-medium tracking-tight text-foreground">{statusLabel}</p>
              <p className={`${designSystem.typography.caption} mt-1 text-muted-foreground`}>
                {statusCopy}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-border/60" />

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute volume' : 'Mute volume'}
          aria-pressed={isMuted}
        >
          <VolumeIcon className="h-4 w-4" />
        </Button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          aria-label="Radio volume"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={volumeValue}
          aria-valuetext={volumeLabel}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full border border-border/30 bg-muted
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
            [&::-webkit-slider-thumb]:h-3
            [&::-webkit-slider-thumb]:w-3
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-foreground"
          style={{
            background: `linear-gradient(to right, ${sliderColor} 0%, ${sliderColor} ${(isMuted ? 0 : volume) * 100}%, ${trackColor} ${(isMuted ? 0 : volume) * 100}%, ${trackColor} 100%)`,
          }}
        />

        <span className="w-10 text-right text-xs text-muted-foreground">{volumeLabel}</span>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-destructive">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={retry}
              className="w-full sm:w-auto"
              aria-label="Retry radio stream"
            >
              Retry
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} src={radioUrl} preload="none" />
    </div>
  )
}
