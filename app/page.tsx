import TypingAnimation from "app/components/ui/magicui/typing-animation";
import BlurFade from "app/components/ui/magicui/blur-fade";
import Footer from "app/components/footer";
import LinkComponent from "app/components/LinkComponent";
import React from "react";

const links = [
  {
    href: "https://www.rust-lang.org",
    text: "Rust",
  },
  {
    href: "https://zed.dev/",
    text: "Zed",
  },
  {
    href: "https://zellij.dev",
    text: "Zellij",
  },
  {
    href: "https://neovim.io",
    text: "Neovim",
  },
  {
    href: "https://nextjs.org",
    text: "Next.js",
  },
  {
    href: "https://go.dev",
    text: "Go",
  },
];

const Page: React.FC = () => {
  return (
    <section>
      <TypingAnimation
        text="Hi, I'm David aka M1n."
        className="mb-8 text-2xl font-semibold tracking-tighter"
        duration={75}
      />
      <BlurFade delay={1.75} inView>
        <p className="mb-4">
          {`I love coding, thinking about philosophy, and playing games.`}
          <br />
          {`Linux user. `}
          <LinkComponent href={links[0].href} text={links[0].text} />
          {` as the most entertaining language.`}
          <br />
          {`Trying to escape from VS Code to `}
          <LinkComponent href={links[1].href} text={links[1].text} />
          {` and (`}
          <LinkComponent href={links[2].href} text={links[2].text} />
          {`, `}
          <LinkComponent href={links[3].href} text={links[3].text} />
          {`).`}
          <br />
          {`Furthermore, learning `}
          <LinkComponent href={links[4].href} text={links[4].text} />
          {` and trying to learn `}
          <LinkComponent href={links[5].href} text={links[5].text} />
          {` (seems to be efficient).`}
        </p>
        {/* <div className="my-8">
        <BlogPosts />
      </div> */}
        <Footer />
      </BlurFade>
    </section>
  );
};

export default Page;
