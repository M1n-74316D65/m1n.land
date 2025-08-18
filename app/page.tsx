import { TypingAnimation } from "app/components/ui/magicui/typing-animation";
import { MorphingText } from "app/components/ui/magicui/morphing-text";

import BlurFade from "app/components/ui/magicui/blur-fade";
import Footer from "app/components/footer/footer";
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

const texts = [
  "David",
  "M1n",
];

const Page: React.FC = () => {
  // Calculate cohesive timing
  // "Hi, I'm " has 7 characters, so at 75ms per character = 525ms
  // Add a small buffer of 200ms before morphing starts = 725ms
  const typingDuration = 75;
  const typingText = "Hi, I'm ";
  const typingCompleteTime = (typingText.length * typingDuration) / 1000; // Convert to seconds
  const morphingStartDelay = typingCompleteTime + 0.2; // Add 200ms buffer
  const morphingCycleDuration = 2; // 2 seconds per morph cycle
  const contentFadeDelay = morphingStartDelay + morphingCycleDuration * 0.75; // Start fading content 75% through first morph cycle

  return (
    <section>
      <div className="mb-8 text-2xl font-semibold tracking-tighter flex items-center">
        <TypingAnimation 
          duration={typingDuration} 
          className="whitespace-nowrap"
        >
          Hi, I'm&nbsp;
        </TypingAnimation>
        <MorphingText 
          texts={texts} 
          className="min-w-[80px]" 
          delay={morphingStartDelay * 1000} // Convert back to milliseconds
        />
      </div>
      <BlurFade delay={contentFadeDelay} inView>
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
        <div className="pt-4">
          <Footer />
        </div>
      </BlurFade>
    </section>
  );
};

export default Page;
