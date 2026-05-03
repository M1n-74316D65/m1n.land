import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'
import Link from 'next/link'
import { LucideIcon, ArrowUpRight } from 'lucide-react'

import { cn } from 'app/lib/utils'

export interface BentoGridProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
  className?: string
}

export interface BentoCardProps {
  name: string
  className?: string
  description: string
  href: string
  icon: LucideIcon
}

const BentoGrid: FC<BentoGridProps> = ({ children, className, ...props }) => {
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

const BentoCard: FC<BentoCardProps> = ({ name, className = '', description, href, icon: Icon }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      'group relative flex flex-col justify-between overflow-hidden rounded-none cursor-pointer',
      'border-2 border-border bg-card shadow-brutal',
      'transition-all duration-100',
      'hover:border-accent hover:shadow-brutal-lg',
      'hover:-translate-y-1',
      'active:translate-y-0 active:shadow-none',
      className
    )}
  >
    <div className="flex flex-col h-full p-6">
      {/* Header with icon and arrow */}
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-none bg-accent/10 border-2 border-accent text-accent">
          <Icon className="h-5 w-5" />
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-100">
          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 mt-auto">
        <h3 className="text-lg font-bold text-foreground tracking-tight group-hover:text-accent transition-colors duration-100">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{description}</p>
      </div>
    </div>
  </Link>
)

export { BentoCard, BentoGrid }
