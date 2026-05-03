export const designSystem = {
  colors: {
    text: {
      primary: 'text-foreground',
      secondary: 'text-muted-foreground',
      tertiary: 'text-muted-foreground/70',
      link: 'text-foreground hover:text-accent transition-colors',
      accent: 'text-accent',
      mono: 'font-mono text-muted-foreground',
    },
    background: {
      primary: 'bg-background',
      secondary: 'bg-card',
      tertiary: 'bg-muted',
      accent: 'bg-accent',
    },
    border: {
      default: 'border-border',
      thick: 'border-2 border-border',
      accent: 'border-2 border-accent',
    },
  },
  spacing: {
    component: {
      xs: 'mb-2',
      sm: 'mb-4',
      header: 'mb-6',
      md: 'mb-6',
      section: 'mb-10',
      lg: 'mb-10',
      nav: 'mb-16',
      xl: 'mb-16',
      card: 'p-5',
    },
    padding: {
      card: 'p-5',
      cardLg: 'p-8',
    },
  },
  radius: {
    none: 'rounded-none',
    button: 'rounded-none',
    card: 'rounded-none',
    container: 'rounded-none',
  },
  interactions: {
    link: 'transition-colors duration-100 hover:text-accent active:text-accent/80',
    button:
      'transition-all duration-100 hover:-translate-y-0.5 hover:shadow-brutal active:translate-y-0 active:shadow-none',
    card: 'transition-all duration-100 hover:-translate-y-1 hover:shadow-brutal-lg active:translate-y-0 active:shadow-none',
    navItem: 'transition-colors duration-100 hover:bg-accent hover:text-accent-foreground',
  },
  typography: {
    display: 'text-3xl font-bold tracking-tight',
    pageTitle: 'text-2xl font-bold tracking-tight',
    sectionTitle: 'text-xl font-bold tracking-tight',
    subtitle: 'text-lg font-semibold tracking-tight',
    body: 'text-sm leading-relaxed',
    caption: 'text-xs text-muted-foreground font-mono uppercase tracking-widest',
    mono: 'font-mono text-sm',
  },
  animations: {
    duration: {
      fast: 100,
      normal: 150,
      slow: 200,
    },
  },
  effects: {
    shadow: {
      brutal: 'shadow-brutal',
      brutalAccent: 'shadow-brutal-accent',
      brutalLg: 'shadow-brutal-lg',
    },
  },
} as const

export type DesignSystem = typeof designSystem
