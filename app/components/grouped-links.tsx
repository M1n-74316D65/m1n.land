'use client'

import Link from 'next/link'
import React from 'react'
import { designSystem } from 'app/lib/design-system'
import { groupedLinks, type LinkGroup, type LinkItem } from 'app/constants/links'

const GroupedLinks: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
        {groupedLinks.map((group) => (
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
export type { LinkGroup, LinkItem }
