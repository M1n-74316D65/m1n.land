import Link from "next/link";
import React from "react";
import { navItems } from "app/constants/navItems";
import { Clock } from "app/components/clock";

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
              {navItems.map(({ path, name }) => (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                >
                  {name}
                </Link>
              ))}
            </div>
            <Clock />
          </div>
        </nav>
      </div>
    </aside>
  );
});

export default Navbar;
