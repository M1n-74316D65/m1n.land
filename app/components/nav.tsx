'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { navItems } from 'app/constants/navItems'

const Navbar = React.memo(() => {
  const pathname = usePathname()

  return (
    <aside className="-ml-2 mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex flex-row justify-between items-center w-full pr-10">
            <div className="flex flex-row flex-wrap items-center gap-1.5">
              {navItems.map(({ path, name }) => {
                const isExternal = path.startsWith('http')
                const isActive = !isExternal && pathname === path

                return (
                  <Link
                    key={path}
                    href={path}
                    className={`group flex items-center rounded-full border border-transparent px-2.5 py-1 text-sm text-muted-foreground transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 hover:border-border hover:text-foreground active:scale-[0.98] ${
                      isActive
                        ? 'bg-accent/80 text-foreground border-border font-medium shadow-sm'
                        : ''
                    }`}
                    {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    aria-label={isExternal ? `${name} (opens in new tab)` : name}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="relative inline-flex items-center">
                      {name}
                      {isExternal && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="ml-1 h-3 w-3 text-muted-foreground transition-colors group-hover:text-foreground"
                          aria-hidden="true"
                        >
                          <path
                            d="M7 17L17 7"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7 7h10v10"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  )
})

export default Navbar
