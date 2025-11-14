'use client'

import React, { useEffect, useRef } from 'react'

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  size?: number
  refresh?: boolean
  color?: string
  vx?: number
  vy?: number
}

const Particles: React.FC<ParticlesProps> = ({
  className = '',
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = '#ffffff',
  vx = 0,
  vy = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const particlesRef = useRef<any[]>([])
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const animationFrameIdRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    contextRef.current = ctx

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles: any[] = []
    for (let i = 0; i < quantity; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * size + 1,
        speedX: (Math.random() - 0.5) * vx,
        speedY: (Math.random() - 0.5) * vy,
        opacity: Math.random() * 0.5 + 0.5,
      })
    }
    particlesRef.current = particles

    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current = {
        x: event.clientX,
        y: event.clientY,
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        const mouseDistance = Math.sqrt(
          Math.pow(particle.x - mousePositionRef.current.x, 2) +
            Math.pow(particle.y - mousePositionRef.current.y, 2)
        )

        const maxDistance = 100
        const force = Math.max(0, (maxDistance - mouseDistance) / maxDistance)
        const staticFactor = staticity / 100

        particle.x +=
          particle.speedX * (1 - staticFactor) +
          force * (mousePositionRef.current.x - particle.x) * (ease / 100) * 0.01
        particle.y +=
          particle.speedY * (1 - staticFactor) +
          force * (mousePositionRef.current.y - particle.y) * (ease / 100) * 0.01

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameIdRef.current)
    }
  }, [quantity, staticity, ease, size, refresh, color, vx, vy])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ position: 'fixed' }}
    />
  )
}

export default Particles
