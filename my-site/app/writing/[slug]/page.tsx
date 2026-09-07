import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPostDate, getPost, getPosts, getPostSource } from "@/lib/writing";
import { siteConfig } from "@/app/site-config";
import { PostSource } from "../components/post-source";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const title = `${post.title} — ${siteConfig.name}`;
  const url = `/writing/${post.slug}`;

  return {
    title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description: post.description,
      url,
      siteName: siteConfig.name,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
    twitter: { card: "summary", title, description: post.description },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const source = post.template ? await getPostSource(slug) : undefined;
  const Content = post.Content;
  const showBottomBackLink = !post.hideBackLinks && !post.hideBottomBackLink;

  return (
    <main className="bio writing-page writing-article">
      {!post.hideBackLinks && (
        <Link className="writing-back" href="/writing"> &lt;&nbsp;&nbsp;&nbsp;back to writing</Link> /*← arrow*/
      )}
      <article aria-labelledby="post-title">
        <header className="post-header">
          <h1 id="post-title">{post.title}</h1>
          <p className="post-date">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </p>
        </header>
        {source && <PostSource source={source} />}
        <div className="post-body"><Content /></div>
        {(post.updated || showBottomBackLink) && (
          <footer className="post-footer">
            {post.updated && (
              <p className="post-updated">Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time></p>
            )}
            {showBottomBackLink && (
              <Link className="writing-back" href="/writing">← back to writing</Link>
            )}
          </footer>
        )}
      </article>
    </main>
  );
}
