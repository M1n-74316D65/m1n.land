import {
  Github,
  AtSign,
  Rss,
  CircleUserRound,
  BookOpenText,
  LockKeyhole,
  Terminal,
  Code,
  LayoutTemplate,
  Circle,
} from "lucide-react";

export const footerLinks = [
  [
    {
      href: "https://links.m1n.land/rustlesspass",
      icon: LockKeyhole,
      label: "rustedlesspass",
    },
    { href: "https://links.m1n.land/pastol", icon: Terminal, label: "pastol" },
    {
      href: "https://git.sr.ht/~m1n/",
      icon: Circle,
      label: "sourcehut",
    },
    {
      href: "https://links.m1n.land/github-profile",
      icon: Github,
      label: "github",
    },
  ],
  [
    {
      href: "https://m1n.omg.lol",
      icon: CircleUserRound,
      label: "webprofile",
    },
    { href: "mailto:public@m1n.land", icon: AtSign, label: "email" },
    {
      href: "https://links.m1n.land/goodreads",
      icon: BookOpenText,
      label: "goodreads",
    },
  ],
  [
    { href: "/rss", icon: Rss, label: "rss" },
    {
      href: "https://links.m1n.land/nextjs-portfolio",
      icon: Code,
      label: "source-code",
    },
  ],
  [
    {
      href: "http://start.m1n.land",
      icon: LayoutTemplate,
      label: "startpage",
    },
  ],
];
