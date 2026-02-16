export const designSystem = {
  colors: {
    text: {
      primary: 'text-foreground',
      secondary: 'text-muted-foreground',
      tertiary: 'text-muted-foreground/70',
      link: 'text-primary hover:text-primary/80 transition-colors',
    },
    background: {
      primary: 'bg-background',
      secondary: 'bg-card',
      tertiary: 'bg-muted',
      accent: 'bg-accent',
    },
    border: {
      default: 'border-border',
      subtle: 'border-border/60',
      emphasis: 'border-foreground/20',
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
    pill: 'rounded-full',
    button: 'rounded-md',
    card: 'rounded-xl',
    container: 'rounded-2xl',
  },
  interactions: {
    link: 'transition-colors duration-200 hover:text-primary/80 active:text-primary/60',
    button: 'transition-all duration-200 hover:bg-accent active:scale-[0.98]',
    card: 'transition-all duration-200 hover:border-border hover:shadow-sm active:scale-[0.99]',
    navItem: 'transition-all duration-200 hover:bg-accent active:scale-[0.98] rounded-md',
  },
  typography: {
    display: 'text-3xl font-semibold tracking-tight',
    pageTitle: 'text-2xl font-semibold tracking-tight',
    sectionTitle: 'text-xl font-semibold tracking-tight',
    subtitle: 'text-lg font-medium tracking-tight',
    body: 'text-sm leading-relaxed',
    caption: 'text-xs text-muted-foreground',
  },
  animations: {
    duration: {
      fast: 150,
      normal: 200,
      slow: 300,
    },
  },
  effects: {
    shadow: {
      subtle: 'shadow-sm',
      card: 'shadow-sm hover:shadow-md',
    },
  },
}
