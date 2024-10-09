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
    href: "https://m1n.url.lol/miraviewer",
    cta: "Visit Miraviewer",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: ClipboardList,
    name: "Pastol",
    description: "Paste.lol Unofficial Command Line Interface.",
    href: "https://m1n.url.lol/pastol-repo",
    cta: "Visit repo",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: RefreshCcwDot,
    name: "rusted-yadm",
    description: "A command-line dotfile manager.",
    href: "https://m1n.url.lol/rusted-yadm",
    cta: "Visit repo",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: TextCursorInput,
    name: "RustedLessPass",
    description:
      "Access all your passwords anytime with one master password, no syncing needed.",
    href: "https://m1n.url.lol/rustlesspass",
    cta: "Visit RustedLessPass",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
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
