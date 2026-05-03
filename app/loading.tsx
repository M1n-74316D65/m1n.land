export default function Loading() {
  return (
    <section aria-busy="true" aria-label="Loading content">
      <div className="mb-3 flex items-center gap-1">
        <div className="h-6 w-24 animate-pulse bg-neutral-200 dark:bg-neutral-800" />
      </div>
      <div className="max-w-lg space-y-2">
        <div className="h-4 w-full animate-pulse bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-4 w-4/5 animate-pulse bg-neutral-200 dark:bg-neutral-800" />
      </div>
      <div className="mt-5 h-16 animate-pulse bg-neutral-100 dark:bg-neutral-900" />
    </section>
  )
}
