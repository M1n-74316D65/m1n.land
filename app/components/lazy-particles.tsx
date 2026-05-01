'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  color?: string
  vx?: number
  vy?: number
}

// Inline particle implementation to avoid importing the heavy particles component
// This is a simplified version that provides similar visual effect
export default function LazyParticles({
  className = 'fixed inset-0 -z-10',
  quantity = 31,
  staticity = 40,
  ease = 60,
  color = '#888888',
  vx = Math.PI / 12,
  vy = Math.PI / 12,
}: ParticlesProps) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Lazy load the particles after the page has loaded
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (!loaded) return null

  // Generate particles
  const particles = Array.from({ length: quantity }, (_, i) => {
    const angle = (i / quantity) * Math.PI * 2
    const distance = Math.random() * 100
    const x = Math.cos(angle) * distance
    const y = Math.sin(angle) * distance
    const size = Math.random() * 2 + 1
    const opacity = Math.random() * 0.3 + 0.2

    return (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          opacity,
          x: `${x}%`,
          y: `${y}%`,
          originX: '50%',
          originY: '50%',
        }}
        animate={{
          x: [x, x + Math.cos(angle) * 10, x],
          y: [y, y + Math.sin(angle) * 10, y],
          opacity: [opacity, opacity * 1.5, opacity],
        }}
        transition={{
          duration: ease / 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    )
  })

  return <div className={className}>{particles}</div>
}
