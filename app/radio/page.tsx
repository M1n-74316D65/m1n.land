"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Radio } from "lucide-react"
import { Button } from "app/components/ui/button"
import { Card, CardContent } from "app/components/ui/card"
import { Slider } from "app/components/ui/slider"

export default function Component() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([70])
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Example radio stream URL - replace with your actual radio stream
  const radioUrl = "https://radio.m1n.land/"
  const stationName = "Your Radio Station"
  const currentShow = "Now Playing: Your Favorite Music"

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)
    const handleError = () => {
      setIsLoading(false)
      setIsPlaying(false)
    }

    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("error", handleError)
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        setIsLoading(true)
        await audio.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error("Error playing audio:", error)
      setIsPlaying(false)
      setIsLoading(false)
    }
  }

  const handleVolumeChange = (newVolume: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const volumeValue = newVolume[0] / 100
    audio.volume = volumeValue
    setVolume(newVolume)

    if (volumeValue === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = volume[0] / 100
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        My Radio
      </h1>
      <Card className="w-full max-w-md mx-auto rounded-2xl shadow-lg border border-border bg-background/80 backdrop-blur">
        <CardContent className="p-8">
          <audio ref={audioRef} src={radioUrl} preload="none" />

          {/* Station Info */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Radio className="h-5 w-5 text-red-500" />
              <h2 className="text-lg font-semibold">{stationName}</h2>
            </div>
            <p className="text-sm text-muted-foreground">{currentShow}</p>
          </div>

          {/* Play/Pause Button */}
          <div className="flex justify-center mb-8">
            <Button
              onClick={togglePlay}
              size="lg"
              className="h-16 w-16 rounded-full bg-gradient-to-tr shadow-lg hover:scale-105 transition-transform duration-150 focus:ring-4 focus:ring-red-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
              ) : isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
              )}
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-accent focus:ring-2 focus:ring-accent"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume[0] === 0 ? (
                <VolumeX className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Volume2 className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>
            <div className="flex-1 px-2">
              <Slider
                value={isMuted ? [0] : volume}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-full"
                thumbClassName="bg-red-500 border-2 border-white shadow focus:ring-2 focus:ring-red-300"
                trackClassName="bg-muted-foreground/20"
                rangeClassName="bg-red-500"
              />
            </div>
            <span className="text-xs text-muted-foreground w-8 text-right tabular-nums">
              {isMuted ? 0 : volume[0]}
            </span>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div
              className={`h-2.5 w-2.5 rounded-full ${
                isPlaying
                  ? "bg-red-500 animate-pulse shadow"
                  : "bg-gray-300"
              }`}
            />
            <span className="text-xs text-muted-foreground font-medium">
              {isLoading ? "Loading..." : isPlaying ? "Live" : "Offline"}
            </span>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
