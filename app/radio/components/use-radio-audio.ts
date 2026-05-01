'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const STREAM_URL = 'https://ice6.somafm.com/deepspaceone-128-mp3'
const STORAGE_KEY = 'radio-volume'
const DEFAULT_VOLUME = 0.5

export function useRadioAudio() {
  // Initialize volume from localStorage
  const [volume, setVolumeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved !== null) {
        const parsed = parseFloat(saved)
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
          return parsed
        }
      }
    }
    return DEFAULT_VOLUME
  })

  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const isPlayingRef = useRef(isPlaying)
  const previousVolumeRef = useRef(DEFAULT_VOLUME)

  // Keep the ref in sync with state
  isPlayingRef.current = isPlaying

  // Attach event listeners — no dependency on isPlaying to avoid re-attaching
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onLoadStart = () => {
      if (isPlayingRef.current || audio.readyState > 0) setIsLoading(true)
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
    const onStalled = () => setIsLoading(true)

    audio.addEventListener('loadstart', onLoadStart)
    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('playing', onPlaying)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('error', onError)
    audio.addEventListener('abort', onAbort)
    audio.addEventListener('stalled', onStalled)

    return () => {
      audio.removeEventListener('loadstart', onLoadStart)
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('playing', onPlaying)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('error', onError)
      audio.removeEventListener('abort', onAbort)
      audio.removeEventListener('stalled', onStalled)
    }
  }, [])

  // Sync volume to audio element
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // Save volume to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && !isMuted) {
      localStorage.setItem(STORAGE_KEY, volume.toString())
    }
  }, [volume, isMuted])

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlayingRef.current) {
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
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      if (prev) {
        // Unmuting: restore previous volume
        setVolumeState(previousVolumeRef.current || 0.5)
        return false
      }
      // Muting: remember current volume
      previousVolumeRef.current = volume
      return true
    })
  }, [volume])

  const setVolume = useCallback(
    (newVolume: number) => {
      setVolumeState(newVolume)
      if (newVolume > 0 && isMuted) {
        setIsMuted(false)
      }
    },
    [isMuted]
  )

  const retry = useCallback(() => {
    setError(null)
    togglePlay()
  }, [togglePlay])

  return {
    isPlaying,
    isLoading,
    error,
    volume,
    isMuted,
    audioRef,
    streamUrl: STREAM_URL,
    togglePlay,
    toggleMute,
    setVolume,
    retry,
  }
}
