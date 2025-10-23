import { FC, ReactNode, useMemo } from "react";
import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Navbar from "app/components/nav";
import Particles from "app/components/ui/magicui/particles";
import { baseUrl } from "app/constants/baseUrl";
import { designSystem } from "app/lib/design-system";

// Metadata configuration
const siteMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "M1n",
    template: "%s | M1n",
  },
  description: "M1n portfolio.",
  openGraph: {
    title: "M1n",
    description: "M1n portfolio.",
    url: baseUrl,
    siteName: "M1n",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const metadata = siteMetadata;

// Utility function for class names
const cx = (...classes: (string | boolean | undefined)[]): string =>
  classes.filter(Boolean).join(" ");

// RootLayout component
interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  const htmlClassName = useMemo(
    () =>
      cx(
        "text-black bg-white dark:text-white dark:bg-black",
        GeistSans.variable,
        GeistMono.variable,
      ),
    [],
  );

  return (
    <html lang="en" className={htmlClassName}>
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <Particles
          className="fixed inset-0 -z-10"
          quantity={Math.floor(Math.PI * 10)}
          staticity={40}
          ease={60}
          color="#888888"
          vx={Math.PI / 12}
          vy={Math.PI / 12}
        />
        <main
          className={`flex-auto min-w-0 ${designSystem.spacing.component.section} flex flex-col px-2 md:px-0`}
        >
          <Navbar />
          {children}
          </main>
      </body>
    </html>
  );
};

export default RootLayout;
