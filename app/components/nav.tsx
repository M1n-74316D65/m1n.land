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
                    className={`flex items-center rounded-full border border-transparent px-2.5 py-1 text-sm text-neutral-500 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-300 hover:border-neutral-200 hover:text-neutral-900 dark:text-neutral-400 dark:focus-visible:ring-neutral-700 dark:hover:border-neutral-800 dark:hover:text-neutral-100 ${
                      isActive
                        ? 'bg-neutral-100/80 text-neutral-900 border-neutral-200 dark:bg-neutral-900/70 dark:text-neutral-100 dark:border-neutral-800'
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
                          className="ml-1 h-3 w-3 text-neutral-400 dark:text-neutral-500"
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
