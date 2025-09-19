export const designSystem = {
  colors: {
    text: {
      primary: 'text-primary',
      secondary: 'text-muted-foreground',
      accent: 'text-primary',
      link: 'text-primary hover:text-primary/80 transition-colors'
    },
    background: {
      primary: 'bg-background',
      secondary: 'bg-card',
      accent: 'bg-accent'
    },
    border: 'border-border'
  },
  spacing: {
    component: {
      header: 'mb-8',
      section: 'mb-12',
      card: 'p-6',
      nav: 'mb-16'
    }
  },
  interactions: {
    link: 'transition-colors duration-200 hover:text-primary/80',
    button: 'transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]',
    card: 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
    navItem: 'transition-all duration-200 hover:bg-accent rounded-md'
  }
}