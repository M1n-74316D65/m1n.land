import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import { cn } from 'app/lib/utils'
import { Button } from 'app/components/ui/button'

interface BentoGridProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<'div'> {
  name: string
  className?: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href: string
  cta: string
  img?: string
  imgClassName?: string
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div className={cn('grid w-full auto-rows-[20rem] grid-cols-3 gap-3', className)} {...props}>
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className = '',
  background,
  Icon,
  description,
  href,
  cta,
  img,
  imgClassName,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200/70 bg-white/70 shadow-sm',
      // dark styles
      'transform-gpu dark:border-neutral-800/80 dark:bg-black/60',
      className
    )}
    {...props}
  >
    {/* Background/Image Section */}
    <div className="relative">
      {background}
      {img && (
        <div className="absolute inset-0 w-full h-full">
          <img src={img} alt={name} className={cn('w-full h-full object-cover', imgClassName)} />
        </div>
      )}
    </div>

    {/* Content Section */}
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1.5 p-5 transition-all duration-300 group-hover:-translate-y-6">
      <Icon className="h-10 w-10 origin-left transform-gpu text-neutral-600 transition-all duration-300 ease-in-out group-hover:scale-90 dark:text-neutral-300" />
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">{name}</h3>
      <p className="max-w-lg text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
    </div>

    {/* CTA Button Section */}
    <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-6 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
      <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
        <Link href={href} target="_blank" rel="noopener noreferrer">
          {cta}
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>

    {/* Hover Overlay */}
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.02] group-hover:dark:bg-neutral-800/10" />
  </div>
)

export { BentoCard, BentoGrid }
