"use client";

import { useState } from "react";

export function PostSource({ source }: { source: string }) {
  const [status, setStatus] = useState("");

  async function copySource() {
    try {
      await navigator.clipboard.writeText(source);
      setStatus("Copied. Paste it into a new .mdx file.");
    } catch {
      setStatus("Couldn’t copy automatically. You can select and copy the source below.");
    }
  }

  return (
    <details className="post-source">
      <summary>use this template</summary>
      <p>
        Copy this post into a new <code>.mdx</code> file in <code>content/writing</code>.
        Change the title, date, and description at the top, remove <code>template: true</code>,
        and keep the formatting you need. The filename becomes its URL, and it appears
        in the writing list automatically.
      </p>
      <button className="post-copy" type="button" onClick={copySource}>copy post source</button>
      <span className="post-copy-status" role="status">{status}</span>
      <pre tabIndex={0} aria-label="Copyable MDX post source"><code>{source}</code></pre>
    </details>
  );
}
