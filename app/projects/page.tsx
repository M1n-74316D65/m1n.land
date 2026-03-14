import type { Metadata } from 'next'
import { BentoCard, BentoGrid } from 'app/components/ui/bento-grid'
import { designSystem } from 'app/lib/design-system'
import BlurFade from 'app/components/ui/magicui/blur-fade'
import { LayoutDashboard, Terminal, FolderCog, Lock } from 'lucide-react'

const features = [
  {
    name: 'Miraviewer',
    description: 'All-in-one dashboard for managing sales, invoices, and reports.',
    href: 'https://links.m1n.land/miraviewer',
    icon: LayoutDashboard,
    className: 'lg:col-span-2 lg:row-span-1',
  },
  {
    name: 'Pastol',
    description: 'Command-line interface for paste.lol.',
    href: 'https://links.m1n.land/pastol-repo',
    icon: Terminal,
    className: 'lg:col-span-1 lg:row-span-1',
  },
  {
    name: 'rusted-yadm',
    description: 'A command-line dotfile manager written in Rust.',
    href: 'https://links.m1n.land/rusted-yadm',
    icon: FolderCog,
    className: 'lg:col-span-1 lg:row-span-1',
  },
  {
    name: 'RustedLessPass',
    description: 'Stateless password manager - one master password, no sync needed.',
    href: 'https://links.m1n.land/rustlesspass',
    icon: Lock,
    className: 'lg:col-span-2 lg:row-span-1',
  },
]

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore my open source projects including Miraviewer, Pastol, rusted-yadm, and RustedLessPass - built with Rust, Go, and modern web technologies.',
}

export default function Page() {
  return (
    <section>
      <BlurFade delay={0.1}>
        <div className="mb-8">
          <h1 className={designSystem.typography.pageTitle}>Projects</h1>
          <p className={`mt-1 ${designSystem.typography.body} text-muted-foreground`}>
            Selected work and experiments.
          </p>
        </div>
      </BlurFade>
      <BlurFade delay={0.2}>
        <BentoGrid className="lg:grid-rows-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </BlurFade>
    </section>
  )
}
