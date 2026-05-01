import {
  Github,
  AtSign,
  Rss,
  CircleUserRound,
  BookOpenText,
  LockKeyhole,
  Terminal,
  Circle,
  LayoutTemplate,
  Code,
  FolderCog,
  LayoutDashboard,
} from 'lucide-react'

// Navigation items for the main nav
export const navItems = [
  { path: '/', name: 'home' },
  { path: '/projects', name: 'projects' },
  { path: 'https://journal.m1n.land', name: 'blog' },
  { path: '/radio', name: 'radio' },
  // { path: '/guestbook', name: 'guestbook' },
] as const

// Tech stack items (for badges on home page)
export const techStack = ['Rust', 'Go', 'TypeScript', 'Linux', 'Neovim'] as const

// Projects - with icons for footer and grouped links
export const projects = [
  {
    href: 'https://links.m1n.land/miraviewer',
    icon: LayoutDashboard,
    label: 'Miraviewer',
    description: 'All-in-one dashboard for managing sales, invoices, and reports.',
    category: 'Projects',
  },
  {
    href: 'https://links.m1n.land/rustlesspass',
    icon: LockKeyhole,
    label: 'RustedLessPass',
    description: 'Stateless password manager - one master password, no sync needed.',
    category: 'Projects',
  },
  {
    href: 'https://links.m1n.land/pastol',
    icon: Terminal,
    label: 'Pastol',
    description: 'Command-line interface for paste.lol.',
    category: 'Projects',
  },
  {
    href: 'https://links.m1n.land/rusted-yadm',
    icon: FolderCog,
    label: 'rusted-yadm',
    description: 'A command-line dotfile manager written in Rust.',
    category: 'Projects',
  },
  {
    href: 'https://links.m1n.land/sourcehut-profile',
    icon: Circle,
    label: 'SourceHut',
    category: 'Projects',
  },
  {
    href: 'https://links.m1n.land/github-profile',
    icon: Github,
    label: 'GitHub',
    category: 'Projects',
  },
] as const

// Social/Connect links
export const socialLinks = [
  {
    href: 'https://m1n.omg.lol',
    icon: CircleUserRound,
    label: 'Profile',
    category: 'Connect',
  },
  {
    href: 'mailto:public@m1n.land',
    icon: AtSign,
    label: 'Email',
    category: 'Connect',
  },
  {
    href: 'https://links.m1n.land/goodreads',
    icon: BookOpenText,
    label: 'Goodreads',
    category: 'Connect',
  },
] as const

// External links
export const externalLinks = [
  {
    href: 'https://journal.m1n.land/atom.xml',
    icon: Rss,
    label: 'RSS',
    category: 'Links',
  },
  {
    href: 'https://links.m1n.land/nextjs-portfolio',
    icon: Code,
    label: 'Source',
    category: 'Links',
  },
  {
    href: 'http://start.m1n.land',
    icon: LayoutTemplate,
    label: 'Startpage',
    category: 'Links',
  },
] as const

// Grouped links for home page (organized by category)
export const groupedLinks = [
  {
    title: 'Projects',
    links: projects.map((p) => ({ href: p.href, icon: p.icon, label: p.label })),
  },
  {
    title: 'Connect',
    links: socialLinks.map((s) => ({ href: s.href, icon: s.icon, label: s.label })),
  },
  {
    title: 'Links',
    links: externalLinks.map((e) => ({ href: e.href, icon: e.icon, label: e.label })),
  },
] as const

// Footer links (2D array for column layout)
export const footerLinks = [
  projects.slice(0, 4).map((p) => ({ href: p.href, icon: p.icon, label: p.label })),
  socialLinks.map((s) => ({ href: s.href, icon: s.icon, label: s.label })),
  [
    { href: 'https://journal.m1n.land/atom.xml', icon: Rss, label: 'rss' },
    { href: 'https://links.m1n.land/nextjs-portfolio', icon: Code, label: 'source-code' },
  ],
  [{ href: 'http://start.m1n.land', icon: LayoutTemplate, label: 'startpage' }],
] as const

// All links combined (for sitemap, etc.)
export const allLinks = [
  ...navItems.map((n) => ({ href: n.path, label: n.name })),
  ...projects.map((p) => ({ href: p.href, label: p.label })),
  ...socialLinks.map((s) => ({ href: s.href, label: s.label })),
  ...externalLinks.map((e) => ({ href: e.href, label: e.label })),
] as const

// Type exports
export type NavItem = (typeof navItems)[number]
export type Project = (typeof projects)[number]
export type SocialLink = (typeof socialLinks)[number]
export type ExternalLink = (typeof externalLinks)[number]
export type LinkItem = { href: string; icon: React.ElementType; label: string }
export type LinkGroup = { title: string; links: LinkItem[] }
