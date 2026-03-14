import React from 'react'

import BlurFade from 'app/components/ui/magicui/blur-fade'
import GroupedLinks from 'app/components/grouped-links'
import { MorphingText } from 'app/components/ui/magicui/morphing-text'
import { TypingAnimation } from 'app/components/ui/magicui/typing-animation'
import { Badge } from 'app/components/ui/badge'
import { Separator } from 'app/components/ui/separator'
import { designSystem } from 'app/lib/design-system'

const texts = ['David', 'M1n']

const techStack = ['Rust', 'Go', 'TypeScript', 'Linux', 'Neovim']

const Page: React.FC = () => {
  const typingDuration = 50
  const typingText = "Hi, I'm "
  const typingCompleteTime = (typingText.length * typingDuration) / 1000
  const morphingStartDelay = typingCompleteTime + 0.1
  const morphingCycleDuration = 1.5
  const contentFadeDelay = morphingStartDelay + morphingCycleDuration * 0.5

  return (
    <section className="flex flex-col">
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
        <div className={`${designSystem.spacing.component.section} max-w-lg space-y-6`}>
          <p className={`${designSystem.typography.body} text-muted-foreground leading-relaxed`}>
            I love coding, thinking about philosophy, and playing games.
            <br />
            Linux user. Rust as the most entertaining language.
          </p>

          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs font-normal hover:bg-accent transition-colors cursor-default"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Separator className="mb-8 bg-border/50" />
          <GroupedLinks />
        </div>
      </BlurFade>
    </section>
  )
}

export default Page
