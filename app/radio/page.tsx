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
    <section className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <BlurFade delay={0.2}>
          <div className="text-center mb-8">
            <h1 className={`${designSystem.typography.pageTitle} mb-2`}>Deep Space One</h1>
            <p className={`${designSystem.typography.body} text-muted-foreground`}>
              Deep ambient electronic, experimental and space music
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.4}>
          <div className="bg-card border border-border/60 rounded-2xl p-8 shadow-sm">
            <ErrorBoundary>
              <RadioPlayerClient />
            </ErrorBoundary>
          </div>
        </BlurFade>

        <BlurFade delay={0.6}>
          <p className={`text-center ${designSystem.typography.caption} mt-6`}>
            Powered by{' '}
            <a
              href="https://somafm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              SomaFM
            </a>{' '}
            •{' '}
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
