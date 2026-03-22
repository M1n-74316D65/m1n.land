import RadioPlayerClient from './radio-player-client'
import ErrorBoundary from 'app/components/ui/error-boundary'
import BlurFade from 'app/components/ui/magicui/blur-fade'
import { designSystem } from 'app/lib/design-system'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Radio',
  description: 'Deep Space One by SomaFM',
}

export default function RadioPage() {
  return (
    <section>
      <div className="mx-auto w-full max-w-md">
        <BlurFade delay={0.2}>
          <div className="mb-8">
            <h1 className={designSystem.typography.pageTitle}>Radio</h1>
            <p className={`mt-1 ${designSystem.typography.body} text-muted-foreground`}>
              Deep Space One from SomaFM.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.3}>
          <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
            <ErrorBoundary>
              <RadioPlayerClient />
            </ErrorBoundary>
          </div>
        </BlurFade>

        <BlurFade delay={0.6}>
          <p
            className={`text-center ${designSystem.typography.caption} mt-6 text-muted-foreground/80`}
          >
            Powered by{' '}
            <a
              href="https://somafm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              SomaFM
            </a>
            {' • '}
            <a
              href="https://somafm.com/support/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Support
            </a>
          </p>
        </BlurFade>
      </div>
    </section>
  )
}
