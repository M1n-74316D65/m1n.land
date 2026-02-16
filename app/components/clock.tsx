'use client'
import { SlidingNumber } from 'app/components/ui/sliding-number'
import { useEffect, useState } from 'react'

export function Clock() {
  const [hours, setHours] = useState(new Date().getHours())
  const [minutes, setMinutes] = useState(new Date().getMinutes())
  const [seconds, setSeconds] = useState(new Date().getSeconds())

  useEffect(() => {
    const interval = setInterval(() => {
      setHours(new Date().getHours())
      setMinutes(new Date().getMinutes())
      setSeconds(new Date().getSeconds())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-0.5 font-mono" aria-hidden="true">
      <SlidingNumber value={hours} padStart={true} />
      <span className="text-muted-foreground">:</span>
      <SlidingNumber value={minutes} padStart={true} />
      <span className="text-muted-foreground mr-0.5">:</span>
      <div className="text-sm text-muted-foreground/70">
        <SlidingNumber value={seconds} padStart={true} />
      </div>
    </div>
  )
}
