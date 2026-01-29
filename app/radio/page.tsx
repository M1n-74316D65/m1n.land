import RadioPlayerClient from './radio-player-client'
import ErrorBoundary from 'app/components/ui/error-boundary'
import BlurFade from 'app/components/ui/magicui/blur-fade'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Radio',
  description: 'Deep Space One by SomaFM',
}

export default function RadioPage() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <BlurFade delay={0.2}>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">Deep Space One</h1>
          </div>
        </BlurFade>

        <BlurFade delay={0.4}>
          <p className="text-center text-sm text-muted-foreground">
            Deep ambient electronic, experimental and space music
          </p>
        </BlurFade>

        <BlurFade delay={0.6}>
          <ErrorBoundary>
            <RadioPlayerClient />
          </ErrorBoundary>
        </BlurFade>

        <BlurFade delay={0.8}>
          <p className="text-center text-xs text-muted-foreground">
            Powered by{' '}
            <a
              href="https://somafm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              SomaFM
            </a>{' '}
            •{' '}
            <a
              href="https://somafm.com/support/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Support
            </a>
          </p>
        </BlurFade>
      </div>
    </section>
  )
}
