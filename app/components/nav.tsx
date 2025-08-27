"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navItems } from "app/constants/navItems";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-0.5 bg-neutral-200 dark:bg-neutral-800 z-50">
      <div
        className="h-full bg-gradient-to-r from-neutral-600 to-neutral-400 dark:from-neutral-400 dark:to-neutral-600 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
    </div>
  );
};

const Navbar = React.memo(() => {
  const pathname = usePathname();

  return (
    <>
      <ScrollProgress />
      <aside className="-ml-2 mb-16 tracking-tight">
        <div className="lg:sticky lg:top-20">
          <nav
            className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
            id="nav"
            role="navigation"
            aria-label="Main navigation"
          >
            <div className="flex flex-row justify-between items-center w-full pr-10">
              <div className="flex flex-row space-x-0">
                {navItems.map(({ path, name }) => {
                  const isExternal = path.startsWith("http");
                  const isActive = !isExternal && pathname === path;

                  return (
                    <Link
                      key={path}
                      href={path}
                      className={`transition-all duration-200 hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800/50 focus:outline-none ${
                        isActive ? 'text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800/50' : ''
                      }`}
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      aria-label={isExternal ? `${name} (opens in new tab)` : name}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="relative inline-flex items-center">
                        {name}
                        {isExternal && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.1em"
                            height="1.1em"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="absolute -top-2 -right-4 text-neutral-400 dark:text-neutral-500"
                            style={{ fontSize: "1em" }}
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
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
});

export default Navbar;
