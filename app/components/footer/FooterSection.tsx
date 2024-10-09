import { FC } from "react";
import FooterLink from "./FooterLink";
import { LucideIcon } from "lucide-react";

interface FooterSectionProps {
  links: {
    href: string;
    icon: LucideIcon;
    label: string;
  }[];
}

const FooterSection: FC<FooterSectionProps> = ({ links }) => (
  <ul className="font-sm flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
    {links.map((link, index) => (
      <FooterLink key={index} {...link} />
    ))}
  </ul>
);

export default FooterSection;
