import Link from "next/link";
import { FC } from "react";
import { LucideIcon } from "lucide-react";

interface FooterLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const FooterLink: FC<FooterLinkProps> = ({ href, icon: Icon, label }) => (
  <li>
    <Link
      className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
      rel="noopener noreferrer"
      target="_blank"
      href={href}
    >
      <Icon className="w-4 h-4 font-bold" />
      <p className="ml-2 h-7">{label}</p>
    </Link>
  </li>
);

export default FooterLink;
