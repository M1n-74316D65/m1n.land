import Link from 'next/link'
import React from 'react'
import { designSystem } from 'app/lib/design-system'

interface LinkComponentProps {
  href: string
  text: string
}

const LinkComponent: React.FC<LinkComponentProps> = React.memo(({ href, text }) => (
  <Link
    className={designSystem.colors.text.link}
    rel="noopener noreferrer"
    target="_blank"
    href={href}
  >
    <span>{text}</span>
  </Link>
))

export default LinkComponent
