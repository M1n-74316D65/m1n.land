'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { Button } from 'app/components/ui/button'

export default function RadioPlayerClient() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const radioUrl = 'https://radio.m1n.land/'

  // Audio event handling
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onLoadStart = () => {
      // Only set loading if user has attempted to play
      if (isPlaying || audio.readyState > 0) {
        setIsLoading(true)
      }
      setError(null)
    }
    const onCanPlay = () => setIsLoading(false)
    const onError = () => {
      setIsLoading(false)
      setIsPlaying(false)
      setError('Error cargando la transmisión. Intente nuevamente.')
    }
    const onAbort = () => setIsLoading(false)
    const onStalled = () => setIsLoading(false)

    audio.addEventListener('loadstart', onLoadStart)
    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('error', onError)
    audio.addEventListener('abort', onAbort)
    audio.addEventListener('stalled', onStalled)

    return () => {
      audio.removeEventListener('loadstart', onLoadStart)
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('error', onError)
      audio.removeEventListener('abort', onAbort)
      audio.removeEventListener('stalled', onStalled)
    }
  }, [isPlaying])

  // Volume change handler
  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value))
  }, [])

  // Volume increment/decrement for keyboard
  const increaseVolume = useCallback(() => {
    setVolume((prev) => Math.min(prev + 0.05, 1))
  }, [])

  const decreaseVolume = useCallback(() => {
    setVolume((prev) => Math.max(prev - 0.05, 0))
  }, [])

  // Actualizar volumen en audio
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
  }, [volume])

  // Cleanup effect to reset loading state on unmount
  useEffect(() => {
    return () => {
      setIsLoading(false)
      setIsPlaying(false)
    }
  }, [])

  // Reset loading state when component becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isLoading && !isPlaying) {
        setIsLoading(false)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [isLoading, isPlaying])

  // Función para reproducir / pausar
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

        // Add timeout to prevent infinite loading
        const playPromise = audio.play()
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 10000)
        )

        await Promise.race([playPromise, timeoutPromise])
        setIsPlaying(true)
      } catch (e) {
        const errorMessage =
          e instanceof Error && e.message === 'Timeout'
            ? 'Tiempo de espera agotado. Intente nuevamente.'
            : 'No se pudo iniciar la reproducción.'
        setError(errorMessage)
        console.error('Audio play error:', e)
        setIsPlaying(false)
      } finally {
        setIsLoading(false)
      }
    }
  }, [isPlaying])

  // Keyboard shortcuts for volume control and play/pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keys when not focused on input elements
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault()
          togglePlay()
          break
        case 'ArrowUp':
          e.preventDefault()
          increaseVolume()
          break
        case 'ArrowDown':
          e.preventDefault()
          decreaseVolume()
          break
        case 'm':
          e.preventDefault()
          setVolume(volume === 0 ? 0.5 : 0)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [increaseVolume, decreaseVolume, togglePlay, volume])

  return (
    <section aria-label="Reproductor de radio online" className="relative">
      <div className="relative w-full max-w-sm mx-auto">
        <div className="bg-background/95 backdrop-blur-xl border border-border/40 rounded-xl shadow-sm p-8 space-y-6">
          <audio ref={audioRef} src={radioUrl} preload="none" aria-label="Radio stream" />

          {/* Play/Pause Button */}
          <div className="flex justify-center">
            <Button
              onClick={togglePlay}
              variant="ghost"
              size="sm"
              className="h-12 w-12 rounded-full bg-gradient-to-b from-muted/40 to-muted/20 hover:from-muted/50 hover:to-muted/30 border border-border/50 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
              disabled={isLoading}
              aria-label={isPlaying ? 'Pausar radio' : 'Reproducir radio'}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-muted-foreground/20 border-t-muted-foreground" />
              ) : isPlaying ? (
                <Pause className="h-5 w-5 text-foreground" />
              ) : (
                <Play className="h-5 w-5 ml-0.5 text-foreground" fill="currentColor" />
              )}
            </Button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center" role="status" aria-live="polite">
              <span className="text-xs text-muted-foreground/60">Conectando...</span>
            </div>
          )}

          {/* Volume Control */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 px-1">
              {volume === 0 ? (
                <VolumeX className="h-4 w-4 text-muted-foreground/60 flex-shrink-0" />
              ) : (
                <Volume2 className="h-4 w-4 text-muted-foreground/60 flex-shrink-0" />
              )}

              <div className="flex-1 relative group">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1.5 bg-muted/30 rounded-full appearance-none cursor-pointer transition-all
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-3
                    [&::-webkit-slider-thumb]:h-3
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-gradient-to-b
                    [&::-webkit-slider-thumb]:from-background
                    [&::-webkit-slider-thumb]:to-muted
                    [&::-webkit-slider-thumb]:border
                    [&::-webkit-slider-thumb]:border-border/50
                    [&::-webkit-slider-thumb]:shadow-sm
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:transition-transform
                    [&::-webkit-slider-thumb]:hover:scale-110
                    [&::-webkit-slider-thumb]:active:scale-95
                    [&::-moz-range-thumb]:w-3
                    [&::-moz-range-thumb]:h-3
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-gradient-to-b
                    [&::-moz-range-thumb]:from-background
                    [&::-moz-range-thumb]:to-muted
                    [&::-moz-range-thumb]:border
                    [&::-moz-range-thumb]:border-border/50
                    [&::-moz-range-thumb]:shadow-sm
                    [&::-moz-range-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:transition-transform
                    [&::-moz-range-thumb]:hover:scale-110
                    [&::-moz-range-thumb]:active:scale-95
                    hover:bg-muted/40"
                  aria-label="Control de volumen"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--foreground) / 0.4) 0%, hsl(var(--foreground) / 0.4) ${volume * 100}%, hsl(var(--muted) / 0.3) ${volume * 100}%, hsl(var(--muted) / 0.3) 100%)`,
                  }}
                />
              </div>

              <span className="text-xs text-muted-foreground/60 font-medium tabular-nums w-9 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <p
              className="text-center text-xs text-destructive/80 font-medium"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
