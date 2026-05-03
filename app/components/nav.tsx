'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { navItems } from 'app/constants/links'

const Navbar = React.memo(() => {
  const pathname = usePathname()

  return (
    <aside className="mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 scroll-pr-6 md:relative"
          id="nav"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex flex-row items-center w-full">
            <div className="flex flex-row items-center border-2 border-border bg-muted shadow-brutal">
              {navItems.map(({ path, name }, index) => {
                const isExternal = path.startsWith('http')
                const isActive = !isExternal && pathname !== null && pathname === path

                return (
                  <Link
                    key={path}
                    href={path}
                    className={`relative flex items-center px-4 py-2 text-sm font-mono uppercase tracking-wider transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                      isActive
                        ? 'bg-accent text-accent-foreground font-bold'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    } ${index > 0 ? 'border-l-2 border-border' : ''} ${
                      isActive && index > 0 ? 'border-l-accent' : ''
                    }`}
                    {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    aria-label={isExternal ? `${name} (opens in new tab)` : name}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="inline-flex items-center">
                      {name}
                      {isExternal && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="ml-1 h-3 w-3 opacity-60"
                          aria-hidden="true"
                        >
                          <path
                            d="M7 17L17 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7 7h10v10"
                            stroke="currentColor"
                            strokeWidth="2"
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
