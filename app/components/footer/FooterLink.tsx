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
      className="flex items-center rounded-full px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
