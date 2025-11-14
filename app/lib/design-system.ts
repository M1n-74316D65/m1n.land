export const designSystem = {
  colors: {
    text: {
      primary: 'text-foreground',
      secondary: 'text-muted-foreground',
      link: 'text-primary hover:text-primary/80 transition-colors',
    },
    background: {
      primary: 'bg-background',
      secondary: 'bg-card',
      accent: 'bg-accent',
    },
    border: 'border-border',
  },
  spacing: {
    component: {
      header: 'mb-6',
      section: 'mb-8',
      card: 'p-4',
      nav: 'mb-12',
    },
  },
  interactions: {
    link: 'transition-colors duration-200 hover:text-primary/80',
    button: 'transition-all duration-200 hover:bg-accent active:scale-[0.98]',
    card: 'transition-all duration-300 hover:shadow-sm',
    navItem: 'transition-all duration-200 hover:bg-accent rounded-md',
  },
}
