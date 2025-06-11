import { FC } from "react";
import FooterSection from "./FooterSection";
import { footerLinks } from "app/constants/footerLinks";

const Footer: FC = () => {
  return (
    <footer className="mb-16">
      {footerLinks.map((links, index) => (
        <FooterSection key={index} links={links} />
      ))}
    </footer>
  );
};

export default Footer;
