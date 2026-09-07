import type { Metadata } from "next";
import Link from "next/link";
import { formatPostDate, getPosts } from "@/lib/writing";
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

export default async function WritingPage() {
  const posts = await getPosts();

  return (
    <main className="bio writing-page writing-index" aria-label="Writing">
      <h1>writing</h1>
      <p className="writing-description"><i>thoughts, observations, and stuff i&apos;m working on</i></p>
      <ul className="writing-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link className="writing-entry" href={`/writing/${post.slug}`}>
              <time dateTime={post.date}>{formatPostDate(post.date, true)}</time>
              <span>{post.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
