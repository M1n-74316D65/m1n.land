import { ComponentPropsWithoutRef, ReactNode } from 'react'
import Link from 'next/link'

import { cn } from 'app/lib/utils'

interface BentoGridProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
  className?: string
}

interface BentoCardProps {
  name: string
  className?: string
  description: string
  href: string
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        'grid w-full auto-rows-[10rem] lg:auto-rows-[16rem] grid-cols-1 lg:grid-cols-3 gap-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({ name, className = '', description, href, ...props }: BentoCardProps) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      'group relative col-span-3 flex flex-col justify-center overflow-hidden rounded-xl',
      'border border-neutral-200/60 bg-transparent',
      'transition-all duration-200',
      'hover:border-neutral-300 hover:bg-neutral-50/50',
      'dark:border-neutral-800/60 dark:bg-transparent',
      'dark:hover:border-neutral-700 dark:hover:bg-neutral-900/30',
      className
    )}
    {...props}
  >
    <div className="flex flex-col gap-1.5 p-5">
      <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-100">{name}</h3>
      <p className="max-w-lg text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
        {description}
      </p>
    </div>
  </Link>
)

export { BentoCard, BentoGrid }
