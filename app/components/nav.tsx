import Link from "next/link";
import React from "react";
import { navItems } from "app/constants/navItems";

const Navbar = React.memo(() => {
  return (
    <aside className="-ml-2 mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row justify-between items-center w-full pr-10">
            <div className="flex flex-row space-x-0">
              {navItems.map(({ path, name }) => {
                const isExternal = path.startsWith("http");
                return (
                  <Link
                    key={path}
                    href={path}
                    className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
  );
});

export default Navbar;
