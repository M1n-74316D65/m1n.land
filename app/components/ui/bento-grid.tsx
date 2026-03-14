import { ComponentPropsWithoutRef, ReactNode } from 'react'
import Link from 'next/link'
import { LucideIcon, ArrowUpRight } from 'lucide-react'

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
  icon: LucideIcon
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        'grid w-full auto-rows-[10rem] lg:auto-rows-[14rem] grid-cols-1 lg:grid-cols-3 gap-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({ name, className = '', description, href, icon: Icon }: BentoCardProps) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      'group relative flex flex-col justify-between overflow-hidden rounded-xl cursor-pointer',
      'border border-border/60 bg-card/50 backdrop-blur-sm',
      'transition-all duration-300 ease-out',
      'hover:border-primary/30 hover:bg-card hover:shadow-lg hover:shadow-primary/5',
      'hover:-translate-y-1',
      'active:scale-[0.99] active:translate-y-0',
      className
    )}
  >
    <div className="flex flex-col h-full p-6">
      {/* Header with icon and arrow */}
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-lg bg-primary/5 border border-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
          <Icon className="h-5 w-5" />
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 mt-auto">
        <h3 className="text-lg font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors duration-200">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{description}</p>
      </div>
    </div>

    {/* Subtle gradient overlay on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
  </Link>
)

export { BentoCard, BentoGrid }
