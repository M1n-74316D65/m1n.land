import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from 'app/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-medium transition-all duration-100 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-accent focus-visible:ring-accent/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive active:translate-y-0 active:shadow-none",
  {
    variants: {
      variant: {
        default:
          'bg-foreground text-background border-2 border-border shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-y-0 active:shadow-none',
        destructive:
          'bg-destructive text-white border-2 border-destructive shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-y-0 active:shadow-none',
        outline:
          'border-2 border-border bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent hover:-translate-y-0.5 hover:shadow-brutal-accent active:translate-y-0 active:shadow-none',
        secondary:
          'bg-muted text-foreground border-2 border-border hover:bg-accent hover:text-accent-foreground hover:border-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-accent underline-offset-4 hover:underline font-mono',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-none gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-none px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
