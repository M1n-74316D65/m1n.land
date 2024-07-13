import { BlogPosts } from "app/components/posts";
import Link from "next/link";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hi, I'm David aka M1n.
      </h1>
      <p className="mb-4">
        {`I love coding, thinking about philosophy, and playing games.`}
        <br />
        {`Linux user. `}
        <Link
          className="hover:text-neutral-800 dark:hover:text-neutral-100 text-neutral-600 dark:text-neutral-300"
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.rust-lang.org"
        >
          <span>Rust</span>
        </Link>
        {` as the most entertaining language.`}
        <br />
        {`Trying to escape from VS Code to `}
        <Link
          className="hover:text-neutral-800 dark:hover:text-neutral-100 text-neutral-600 dark:text-neutral-300"
          rel="noopener noreferrer"
          target="_blank"
          href="https://zed.dev/"
        >
          <span>Zed</span>
        </Link>
        {` and (`}
        <Link
          className="hover:text-neutral-800 dark:hover:text-neutral-100 text-neutral-600 dark:text-neutral-300"
          rel="noopener noreferrer"
          target="_blank"
          href="https://zellij.dev"
        >
          <span>Zellij</span>
        </Link>
        {`, `}
        <Link
          className="hover:text-neutral-800 dark:hover:text-neutral-100 text-neutral-600 dark:text-neutral-300"
          rel="noopener noreferrer"
          target="_blank"
          href="https://neovim.io"
        >
          <span>Neovim</span>
        </Link>
        {`).`}
        <br />
        {`Furthermore, learning `}
        <Link
          className="hover:text-neutral-800 dark:hover:text-neutral-100 text-neutral-600 dark:text-neutral-300"
          rel="noopener noreferrer"
          target="_blank"
          href="https://nextjs.org"
        >
          <span>Next.js</span>
        </Link>
        {` and trying to learn `}
        <Link
          className="hover:text-neutral-800 dark:hover:text-neutral-100 text-neutral-600 dark:text-neutral-300"
          rel="noopener noreferrer"
          target="_blank"
          href="https://go.dev"
        >
          <span>Go</span>
        </Link>
        {` (seems to be efficient).`}
      </p>
      {/* <div className="my-8">
        <BlogPosts />
      </div> */}
    </section>
  );
}
