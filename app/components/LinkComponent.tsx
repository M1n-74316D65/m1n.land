import Link from "next/link";
import React from "react";

interface LinkComponentProps {
  href: string;
  text: string;
}

const LinkComponent: React.FC<LinkComponentProps> = React.memo(
  ({ href, text }) => (
    <Link
      className="hover:text-neutral-800 dark:hover:text-neutral-100 text-neutral-600 dark:text-neutral-300"
      rel="noopener noreferrer"
      target="_blank"
      href={href}
    >
      <span>{text}</span>
    </Link>
  ),
);

export default LinkComponent;
