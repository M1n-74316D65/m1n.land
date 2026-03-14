'use client'

import Link from 'next/link'
import React from 'react'
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
} from 'lucide-react'
import { designSystem } from 'app/lib/design-system'

interface LinkItem {
  href: string
  icon: React.ElementType
  label: string
}

interface LinkGroup {
  title: string
  links: LinkItem[]
}

const linkGroups: LinkGroup[] = [
  {
    title: 'Projects',
    links: [
      { href: 'https://links.m1n.land/rustlesspass', icon: LockKeyhole, label: 'RustedLessPass' },
      { href: 'https://links.m1n.land/pastol', icon: Terminal, label: 'Pastol' },
      { href: 'https://links.m1n.land/sourcehut-profile', icon: Circle, label: 'SourceHut' },
      { href: 'https://links.m1n.land/github-profile', icon: Github, label: 'GitHub' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { href: 'https://m1n.omg.lol', icon: CircleUserRound, label: 'Profile' },
      { href: 'mailto:public@m1n.land', icon: AtSign, label: 'Email' },
      { href: 'https://links.m1n.land/goodreads', icon: BookOpenText, label: 'Goodreads' },
    ],
  },
  {
    title: 'Links',
    links: [
      { href: 'https://journal.m1n.land/atom.xml', icon: Rss, label: 'RSS' },
      { href: 'https://links.m1n.land/nextjs-portfolio', icon: Github, label: 'Source' },
      { href: 'http://start.m1n.land', icon: LayoutTemplate, label: 'Startpage' },
    ],
  },
]

const GroupedLinks: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
        {linkGroups.map((group) => (
          <div key={group.title} className="space-y-3">
            <h3
              className={`${designSystem.typography.caption} uppercase tracking-wider font-medium`}
            >
              {group.title}
            </h3>
            <ul className="space-y-1.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 py-1"
                  >
                    <link.icon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110" />
                    <span className="tracking-tight">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GroupedLinks
