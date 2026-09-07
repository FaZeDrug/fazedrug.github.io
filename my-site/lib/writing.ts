import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import type { MDXContent } from "mdx/types";

export type PostMetadata = {
  title: string;
  date: string;
  description: string;
  updated?: string;
  template?: boolean;
  hideBackLinks?: boolean;
  hideBottomBackLink?: boolean;
};

export type WritingPost = PostMetadata & {
  slug: string;
  Content: MDXContent;
};

const directory = path.join(process.cwd(), "content", "writing");

function isDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().startsWith(value);
}

function validateMetadata(value: unknown, slug: string): asserts value is PostMetadata {
  const post = value as Partial<PostMetadata> | undefined;
  if (
    !post ||
    typeof post.title !== "string" ||
    !post.title.trim() ||
    typeof post.description !== "string" ||
    !post.description.trim() ||
    !isDate(post.date) ||
    (post.updated !== undefined && !isDate(post.updated)) ||
    (post.template !== undefined && typeof post.template !== "boolean") ||
    (post.hideBackLinks !== undefined && typeof post.hideBackLinks !== "boolean") ||
    (post.hideBottomBackLink !== undefined && typeof post.hideBottomBackLink !== "boolean")
  ) {
    throw new Error(
      `Invalid post metadata in ${slug}.mdx. Export a post with a title, description, and date (YYYY-MM-DD).`,
    );
  }
}

// Local MDX is compiled by Next.js. No remote content or runtime CMS is needed.
export const getPosts = cache(async (): Promise<WritingPost[]> => {
  const files = await readdir(directory, { withFileTypes: true });
  const slugs = files
    .filter((file) => file.isFile() && file.name.endsWith(".mdx") && !file.name.startsWith("_"))
    .map((file) => file.name.slice(0, -4));

  const posts = await Promise.all(slugs.map(async (slug) => {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new Error(`Rename ${slug}.mdx using lowercase words separated by hyphens.`);
    }
    const { default: Content, post } = await import(`@/content/writing/${slug}.mdx`);
    validateMetadata(post, slug);
    return { ...post, slug, Content };
  }));

  return posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
});

export async function getPost(slug: string) {
  return (await getPosts()).find((post) => post.slug === slug);
}

export async function getPostSource(slug: string) {
  // Resolve only known post filenames, never an unchecked URL path.
  const post = await getPost(slug);
  if (!post) return undefined;
  return readFile(path.join(directory, `${post.slug}.mdx`), "utf8");
}

export function formatPostDate(date: string, compact = false) {
  if (compact) {
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year.slice(-2)}`;
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
