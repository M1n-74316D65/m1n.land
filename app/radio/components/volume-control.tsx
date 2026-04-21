'use client'

import { Volume1, Volume2, VolumeX } from 'lucide-react'
import { cn } from 'app/lib/utils'

interface VolumeControlProps {
  volume: number
  isMuted: boolean
  onVolumeChange: (v: number) => void
  onToggleMute: () => void
  className?: string
}

const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
  className,
}) => {
  const displayVolume = isMuted ? 0 : volume
  const volumePercent = Math.round(displayVolume * 100)

  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2

  return (
    <div
      className={cn(
        'flex items-center gap-3 bg-muted/50 backdrop-blur-sm rounded-full px-3 py-2',
        className
      )}
    >
      <button
        type="button"
        onClick={onToggleMute}
        className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground transition-colors"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        <VolumeIcon className="h-4 w-4 mx-auto" />
      </button>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={displayVolume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        aria-label="Radio volume"
        aria-valuenow={displayVolume}
        aria-valuemin={0}
        aria-valuemax={1}
        className="h-1.5 cursor-pointer appearance-none rounded-full bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:appearance-none [&::-moz-slider-thumb]:h-3.5 [&::-moz-slider-thumb]:w-3.5 [&::-moz-slider-thumb]:rounded-full [&::-moz-slider-thumb]:bg-foreground [&::-moz-slider-thumb]:border-2 [&::-moz-slider-thumb]:border-background [&::-moz-slider-thumb]:shadow-sm [&::-moz-slider-thumb]:appearance-none [&::-moz-slider-thumb]:border-none"
        style={{
          background: `linear-gradient(to right, var(--foreground) ${volumePercent}%, var(--muted) ${volumePercent}%)`,
        }}
      />

      <span className="w-10 text-right text-xs font-medium text-muted-foreground tabular-nums">
        {volumePercent}%
      </span>
    </div>
  )
}

export default VolumeControl
