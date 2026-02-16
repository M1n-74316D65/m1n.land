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
        'grid w-full auto-rows-[10rem] lg:auto-rows-[16rem] grid-cols-1 lg:grid-cols-3 gap-4',
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
      'group relative flex flex-col justify-center overflow-hidden rounded-xl cursor-pointer',
      'border border-border/60 bg-transparent',
      'transition-all duration-200',
      'hover:border-border hover:bg-accent/30 hover:shadow-sm',
      'active:scale-[0.99]',
      className
    )}
    {...props}
  >
    <div className="flex flex-col gap-1.5 p-5">
      <h3 className="text-lg font-medium text-foreground transition-colors group-hover:text-primary">
        {name}
      </h3>
      <p className="max-w-lg text-sm text-muted-foreground line-clamp-2">{description}</p>
    </div>
  </Link>
)

export { BentoCard, BentoGrid }
