import Link from 'next/link'
import { FC } from 'react'
import { LucideIcon } from 'lucide-react'

interface FooterLinkProps {
  href: string
  icon: LucideIcon
  label: string
}

const FooterLink: FC<FooterLinkProps> = ({ href, icon: Icon, label }) => (
  <li>
    <Link
      className="flex items-center rounded-full px-2 py-1 text-sm text-neutral-500 transition-colors hover:bg-neutral-100/70 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-300 dark:text-neutral-400 dark:hover:bg-neutral-900/60 dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-700"
      rel="noopener noreferrer"
      target="_blank"
      href={href}
    >
      <Icon className="h-3.5 w-3.5 font-bold" />
      <span className="ml-2 tracking-tight">{label}</span>
    </Link>
  </li>
)

export default FooterLink
