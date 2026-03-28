'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { LoaderCircle, Pause, Play, Volume1, Volume2, VolumeX } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

import Equalizer from 'app/components/equalizer'
import { Button } from 'app/components/ui/button'
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
  const volumeValue = Math.round((isMuted ? 0 : volume) * 100)
  const volumeLabel = isMuted || volumeValue === 0 ? 'Muted' : `${volumeValue}%`

  const sliderColor = 'var(--foreground)'
  const trackColor = 'var(--muted)'

  return (
    <div className="flex flex-col gap-5">
      {/* Player Card */}
      <div
        className={`
          relative overflow-hidden rounded-2xl border border-border/50 bg-card/50
          backdrop-blur-sm p-6 sm:p-8
          ${designSystem.interactions.card}
        `}
      >
        {/* Status Badge - Top Right */}
        <div className="absolute top-4 right-4">
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium
              ${
                isPlaying
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'bg-muted text-muted-foreground border border-border/50'
              }
            `}
          >
            {isPlaying && <Equalizer isPlaying={isPlaying} className="h-3 w-3" />}
            <span>{isPlaying ? 'LIVE' : isLoading ? 'Loading' : 'Idle'}</span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          {/* Play Button - Left side */}
          <motion.div
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="shrink-0"
          >
            <Button
              onClick={togglePlay}
              variant="outline"
              size="icon"
              className={`
                h-20 w-20 rounded-2xl border-2 shadow-sm
                transition-all duration-200
                ${
                  isPlaying
                    ? 'bg-primary/10 border-primary/40 text-primary hover:bg-primary/15 hover:border-primary/50'
                    : 'bg-background border-border/60 hover:bg-accent hover:border-border'
                }
              `}
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
                    transition={{ duration: 0.15 }}
                  >
                    <LoaderCircle className="h-6 w-6 animate-spin text-muted-foreground" />
                  </motion.div>
                ) : isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Pause className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Play className="ml-1 h-6 w-6 fill-current" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          {/* Station Info - Right side */}
          <div className="flex-1 min-w-0 pt-1">
            <h2 className="text-xl font-semibold tracking-tight text-foreground mb-2">
              Deep Space One
            </h2>

            <p
              className={`${designSystem.typography.body} text-muted-foreground leading-relaxed max-w-md`}
            >
              Deep ambient electronic, experimental and space music. For expanding minds and
              drifting through the cosmos.
            </p>

            {/* Status Messages */}
            <AnimatePresence mode="wait">
              {error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-4 flex items-center gap-3"
                >
                  <p className="text-sm text-destructive">Unable to connect to stream</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={retry}
                    className="text-xs h-7"
                    aria-label="Retry radio stream"
                  >
                    Retry
                  </Button>
                </motion.div>
              ) : isLoading ? (
                <motion.p
                  key="loading"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-4 text-sm text-muted-foreground flex items-center gap-2"
                >
                  <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                  Opening stream...
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        {/* Live indicator pulse when playing */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 left-6 flex items-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs text-muted-foreground">Continuous live broadcast</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Volume Control Row */}
      <div className="flex items-center gap-4 px-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 shrink-0 text-muted-foreground hover:text-foreground transition-colors rounded-full"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute volume' : 'Mute volume'}
          aria-pressed={isMuted}
        >
          <VolumeIcon className="h-5 w-5" />
        </Button>

        <div className="flex-1 flex items-center gap-4">
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
            className="flex-1 h-2 cursor-pointer appearance-none rounded-full border border-border/30 bg-muted
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-foreground
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-background
              [&::-webkit-slider-thumb]:shadow-sm
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:hover:scale-110"
            style={{
              background: `linear-gradient(to right, ${sliderColor} 0%, ${sliderColor} ${(isMuted ? 0 : volume) * 100}%, ${trackColor} ${(isMuted ? 0 : volume) * 100}%, ${trackColor} 100%)`,
            }}
          />
          <span className="w-14 text-right text-sm font-medium text-muted-foreground tabular-nums">
            {volumeLabel}
          </span>
        </div>
      </div>

      <audio ref={audioRef} src={radioUrl} preload="none" />
    </div>
  )
}
