import { Children, isValidElement } from "react";
import type { ComponentProps, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { Tweet } from "@/app/writing/components/tweet";

function PostLink({ href, ...props }: ComponentProps<"a">) {
  const isExternal = typeof href === "string" && /^https?:\/\//.test(href);

  return isExternal ? (
    <a href={href} {...props} target="_blank" rel="noopener noreferrer" />
  ) : (
    <a href={href} {...props} />
  );
}

function CodeBlock({ children, ...props }: ComponentProps<"pre">) {
  const child = Children.toArray(children)[0];
  const language = isValidElement<{ className?: string }>(child)
    ? child.props.className?.replace(/^language-/, "")
    : undefined;

  return (
    <div className="post-code">
      {language && <div className="post-code-label">{language === "javascript" ? "JavaScript" : language}</div>}
      <pre tabIndex={0} {...props}>{children}</pre>
    </div>
  );
}

function Table(props: ComponentProps<"table">) {
  return (
    <div className="post-table-scroll" role="region" aria-label="Table" tabIndex={0}>
      <table {...props} />
    </div>
  );
}

function Note({ title = "Note", children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="post-note">
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}

function Figure({
  src, alt = "", caption, credit, width, height,
}: {
  src?: string;
  alt?: string;
  caption: string;
  credit?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="post-figure">
      {src ? (
        // Native images support local static hosting without an image server.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      ) : (
        <div className="post-image-placeholder" aria-label="Example image placeholder">image / sketch placeholder</div>
      )}
      <figcaption>
        <em>{caption}</em>
        {credit && <span className="post-figure-credit">{credit}</span>}
      </figcaption>
    </figure>
  );
}

const components = {
  a: PostLink,
  pre: CodeBlock,
  table: Table,
  Note,
  Figure,
  Tweet,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
