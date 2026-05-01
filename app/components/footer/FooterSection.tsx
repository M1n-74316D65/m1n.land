import { FC } from 'react'
import FooterLink from './FooterLink'
import { LucideIcon } from 'lucide-react'

interface FooterSectionProps {
  links: readonly {
    href: string
    icon: LucideIcon
    label: string
  }[]
}

const FooterSection: FC<FooterSectionProps> = ({ links }) => (
  <ul className="font-sm flex flex-col space-x-0 space-y-3 text-muted-foreground md:flex-row md:space-x-5 md:space-y-0">
    {links.map((link, index) => (
      <FooterLink key={index} {...link} />
    ))}
  </ul>
)

export default FooterSection
