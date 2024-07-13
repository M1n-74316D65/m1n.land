import Link from "next/link";
import {
  Github,
  Gitlab,
  AtSign,
  Rss,
  CircleUserRound,
  BookOpenText,
  LockKeyhole,
  Terminal,
  Code,
} from "lucide-react";

// function ArrowIcon() {
//   return (
//     <svg
//       width="12"
//       height="12"
//       viewBox="0 0 12 12"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
//         fill="currentColor"
//       />
//     </svg>
//   );
// }

export default function Footer() {
  return (
    <footer className="mb-16">
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <Link
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://m1n.url.lol/rustlesspass"
          >
            <LockKeyhole className="w-4 h-4 font-bold" />
            <p className="ml-2 h-7">rustedlesspass</p>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://m1n.url.lol/pastol"
          >
            <Terminal className="w-4 h-4 font-bold" />
            <p className="ml-2 h-7">pastol</p>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://m1n.url.lol/github-profile"
          >
            <Github className="w-4 h-4 font-bold" />
            <p className="ml-2 h-7">github</p>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://m1n.url.lol/gitlab-profile"
          >
            <Gitlab className="w-4 h-4 font-bold" />
            <p className="ml-2 h-7">gitlab</p>
          </Link>
        </li>
      </ul>
      <ul className="font-sm flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <Link
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://m1n.omg.lol"
          >
            <CircleUserRound className="w-4 h-4 font-bold" />
            <p className="ml-2 h-7">webprofile</p>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:m1n/public@omg.lol"
          >
            <AtSign className="w-4 h-4 font-bold" />
            <p className="ml-2 h-7">email</p>
          </Link>
        </li>

        <li>
          <Link
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://m1n.url.lol/goodreads"
          >
            <BookOpenText className="w-4 h-4 font-bold" />
            <p className="ml-2 h-7">goodreads</p>
          </Link>
        </li>
      </ul>
      <ul className="font-sm flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <Link
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="/rss"
          >
            <Rss className="w-4 h-4 font-bold" />
            <p className="ml-2 h-7">rss</p>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://m1n.url.lol/nextjs-portfolio"
          >
            <Code className="w-4 h-4 font-bold" />
            <p className="ml-2 h-7">source-code</p>
          </Link>
        </li>
      </ul>
    </footer>
  );
}
