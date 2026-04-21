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
    <section className="flex min-h-[70vh] items-center justify-center">
      <div className="mx-auto w-full max-w-lg px-4 sm:px-8">
        <BlurFade delay={0.2}>
          <ErrorBoundary>
            <RadioPlayerClient />
          </ErrorBoundary>
        </BlurFade>

        <BlurFade delay={0.5}>
          <p className="mt-10 text-center text-xs text-muted-foreground/80">
            Powered by{' '}
            <a
              href="https://somafm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              SomaFM
            </a>
            {' · '}
            <a
              href="https://somafm.com/support/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              Support
            </a>
          </p>
        </BlurFade>
      </div>
    </section>
  )
}
