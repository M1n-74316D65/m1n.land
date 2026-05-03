import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from 'app/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-none border-2 border-border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-accent focus-visible:ring-accent/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow,transform] duration-100 overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-2 border-border bg-foreground text-background shadow-brutal [a&]:hover:shadow-brutal-accent [a&]:hover:-translate-y-0.5',
        secondary:
          'border-2 border-border bg-muted text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        destructive:
          'border-2 border-destructive bg-destructive text-white shadow-brutal [a&]:hover:shadow-brutal-accent',
        outline:
          'border-2 border-border bg-muted text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground [a&]:hover:border-accent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
