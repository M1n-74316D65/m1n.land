import RadioPlayerClient from './radio-player-client'
import ErrorBoundary from 'app/components/ui/error-boundary'
import { designSystem } from 'app/lib/design-system'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Radio',
  description: "Listen to M1n's online radio station - streaming music and audio content 24/7.",
}

export default function RadioPage() {
  return (
    <section>
      <h1
        className={`${designSystem.spacing.component.header} text-2xl font-semibold tracking-tighter`}
      >
        Radio
      </h1>
      <ErrorBoundary>
        <RadioPlayerClient />
      </ErrorBoundary>
    </section>
  )
}
