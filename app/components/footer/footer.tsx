import { FC } from "react";
import FooterSection from "./FooterSection";
import { footerLinks } from "app/constants/footerLinks";
import { designSystem } from "app/lib/design-system";

const Footer: FC = () => {
  return (
    <footer className={designSystem.spacing.component.nav}>
      {footerLinks.map((links, index) => (
        <FooterSection key={index} links={links} />
      ))}
    </footer>
  );
};

export default Footer;
