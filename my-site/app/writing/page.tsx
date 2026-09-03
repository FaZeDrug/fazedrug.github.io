import type { Metadata } from "next";
import { siteConfig } from "../site-config";

const pageDescription = "Thoughts and reflections from Natasha Tran.";

export const metadata: Metadata = {
  description: pageDescription,
  alternates: {
    canonical: "/writing",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/writing",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: pageDescription,
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: pageDescription,
  },
};

export default function WritingPage() {
  return (
    <main className="bio writing-page" aria-label="Writing">
      <h1>writing</h1>
      <p>thoughts and reflections will be here :D</p>
    </main>
  );
}
