import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Check out my projects.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}