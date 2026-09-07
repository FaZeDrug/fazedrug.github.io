import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  turbopack: {
    root: appRoot,
  },
};

const withMDX = createMDX({
  options: {
    // String plugin names also work with Turbopack's serializable config.
    remarkPlugins: ["remark-gfm"],
    remarkRehypeOptions: { footnoteLabel: "Footnotes" },
  },
});

export default withMDX(nextConfig);
