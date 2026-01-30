'use client'

import React from 'react'

import { Button } from 'app/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <section className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 text-destructive">
        <svg
          className="mx-auto h-12 w-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="mb-2 text-lg font-semibold tracking-tight">Something went wrong</h2>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        An error occurred while loading this page. You can try again.
      </p>
      <Button variant="outline" onClick={reset}>
        Try again
      </Button>
      {error?.message && (
        <details className="mt-6 text-left">
          <summary className="cursor-pointer text-xs text-muted-foreground">
            Error details
          </summary>
          <pre className="mt-2 overflow-auto rounded bg-muted p-2 text-xs text-muted-foreground">
            {error.message}
          </pre>
        </details>
      )}
    </section>
  )
}
