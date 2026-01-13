import { TypingAnimation } from 'app/components/ui/magicui/typing-animation'
import { MorphingText } from 'app/components/ui/magicui/morphing-text'

import BlurFade from 'app/components/ui/magicui/blur-fade'
import Footer from 'app/components/footer/footer'
import LinkComponent from 'app/components/LinkComponent'
import React from 'react'
import { designSystem } from 'app/lib/design-system'
import { links } from 'app/constants/socials'

const texts = ['David', 'M1n']

const Page: React.FC = () => {
  // Calculate cohesive timing
  // "Hi, I'm " has 7 characters, so at 70ms per character = 490ms
  // Add a small buffer of 200ms before morphing starts = 690ms
  const typingDuration = 70
  const typingText = "Hi, I'm "
  const typingCompleteTime = (typingText.length * typingDuration) / 1000 // Convert to seconds
  const morphingStartDelay = typingCompleteTime + 0.2 // Add 200ms buffer
  const morphingCycleDuration = 2.25 // 2.25 seconds per morph cycle
  const contentFadeDelay = morphingStartDelay + morphingCycleDuration * 0.6 // Start fading content 60% through first morph cycle

  return (
    <section>
      <div className="mb-3 flex items-center gap-1 text-xl font-semibold leading-tight tracking-tight text-neutral-900 dark:text-neutral-100">
        <TypingAnimation duration={typingDuration} className="whitespace-nowrap opacity-90">
          Hi, I'm&nbsp;
        </TypingAnimation>
        <MorphingText
          texts={texts}
          className="min-w-16 text-neutral-800/90 dark:text-neutral-200"
          delay={morphingStartDelay * 1000} // Convert back to milliseconds
        />
      </div>
      <BlurFade delay={contentFadeDelay} inView>
        <p
          className={`${designSystem.spacing.component.section} max-w-lg text-sm leading-relaxed text-neutral-600 dark:text-neutral-300`}
        >
          {`I love coding, thinking about philosophy, and playing games.`}
          <br />
          {`Linux user. Rust as the most entertaining language.`}
        </p>
        <div className="mt-5">
          <Footer />
        </div>
      </BlurFade>
    </section>
  )
}

export default Page
