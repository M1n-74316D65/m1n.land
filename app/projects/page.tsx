import {
  ClipboardList,
  Store,
  RefreshCcwDot,
  TextCursorInput,
} from "lucide-react";
import { BentoCard, BentoGrid } from "app/components/ui/bento-grid";

const features = [
  {
    Icon: Store,
    name: "Miraviewer",
    description:
      "An all-in-one dashboard for efficiently managing sales, invoices, and reports.",
    href: "https://links.m1n.land/miraviewer",
    cta: "Visit Miraviewer",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800" />
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
      <div className="absolute inset-0 bg-gradient-to-tr from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700" />
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
      <div className="absolute inset-0 bg-gradient-to-bl from-neutral-100 to-neutral-50 dark:from-neutral-700 dark:to-neutral-900" />
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
      <div className="absolute inset-0 bg-gradient-to-tl from-neutral-200 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900" />
    ),
    className: "lg:col-start-2 lg:col-end-4 lg:row-start-2 lg:row-end-3",
  },
];

export const metadata = {
  title: "Projects",
  description: "Check out my projects.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
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
