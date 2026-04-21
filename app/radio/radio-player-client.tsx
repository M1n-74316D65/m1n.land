'use client'

import { motion } from 'motion/react'

import { useRadioAudio } from './components/use-radio-audio'
import WaveformVisualizer from './components/waveform-visualizer'
import PlayButton from './components/play-button'
import VolumeControl from './components/volume-control'
import StationInfo from './components/station-info'
import ConnectionStatus from './components/connection-status'

export default function RadioPlayerClient() {
  const {
    isPlaying,
    isLoading,
    error,
    volume,
    isMuted,
    audioRef,
    streamUrl,
    togglePlay,
    toggleMute,
    setVolume,
    retry,
  } = useRadioAudio()

  const showConnectionStatus = isLoading || error

  return (
    <div className="relative flex flex-col items-center gap-8 sm:gap-10">
      {/* Atmospheric glow when playing */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        animate={{
          opacity: isPlaying ? 1 : 0,
        }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(99, 102, 241, 0.12) 0%, transparent 60%)',
        }}
      />

      {/* Station identity */}
      <StationInfo isPlaying={isPlaying} />

      {/* Waveform visualizer — the hero element */}
      <WaveformVisualizer isPlaying={isPlaying} isLoading={isLoading} />

      {/* Play button or connection status */}
      {showConnectionStatus ? (
        <ConnectionStatus isLoading={isLoading} error={error} onRetry={retry} />
      ) : (
        <PlayButton isPlaying={isPlaying} isLoading={false} onToggle={togglePlay} />
      )}

      {/* Volume control — integrated, always visible */}
      <VolumeControl
        volume={volume}
        isMuted={isMuted}
        onVolumeChange={setVolume}
        onToggleMute={toggleMute}
      />

      {/* Audio element */}
      <audio ref={audioRef} src={streamUrl} preload="none" />
    </div>
  )
}
