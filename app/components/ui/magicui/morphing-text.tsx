'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from 'app/lib/utils'

const morphTime = 1.5 // reduced from 1.85
const cooldownTime = 0.65 // reduced from 0.85

const useMorphingText = (texts: string[]) => {
  const textIndexRef = useRef(0)
  const morphRef = useRef(0)
  const cooldownRef = useRef(0)
  const timeRef = useRef(new Date())
  const [isStarted, setIsStarted] = useState(false)

  const text1Ref = useRef<HTMLSpanElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current]
      if (!current1 || !current2) return

      if (!isStarted) {
        current1.textContent = ''
        current2.textContent = ''
        return
      }

      current2.style.filter = `blur(${Math.min(3 / fraction - 3, 45)}px)` // reduced blur strength
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%` // smoother fade

      const invertedFraction = 1 - fraction
      current1.style.filter = `blur(${Math.min(3 / invertedFraction - 3, 45)}px)` // reduced blur strength
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`

      current1.textContent = texts[textIndexRef.current % texts.length]
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length]
    },
    [texts, isStarted]
  )

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current
    cooldownRef.current = 0

    let fraction = morphRef.current / morphTime

    if (fraction > 1) {
      cooldownRef.current = cooldownTime
      fraction = 1
    }

    setStyles(fraction)

    if (fraction === 1) {
      textIndexRef.current++
    }
  }, [setStyles])

  const doCooldown = useCallback(() => {
    morphRef.current = 0
    const [current1, current2] = [text1Ref.current, text2Ref.current]
    if (current1 && current2) {
      current2.style.filter = 'none'
      current2.style.opacity = '100%'
      current1.style.filter = 'none'
      current1.style.opacity = '0%'
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarted(true)
    }, 750) // Start after a short delay

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const newTime = new Date()
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000
      timeRef.current = newTime

      cooldownRef.current -= dt

      if (cooldownRef.current <= 0) doMorph()
      else doCooldown()
    }

    animate()
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [doMorph, doCooldown])

  return { text1Ref, text2Ref }
}

interface MorphingTextProps {
  className?: string
  texts: string[]
  delay?: number
}

const Texts: React.FC<Pick<MorphingTextProps, 'texts'>> = ({ texts }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts)
  return (
    <>
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full opacity-0"
        ref={text1Ref}
      />
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full opacity-0"
        ref={text2Ref}
      />
    </>
  )
}

export const MorphingText: React.FC<MorphingTextProps> = ({ texts, className, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={cn(
        'relative inline-flex h-8 text-2xl font-semibold tracking-tighter',
        'text-rendering-optimizeLegibility subpixel-antialiased',
        '[font-smooth:always] [-webkit-font-smoothing:subpixel-antialiased]',
        className,
        isVisible ? 'opacity-100' : 'opacity-0',
        'transition-opacity duration-200'
      )}
    >
      <Texts texts={texts} />
      <svg id="filters" className="fixed h-0 w-0" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 255 -100"
            />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
