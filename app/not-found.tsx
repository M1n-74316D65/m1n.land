import React from 'react'
import Link from 'next/link'

const NotFound: React.FC = () => (
  <section className="flex flex-col items-center justify-center min-h-[70vh] text-center">
    <h1 className="text-4xl font-semibold tracking-tight mb-4">404 - Page Not Found</h1>
    <p className="text-muted-foreground mb-6">The page you are looking for does not exist.</p>
    <Link
      href="/"
      className="px-4 py-2 bg-accent rounded-md text-sm font-medium transition-colors hover:bg-accent/80"
    >
      Return Home
    </Link>
  </section>
)

export default NotFound
