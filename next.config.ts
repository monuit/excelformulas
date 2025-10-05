import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@/lib/mdx-components",
  },
});

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  turbopack: {
    root: process.cwd(),
  },
  pageExtensions: ["ts", "tsx", "mdx"],
  poweredByHeader: false,
};

export default withMDX(nextConfig);
