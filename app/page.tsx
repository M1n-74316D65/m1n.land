import React from 'react'

import GroupedLinks from 'app/components/grouped-links'
import { Badge } from 'app/components/ui/badge'
import { Separator } from 'app/components/ui/separator'
import { designSystem } from 'app/lib/design-system'
import { techStack } from 'app/constants/links'

const Page: React.FC = () => {
  return (
    <section className="flex flex-col">
      {/* Hero heading — bold, intentional, green accent on name */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Hi, I&apos;m <span className="text-accent">M1n</span>
          <span className="text-accent">.</span>
        </h1>
        <p
          className={`mt-2 ${designSystem.typography.body} text-muted-foreground leading-relaxed max-w-lg`}
        >
          I love coding, thinking about philosophy, and playing games.
          <br />
          Linux user. Rust as the most entertaining language.
        </p>
      </div>

      {/* Tech stack — mono badges with brutalist hover */}
      <div className="flex flex-wrap gap-2 mb-10">
        {techStack.map((tech) => (
          <Badge
            key={tech}
            variant="outline"
            className="font-mono text-xs font-normal shadow-brutal hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-brutal-accent hover:-translate-y-0.5 transition-all duration-100 cursor-default"
          >
            {tech}
          </Badge>
        ))}
      </div>

      <Separator className="mb-8" />
      <GroupedLinks />
    </section>
  )
}

export default Page
