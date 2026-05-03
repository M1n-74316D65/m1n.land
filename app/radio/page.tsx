import dynamic from 'next/dynamic'
import ErrorBoundary from 'app/components/ui/error-boundary'
import type { Metadata } from 'next'

const RadioPlayerClient = dynamic(() => import('./radio-player-client'))

export const metadata: Metadata = {
  title: 'Radio',
  description: 'Deep Space One by SomaFM',
}

export default function RadioPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <div className="mx-auto w-full max-w-lg px-4 sm:px-8">
        <ErrorBoundary>
          <RadioPlayerClient />
        </ErrorBoundary>

        <p className="mt-10 text-center text-xs text-muted-foreground/80 font-mono">
          Powered by{' '}
          <a
            href="https://somafm.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors duration-100 hover:text-accent"
          >
            SomaFM
          </a>
          {' · '}
          <a
            href="https://somafm.com/support/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors duration-100 hover:text-accent"
          >
            Support
          </a>
        </p>
      </div>
    </section>
  )
}
