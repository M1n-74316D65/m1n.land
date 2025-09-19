import type { Metadata } from "next";
import {
  ClipboardList,
  Store,
  RefreshCcwDot,
  TextCursorInput,
} from "lucide-react";
import { BentoCard, BentoGrid } from "app/components/ui/bento-grid";
import { designSystem } from "app/lib/design-system";

const features = [
  {
    Icon: Store,
    name: "Miraviewer",
    description:
      "An all-in-one dashboard for efficiently managing sales, invoices, and reports.",
    href: "https://links.m1n.land/miraviewer",
    cta: "Visit Miraviewer",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-card to-muted/50" />
    ),
    className: "lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: ClipboardList,
    name: "Pastol",
    description: "Paste.lol Unofficial Command Line Interface.",
    href: "https://links.m1n.land/pastol-repo",
    cta: "Visit repo",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-card to-muted/50" />
    ),
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: RefreshCcwDot,
    name: "rusted-yadm",
    description: "A command-line dotfile manager.",
    href: "https://links.m1n.land/rusted-yadm",
    cta: "Visit repo",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-card to-muted/50" />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: TextCursorInput,
    name: "RustedLessPass",
    description:
      "Access all your passwords anytime with one master password, no syncing needed.",
    href: "https://links.m1n.land/rustlesspass",
    cta: "Visit RustedLessPass",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-card to-muted/50" />
    ),
    className: "lg:col-start-2 lg:col-end-4 lg:row-start-2 lg:row-end-3",
  },
];

export const metadata: Metadata = {
  title: "Projects",
  description: "Check out my projects.",
};

export default function Page() {
  return (
    <section>
      <h1 className={`${designSystem.spacing.component.header} font-semibold text-2xl tracking-tighter`}>
        My Projects
      </h1>
      <div>
        <BentoGrid className="lg:grid-rows-3 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
