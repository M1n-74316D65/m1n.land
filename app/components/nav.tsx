'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
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
            <div className="flex flex-row items-center gap-1 p-1 bg-muted/50 backdrop-blur-sm rounded-full border border-border/50">
              {navItems.map(({ path, name }) => {
                const isExternal = path.startsWith('http')
                const isActive = !isExternal && pathname === path

                return (
                  <Link
                    key={path}
                    href={path}
                    className="group relative flex items-center px-4 py-2 text-sm text-muted-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full"
                    {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    aria-label={isExternal ? `${name} (opens in new tab)` : name}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-background rounded-full shadow-sm border border-border/50"
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 inline-flex items-center font-medium">
                      {name}
                      {isExternal && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="ml-1 h-3 w-3 text-muted-foreground/70 transition-colors group-hover:text-muted-foreground"
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
