import type { Metadata } from 'next'
import { BentoCard, BentoGrid } from 'app/components/ui/bento-grid'

const features = [
  {
    name: 'Miraviewer',
    description: 'All-in-one dashboard for managing sales, invoices, and reports.',
    href: 'https://links.m1n.land/miraviewer',
    className: 'lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2',
  },
  {
    name: 'Pastol',
    description: 'Command-line interface for paste.lol.',
    href: 'https://links.m1n.land/pastol-repo',
    className: 'lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2',
  },
  {
    name: 'rusted-yadm',
    description: 'A command-line dotfile manager written in Rust.',
    href: 'https://links.m1n.land/rusted-yadm',
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3',
  },
  {
    name: 'RustedLessPass',
    description: 'Stateless password manager - one master password, no sync needed.',
    href: 'https://links.m1n.land/rustlesspass',
    className: 'lg:col-start-2 lg:col-end-4 lg:row-start-2 lg:row-end-3',
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
      <div className="mb-5">
        <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Projects
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Selected work and experiments.
        </p>
      </div>
      <BentoGrid className="lg:grid-rows-2 lg:grid-cols-3 gap-3">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </section>
  )
}
