import React from 'react'

import BlurFade from 'app/components/ui/magicui/blur-fade'
import Footer from 'app/components/footer/footer'
import { MorphingText } from 'app/components/ui/magicui/morphing-text'
import { TypingAnimation } from 'app/components/ui/magicui/typing-animation'
import { designSystem } from 'app/lib/design-system'

const texts = ['David', 'M1n']

const Page: React.FC = () => {
  const typingDuration = 50
  const typingText = "Hi, I'm "
  const typingCompleteTime = (typingText.length * typingDuration) / 1000
  const morphingStartDelay = typingCompleteTime + 0.1
  const morphingCycleDuration = 1.5
  const contentFadeDelay = morphingStartDelay + morphingCycleDuration * 0.5

  return (
    <section>
      <div
        className={`mb-3 flex items-center gap-1 ${designSystem.typography.pageTitle} text-foreground`}
      >
        <TypingAnimation duration={typingDuration} className="whitespace-nowrap opacity-90">
          Hi, I'm&nbsp;
        </TypingAnimation>
        <MorphingText
          texts={texts}
          className="min-w-16 text-foreground/90"
          delay={morphingStartDelay * 1000}
        />
      </div>
      <BlurFade delay={contentFadeDelay} inView>
        <p
          className={`${designSystem.spacing.component.section} max-w-lg ${designSystem.typography.body} text-muted-foreground`}
        >
          I love coding, thinking about philosophy, and playing games.
          <br />
          Linux user. Rust as the most entertaining language.
        </p>
        <div className="mt-5">
          <Footer />
        </div>
      </BlurFade>
    </section>
  )
}

export default Page
